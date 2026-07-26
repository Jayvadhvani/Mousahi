import React, { useState } from 'react';
import { X, MessageCircle, CheckCircle2, Copy, Sparkles, Truck, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_INFO } from '../data/cookies';

export default function WhatsAppCheckoutModal({
  isOpen,
  onClose,
  cartItems,
  totals,
  onClearCart
}) {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMethod: 'UPI / Online Transfer',
    note: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [generatedMsg, setGeneratedMsg] = useState('');

  if (!isOpen) return null;

  const orderId = `MSH-${Math.floor(1000 + Math.random() * 9000)}`;

  const generateWhatsAppMessage = () => {
    let msg = `🍪 *NEW MOUSAHI COOKIE ORDER* #${orderId}\n`;
    msg += `-----------------------------------\n`;
    msg += `👤 *Customer Name:* ${customer.name}\n`;
    msg += `📞 *Phone:* ${customer.phone}\n`;
    msg += `📍 *Delivery Address:* ${customer.address} (PIN: ${customer.pincode})\n`;
    msg += `💳 *Payment Preference:* ${customer.paymentMethod}\n`;
    if (customer.note) {
      msg += `📝 *Baking Note:* ${customer.note}\n`;
    }
    msg += `-----------------------------------\n`;
    msg += `📦 *ORDER ITEMS SUMMARY:*\n`;

    cartItems.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}*\n`;
      msg += `   └ Pack: ${item.weight} | Qty: ${item.quantity} | Price: ₹${item.totalPrice}\n`;
      if (item.details) {
        msg += `   └ Details: ${item.details}\n`;
      }
    });

    msg += `-----------------------------------\n`;
    msg += `💰 *Subtotal:* ₹${totals.subtotal}\n`;
    if (totals.discountAmount > 0) {
      msg += `🏷️ *Bakery Discount:* -₹${totals.discountAmount}\n`;
    }
    msg += `🚚 *Total Order Amount:* ₹${totals.finalTotal}\n`;
    msg += `-----------------------------------\n`;
    msg += `✨ *Sweetened with 100% Organic Jaggery | Freshly Baked by Mousahi*`;

    return msg;
  };

  const handleWhatsAppDispatch = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) return;

    // Trigger confetti celebration!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    const textMessage = generateWhatsAppMessage();
    setGeneratedMsg(textMessage);
    setOrderPlaced(true);

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodedText}`;

    // Auto open WhatsApp!
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);

    onClearCart();
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMsg);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FFFBF5] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-200 relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
            <div>
              <h3 className="font-heading font-bold text-lg">WhatsApp Order Automation</h3>
              <p className="text-[11px] text-emerald-100 font-medium">Direct connection to Mousahi Home Bakery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!orderPlaced ? (
          /* Step 1: Address & Customer Details Form */
          <form onSubmit={handleWhatsAppDispatch} className="p-6 space-y-4 overflow-y-auto flex-1">
            <div className="bg-amber-100/70 p-3.5 rounded-2xl border border-amber-200/80 text-xs text-amber-950 flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <p>Your order will be formatted and dispatched directly to <strong className="text-amber-900 font-bold">Mousahi WhatsApp (+91 {BRAND_INFO.phone})</strong> for instant fresh baking confirmation!</p>
            </div>

            <div>
              <label className="text-xs font-bold text-amber-950 block mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="e.g. Radhika Sharma"
                className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-amber-950 block mb-1">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-amber-950 block mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  value={customer.pincode}
                  onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                  placeholder="e.g. 122001"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-amber-950 block mb-1">Delivery Address & Landmark *</label>
              <textarea
                required
                rows={2}
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                placeholder="House/Flat No., Building, Street, Landmark"
                className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-amber-950 block mb-1">Payment Method</label>
                <select
                  value={customer.paymentMethod}
                  onChange={(e) => setCustomer({ ...customer, paymentMethod: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 bg-white font-bold text-amber-950"
                >
                  <option value="UPI / Online Transfer">UPI / GPay / Paytm</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-950 block mb-1">Baking / Gift Note</label>
                <input
                  type="text"
                  value={customer.note}
                  onChange={(e) => setCustomer({ ...customer, note: e.target.value })}
                  placeholder="e.g. Bake extra crispy"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* Order Total Preview Box */}
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-950">
                <span>Total Items: {cartItems.length}</span>
                <span className="text-base text-emerald-700">Total Payable: ₹{totals.finalTotal}</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Includes Fresh Baking Guarantee + Pure Jaggery Sweetener 🍯
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-bold text-base py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-102"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Confirm & Place Order on WhatsApp 📱</span>
            </button>
          </form>
        ) : (
          /* Step 2: Order Placed Success View */
          <div className="p-6 space-y-6 text-center overflow-y-auto flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                Order #{orderId} Generated!
              </span>
              <h3 className="font-heading font-bold text-2xl text-amber-950 pt-2">
                Order Sent to WhatsApp! 🍪
              </h3>
              <p className="text-xs text-amber-900/80 max-w-sm mx-auto">
                WhatsApp should have automatically opened on your device. If not, click below to open or copy your order message!
              </p>
            </div>

            {/* Generated Message Box */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-left text-[11px] text-amber-950 font-mono space-y-1.5 max-h-48 overflow-y-auto shadow-inner">
              <pre className="whitespace-pre-wrap font-sans">{generatedMsg}</pre>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(generatedMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-sm py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                <span>Open WhatsApp Chat (+91 {BRAND_INFO.phone})</span>
              </a>

              <button
                onClick={handleCopyMessage}
                className="w-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-heading font-bold text-xs py-3 rounded-xl border border-amber-300 flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4 text-amber-800" />
                <span>{copiedText ? 'Copied to Clipboard! ✓' : 'Copy Order Text Message'}</span>
              </button>

              <button
                onClick={onClose}
                className="text-xs text-amber-700 underline font-semibold hover:text-amber-950 pt-2"
              >
                Back to Mousahi Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
