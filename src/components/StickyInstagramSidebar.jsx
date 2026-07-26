import React from 'react';
import { Instagram, MessageCircle, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';

export default function StickyInstagramSidebar() {
  return (
    <>
      {/* Sticky Left Social & Order Bar */}
      <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2.5">
        {/* Instagram Tab - Opens Instagram directly on click */}
        <a
          href={BRAND_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-xl hover:shadow-2xl rounded-r-2xl border-y border-r border-white/40 overflow-hidden transition-all duration-300 ease-out flex items-center p-2 group/insta"
          title="Visit @mou_sahi on Instagram"
        >
          {/* Instagram Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover/insta:rotate-12 transition-transform duration-300 shadow-inner">
            <Instagram className="w-6 h-6" />
          </div>

          {/* Expanded Info on Hover */}
          <div className="max-w-0 group-hover/insta:max-w-[220px] opacity-0 group-hover/insta:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden flex flex-col justify-center pl-0 group-hover/insta:pl-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-200 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Instagram Official</span>
            </div>
            <span className="font-heading font-extrabold text-base text-white tracking-tight leading-tight flex items-center gap-1">
              @{BRAND_INFO.instagram}
              <ExternalLink className="w-3.5 h-3.5 text-pink-200" />
            </span>
            <span className="text-[10px] text-pink-100 font-medium">Click to open Instagram profile</span>
          </div>

          {/* Hover Arrow Indicator */}
          <div className="max-w-0 group-hover/insta:max-w-[32px] opacity-0 group-hover/insta:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-center shrink-0 pr-1">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </a>

        {/* WhatsApp Order Tab */}
        <a
          href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=Hi%20Mousahi%20Bakery,%20I%20want%20to%20place%20an%20order!`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl hover:shadow-2xl rounded-r-2xl border-y border-r border-white/40 overflow-hidden transition-all duration-300 ease-out flex items-center p-2 group/wa"
          title={`Chat on WhatsApp +91 ${BRAND_INFO.phone}`}
        >
          {/* WhatsApp Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover/wa:scale-110 transition-transform duration-300 shadow-inner">
            <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
          </div>

          {/* Expanded Info on Hover */}
          <div className="max-w-0 group-hover/wa:max-w-[220px] opacity-0 group-hover/wa:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden flex flex-col justify-center pl-0 group-hover/wa:pl-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-200 uppercase tracking-wider">
              <span>Fast Order</span>
            </div>
            <span className="font-heading font-extrabold text-base text-white tracking-tight leading-tight flex items-center gap-1">
              WhatsApp Order
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
            </span>
            <span className="text-[10px] text-emerald-100 font-medium">+91 {BRAND_INFO.phone}</span>
          </div>

          {/* Hover Arrow Indicator */}
          <div className="max-w-0 group-hover/wa:max-w-[32px] opacity-0 group-hover/wa:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-center shrink-0 pr-1">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </a>
      </aside>

      {/* Mobile Floating Buttons */}
      <div className="md:hidden fixed bottom-6 left-4 z-40 flex flex-col gap-2">
        <a
          href={BRAND_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white px-3.5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold border border-white/40"
        >
          <Instagram className="w-4.5 h-4.5" />
          <span>@{BRAND_INFO.instagram}</span>
        </a>
        <a
          href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=Hi%20Mousahi%20Bakery,%20I%20want%20to%20place%20an%20order!`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 text-white px-3.5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold border border-white/40"
        >
          <MessageCircle className="w-4.5 h-4.5 fill-white text-emerald-600" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
