import React from 'react';
import { ArrowLeft, Sparkles, Heart, Flame, ShieldCheck, Leaf, Coffee, Smile } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';

export default function AboutUsPage({ onBack }) {
  return (
    <div className="py-12 bg-[#FFFBF5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-600 font-bold text-xs uppercase tracking-wider group transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Bakery Catalog</span>
        </button>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#3D2314] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Mousahi Story</span>
            </div>
            
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-amber-100 tracking-tight leading-tight">
              Mousahi — <span className="text-amber-400">The Smell of Baking</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
              Mousahi was born in a cozy home kitchen out of a simple mother's desire: to give kids delicious, crunchy cookies without filling their bodies with white sugar, palm oil, or artificial preservatives.
            </p>
            
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
              We hand-pick nutrient-dense millets like Ragi, Rolled Oats, and Jowar, combine them with pure organic Jaggery and Desi Ghee, and bake small batches only when an order is received. When you open a pack of Mousahi, you smell the comforting, authentic aroma of home baking.
            </p>
          </div>

          <div className="lg:col-span-5 relative z-10 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border-4 border-amber-800 shadow-2xl">
              <img
                src="./images/mousahi_hero.jpg"
                alt="Artisan Home Baking"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-6">
                <p className="text-xs text-amber-200 italic font-bold">
                  "Every cookie carries the warmth and care of home baking."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Box 1: 100% Organic Jaggery */}
          <div className="bg-white p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 border border-amber-100 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-amber-950">100% Organic Jaggery</h3>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
              We stay clear of refined white sugar. All our cookies are sweetened naturally with organic, iron-rich jaggery, preventing sudden sugar spikes and providing long-lasting energy.
            </p>
          </div>

          {/* Box 2: Baked Fresh on Order */}
          <div className="bg-white p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-800 border border-orange-100 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-amber-950">Baked Fresh on Order</h3>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
              We do not stock cookies on shelves or mass-produce them. Every cookie is baked in micro-batches in our home kitchen only after you place your order, delivering unmatched freshness.
            </p>
          </div>

          {/* Box 3: Certified Safety & Care */}
          <div className="bg-white p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-amber-950">Clean Kitchen Standards</h3>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
              Our kitchen adheres to strict hygiene standards. We ensure sanitization at every step, from dough kneading to airtight food-grade sealing, guaranteeing safety and premium quality.
            </p>
          </div>
        </div>

        {/* Sub-Philosophy Section */}
        <div className="bg-amber-50/40 rounded-3xl border border-amber-200/80 p-8 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-950">
              Why We Bake Differently
            </h2>
            <p className="text-xs text-amber-850 font-medium">
              A quick comparison of standard commercial cookies versus our healthy artisan batches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-amber-200/60 space-y-3">
              <h4 className="font-heading font-bold text-sm text-amber-950 flex items-center gap-2">
                <Smile className="w-5 h-5 text-emerald-600" />
                Mousahi Homemade Cookies
              </h4>
              <ul className="space-y-2 text-xs text-amber-900/80 font-medium">
                <li className="flex items-center gap-2">🟢 Sweetened with 100% Organic Jaggery</li>
                <li className="flex items-center gap-2">🟢 Bound using pure Desi Ghee & Premium Butter</li>
                <li className="flex items-center gap-2">🟢 Micro-batched only when ordered</li>
                <li className="flex items-center gap-2">🟢 Rich in millet dietary fiber (Ragi, Oats, Jowar)</li>
                <li className="flex items-center gap-2">🟢 Zero refined Maida, zero palm oil</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200/60 space-y-3 opacity-80">
              <h4 className="font-heading font-bold text-sm text-amber-950 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-600" />
                Commercial Bakery Cookies
              </h4>
              <ul className="space-y-2 text-xs text-amber-900/60 font-medium">
                <li className="flex items-center gap-2">🔴 Loaded with refined white sugar & corn syrup</li>
                <li className="flex items-center gap-2">🔴 Bound using hydrogenated fat, palm oil & lard</li>
                <li className="flex items-center gap-2">🔴 Mass-produced months ago and kept on shelves</li>
                <li className="flex items-center gap-2">🔴 Low fiber content, made mostly of plain refined flour</li>
                <li className="flex items-center gap-2">🔴 Packaged with synthetic preservatives</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
