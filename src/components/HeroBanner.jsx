import React from 'react';
import { Sparkles, ShieldCheck, Heart, Leaf, ArrowRight, Star, MessageCircle, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO, COOKIE_DATA } from '../data/cookies';

export default function HeroBanner({ onExploreMenu }) {
  const sampleCookie = COOKIE_DATA[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5E6] via-[#FFF9F0] to-[#FFFBF5] pt-8 pb-16 lg:py-16 border-b border-amber-200/40">
      {/* Background Ornaments */}
      <div className="absolute top-10 left-[5%] text-6xl opacity-10 pointer-events-none animate-float">🍪</div>
      <div className="absolute bottom-12 right-[8%] text-7xl opacity-10 pointer-events-none animate-float" style={{ animationDelay: '2s' }}>🌾</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Story & Main Headline */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
              <div className="inline-flex items-center gap-2 bg-amber-200/80 border border-amber-300/80 text-amber-950 px-3.5 py-1 rounded-full text-xs font-semibold shadow-sm my-auto">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Fresh Batch Sample Product</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="text-emerald-800 font-bold">100g Pouch / Jar @ ₹130</span>
              </div>
            </div>

            {/* Main Brand Title & Tagline */}
            <div className="space-y-2">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-amber-950 leading-[1.15] tracking-tight">
                Ragi Oats Chocolate Cookies
              </h1>
              <p className="font-heading font-semibold text-lg sm:text-xl text-amber-800 tracking-wide flex items-center justify-center lg:justify-start gap-2">
                <span>Wholesome • Nutritious • Delicious</span>
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-amber-900/85 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Handcrafted artisan cookies baked fresh on order using <strong className="text-amber-950 font-semibold">Ragi Flour, Oats Flour, Desi Ghee, Organic Jaggery, Cocoa Powder, and a pinch of Salt</strong>. Goodness for you, made with love!
            </p>

            {/* 4 Core Highlights from Official Poster */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-white/95 p-3 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800 mb-1.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-[11px] text-amber-950 uppercase tracking-wide">NATURAL INGREDIENTS</span>
                <span className="text-[10px] text-amber-700 font-medium">Ragi, Oats & Ghee</span>
              </div>

              <div className="bg-white/95 p-3 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-800 mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-[11px] text-amber-950 uppercase tracking-wide">NO PRESERVATIVES</span>
                <span className="text-[10px] text-amber-700 font-medium">100% Pure & Fresh</span>
              </div>

              <div className="bg-white/95 p-3 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-orange-100/80 flex items-center justify-center text-amber-800 mb-1.5">
                  <span className="text-sm">🍯</span>
                </div>
                <span className="font-heading font-bold text-[11px] text-amber-950 uppercase tracking-wide">SWEETENED WITH JAGGERY</span>
                <span className="text-[10px] text-amber-700 font-medium">Zero White Sugar</span>
              </div>

              <div className="bg-white/95 p-3 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-pink-100/80 flex items-center justify-center text-amber-800 mb-1.5">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <span className="font-heading font-bold text-[11px] text-amber-950 uppercase tracking-wide">GOODNESS MADE WITH LOVE</span>
                <span className="text-[10px] text-amber-700 font-medium">Baked Fresh to order</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-heading font-bold text-sm px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=Hi%20Mousahi%20Bakery,%20I%20want%20to%20place%20an%20order%20for%20the%20Ragi%20Oats%20Chocolate%20Cookies%20sample!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-semibold text-sm px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>WhatsApp (+91 90234 66648)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Single Flagship Product Poster Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              
              {/* Product Poster Card */}
              <div className="relative bg-white p-3 rounded-3xl shadow-xl border border-amber-200/80 overflow-hidden group">
                <img
                  src="./images/ragi_choco_chip.jpg"
                  alt="Ragi Oats Chocolate Cookies Sample Pack"
                  className="w-full h-[360px] sm:h-[420px] object-cover rounded-2xl group-hover:scale-103 transition-transform duration-700"
                />

                <div className="absolute top-5 left-5 bg-amber-800 text-white text-xs font-heading font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>MRP ₹130 | Net Qty 100g</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-200 shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-amber-950 text-base">Ragi Oats Chocolate Cookies</h4>
                      <p className="text-xs text-emerald-700 font-medium">Paper Stand-up Pouch & Glass Jar Pack</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg shrink-0">
                      ₹130
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-amber-900 border-t border-amber-100 pt-2 font-medium">
                    <span>MFG Batch Freshly Baked</span>
                    <span>Best Before: 45 Days</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
