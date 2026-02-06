'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2 } from "lucide-react";

export default function NavLinks() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/apartments', label: 'Apartments', icon: Building2 },
  ];

  return (
    <div className="flex items-center space-x-1">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`
            group relative px-4 py-2 rounded-lg font-medium text-sm
            transition-all duration-200 ease-in-out
            flex items-center space-x-2
            ${
              isActive(href)
                ? 'text-[#003366] bg-[#003366]/5'
                : 'text-gray-700 hover:text-[#003366] hover:bg-gray-50'
            }
          `}
        >
          <Icon 
            size={18} 
            className={`
              transition-transform duration-200
              ${isActive(href) ? 'scale-110' : 'group-hover:scale-110'}
            `}
          />
          <span>{label}</span>
          
          {/* Active indicator */}
          {isActive(href) && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#003366] rounded-full" />
          )}
        </Link>
      ))}
    </div>
  );
}