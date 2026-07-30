import React, { useState } from 'react';
import { Heart, MessageCircle, Instagram, Facebook, ArrowUp, Send, Sparkles, Clock } from 'lucide-react';
import { BRAND_INFO } from '../data/cookies';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-amber-950 text-amber-100 relative overflow-hidden border-t-4 border-amber-500 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src="/images/logo.png" 
                alt="Mousahi Logo" 
                className="h-12 w-auto object-contain brightness-0 invert" 
              />
            </div>

            <p className="text-xs text-amber-200/80 leading-relaxed">
              Artisan Home Bakery crafting wholesome Ragi Oats Chocolate Cookies. 100% Sweetened with organic jaggery. Zero refined white sugar or artificial preservatives!
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-sm"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              </a>

              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-500 text-white flex items-center justify-center transition-colors shadow-sm"
                title="Instagram @mou_sahi"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={BRAND_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-sm"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-amber-300">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-amber-200">
              <li><Link to="/products" className="hover:text-amber-400 transition-colors">🍪 Products Catalog</Link></li>
              <li><Link to="/about-us" className="hover:text-amber-400 transition-colors">🌾 About Mousahi</Link></li>
              <li><Link to="/blog" className="hover:text-amber-400 transition-colors">📸 Blog & Recipes</Link></li>
              <li><Link to="/gifts" className="hover:text-amber-400 transition-colors">🎁 Gift Packs</Link></li>
              <li><Link to="/" className="hover:text-amber-400 transition-colors">🏠 Back to Home</Link></li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-amber-300">Official Brand Contact</h4>
            
            <div className="space-y-2.5 text-xs text-amber-200">
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-amber-100">WhatsApp Direct Order:</span>
                  <a href={`https://wa.me/${BRAND_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 underline">
                    +91 90234 66648
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-amber-100">Instagram Handle:</span>
                  <a href={BRAND_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                    @{BRAND_INFO.instagram}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-amber-100">Fresh Batch Baking:</span>
                  <span>Mon - Sun: 9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fresh Batch Newsletter */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-amber-300">Fresh Batch Alerts</h4>
            <p className="text-xs text-amber-200/80">
              Subscribe to get notified when a fresh batch of jaggery cookies comes out of the oven!
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full text-xs p-3 rounded-xl bg-amber-900/80 border border-amber-700 text-amber-100 placeholder-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Subscribed to fresh batch alerts!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/80">
          <p>© {new Date().getFullYear()} Mousahi | Artisan Home Bakery. Handcrafted with ❤️ for Happy Kids.</p>

          <button
            onClick={scrollToTop}
            className="bg-amber-900 hover:bg-amber-800 text-amber-200 p-2.5 rounded-full border border-amber-700 transition-colors flex items-center gap-1.5 font-bold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
