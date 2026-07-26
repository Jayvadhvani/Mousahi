import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, Heart, X, Send } from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviews';

export default function CustomerReviews() {
  const [reviewsList, setReviewsList] = useState(REVIEWS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Happy Parent',
    rating: 5,
    comment: '',
    location: ''
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const created = {
      id: Date.now(),
      name: newReview.name,
      role: newReview.role || 'Verified Buyer',
      rating: Number(newReview.rating),
      date: 'Just now',
      comment: newReview.comment,
      verified: true,
      avatar: '🍪',
      location: newReview.location || 'India'
    };

    setReviewsList([created, ...reviewsList]);
    setIsModalOpen(false);
    setNewReview({ name: '', role: 'Happy Parent', rating: 5, comment: '', location: '' });
  };

  return (
    <section id="reviews" className="py-16 bg-gradient-to-b from-[#FFFBF5] via-[#FFF5E6] to-[#FFFBF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3.5 py-1.5 rounded-full">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-amber-950">
              Loved by Kids & Approved by Moms
            </h2>
            <p className="text-sm text-amber-900/80 max-w-xl">
              See what parents, pediatricians, and food lovers are saying about Mousahi freshly baked jaggery cookies!
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-heading font-bold text-xs py-3 px-5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Customer Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-amber-200/80 shadow-bakery flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner">
                      {rev.avatar}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-amber-950 text-base flex items-center gap-1.5">
                        {rev.name}
                        {rev.verified && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" title="Verified Order" />
                        )}
                      </h4>
                      <p className="text-xs text-amber-700 font-medium">{rev.role} • {rev.location}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-amber-500 font-medium">{rev.date}</span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-700">
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Purchase
                </span>
                <span>Sweetened with 100% Jaggery</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-100 relative animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-amber-100">
              <h3 className="font-heading font-bold text-xl text-amber-950">Share Your Experience</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-bold text-amber-950 block mb-1">Your Full Name:</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Anjali Sharma"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-amber-950 block mb-1">Role / Tag:</label>
                  <input
                    type="text"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    placeholder="e.g. Mom of 2"
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-amber-950 block mb-1">City / Location:</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    placeholder="e.g. Gurugram"
                    className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-950 block mb-1">Star Rating:</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-bold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5) - Outstanding</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5) - Very Good</option>
                  <option value={3}>⭐⭐⭐ (3/5) - Average</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-950 block mb-1">Your Review Comment:</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="How did you and your kids like Mousahi's fresh jaggery cookies?"
                  className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-heading font-bold text-xs py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
