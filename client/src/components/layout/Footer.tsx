"use client";

import Link from "next/link";
import { Plane } from "lucide-react";

const Facebook = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const Instagram = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Youtube = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const Linkedin = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0B2522] text-white pt-16 pb-8 border-t-[4px] border-[#F4A62A]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 inline-flex">
              <div className="bg-[#F4A62A] p-2 rounded-full flex items-center justify-center">
                <Plane size={20} className="text-[#0B2522] -rotate-45" strokeWidth={2.5} />
              </div>
              <span className="text-[20px] font-extrabold tracking-tight text-white">
                TRIP PLAN <span className="text-[#F4A62A]">AI</span>
              </span>
            </Link>
            <p className="text-[14px] text-white/70 font-medium mb-8 max-w-[250px]">
              Plan Smarter. Travel Better. Discover your perfect destination with AI.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4A62A] hover:text-[#0B2522] transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4A62A] hover:text-[#0B2522] transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4A62A] hover:text-[#0B2522] transition-colors">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F4A62A] hover:text-[#0B2522] transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-6 font-serif tracking-wide">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/destinations" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Explore Destinations</Link></li>
              <li><Link href="/plan-trip" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Plan My Trip</Link></li>
              <li><Link href="/my-trips" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">My Trips</Link></li>
              <li><Link href="/reviews" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Reviews</Link></li>
              <li><Link href="/wishlist" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Wishlist</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-6 font-serif tracking-wide">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Travel Guides</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Travel Tips</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Travel Stories</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Budget Travel</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Help Center</Link></li>
            </ul>
          </div>

          {/* Company & Connect */}
          <div>
            <h4 className="text-[16px] font-bold text-white mb-6 font-serif tracking-wide">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">About</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Contact</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="#" className="text-[14px] text-white/70 hover:text-[#F4A62A] transition-colors font-medium">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/50 font-medium">
            © 2026 TRIP PLAN AI. All rights reserved.
          </p>
          <p className="text-[13px] text-white/50 font-medium font-serif italic">
            Plan Smarter. Travel Better.
          </p>
        </div>
      </div>
    </footer>
  );
}
