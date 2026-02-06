'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Building2, User, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/lib/actions";
import Image from "next/image";

interface UserProfile {
  role: string;
  avatar_url: string | null;
  full_name: string | null;
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Fetch user profile if needed
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, avatar_url, full_name')
          .eq('id', user.id)
          .single();
        
        setUserProfile(profile);
      }
    };
    
    getUser();
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  const mainLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/apartments', label: 'Apartments', icon: Building2 },
  ];

  const getRoleLinks = () => {
    switch (userProfile?.role) {
      case "student":
        return [
          { href: '/my-bookings', label: 'My Bookings' },
          { href: '/saved-apartments', label: 'Saved Apartments' },
        ];
      case "admin":
        return [
          { href: '/admin/dashboard', label: 'Dashboard' },
          
        ];
      case "landlord":
        return [
          { href: '/landlords/dashboard', label: 'Dashboard' },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X size={24} className="text-gray-700" />
        ) : (
          <Menu size={24} className="text-gray-700" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-[#003366]">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Profile Section */}
            {user && userProfile && (
              <div className="p-4 bg-[#003366]/5 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  {userProfile.avatar_url ? (
                    <Image
                      src={userProfile.avatar_url}
                      alt={userProfile.full_name || "Profile"}
                      width={48}
                      height={48}
                      className="rounded-full object-cover ring-2 ring-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {userProfile.full_name || 'User'}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {userProfile.role}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Main Navigation */}
            <nav className="py-4">
              <div className="px-4 mb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Navigation
                </p>
              </div>
              {mainLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`
                    flex items-center space-x-3 px-4 py-3
                    transition-colors
                    ${
                      isActive(href)
                        ? 'text-[#003366] bg-[#003366]/10 border-l-4 border-[#003366]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>

            {/* Role-based Links */}
            {user && getRoleLinks().length > 0 && (
              <div className="py-4 border-t border-gray-200">
                <div className="px-4 mb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Quick Links
                  </p>
                </div>
                {getRoleLinks().map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      flex items-center px-4 py-3
                      transition-colors
                      ${
                        isActive(href)
                          ? 'text-[#003366] bg-[#003366]/10 border-l-4 border-[#003366]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Profile Link for logged-in users */}
            {user && (
              <div className="py-4 border-t border-gray-200">
                <Link
                  href="/profile"
                  className={`
                    flex items-center space-x-3 px-4 py-3
                    transition-colors
                    ${
                      isActive('/profile')
                        ? 'text-[#003366] bg-[#003366]/10 border-l-4 border-[#003366]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <User size={20} />
                  <span className="font-medium">View Profile</span>
                </Link>
              </div>
            )}
          </div>

          {/* Footer - Auth Actions */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            {user ? (
              <form action={logout}>
                <button
                  type="submit"
                  className="
                    w-full flex items-center justify-center space-x-2
                    px-4 py-3 rounded-lg
                    text-red-600 bg-white border border-red-200
                    hover:bg-red-50
                    transition-colors font-medium
                  "
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </form>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="
                    block text-center px-4 py-3 rounded-lg
                    text-[#003366] border border-[#003366]
                    hover:bg-[#003366] hover:text-white
                    transition-colors font-medium
                  "
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="
                    block text-center px-4 py-3 rounded-lg
                    text-white bg-[#003366]
                    hover:bg-[#002347]
                    transition-colors font-medium
                  "
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}