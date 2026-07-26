import React from 'react';
import { Leaf, Heart, Check, X, ShieldAlert, Sparkles, Award } from 'lucide-react';

export default function IngredientSpotlight() {
  const ingredients = [
    {
      icon: '🌾',
      name: 'Finger Millet (Ragi)',
      benefit: 'Super rich in natural calcium & iron. Essential for growing kid bones & active stamina.',
      badge: 'Supergrain'
    },
    {
      icon: '🥣',
      name: 'Whole Rolled Oats',
      benefit: 'High dietary soluble fiber for smooth digestion and long-lasting kid energy.',
      badge: 'High Fiber'
    },
    {
      icon: '🌾',
      name: 'Stone-Ground Whole Wheat',
      benefit: 'Unrefined nutrient-packed whole wheat flour without bleached maida or starch.',
      badge: '100% Whole Wheat'
    },
    {
      icon: '🍯',
      name: '100% Organic Jaggery',
      benefit: 'Rich in iron and minerals. Sweetened naturally without a single grain of white sugar.',
      badge: '0% Refined Sugar'
    }
  ];

  const comparison = [
    { feature: 'Sweetener Used', mousahi: '100% Organic Jaggery 🍯', market: 'Refined White Sugar / High Fructose Syrup ❌' },
    { feature: 'Primary Flour', mousahi: 'Ragi, Oats & Whole Wheat 🌾', market: 'Refined Maida / Bleached Flour ❌' },
    { feature: 'Preservatives & Additives', mousahi: 'ZERO Preservatives (Baked Fresh) ✅', market: 'Chemical Preservatives & Artificial Colors ❌' },
    { feature: 'Oil & Fats', mousahi: 'Pure Desi Ghee & Grass-fed Butter 🧈', market: 'Hydrogenated Palm Oil & Trans Fats ❌' },
    { feature: 'Kids Digestibility', mousahi: 'Super Gentle & Mineral Rich ❤️', market: 'Causes Sugar Spikes & Heavy Bloating ❌' }
  ];

  return (
    <section id="ingredients" className="py-16 bg-[#FFFBF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Pure & Transparent Ingredients</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-950">
            What Makes Mousahi Cookies So Healthy?
          </h2>
          <p className="text-base text-amber-900/80">
            We believe kids deserve real food. Every cookie is handcrafted using ancient Indian supergrains and unrefined sweeteners.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((ing, i) => (
            <div 
              key={i}
              className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-bakery hover:shadow-bakery-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100/80 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {ing.icon}
                </div>
                <span className="inline-block text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                  {ing.badge}
                </span>
                <h3 className="font-heading font-bold text-xl text-amber-950">
                  {ing.name}
                </h3>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  {ing.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-bakery space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">Honest Comparison</span>
            <h3 className="font-heading font-bold text-2xl text-amber-950">Mousahi vs Commercial Store Biscuits</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-amber-200 text-amber-950 font-heading text-sm">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 bg-amber-100/80 rounded-t-xl text-amber-950 font-bold">Mousahi Artisan Cookies 🍪</th>
                  <th className="py-3 px-4 text-gray-500">Commercial Market Biscuits ❌</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/50">
                    <td className="py-3.5 px-4 font-bold text-amber-950">{row.feature}</td>
                    <td className="py-3.5 px-4 bg-amber-50/60 font-semibold text-emerald-700">{row.mousahi}</td>
                    <td className="py-3.5 px-4 text-rose-700/80">{row.market}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
