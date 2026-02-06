// breadcrumb.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Split path and filter empty strings
  const paths = pathname.split('/').filter(Boolean);
  
  // Build breadcrumb array
  const breadcrumbs = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/');
    
    // Check if it's an ID (UUID, number, or long string)
    const isId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(path) || 
                 /^\d+$/.test(path) || 
                 path.length > 20;
    
    const label = isId 
      ? 'Details' 
      : path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    
    return { label, href };
  });

  return (
    <section className="max-w-7xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
      <div className="text-sm flex items-center">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <div key={crumb.href} className="flex items-center">
              {isLast ? (
                <span className="text-cyan-500 font-semibold">{crumb.label}</span>
              ) : (
                <>
                  <Link href={crumb.href} className="font-semibold text-slate-900 hover:text-cyan-500">
                    {crumb.label}
                  </Link>
                  <span className="mx-2 text-slate-400">{'>'}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

