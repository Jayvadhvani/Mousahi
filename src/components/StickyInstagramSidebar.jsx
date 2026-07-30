import React from 'react';
import { Instagram, Facebook, MessageCircle, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';

export default function StickyInstagramSidebar() {
  return (
    <>
      {/* Sticky Left Social & Order Bar */}
      <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {/* Facebook Tab - Opens Facebook directly on click */}
        <a
          href={BRAND_INFO.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1877F2] text-white shadow-xl hover:shadow-2xl rounded-r-xl md:rounded-r-2xl border-y border-r border-white/40 overflow-hidden transition-all duration-300 ease-out flex items-center p-1.5 md:p-2 group/fb"
          title="Visit Mousahi on Facebook"
        >
          {/* Facebook Icon Badge */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover/fb:rotate-12 transition-transform duration-300 shadow-inner">
            <Facebook className="w-5 h-5 md:w-6 md:h-6 fill-white text-[#1877F2]" />
          </div>

          {/* Expanded Info on Hover (Desktop only) */}
          <div className="hidden md:flex max-w-0 group-hover/fb:max-w-[220px] opacity-0 group-hover/fb:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden flex-col justify-center pl-0 group-hover/fb:pl-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-blue-200 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-blue-300 animate-pulse" />
              <span>Facebook Page</span>
            </div>
            <span className="font-heading font-extrabold text-base text-white tracking-tight leading-tight flex items-center gap-1">
              Mousahi Bakes
              <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
            </span>
            <span className="text-[10px] text-blue-100 font-medium">Click to open Facebook profile</span>
          </div>

          {/* Hover Arrow Indicator (Desktop only) */}
          <div className="hidden md:flex max-w-0 group-hover/fb:max-w-[32px] opacity-0 group-hover/fb:opacity-100 transition-all duration-300 overflow-hidden items-center justify-center shrink-0 pr-1">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </a>

        {/* Instagram Tab - Opens Instagram directly on click */}
        <a
          href={BRAND_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-600 hover:bg-pink-700 text-white shadow-xl hover:shadow-2xl rounded-r-xl md:rounded-r-2xl border-y border-r border-white/40 overflow-hidden transition-all duration-300 ease-out flex items-center p-1.5 md:p-2 group/insta"
          title="Visit @mousahi.bakes on Instagram"
        >
          {/* Instagram Icon Badge */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover/insta:rotate-12 transition-transform duration-300 shadow-inner">
            <Instagram className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </a>

        {/* WhatsApp Order Tab */}
        <a
          href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=Hi%20Mousahi%20Bakery,%20I%20want%20to%20place%20an%20order!`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl rounded-r-xl md:rounded-r-2xl border-y border-r border-white/40 overflow-hidden transition-all duration-300 ease-out flex items-center p-1.5 md:p-2 group/wa"
          title={`Chat on WhatsApp +91 ${BRAND_INFO.phone}`}
        >
          {/* WhatsApp Icon Badge */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover/wa:scale-110 transition-transform duration-300 shadow-inner">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-white text-emerald-600" />
          </div>
        </a>
      </aside>
    </>
  );
}
