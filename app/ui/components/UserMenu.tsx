'use client';

import Link from "next/link";
import Image from "next/image";
import { User, LogOut, ChevronDown, BookMarked, Heart, LayoutDashboard, Users, Building } from "lucide-react";
import { logout } from "@/lib/actions";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import type { Profile } from "./NavAuth";

export default function UserMenu({ userProfile }: {userProfile: Profile | null}) {
  const pathname = usePathname();
  const role = userProfile?.role;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Role-based navigation items
  const getRoleLinks = () => {
    switch (role) {
      case "student":
        return [
          { href: '/my-bookings', label: 'My Bookings', icon: BookMarked },
          { href: '/saved-apartments', label: 'Saved Apartments', icon: Heart },
        ];
      case "admin":
        return [
          { href: '/admin/properties', label: 'Manage Properties', icon: Building },
          { href: '/admin/users', label: 'Manage Users', icon: Users },
        ];
      case "landlord":
        return [
          { href: '/landlords/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        ];
      default:
        return [];
    }
  };

  const roleLinks = getRoleLinks();

  return (
    <div className="flex items-center space-x-4">
      {/* Desktop Navigation Links */}
      <div className="hidden xl:flex items-center space-x-1">
        {roleLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-200
              flex items-center space-x-2
              ${
                isActive(href)
                  ? 'text-[#003366] bg-[#003366]/5'
                  : 'text-gray-700 hover:text-[#003366] hover:bg-gray-50'
              }
            `}
          >
            <Icon size={16} />
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* Divider - Desktop only */}
      {roleLinks.length > 0 && (
        <div className="hidden xl:block h-8 w-px bg-gray-300" />
      )}

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-lg
            transition-all duration-200
            ${isDropdownOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}
          `}
        >
          {/* Avatar */}
          <div className="relative">
            {userProfile?.avatar_url ? (
              <Image
                src={userProfile.avatar_url}
                alt={userProfile.full_name || "Profile"}
                width={36}
                height={36}
                className="rounded-full object-cover ring-2 ring-gray-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#003366]/10 flex items-center justify-center ring-2 ring-gray-200">
                <User size={20} className="text-[#003366]" />
              </div>
            )}
            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>

          {/* Name & Role - Desktop only */}
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold text-gray-900 leading-tight">
              {userProfile?.full_name || 'User'}
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {role}
            </span>
          </div>

          {/* Chevron */}
          <ChevronDown 
            size={16} 
            className={`
              text-gray-500 transition-transform duration-200
              ${isDropdownOpen ? 'rotate-180' : ''}
            `}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="
            absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg 
            border border-gray-200 py-2 z-50
            animate-in fade-in slide-in-from-top-2 duration-200
          ">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">
                {userProfile?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500 capitalize mt-0.5">
                {role} Account
              </p>
            </div>

            {/* Mobile: Show role links in dropdown */}
            <div className="xl:hidden">
              {roleLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsDropdownOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-2.5
                    text-sm transition-colors
                    ${
                      isActive(href)
                        ? 'text-[#003366] bg-[#003366]/5'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              ))}
              {roleLinks.length > 0 && (
                <div className="my-2 border-t border-gray-100" />
              )}
            </div>

            {/* Profile Link */}
            <Link
              href="/profile"
              onClick={() => setIsDropdownOpen(false)}
              className={`
                flex items-center space-x-3 px-4 py-2.5
                text-sm transition-colors
                ${
                  isActive('/profile')
                    ? 'text-[#003366] bg-[#003366]/5'
                    : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <User size={16} />
              <span>View Profile</span>
            </Link>

            {/* Divider */}
            <div className="my-2 border-t border-gray-100" />

            {/* Logout */}
            <form action={logout}>
              <button
                type="submit"
                className="
                  w-full flex items-center space-x-3 px-4 py-2.5
                  text-sm text-red-600 hover:bg-red-50
                  transition-colors
                "
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}