import React, { useState } from 'react';
import { Gift, Plus, Minus, Sparkles, ShoppingBag, Heart, CheckCircle2 } from 'lucide-react';
import { COOKIE_DATA } from '../data/cookies';

export default function CustomBoxBuilder({ onAddToCart }) {
  const [boxSize, setBoxSize] = useState(12); // 6, 12, or 24 cookies
  const [boxFlavors, setBoxFlavors] = useState({
    'ragi-choco-chip': 4,
    'oatmeal-jaggery-raisin': 4,
    'kids-party-mini-pack': 4
  });
  const [giftNote, setGiftNote] = useState('');

  const totalSelected = Object.values(boxFlavors).reduce((a, b) => a + b, 0);

  const updateFlavorCount = (id, delta) => {
    const current = boxFlavors[id] || 0;
    if (delta > 0 && totalSelected >= boxSize) return; // limit
    const next = Math.max(0, current + delta);
    setBoxFlavors(prev => ({ ...prev, [id]: next }));
  };

  const getBoxPrice = () => {
    if (boxSize === 6) return 320;
    if (boxSize === 12) return 590;
    if (boxSize === 24) return 1080;
    return 590;
  };

  const handleAddBoxToCart = () => {
    if (totalSelected === 0) return;

    const flavorSummary = Object.entries(boxFlavors)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = COOKIE_DATA.find(c => c.id === id);
        return `${item ? item.name : id}: ${qty} pcs`;
      })
      .join(', ');

    onAddToCart({
      cookieId: `custom-box-${boxSize}`,
      name: `🎁 Custom Assorted Cookie Box (${boxSize} Pcs)`,
      image: './images/kids_party_pack.jpg',
      weight: `${boxSize} Pcs Box`,
      quantity: 1,
      unitPrice: getBoxPrice(),
      totalPrice: getBoxPrice(),
      customNote: giftNote,
      details: flavorSummary
    });
  };

  return (
    <section id="custom-box" className="py-16 bg-gradient-to-b from-[#FFFBF5] via-[#FFF5E6] to-[#FFFBF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-xs font-bold px-3.5 py-1.5 rounded-full">
            <Gift className="w-4 h-4 text-pink-600" />
            <span>Assorted Party & Gift Box</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-950">
            Build Your Own Cookie Assortment Box
          </h2>
          <p className="text-base text-amber-900/80">
            Mix and match your favorite healthy jaggery cookies into a gorgeous handcrafted tin box. Ideal for kid birthdays, family teatime, or gifting!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Flavor Selector */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-bakery space-y-6">
            
            {/* Step 1: Choose Box Size */}
            <div>
              <label className="font-heading font-bold text-amber-950 text-sm flex items-center justify-between mb-3">
                <span>Step 1: Choose Box Size</span>
                <span className="text-xs text-amber-700 font-medium">Capacity: {totalSelected} / {boxSize} Pcs</span>
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: 6, label: 'Small Box', price: '₹320' },
                  { size: 12, label: 'Family Box', price: '₹590', popular: true },
                  { size: 24, label: 'Party Tin', price: '₹1,080' }
                ].map((b) => (
                  <button
                    key={b.size}
                    onClick={() => setBoxSize(b.size)}
                    className={`p-3.5 rounded-2xl border text-center transition-all relative ${
                      boxSize === b.size
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-md scale-102'
                        : 'bg-amber-50/50 text-amber-900 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    {b.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                        POPULAR
                      </span>
                    )}
                    <span className="block font-heading font-bold text-base">{b.size} Pcs</span>
                    <span className="block text-xs font-semibold opacity-90">{b.label}</span>
                    <span className="block text-xs font-bold mt-1">{b.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Mix & Match Flavors */}
            <div className="space-y-3 pt-2">
              <label className="font-heading font-bold text-amber-950 text-sm">
                Step 2: Choose Cookie Flavors
              </label>

              <div className="space-y-3">
                {COOKIE_DATA.map((cookie) => {
                  const count = boxFlavors[cookie.id] || 0;

                  return (
                    <div
                      key={cookie.id}
                      className="p-3.5 rounded-2xl border border-amber-200/80 bg-amber-50/40 flex items-center justify-between gap-3 hover:border-amber-400 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={cookie.image}
                          alt={cookie.name}
                          className="w-12 h-12 rounded-xl object-cover border border-white shadow-sm"
                        />
                        <div>
                          <h4 className="font-heading font-bold text-amber-950 text-sm">{cookie.name}</h4>
                          <span className="text-[11px] text-amber-700">{cookie.category} • Sweetened with Jaggery</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateFlavorCount(cookie.id, -1)}
                          disabled={count === 0}
                          className="w-7 h-7 rounded-lg bg-white border border-amber-200 text-amber-900 flex items-center justify-center disabled:opacity-40 font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-heading font-bold text-sm text-amber-950">{count}</span>
                        <button
                          onClick={() => updateFlavorCount(cookie.id, 1)}
                          disabled={totalSelected >= boxSize}
                          className="w-7 h-7 rounded-lg bg-white border border-amber-200 text-amber-900 flex items-center justify-center disabled:opacity-40 font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Optional Gift Message */}
            <div className="pt-2">
              <label className="font-heading font-bold text-amber-950 text-xs mb-1.5 block">
                Gift Message / Custom Baking Note (Optional):
              </label>
              <input
                type="text"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="e.g. Happy 5th Birthday Aarav! ❤️ From Mousahi Bakery"
                className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
              />
            </div>

          </div>

          {/* Right Column: Live Box Summary */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-900 via-amber-950 to-brown-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Assorted Gift Summary</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-amber-100 mt-2">
                Your Custom Box
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-amber-200 font-medium">
                <span>Box Capacity</span>
                <span>{totalSelected} / {boxSize} Pcs</span>
              </div>
              <div className="w-full h-3 bg-amber-950 rounded-full overflow-hidden p-0.5 border border-amber-800/60">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totalSelected / boxSize) * 100)}%` }}
                />
              </div>
              {totalSelected < boxSize && (
                <p className="text-[11px] text-pink-300 italic font-medium">
                  Add {boxSize - totalSelected} more cookies to complete your box!
                </p>
              )}
            </div>

            {/* Flavor list */}
            <div className="bg-amber-900/40 p-4 rounded-2xl border border-amber-800/50 space-y-2 text-xs">
              {Object.entries(boxFlavors).filter(([_, qty]) => qty > 0).map(([id, qty]) => {
                const item = COOKIE_DATA.find(c => c.id === id);
                return (
                  <div key={id} className="flex justify-between items-center text-amber-200">
                    <span>{item ? item.name : id}</span>
                    <span className="font-bold text-amber-400">{qty} Pcs</span>
                  </div>
                );
              })}
              {totalSelected === 0 && (
                <p className="text-amber-400/80 italic text-center py-2">No cookies selected yet</p>
              )}
            </div>

            {/* Pricing & Add Button */}
            <div className="space-y-3 pt-4 border-t border-amber-800/60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-amber-300">Total Box Price:</span>
                <span className="font-heading font-extrabold text-3xl text-amber-400">₹{getBoxPrice()}</span>
              </div>

              <button
                onClick={handleAddBoxToCart}
                disabled={totalSelected === 0}
                className="w-full bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 disabled:opacity-50 text-white font-heading font-bold text-sm py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add Custom Box to Order</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
