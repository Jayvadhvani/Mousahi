import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StickyInstagramSidebar from './components/StickyInstagramSidebar';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import BrandShowcasePosts from './components/BrandShowcasePosts';
import IngredientSpotlight from './components/IngredientSpotlight';
import CustomerReviews from './components/CustomerReviews';
import ArtisanStory from './components/ArtisanStory';
import FAQSection from './components/FAQSection';
import CartDrawer from './components/CartDrawer';
import WhatsAppCheckoutModal from './components/WhatsAppCheckoutModal';
import Footer from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mousahi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotals, setCheckoutTotals] = useState({ subtotal: 0, discountAmount: 0, finalTotal: 0 });

  useEffect(() => {
    try {
      localStorage.setItem('mousahi_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const handleAddToCart = (newItem) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.cookieId === newItem.cookieId && item.weight === newItem.weight);
      if (existingIdx > -1) {
        const updated = [...prev];
        const existing = updated[existingIdx];
        const newQty = existing.quantity + newItem.quantity;
        updated[existingIdx] = {
          ...existing,
          quantity: newQty,
          totalPrice: existing.unitPrice * newQty
        };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQty = (index, delta) => {
    setCartItems(prev => {
      const updated = [...prev];
      const target = updated[index];
      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index] = {
        ...target,
        quantity: newQty,
        totalPrice: target.unitPrice * newQty
      };
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = (totals) => {
    setCheckoutTotals(totals);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#3D2314] flex flex-col font-body selection:bg-amber-500 selection:text-white">
      {/* Sticky Instagram Sidebar */}
      <StickyInstagramSidebar />

      {/* Top Navbar */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroBanner onExploreMenu={() => {}} />

        <ProductCatalog onAddToCart={handleAddToCart} />

        <BrandShowcasePosts />

        <IngredientSpotlight />

        <CustomerReviews />

        <ArtisanStory />

        <FAQSection />
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* WhatsApp Checkout & Order Dispatch Modal */}
      <WhatsAppCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totals={checkoutTotals}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
