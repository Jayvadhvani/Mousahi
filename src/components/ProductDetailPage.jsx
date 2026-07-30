import React, { useState } from 'react';
import { ShoppingBag, Star, Heart, ArrowLeft, ShieldCheck, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { BRAND_INFO, COOKIE_DATA } from '../data/cookies';

export default function ProductDetailPage({ product, onBack, onAddToCart, onSelectProduct }) {
  const [selectedWeight, setSelectedWeight] = useState('100g');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  React.useEffect(() => {
    setActiveImageIdx(0);
  }, [product.id]);

  if (!product) return null;

  const currentPrice = product.prices[selectedWeight] || 130;

  const handleAddToCart = () => {
    onAddToCart({
      cookieId: product.id,
      name: product.name,
      image: product.image,
      weight: selectedWeight,
      quantity,
      unitPrice: currentPrice,
      totalPrice: currentPrice * quantity
    });

    setAddedToast(`${product.name} (${selectedWeight} × ${quantity}) added to cart! 🍪`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <div className="py-10 bg-[#FFFBF5] min-h-screen">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-950 text-amber-50 px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-3 animate-bounce">
          <span className="text-xl">✨</span>
          <span className="font-heading font-bold text-sm">{addedToast}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back navigation bar */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-600 font-bold text-xs uppercase tracking-wider group transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Bakery Catalog</span>
        </button>

        {/* Detailed Product Showcase Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-amber-200/90 shadow-bakery grid md:grid-cols-12 gap-0">
          {/* Left Side: Product Images Gallery (Vertical), Badges & Catalog Switcher */}
          <div className="md:col-span-6 flex flex-col bg-amber-50/15 border-r border-amber-100">
            <div className="flex flex-col-reverse sm:flex-row flex-1 min-h-[400px]">
              
              {/* Same-Product Thumbnail Column (Amazon-style) */}
              <div className="w-full sm:w-20 flex flex-row sm:flex-col gap-3 p-3 bg-amber-50/40 border-t sm:border-t-0 sm:border-r border-amber-100/70 items-center justify-center sm:justify-start overflow-x-auto sm:overflow-y-auto shrink-0 select-none">
                {product.images?.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all hover:scale-102 flex-shrink-0 ${
                      activeImageIdx === idx
                        ? 'border-amber-700 shadow-sm ring-2 ring-amber-700/10'
                        : 'border-amber-200 hover:border-amber-400 bg-white'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image Display */}
              <div className="relative flex-1 bg-white">
                <img
                  src={product.images?.[activeImageIdx] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover aspect-square md:aspect-auto md:h-[500px]"
                />
                <div className="absolute top-4 left-4 bg-amber-950/85 backdrop-blur-md text-amber-100 text-xs font-heading font-bold px-3.5 py-1.5 rounded-full border border-amber-700/50">
                  {product.badge}
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-200 shadow-md">
                  <div className="flex items-center justify-between text-xs text-amber-950 font-bold">
                    <span>Authentic Artisan Batch</span>
                    <span className="text-emerald-700 font-extrabold text-sm">MRP ₹{currentPrice}/-</span>
                  </div>
                  <p className="text-[10px] text-amber-700 font-medium mt-1">
                    (Incl. of all taxes) • Sealed Kraft Stand-Up Pouch
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Details & Actions */}
          <div className="md:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 text-amber-500 text-xs font-bold mb-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-amber-950">{product.rating}</span>
                  <span className="text-amber-600">({product.reviewsCount} reviews)</span>
                </div>

                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-950 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xs text-amber-600 font-semibold tracking-wider uppercase mt-1">
                  {product.category}
                </p>
              </div>

              {/* Description */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/50">
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Ingredients Badges */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Key Ingredients & Goodness:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="bg-amber-100/50 text-amber-950 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-amber-200/60"
                    >
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weight Selector */}
              <div className="space-y-3 pt-3 border-t border-amber-100">
                <div className="flex justify-between items-center text-xs font-bold text-amber-950">
                  <span>Select Packaging Size:</span>
                  <span className="text-2xl font-heading font-extrabold text-amber-800">
                    ₹{currentPrice * quantity}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {Object.entries(product.prices).map(([weight, price]) => (
                    <button
                      key={weight}
                      type="button"
                      onClick={() => setSelectedWeight(weight)}
                      className={`py-3 px-2 rounded-2xl text-center transition-all border ${
                        selectedWeight === weight
                          ? 'bg-amber-700 text-white border-amber-700 shadow-md font-bold'
                          : 'bg-amber-50/40 text-amber-950 border-amber-200/70 hover:bg-amber-100 hover:border-amber-300'
                      }`}
                    >
                      <span className="block font-heading text-xs font-extrabold">{weight}</span>
                      <span className="block text-[10px] opacity-90 mt-0.5">₹{price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nutrition & Specs Grid */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-amber-100 text-xs">
                <div className="bg-amber-50/30 p-3 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-950 block mb-1">Nutrition Details</span>
                  <ul className="space-y-0.5 text-amber-900/80 font-medium">
                    <li>⚡ {product.nutrition.calories}</li>
                    <li>💪 Protein: {product.nutrition.protein}</li>
                    <li>🥛 Calcium: {product.nutrition.calcium}</li>
                    <li>🌾 Fiber: {product.nutrition.fiber}</li>
                  </ul>
                </div>
                <div className="bg-amber-50/30 p-3 rounded-xl border border-amber-100">
                  <span className="font-bold text-amber-950 block mb-1">Allergen & Storage</span>
                  <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">
                    ⚠️ {product.allergenInfo}
                  </p>
                  <p className="text-[10px] text-amber-600/90 leading-tight mt-1 font-semibold">
                    📦 {product.storageInstructions}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Modifier & Order Action */}
            <div className="space-y-3 pt-4 border-t border-amber-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-amber-100/80 rounded-2xl p-1 border border-amber-200">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-950 font-bold hover:bg-amber-50 active:scale-95 transition-all"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-heading font-extrabold text-sm text-amber-950">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-950 font-bold hover:bg-amber-50 active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#3D2314] hover:bg-[#2A180E] text-white font-heading font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Order (₹{currentPrice * quantity})</span>
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-[11px] text-amber-700 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>100% Secure WhatsApp Checkout • Freshly baked after order</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Product Description Section */}
        <div className="mt-8 bg-white text-amber-950 rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-amber-100 pb-3">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-amber-950">
              Detailed Product Description
            </h3>
          </div>

          {product.longDescription ? (
            <div className="space-y-8 animate-fade-in">
              {/* Main Paragraphs */}
              <div className="space-y-4">
                {product.longDescription.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-amber-900/85 leading-relaxed font-medium">
                    {para}
                  </p>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-amber-100">
                {/* Why You'll Love Them */}
                <div className="space-y-3">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-amber-850 flex items-center gap-1.5">
                    ✨ Why You'll Love Them
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-amber-900/80 font-medium">
                    {product.longDescription.whyLove.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Perfect For */}
                <div className="space-y-3">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-amber-850 flex items-center gap-1.5">
                    🎁 Perfect For
                  </h4>
                  <ul className="grid grid-cols-2 gap-2.5 text-xs text-amber-900/80 font-medium">
                    {product.longDescription.perfectFor.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Specs & Care Highlights Row */}
              <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-amber-100">
                <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-100 space-y-1">
                  <span className="block text-xs font-bold text-amber-800">😋 Taste & Texture</span>
                  <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">{product.longDescription.tasteTexture}</p>
                </div>
                <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-100 space-y-1">
                  <span className="block text-xs font-bold text-amber-800">🌾 Key Ingredients</span>
                  <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">{product.longDescription.ingredientsList}</p>
                </div>
                <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-100 space-y-1">
                  <span className="block text-xs font-bold text-amber-800">📦 Storage & Shelf Life</span>
                  <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">{product.longDescription.storage}</p>
                </div>
              </div>

              {/* Handmade Footer Note */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/60 text-center text-xs text-amber-955 font-bold tracking-wide italic">
                ❤️ {product.longDescription.handmadeCare}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Column 1: Main Story & Ingredients */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="font-heading font-bold text-base text-amber-950">About {product.name}</h4>
                <p className="text-xs sm:text-sm text-amber-900/85 leading-relaxed font-medium">
                  {product.description} Our {product.name} are baked in micro-batches using only pure Desi Ghee and 100% organic Jaggery. We stay clear of refined flour (Maida), white sugar, and artificial stabilizers, ensuring a guilt-free treat for all age groups.
                </p>
                
                <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-100/70 space-y-2">
                  <span className="block text-xs font-bold text-amber-950">Nutritional Benefits:</span>
                  <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
                    Sweetened naturally to prevent blood sugar spikes. High in millet dietary fibers, providing long-lasting energy. Bound with Desi Ghee, which helps in better assimilation of fat-soluble vitamins.
                  </p>
                </div>
              </div>

              {/* Column 2: Placeholder for User's Details */}
              <div className="bg-[#FFFDF9] rounded-2xl border-2 border-dashed border-amber-200 p-6 flex flex-col justify-center text-center space-y-3">
                <div className="text-3xl text-amber-800 animate-pulse">✨</div>
                <h4 className="font-heading font-bold text-sm text-amber-950">Additional Details Spot</h4>
                <p className="text-[11px] text-amber-850/80 leading-relaxed">
                  This section is ready for your customized product descriptions, story elements, allergen specs, or specific features you'd like to list later.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Customers Also Bought Section */}
        <div className="mt-12 bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-amber-950 flex items-center gap-2 mb-6 border-b border-amber-100 pb-3">
            🛒 Customers Also Bought
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {COOKIE_DATA.filter(p => p.id !== product.id).slice(0, 3).map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  onSelectProduct && onSelectProduct(item);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-amber-50/20 rounded-2xl border border-amber-100 p-4 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Product image with Sale badge */}
                  <div className="relative aspect-video sm:aspect-square rounded-xl overflow-hidden bg-white border border-amber-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#84cc16] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      Sale!
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold text-amber-600/80 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="font-heading font-bold text-amber-950 text-sm group-hover:text-amber-700 transition-colors">
                      {item.name}
                    </h4>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price details */}
                <div className="pt-3 border-t border-amber-100/50 mt-3 flex items-center justify-between text-xs font-bold text-amber-950">
                  <span className="text-amber-800">From ₹{item.prices['100g'] || 130}.00</span>
                  <span className="text-[10px] text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                    Popular
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
