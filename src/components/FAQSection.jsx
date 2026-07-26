import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Are Mousahi cookies 100% free of refined white sugar?',
      a: 'Yes, absolutely! We use 100% pure organic Jaggery (Gur) and dark palm jaggery in all our cookies. Zero refined white sugar or artificial sweeteners are ever used.'
    },
    {
      q: 'How long do the cookies stay fresh?',
      a: 'Since we use zero chemical preservatives, our cookies stay crisp and delicious for up to 30 days when stored in an airtight container at room temperature.'
    },
    {
      q: 'How does WhatsApp order automation work?',
      a: 'When you select your cookies and click "Confirm Order via WhatsApp", our website automatically compiles your item list, weight options, quantities, and delivery address into a formatted WhatsApp message to +91 9023466648. All you have to do is hit send!'
    },
    {
      q: 'Are these cookies suitable for toddlers and young kids?',
      a: 'Yes! Our cookies are specially formulated with calcium-rich Ragi, high-fiber Oats, and Whole Wheat. They are soft-crunch, easy to chew, and gentle on little tummies.'
    },
    {
      q: 'Can I order a custom box for kid birthday return gifts or events?',
      a: 'Yes! Use our "Custom Box Builder" section on the site or message us directly on WhatsApp (+91 9023466648) for bulk party favors and customized tin boxes.'
    }
  ];

  return (
    <section className="py-16 bg-[#FFFBF5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3.5 py-1.5 rounded-full">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl text-amber-950">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-amber-200/80 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-heading font-bold text-amber-950 text-base hover:text-amber-700"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-amber-900/80 leading-relaxed border-t border-amber-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
