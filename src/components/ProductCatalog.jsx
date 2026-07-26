import React, { useState } from 'react';
import { COOKIE_DATA } from '../data/cookies';
import { ShoppingBag, Star, Info, Heart, Minus, Plus, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ProductCatalog({ onAddToCart }) {
  const cookie = COOKIE_DATA[0]; // Flagship product
  const [selectedWeight, setSelectedWeight] = useState('100g');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(null);

  const currentPrice = cookie.prices[selectedWeight];

  const handleAddToCart = () => {
    onAddToCart({
      cookieId: cookie.id,
      name: cookie.name,
      image: cookie.image,
      weight: selectedWeight,
      quantity,
      unitPrice: currentPrice,
      totalPrice: currentPrice * quantity
    });

    setAddedToast(`${cookie.name} (${selectedWeight} × ${quantity}) added to cart! 🍪`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <section id="product" className="py-16 bg-[#FFFBF5] relative border-b border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Toast Notification */}
        {addedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-amber-950 text-amber-50 px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-3 animate-bounce">
            <span className="text-xl">✨</span>
            <span className="font-heading font-bold text-sm">{addedToast}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Official Sample Product Pack</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-950">
            {cookie.name}
          </h2>
          <p className="text-base text-amber-900/80">
            Wholesome • Nutritious • Delicious | Handcrafted with Ragi, Oats, Ghee & Jaggery
          </p>
        </div>

        {/* Single Flagship Product Order Showcase Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden border border-amber-200/90 shadow-bakery grid md:grid-cols-12 gap-0">
          
          {/* Left Column: Product Image & Badges */}
          <div className="md:col-span-6 relative bg-amber-50 min-h-[360px]">
            <img
              src={cookie.image}
              alt={cookie.name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute top-4 left-4 bg-amber-950/85 backdrop-blur-md text-amber-100 text-xs font-heading font-bold px-3.5 py-1 rounded-full border border-amber-700/50">
              {cookie.badge}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-amber-200 shadow-md">
              <div className="flex items-center justify-between text-xs text-amber-950 font-bold">
                <span>Net Quantity: 100g</span>
                <span className="text-emerald-700 font-extrabold text-sm">MRP ₹130/-</span>
              </div>
              <p className="text-[10px] text-amber-700 font-medium mt-0.5">
                (Incl. of all taxes) • Stand-Up Kraft Pouch & Glass Jar
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Weight Selection & WhatsApp Order Details */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-amber-500 text-xs font-bold mb-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-amber-950">{cookie.rating}</span>
                  <span className="text-amber-600">({cookie.reviewsCount} reviews)</span>
                </div>

                <h3 className="font-heading font-bold text-2xl text-amber-950">
                  {cookie.name}
                </h3>
                <p className="text-xs text-amber-900/80 leading-relaxed mt-2">
                  {cookie.description}
                </p>
              </div>

              {/* Ingredients Badges */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-950 block">Key Ingredients:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cookie.ingredients.map((ing, i) => (
                    <span key={i} className="bg-amber-50 text-amber-900 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-amber-200">
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weight Selector */}
              <div className="space-y-2 pt-2 border-t border-amber-100">
                <div className="flex justify-between items-center text-xs font-bold text-amber-950">
                  <span>Select Sample Pack Size:</span>
                  <span className="text-xl font-heading font-extrabold text-amber-800">₹{currentPrice * quantity}</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { w: '100g', label: 'Sample', p: 130 },
                    { w: '250g', label: 'Pack', p: 310 },
                    { w: '500g', label: 'Family', p: 600 },
                    { w: '1kg', label: 'Bulk Box', p: 1150 }
                  ].map((item) => (
                    <button
                      key={item.w}
                      onClick={() => setSelectedWeight(item.w)}
                      className={`py-2 px-1.5 rounded-xl text-center transition-all border ${
                        selectedWeight === item.w
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-amber-50/60 text-amber-950 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      <span className="block font-heading font-bold text-xs">{item.w}</span>
                      <span className="block text-[10px] font-semibold opacity-90">₹{item.p}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Modifier & Order Action */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-amber-100/80 rounded-xl p-1 border border-amber-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-amber-950 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-heading font-bold text-sm text-amber-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-amber-950 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-800 hover:from-amber-700 hover:to-emerald-900 text-white font-heading font-bold text-xs py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Sample to Order (₹{currentPrice * quantity})</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
