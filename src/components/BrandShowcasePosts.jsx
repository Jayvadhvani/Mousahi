import React from 'react';
import { Sparkles, ChefHat, Flame, ShieldCheck, Heart, Leaf } from 'lucide-react';

export default function BrandShowcasePosts() {
  const steps = [
    {
      id: '01',
      title: 'Curating Organic Ingredients',
      description: 'We hand-select nutrient-dense millet flours (Ragi, Oats, Jowar), sweetened 100% with organic Jaggery, and bound together using pure Desi Ghee. Zero refined sugar, zero preservatives, and zero artificial colors.',
      icon: Leaf,
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    },
    {
      id: '02',
      title: 'Small-Batch Hand Kneading',
      description: 'Our cookie dough is prepared in micro-batches to guarantee consistent flavor and texture. We take our time kneading the wholesome ingredients to lock in the absolute goodness of home-style baking.',
      icon: ChefHat,
      bg: 'bg-amber-50 text-amber-800 border-amber-100',
    },
    {
      id: '03',
      title: 'Artisanal Shaping & Garnishing',
      description: 'Each cookie is weighed individually and rolled by hand. Before going in, we garnish them generously with raw almonds, cashews, pumpkin seeds, or raisins, making every single bite unique.',
      icon: Heart,
      bg: 'bg-rose-50 text-rose-800 border-rose-100',
    },
    {
      id: '04',
      title: 'Slow Baking to Golden Perfection',
      description: 'We slow-bake the batches at optimal temperatures in our clean home kitchen. As they bake, they release the comforting, rich "smell of baking" that defines our brand.',
      icon: Flame,
      bg: 'bg-orange-50 text-orange-800 border-orange-100',
    },
    {
      id: '05',
      title: 'Fresh Packaging & Fast Shipping',
      description: 'Immediately after cooling, we pack the cookies in airtight, food-grade Kraft stand-up pouches to lock in maximum freshness and crispiness, giving them a shelf life of 45 days without preservatives.',
      icon: ShieldCheck,
      bg: 'bg-blue-50 text-blue-800 border-blue-100',
    }
  ];

  return (
    <section id="posts" className="py-20 bg-gradient-to-b from-[#FFFBF5] via-[#FFF9F0] to-[#FFFBF5] relative border-b border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-100/70 text-amber-950 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
            <span>Artisanal Baking Process</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-amber-950 tracking-tight">
            How Our Cookies Are Made
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80 max-w-2xl mx-auto font-medium">
            At Mousahi, we do not store, mass-produce, or use preservatives. Here is a transparent look at our step-by-step baking journey.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.slice(0, 3).map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id} 
                className="bg-white p-8 rounded-3xl border border-amber-200/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div className="space-y-6">
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-heading font-extrabold text-amber-900/30">
                      {step.id}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.bg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="space-y-2.5">
                    <h3 className="font-heading font-bold text-xl text-amber-950 group-hover:text-amber-800 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Last two steps spanning full width in larger screens, centered */}
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-4xl lg:mx-auto w-full">
            {steps.slice(3, 5).map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.id} 
                  className="bg-white p-8 rounded-3xl border border-amber-200/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-default"
                >
                  <div className="space-y-6">
                    {/* Top Bar inside card */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-heading font-extrabold text-amber-900/30">
                        {step.id}
                      </span>
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.bg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-2.5">
                      <h3 className="font-heading font-bold text-xl text-amber-950 group-hover:text-amber-800 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
