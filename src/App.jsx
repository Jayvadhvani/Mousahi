import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import StickyInstagramSidebar from './components/StickyInstagramSidebar';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailPage from './components/ProductDetailPage';
import GiftPacksPage from './components/GiftPacksPage';
import AboutUsPage from './components/AboutUsPage';
import BrandShowcasePosts from './components/BrandShowcasePosts';
import IngredientSpotlight from './components/IngredientSpotlight';
import CustomerReviews from './components/CustomerReviews';
import ArtisanStory from './components/ArtisanStory';
import FAQSection from './components/FAQSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';
import BlogPage from './components/BlogPage';
import { COOKIE_DATA } from './data/cookies';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Wrapper to parse product ID parameter
function ProductDetailWrapper({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = COOKIE_DATA.find(p => p.id === id);

  if (!product) {
    return (
      <div className="py-20 text-center text-amber-950 font-bold min-h-screen">
        <p className="text-xl">Product not found</p>
        <button 
          onClick={() => navigate('/products')}
          className="mt-4 bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-amber-700"
        >
          View All Products
        </button>
      </div>
    );
  }

  return (
    <ProductDetailPage
      product={product}
      onBack={() => navigate('/products')}
      onAddToCart={onAddToCart}
      onSelectProduct={(p) => navigate(`/product/${p.id}`)}
    />
  );
}

export default function App() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mousahi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#3D2314] flex flex-col font-body selection:bg-amber-500 selection:text-white">
      <ScrollToTop />
      
      {/* Sticky Instagram Sidebar */}
      <StickyInstagramSidebar />

      {/* Top Navbar */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections with Routes */}
      <main className="flex-1">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              <HeroBanner onExploreMenu={() => navigate('/products')} />
              <ProductCatalog onSelectProduct={(product) => navigate(`/product/${product.id}`)} />
              <BrandShowcasePosts />
              <IngredientSpotlight />
              <CustomerReviews />
              <ArtisanStory />
              <FAQSection />
            </>
          } />

          {/* About Us Route */}
          <Route path="/about-us" element={
            <AboutUsPage onBack={() => navigate('/')} />
          } />

          {/* Products Catalog Route */}
          <Route path="/products" element={
            <ProductsPage 
              onBack={() => navigate('/')} 
              onSelectProduct={(product) => navigate(`/product/${product.id}`)} 
            />
          } />

          {/* Blog Route */}
          <Route path="/blog" element={
            <BlogPage onBack={() => navigate('/')} />
          } />

          {/* Gift Packs Route */}
          <Route path="/gifts" element={
            <GiftPacksPage 
              onBack={() => navigate('/')} 
              onAddToCart={handleAddToCart} 
            />
          } />

          {/* Product Detail Route */}
          <Route path="/product/:id" element={
            <ProductDetailWrapper onAddToCart={handleAddToCart} />
          } />
        </Routes>
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
