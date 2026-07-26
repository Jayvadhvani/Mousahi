import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Tag, Sparkles, MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const freeDeliveryThreshold = 600;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - finalTotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'MOUSAHI10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Fresh Bakery Discount Applied! 🎉');
    } else if (promoCode.trim().toUpperCase() === 'JAGGERY15') {
      setDiscountPercent(15);
      setPromoSuccess('15% Jaggery Special Discount Applied! 🎉');
    } else {
      setPromoError('Invalid promo code. Try MOUSAHI10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="bg-[#FFFBF5] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-amber-200 relative">
        
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-heading font-bold text-lg">Your Cookie Order</h3>
            <span className="bg-white text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-amber-100/90 px-5 py-2.5 border-b border-amber-200 text-xs text-amber-950 flex items-center justify-between">
          {remainingForFreeDelivery > 0 ? (
            <span>Add <strong className="text-pink-600 font-bold">₹{remainingForFreeDelivery}</strong> more for Free Home Delivery! 🚚</span>
          ) : (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked Free Delivery! 🚚
            </span>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="text-6xl animate-bounce">🍪</div>
              <h4 className="font-heading font-bold text-lg text-amber-950">Your Cart is Empty</h4>
              <p className="text-xs text-amber-800">Add fresh Ragi, Oats & Jaggery cookies to start your healthy order!</p>
              <button
                onClick={onClose}
                className="bg-amber-600 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md hover:bg-amber-700"
              >
                Browse Cookies Catalog
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.cookieId}-${item.weight}-${idx}`}
                className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-sm flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-amber-100"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-amber-950 text-sm truncate">{item.name}</h4>
                  <div className="text-xs text-amber-700 font-medium">
                    Pack: <span className="font-bold text-amber-900">{item.weight}</span>
                  </div>

                  {item.details && (
                    <p className="text-[10px] text-amber-600 truncate mt-0.5">{item.details}</p>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty modifier */}
                    <div className="flex items-center bg-amber-50 rounded-lg p-0.5 border border-amber-200">
                      <button
                        onClick={() => onUpdateQty(idx, -1)}
                        className="w-6 h-6 rounded bg-white text-amber-950 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-amber-950">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(idx, 1)}
                        className="w-6 h-6 rounded bg-white text-amber-950 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-heading font-bold text-sm text-amber-800">
                      ₹{item.totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(idx)}
                  className="text-amber-400 hover:text-rose-600 p-1"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-amber-200 space-y-4 shadow-lg">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code (Try MOUSAHI10)"
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-amber-200 uppercase font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Apply
              </button>
            </form>

            {promoError && <p className="text-[11px] text-rose-600 font-semibold">{promoError}</p>}
            {promoSuccess && <p className="text-[11px] text-emerald-600 font-semibold">{promoSuccess}</p>}

            {/* Price Calculations */}
            <div className="space-y-1 text-xs text-amber-900">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-pink-600 font-bold">
                  <span>Bakery Promo Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-amber-700">
                <span>Delivery Charge:</span>
                <span>{remainingForFreeDelivery === 0 ? 'FREE 🚚' : '₹40'}</span>
              </div>
              <div className="flex justify-between items-center text-base font-heading font-extrabold text-amber-950 pt-2 border-t border-amber-100">
                <span>Total Amount:</span>
                <span className="text-xl text-amber-700">₹{finalTotal + (remainingForFreeDelivery === 0 ? 0 : 40)}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout({ subtotal, discountAmount, finalTotal: finalTotal + (remainingForFreeDelivery === 0 ? 0 : 40) })}
              className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-bold text-sm py-3.5 px-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
              <span>Proceed to WhatsApp Order Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
