import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import AuthSection from "./NavAuth";
import AuthSkeleton from "../skeletons/auth-skeleton";
import NavLinks from "./Navlinks";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src="/Campus_Crib_Logo.png"
              alt="Campus Crib Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="hidden sm:block text-xl font-bold text-[#003366]">
              Campus Crib
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavLinks />
          </div>

          {/* Desktop Auth Section - Right */}
          <div className="hidden lg:flex items-center">
            <Suspense fallback={<AuthSkeleton />}>
              <AuthSection />
            </Suspense>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Suspense fallback={<AuthSkeleton />}>
              <MobileMenu />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}