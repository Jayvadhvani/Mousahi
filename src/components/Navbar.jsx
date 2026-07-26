import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';

export default function Navbar({ cartCount, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFBF5]/98 backdrop-blur-md border-b border-amber-200/80 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-800 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Freshly Baked Ragi Oats Chocolate Cookies | Sweetened with 100% Organic Jaggery 🚚</span>
        <a 
          href={`https://wa.me/${BRAND_INFO.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold hover:text-amber-200 hidden sm:inline ml-2"
        >
          WhatsApp Order: +91 {BRAND_INFO.phone}
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-4">
        {/* Brand Logo Text */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-700 to-emerald-800 text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            🍪
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-950 tracking-tight leading-none">
                Mousahi
              </span>
              <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full border border-pink-200">
                Home Bakery
              </span>
            </div>
            <span className="text-xs font-bold text-amber-800 italic tracking-wide mt-0.5">
              the smell of baking
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-amber-950 uppercase tracking-wider">
          <a href="#product" className="hover:text-amber-700 transition-colors py-1">Order Sample Product</a>
          <a href="#details" className="hover:text-amber-700 transition-colors py-1">Ingredients & Specs</a>
          <a href="#posts" className="hover:text-amber-700 transition-colors py-1">Brand Showcase</a>
          <a href="#reviews" className="hover:text-amber-700 transition-colors py-1">Customer Reviews</a>
          <a href="#story" className="hover:text-amber-700 transition-colors py-1">Our Story</a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Quick WhatsApp Order Button */}
          <a
            href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=Hi%20Mousahi%20Bakery,%20I%20want%20to%20order%20the%20Ragi%20Oats%20Chocolate%20Cookies%20sample!`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-102"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>WhatsApp Order</span>
          </a>

          {/* Cart Toggle Button */}
          <button
            onClick={onOpenCart}
            className="relative bg-amber-600 hover:bg-amber-700 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full flex items-center gap-2 font-bold text-xs shadow-md transition-all hover:scale-102"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order Cart</span>
            {cartCount > 0 && (
              <span className="bg-pink-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-amber-900 hover:bg-amber-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-amber-50/98 border-b border-amber-200 px-4 py-4 space-y-3 font-semibold text-amber-950 animate-fade-in">
          <a 
            href="#product" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-100"
          >
            🍪 Order Ragi Oats Chocolate Cookies (₹130)
          </a>
          <a 
            href="#details" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-100"
          >
            🌾 Ingredients & Specs
          </a>
          <a 
            href="#posts" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-100"
          >
            📸 Official Brand Posts
          </a>
          <a 
            href="#reviews" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-100"
          >
            ⭐ Customer Reviews
          </a>
          
          <div className="pt-2 border-t border-amber-200">
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white font-semibold text-center py-2.5 rounded-full flex items-center justify-center gap-2 text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct (+91 {BRAND_INFO.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
