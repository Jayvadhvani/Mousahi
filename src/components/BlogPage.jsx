import React from 'react';
import { ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import BrandShowcasePosts from './BrandShowcasePosts';

export default function BlogPage({ onBack }) {
  return (
    <div className="py-12 bg-[#FFFBF5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-600 font-bold text-xs uppercase tracking-wider group transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Blog Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Mousahi Baking Blog</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-amber-950 tracking-tight">
            Kitchen Insights & Recipes
          </h1>
          <p className="text-sm sm:text-base text-amber-900/80 font-medium">
            Learn about millet nutrition, baking temperatures, and behind-the-scenes stories of our small artisan batches.
          </p>
        </div>

        {/* Embedded baking timeline details */}
        <div className="bg-white rounded-3xl border border-amber-200/70 overflow-hidden shadow-sm">
          <BrandShowcasePosts />
        </div>

      </div>
    </div>
  );
}
