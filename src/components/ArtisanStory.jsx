import React from 'react';
import { Heart, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';

export default function ArtisanStory() {
  return (
    <section id="story" className="py-16 bg-[#FFFBF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-brown-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisan Home Bakery</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-100 leading-tight">
              Mousahi — <span className="text-amber-400">The Smell of Baking</span>
            </h2>

            <p className="text-sm sm:text-base text-amber-200/90 leading-relaxed">
              Mousahi was born in a cozy home kitchen out of a simple mother's desire: to give kids delicious, crunchy cookies without filling their bodies with white sugar, palm oil, or artificial preservatives.
            </p>

            <p className="text-sm sm:text-base text-amber-200/90 leading-relaxed">
              We hand-pick <strong className="text-amber-400">Ragi, Rolled Oats, and Whole Wheat</strong>, combine them with pure <strong className="text-amber-400">Organic Jaggery</strong>, and bake small batches only when an order is received. When you open a tin of Mousahi, you smell real home baking.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800/80 flex items-center justify-center text-amber-300">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-amber-100">Baked on Order</h4>
                  <p className="text-[11px] text-amber-300">Never pre-stored</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800/80 flex items-center justify-center text-amber-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-amber-100">Hygiene Certified</h4>
                  <p className="text-[11px] text-amber-300">Sanitized kitchen</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative z-10 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border-4 border-amber-800/60 shadow-2xl">
              <img
                src="/images/mousahi_hero.jpg"
                alt="Artisan Home Baking"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-xs text-amber-200 italic font-medium">
                  "Every cookie carries the warmth and care of home baking."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
