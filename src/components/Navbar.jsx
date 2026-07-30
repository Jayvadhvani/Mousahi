import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Sparkles, Gift } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFBF5]/98 backdrop-blur-md border-b border-amber-200/80 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-[#3D2314] text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Freshly Baked Oats & Millet Cookies | Sweetened with 100% Organic Jaggery 🚚</span>
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
        {/* Brand Logo Image */}
        <Link to="/" className="flex items-center group shrink-0">
          <img 
            src="./images/logo.png" 
            alt="Mousahi Logo" 
            className="h-14 w-auto object-contain transition-transform group-hover:scale-103" 
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-8 text-[11px] font-bold text-amber-950 uppercase tracking-widest">
          <Link to="/" className="hover:text-amber-700 transition-colors py-1 whitespace-nowrap">Home</Link>
          <Link to="/about-us" className="hover:text-amber-700 transition-colors py-1 whitespace-nowrap">About Us</Link>
          <Link to="/products" className="hover:text-amber-700 transition-colors py-1 whitespace-nowrap">Products</Link>
          <Link to="/blog" className="hover:text-amber-700 transition-colors py-1 whitespace-nowrap">Blog</Link>
          <Link to="/gifts" className="hover:text-amber-700 transition-colors py-1 whitespace-nowrap flex items-center gap-1"><Gift className="w-3.5 h-3.5 text-pink-600" /><span>Gift Packs</span></Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">

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
            className="xl:hidden p-2 rounded-xl text-amber-900 hover:bg-amber-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-amber-50/98 border-b border-amber-200 px-4 py-4 space-y-3 font-semibold text-amber-950 animate-fade-in">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-100"
          >
            🏠 Home
          </Link>
          <Link 
            to="/about-us" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-100"
          >
            🌾 About Us
          </Link>
          <Link 
            to="/products" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-100"
          >
            🍪 Products Catalog
          </Link>
          <Link 
            to="/blog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-100"
          >
            📸 Blog & Baking
          </Link>
          <Link 
            to="/gifts" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-amber-100 flex items-center gap-2"
          >
            🎁 Gift Packs
          </Link>
          
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
