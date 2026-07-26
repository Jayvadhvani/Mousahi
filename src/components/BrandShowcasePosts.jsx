import React from 'react';
import { Sparkles, Heart, CheckCircle2, ShieldCheck, Leaf } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';

export default function BrandShowcasePosts() {
  const posts = [
    {
      id: 1,
      title: 'Ragi Oats Chocolate Cookies',
      badge: 'Official Sample Pack 📦',
      image: './images/ragi_choco_chip.jpg',
      mrp: '₹130/-',
      netQty: '100 g',
      shelfLife: '45 Days From Manufacturing',
      ingredients: 'Ragi Flour, Oats Flour, Ghee, Jaggery, Cocoa Powder, Salt',
      highlights: ['Made with Natural Ingredients', 'No Preservatives Added', 'Wholesome & Nutritious', 'Perfect for Healthy Lifestyle']
    },
    {
      id: 2,
      title: 'Wholesome Oats — Goodness in Every Bite',
      badge: '100% Natural 🌾',
      image: './images/oatmeal_jaggery.jpg',
      subtitle: 'Healthy. Delicious. Homemade.',
      caption: 'Wholesome oats, real ingredients and a whole lot of care.',
      highlights: ['Wholesome Oats', 'Real Ingredients', 'No Artificial Flavors', 'Made for You']
    },
    {
      id: 3,
      title: 'Homemade & Fresh Batch Baking',
      badge: 'Baked Fresh on Order ♨️',
      image: './images/mousahi_hero.jpg',
      subtitle: 'Freshly baked with love, especially for your order.',
      caption: 'NOT STORED. NOT MASS PRODUCED. JUST MADE FRESH – FOR YOU.',
      highlights: ['Homemade with Care', 'Fresh Ingredients', 'Baked Fresh Every Day', 'Made for You']
    }
  ];

  return (
    <section id="posts" className="py-16 bg-gradient-to-b from-[#FFFBF5] via-[#FFF5E6] to-[#FFFBF5] relative border-b border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Official Brand Showcase</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-950">
            Mousahi Official Sample & Baking Posts
          </h2>
          <p className="text-base text-amber-900/80">
            Exact brand specifications, ingredient transparency, and fresh batch baking standards for your customer samples.
          </p>
        </div>

        {/* 3 Perfect Brand Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-amber-200/90 shadow-bakery hover:shadow-bakery-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Poster Image Frame */}
                <div className="relative h-64 overflow-hidden bg-amber-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-amber-950/85 backdrop-blur-md text-amber-100 text-[11px] font-heading font-bold px-3 py-1 rounded-full border border-amber-700/50">
                    {post.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-heading font-bold text-xl text-amber-950">
                    {post.title}
                  </h3>

                  {post.subtitle && (
                    <p className="text-xs font-semibold text-emerald-800">
                      {post.subtitle}
                    </p>
                  )}

                  {post.mrp && (
                    <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs space-y-1">
                      <div className="flex justify-between font-bold text-amber-950">
                        <span>Net Quantity: {post.netQty}</span>
                        <span className="text-emerald-700 font-extrabold text-sm">MRP {post.mrp}</span>
                      </div>
                      <p className="text-[10px] text-amber-800 font-medium">
                        Best Before: {post.shelfLife}
                      </p>
                    </div>
                  )}

                  {/* Highlight Checkmarks */}
                  <div className="space-y-1.5 pt-1">
                    {post.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-amber-900 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=Hi%20Mousahi,%20I%20want%20to%20order%20the%20${encodeURIComponent(post.title)}!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-heading font-bold text-xs py-2.5 rounded-xl border border-amber-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>WhatsApp Sample Inquiry</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
