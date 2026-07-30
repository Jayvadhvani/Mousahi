import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ArrowLeft, Tag, Sparkles, MessageCircle, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}) {
  const [step, setStep] = useState(1); // 1 = Cart Items, 2 = Checkout Form, 3 = Success Page
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout Form States
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI / Online Transfer');
  const [bakingNote, setBakingNote] = useState('');
  const [orderId, setOrderId] = useState('');
  const [generatedMsg, setGeneratedMsg] = useState('');

  // Reset drawer state when closed/opened
  React.useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotalWithoutDelivery = Math.max(0, subtotal - discountAmount);
  const freeDeliveryThreshold = 600;
  const isFreeDelivery = finalTotalWithoutDelivery >= freeDeliveryThreshold;
  const deliveryCharge = isFreeDelivery ? 0 : 40;
  const finalTotal = finalTotalWithoutDelivery + deliveryCharge;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - finalTotalWithoutDelivery);

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

  const handleProceedToForm = () => {
    setStep(2);
  };

  const generateWhatsAppMessage = (currentOrderId) => {
    let msg = `🍪 *NEW MOUSAHI COOKIE ORDER* #${currentOrderId}\n`;
    msg += `-----------------------------------\n`;
    msg += `👤 *Customer Name:* ${customerName}\n`;
    msg += `📞 *Phone:* ${customerPhone}\n`;
    msg += `📍 *Delivery Address:* ${customerAddress} (PIN: ${customerPincode})\n`;
    msg += `💳 *Payment Preference:* ${paymentMethod}\n`;
    if (bakingNote) {
      msg += `📝 *Baking Note:* ${bakingNote}\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `📦 *ORDER ITEMS SUMMARY:*\n`;

    cartItems.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}*\n`;
      msg += `   └ Pack: ${item.weight} | Qty: ${item.quantity} | Price: ₹${item.totalPrice}\n`;
    });

    msg += `-----------------------------------\n`;
    msg += `💰 *Subtotal:* ₹${subtotal}\n`;
    if (discountAmount > 0) {
      msg += `🏷️ *Bakery Discount:* -₹${discountAmount}\n`;
    }
    msg += `🚚 *Total Order Amount:* ₹${finalTotal}\n`;
    msg += `-----------------------------------\n`;
    msg += `✨ *Sweetened with 100% Organic Jaggery | Freshly Baked by Mousahi*`;

    return msg;
  };

  const handleWhatsAppCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress || !customerPincode) return;

    const newOrderId = `MSH-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newOrderId);
    const textMessage = generateWhatsAppMessage(newOrderId);
    setGeneratedMsg(textMessage);

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodedText}`;

    // Redirect directly (safer and standard browser behavior)
    window.location.href = whatsappUrl;

    // Move to step 3 (Success confirmation state)
    setStep(3);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="bg-[#FFFBF5] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-amber-200 relative">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#3D2314] text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-heading font-bold text-lg">
              {step === 1 ? 'Your Cookie Order' : step === 2 ? 'Delivery Details' : 'Order Placed!'}
            </h3>
            {step === 1 && (
              <span className="bg-white text-amber-950 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CART ITEMS VIEW */}
        {step === 1 && (
          <>
            {/* Free Delivery Bar */}
            <div className="bg-amber-100/90 px-5 py-2.5 border-b border-amber-200 text-[11px] sm:text-xs text-amber-950 flex items-center justify-between shrink-0">
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
                <div className="text-center py-20 space-y-4">
                  <div className="text-6xl animate-bounce">🍪</div>
                  <h4 className="font-heading font-bold text-lg text-amber-950">Your Cart is Empty</h4>
                  <p className="text-xs text-amber-850 max-w-xs mx-auto">Add fresh Oats, Ragi, Nankhatai & Millet cookies to start your order!</p>
                  <button
                    onClick={onClose}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md transition-colors"
                  >
                    Browse Cookies Catalog
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={`${item.cookieId}-${item.weight}-${idx}`}
                    className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-sm flex items-center gap-4 animate-fade-in"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-amber-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-bold text-amber-950 text-sm truncate">{item.name}</h4>
                      <div className="text-xs text-amber-700 font-medium">
                        Pack: <span className="font-bold text-amber-900">{item.weight}</span>
                      </div>

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
                      className="text-amber-400 hover:text-rose-600 p-1 shrink-0 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-5 bg-white border-t border-amber-200 space-y-4 shadow-lg shrink-0">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (Try MOUSAHI10)"
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-amber-200 uppercase font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-amber-850 hover:bg-amber-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
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
                    <span>{deliveryCharge === 0 ? 'FREE 🚚' : `₹${deliveryCharge}`}</span>
                  </div>
                  <div className="flex justify-between items-center text-base font-heading font-extrabold text-amber-950 pt-2 border-t border-amber-100">
                    <span>Total Amount:</span>
                    <span className="text-xl text-amber-750">₹{finalTotal}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProceedToForm}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm py-3.5 px-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Proceed to Delivery Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: DELIVERY DETAILS FORM (Unified inside drawer to prevent popups) */}
        {step === 2 && (
          <form onSubmit={handleWhatsAppCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Form Fields Scroll Container */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-600 font-bold uppercase tracking-wider mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Cart Items</span>
              </button>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900/90 leading-relaxed font-semibold">
                📝 Enter your delivery address. Clicking order confirms and dispatches your order instantly to Mousahi WhatsApp.
              </div>

              <div>
                <label className="text-[11px] font-bold text-amber-950 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-amber-950 block mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-amber-950 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={customerPincode}
                    onChange={(e) => setCustomerPincode(e.target.value)}
                    placeholder="e.g. 122001"
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-amber-950 block mb-1">Detailed Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="House/Flat No., Building Name, Street Landmark"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-amber-950 block mb-1">Payment Type</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 bg-white font-bold text-amber-950"
                  >
                    <option value="UPI / Online Transfer">UPI / GPay / Paytm</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-amber-950 block mb-1">Special Baking Note</label>
                  <input
                    type="text"
                    value={bakingNote}
                    onChange={(e) => setBakingNote(e.target.value)}
                    placeholder="e.g. Pack extra fresh"
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Form Footer Action */}
            <div className="p-5 bg-white border-t border-amber-200 space-y-3 shadow-lg shrink-0">
              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-950">
                <span>Estimated Total:</span>
                <span className="text-base text-emerald-700">₹{finalTotal}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-101 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Confirm Order on WhatsApp 📱</span>
              </button>
            </div>

          </form>
        )}

        {/* STEP 3: ORDER SUCCESS PAGE (Inline inside drawer) */}
        {step === 3 && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-center flex flex-col justify-center items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl animate-bounce">
              <ClipboardCheck className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/50 px-4 py-1.5 rounded-full border border-emerald-200">
                Order #{orderId} Created!
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-amber-950 pt-2">
                WhatsApp Dispatch Successful!
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed max-w-xs mx-auto">
                WhatsApp has been opened with your order text. If the chat did not open automatically, copy the text details below to send it manually:
              </p>
            </div>

            {/* Message display block */}
            <div className="w-full bg-amber-50 p-4 rounded-2xl border border-amber-200 text-left text-[11px] font-mono text-amber-950 max-h-40 overflow-y-auto shadow-inner">
              <pre className="whitespace-pre-wrap font-sans">{generatedMsg}</pre>
            </div>

            <div className="w-full space-y-3.5 pt-2">
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(generatedMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Open WhatsApp Direct</span>
              </a>

              <button
                onClick={() => {
                  setStep(1);
                  onClose();
                }}
                className="text-xs text-amber-700 underline font-bold hover:text-amber-950 block mx-auto"
              >
                Continue Shopping
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-amber-600/90 font-bold border-t border-amber-100 pt-4 w-full">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% secure order confirmation</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
