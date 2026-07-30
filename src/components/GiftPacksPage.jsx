import React, { useState } from 'react';
import { Gift, ArrowLeft, Heart, MessageCircle, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { BRAND_INFO, COOKIE_DATA } from '../data/cookies';

export default function GiftPacksPage({ onBack, onAddToCart }) {
  const [occasion, setOccasion] = useState('Birthday');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [senderName, setSenderName] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [selectedCookies, setSelectedCookies] = useState({}); // { productId: qty }
  const [boxSize, setBoxSize] = useState('Medium (3 Packs)'); // Small, Medium, Large

  const handleQtyChange = (productId, delta) => {
    setSelectedCookies(prev => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  // Calculate pricing
  const basePrice = boxSize.startsWith('Small') ? 100 : boxSize.startsWith('Medium') ? 150 : 220; // box pricing
  let itemsPrice = 0;
  Object.entries(selectedCookies).forEach(([id, qty]) => {
    const cookie = COOKIE_DATA.find(c => c.id === id);
    if (cookie) {
      itemsPrice += (cookie.prices['250g'] || 310) * qty; // standard weight for gifting
    }
  });
  const totalPrice = basePrice + itemsPrice;

  const handleWhatsAppGiftOrder = (e) => {
    e.preventDefault();
    if (!recipientName || !recipientAddress || !senderName) {
      alert('Please fill out Recipient details and Sender name.');
      return;
    }

    let msg = `🎁 *NEW MOUSAHI GIFT BOX INQUIRY*\n`;
    msg += `-----------------------------------\n`;
    msg += `💝 *Occasion:* ${occasion}\n`;
    msg += `📦 *Box Size:* ${boxSize}\n`;
    msg += `👤 *Sender:* ${senderName}\n`;
    msg += `👤 *Recipient:* ${recipientName} (Phone: ${recipientPhone || 'N/A'})\n`;
    msg += `📍 *Delivery Address:* ${recipientAddress}\n`;
    if (giftNote) {
      msg += `📝 *Gift Card Message:* "${giftNote}"\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `🍪 *GIFT ITEMS INCLUDED:*\n`;

    let hasItems = false;
    Object.entries(selectedCookies).forEach(([id, qty]) => {
      if (qty > 0) {
        const cookie = COOKIE_DATA.find(c => c.id === id);
        if (cookie) {
          msg += `- ${cookie.name} (250g) × ${qty}\n`;
          hasItems = true;
        }
      }
    });

    if (!hasItems) {
      msg += `- Custom Baker's Choice Assortment\n`;
    }

    msg += `-----------------------------------\n`;
    msg += `💰 *Estimated Total:* ₹${totalPrice}\n`;
    msg += `-----------------------------------\n`;
    msg += `✨ *Sweetened with 100% Organic Jaggery | Baked Fresh with Love*`;

    const encodedText = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-12 bg-[#FFFBF5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-600 font-bold text-xs uppercase tracking-wider group transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Bakery Catalog</span>
        </button>

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-xs font-bold px-4 py-1.5 rounded-full border border-pink-200">
            <Gift className="w-3.5 h-3.5 text-pink-700" />
            <span>Mousahi Gifting Suite</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-amber-950 tracking-tight">
            Send Love & Cookies
          </h1>
          <p className="text-sm sm:text-base text-amber-900/80 font-medium">
            Configure a beautiful, handcrafted cookie gift box for birthdays, anniversaries, or to surprise your loved ones. Baked fresh and shipped warm.
          </p>
        </div>

        {/* main container */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Placeholder (No image files included as requested) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl overflow-hidden border border-amber-200/90 shadow-sm relative group">
              <img
                src="./images/gift_pack.png"
                alt="Mousahi Gift Box Package"
                className="w-full h-auto object-cover rounded-3xl min-h-[350px] sm:min-h-[450px]"
              />
            </div>

            {/* Gifting details info box */}
            <div className="bg-white p-6 rounded-3xl border border-amber-200/90 shadow-sm space-y-4">
              <h4 className="font-heading font-bold text-sm text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                What's included in the box?
              </h4>
              <ul className="space-y-2 text-xs text-amber-900/80 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Handcrafted Premium Gifting Box (sweetened with organic Jaggery)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Personalized Handwritten Greeting Card with your message</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Eco-friendly protective packing, ensuring crisp cookies on arrival</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Custom Gifting form */}
          <form onSubmit={handleWhatsAppGiftOrder} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-bakery space-y-6">
            
            {/* Occasion & Box Sizing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-amber-950 block mb-1">Occasion / Theme</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 bg-white font-semibold text-amber-950 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                >
                  <option value="Birthday">🎂 Birthday</option>
                  <option value="Anniversary">💖 Anniversary</option>
                  <option value="Festive / Celebration">🌸 Festive / Celebration</option>
                  <option value="Get Well Soon">🍀 Get Well Soon</option>
                  <option value="Just to Say Thanks">💐 Just to Say Thanks</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-amber-950 block mb-1">Box Size Preference</label>
                <select
                  value={boxSize}
                  onChange={(e) => setBoxSize(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 bg-white font-semibold text-amber-950 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                >
                  <option value="Small (2 Packs)">Small (2 Packs) (+₹100)</option>
                  <option value="Medium (3 Packs)">Medium (3 Packs) (+₹150)</option>
                  <option value="Large (5 Packs)">Large (5 Packs) (+₹220)</option>
                </select>
              </div>
            </div>

            {/* Cookies Picker */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-950 block border-b border-amber-100 pb-1">
                Select Cookies to Add (250g Gift packs):
              </span>
              
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {COOKIE_DATA.map((cookie) => (
                  <div key={cookie.id} className="flex items-center justify-between gap-4 p-2 bg-amber-50/40 rounded-2xl border border-amber-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-amber-200 bg-white">
                        <img src={cookie.image} alt={cookie.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-amber-950">{cookie.name}</span>
                        <span className="block text-[10px] text-amber-600">₹{cookie.prices['250g'] || 310} per 250g Pack</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-amber-200">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(cookie.id, -1)}
                        className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-950"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-amber-950">
                        {selectedCookies[cookie.id] || 0}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(cookie.id, 1)}
                        className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-950"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-950 block border-b border-amber-100 pb-1">
                Recipient Details (Gifting To):
              </span>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-amber-800 block mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Priyanshu Vats"
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-amber-800 block mb-1">Recipient Phone</label>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-amber-800 block mb-1">Recipient Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Street, flat/house details, Landmark, Pincode"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* Sender & Gift Note */}
            <div className="space-y-3 pt-2 border-t border-amber-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-amber-950 block mb-1">Your Name (Sender) *</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Shweta Sharma"
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-amber-950 block mb-1">Personal Message / Gift Note</label>
                  <input
                    type="text"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="e.g. Happy Birthday, have a great day!"
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Bottom pricing section & CTA */}
            <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100/60 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="block text-[10px] text-pink-800 font-bold uppercase tracking-wider">Estimated Total</span>
                <span className="text-2xl font-heading font-extrabold text-amber-950">₹{totalPrice}</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white font-heading font-bold text-xs py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102"
              >
                <MessageCircle className="w-4 h-4 fill-white text-pink-600" />
                <span>Confirm Gift Details on WhatsApp</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
