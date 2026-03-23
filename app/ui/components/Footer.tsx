'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Types & Data ---
interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', icon: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
  { label: 'Facebook', href: '#', icon: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
  { label: 'WhatsApp', href: '#', icon: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg> },
  { label: 'Email', href: 'mailto:support@campuscrib.com', icon: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
];

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Browse Apartments', href: '/apartments' },
  { label: 'Find a Roommate', href: '/roommate' },
  { label: 'List Property', href: '/landlord/dashboard' }
];

const TRUST_POINTS = [
  'Admin-verified listings',
  'No hidden agent fees',
  'Authentic student reviews',
  'Secure payment options',
];

// --- Sub-components ---
const FooterSection = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 md:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 md:py-0 md:mb-5 text-left md:cursor-default"
      >
        <span className="text-xs font-bold text-[#00BCD4] uppercase tracking-widest">
          {title}
        </span>
        <span className={`transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-[#00BCD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div className={`
        overflow-hidden transition-all duration-300 md:max-h-none
        ${isOpen ? 'max-h-64 pb-6' : 'max-h-0'}
      `}>
        {children}
      </div>
    </div>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#003366] overflow-hidden text-[#F5F5F5]">
      {/* Visual Depth Accent */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] bg-[#00BCD4]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00BCD4]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-6 pb-8 md:pb-0 border-b border-white/5 md:border-none">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative p-2 bg-[#F5F5F5] rounded-lg shadow-lg">
                <Image src="/Campus_Crib_Logo.png" alt="Campus Crib" width={28} height={28} />
              </div>
              <span className="text-2xl font-black text-[#F5F5F5] tracking-tight">
                Campus<span className="text-[#00BCD4]">Crib</span>
              </span>
            </Link>
            
            <p className="text-[15px] text-[#F5F5F5]/60 leading-relaxed max-w-sm">
              Helping Nigerian students find safe, verified, and affordable housing near their universities.
            </p>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F5F5F5]/60 hover:text-[#00BCD4] hover:border-[#00BCD4] transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links (Accordion on Mobile) */}
          <div className="md:col-span-3 md:pt-2">
            <FooterSection title="Quick Links">
              <nav className="flex flex-col gap-3.5">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-[15px] text-[#F5F5F5]/70 hover:text-[#00BCD4] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </FooterSection>
          </div>

          {/* Trust Section (Accordion on Mobile) */}
          <div className="md:col-span-4 md:pt-2">
            <FooterSection title="Why Choose Us">
              <div className="flex flex-col gap-4">
                {TRUST_POINTS.map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="bg-[#00BCD4]/20 p-0.5 rounded">
                      <svg className="w-3.5 h-3.5 text-[#00BCD4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[15px] text-[#F5F5F5]/70">{text}</span>
                  </div>
                ))}
              </div>
            </FooterSection>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 order-2 md:order-1 text-center">
            <p className="text-[11px] text-[#F5F5F5]/30">
              © {currentYear} Campus Crib Technologies.
            </p>
            <div className="flex gap-4">
               <Link href="/privacy" className="text-[11px] text-[#F5F5F5]/40 hover:text-[#00BCD4]">Privacy</Link>
               <Link href="/terms" className="text-[11px] text-[#F5F5F5]/40 hover:text-[#00BCD4]">Terms</Link>
            </div>
          </div>
          
          <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 order-1 md:order-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BCD4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BCD4]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/50">
              Active — Serving 20+ Universities
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}