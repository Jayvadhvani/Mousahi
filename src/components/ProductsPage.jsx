import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProductCatalog from './ProductCatalog';

export default function ProductsPage({ onBack, onSelectProduct }) {
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



        {/* Catalog container */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/70 shadow-sm">
          <ProductCatalog onSelectProduct={onSelectProduct} isNested={true} />
        </div>

      </div>
    </div>
  );
}
