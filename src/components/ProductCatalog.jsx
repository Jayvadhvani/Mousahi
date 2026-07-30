import React, { useState, useEffect, useRef } from 'react';
import { COOKIE_DATA } from '../data/cookies';
import { Star, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

function ProductCard({ cookie, minPrice, onSelectProduct }) {
  return (
    <div 
      className="group bg-white rounded-3xl border border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
      onClick={() => onSelectProduct(cookie)}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-amber-50">
        <img
          src={cookie.image}
          alt={cookie.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-amber-950/85 backdrop-blur-sm text-amber-100 text-[10px] font-heading font-extrabold px-3 py-1 rounded-full border border-amber-800/40">
          {cookie.badge}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-amber-500 text-xs font-extrabold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-amber-950">{cookie.rating}</span>
            <span className="text-amber-500 font-medium">({cookie.reviewsCount} reviews)</span>
          </div>

          <h3 className="font-heading font-extrabold text-xl text-amber-950 group-hover:text-amber-800 transition-colors">
            {cookie.name}
          </h3>

          <p className="text-xs text-amber-800 italic font-bold">
            {cookie.subtitle}
          </p>

          <p className="text-xs text-amber-900/75 leading-relaxed font-medium line-clamp-3">
            {cookie.description}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="pt-4 border-t border-amber-100/80 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] text-amber-600 font-bold uppercase tracking-wider">Starts at</span>
            <span className="text-lg font-heading font-extrabold text-amber-950">₹{minPrice}</span>
          </div>

          <span className="bg-amber-50 text-amber-950 group-hover:bg-amber-600 group-hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-amber-200 group-hover:border-amber-600">
            <span>Order Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function CarouselWrapper({ onSelectProduct }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const autoPlayRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = COOKIE_DATA.length;
  const maxIndex = totalItems - itemsToShow;

  // Make sure current index adjusts when itemsToShow changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsToShow, maxIndex, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    const interval = setInterval(play, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group px-4 sm:px-8">
      {/* Left Navigation Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-amber-200 text-amber-950 flex items-center justify-center shadow-md hover:bg-amber-50 transition-colors hover:scale-105"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Outer Slider Box */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {COOKIE_DATA.map((cookie) => {
            const minPrice = Math.min(...Object.values(cookie.prices));
            return (
              <div 
                key={cookie.id} 
                className="shrink-0 p-3"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <ProductCard 
                  cookie={cookie} 
                  minPrice={minPrice} 
                  onSelectProduct={onSelectProduct} 
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Navigation Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-amber-200 text-amber-950 flex items-center justify-center shadow-md hover:bg-amber-50 transition-colors hover:scale-105"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'bg-amber-700 w-8' : 'bg-amber-300/80 hover:bg-amber-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductCatalog({ onSelectProduct, isNested = false }) {
  return (
    <div className={isNested ? "" : "py-20 bg-[#FFFBF5] relative border-b border-amber-200/40"} id={isNested ? undefined : "catalog"}>
      <div className={isNested ? "space-y-12" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16"}>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-100/70 text-amber-950 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Artisan Bakery Selection</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-amber-950 tracking-tight">
            Freshly Baked Healthy Cookies
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80 max-w-2xl mx-auto font-medium">
            Discover our premium cookies made with organic jaggery, millet flours, and zero artificial preservatives. Handcrafted fresh on every single order.
          </p>
        </div>

        {/* Product Cards Grid / Carousel */}
        {!isNested ? (
          <CarouselWrapper onSelectProduct={onSelectProduct} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {COOKIE_DATA.map((cookie) => {
              const minPrice = Math.min(...Object.values(cookie.prices));
              return (
                <ProductCard 
                  key={cookie.id} 
                  cookie={cookie} 
                  minPrice={minPrice} 
                  onSelectProduct={onSelectProduct} 
                />
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
