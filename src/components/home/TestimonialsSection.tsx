
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "SecureFlux has revolutionized how I manage my wealth. The zero-knowledge privacy features give me complete confidence that my financial information remains confidential.",
    author: "Alexandra Chen",
    title: "CEO, Quantum Ventures",
    stars: 5
  },
  {
    quote: "As a high-net-worth individual, security is my top priority. SecureFlux's homomorphic encryption is truly game-changing for private banking.",
    author: "Michael Thornton",
    title: "Family Office Manager",
    stars: 5
  },
  {
    quote: "The platinum tier service at SecureFlux offers the perfect blend of cutting-edge security and white-glove customer support. Simply unmatched in the industry.",
    author: "Sophia Reynolds",
    title: "International Investor",
    stars: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white/90 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-banking-dark mb-4 font-serif">Trusted by Elite Clients</h2>
          <p className="text-banking-muted max-w-3xl mx-auto text-lg">
            Hear from our distinguished customers about their exceptional banking experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-banking-gold fill-banking-gold" />
                ))}
              </div>
              <blockquote className="mb-6 text-banking-dark italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-auto">
                <p className="font-medium text-banking-dark">{testimonial.author}</p>
                <p className="text-sm text-banking-muted">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center px-6 py-3 border border-banking-premium/20 rounded-full text-banking-premium text-sm font-medium">
            Trusted by over 10,000 high-net-worth clients worldwide
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
