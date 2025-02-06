"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    content: "This product has completely transformed how we handle our daily operations. The efficiency gains have been remarkable.",
    image: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    content: "The integration was seamless and the support team was incredibly helpful throughout the entire process.",
    image: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Product Manager",
    content: "We've seen a 40% increase in productivity since implementing this solution. Highly recommended!",
    image: "/api/placeholder/100/100"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 mt-12">
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <Card className="mx-4 bg-white">
                  <CardContent className="p-6">
                    <Quote className="w-10 h-10 text-blue-500 mb-4" />
                    <p className="text-gray-700 mb-6">{testimonial.content}</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;