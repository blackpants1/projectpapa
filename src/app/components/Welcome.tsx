'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header - with fade in animation */}
      <div className={`bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="max-w-md mx-auto flex items-center justify-center">
          <h1 className="text-3xl font-bold text-black animate-pulse" style={{ fontFamily: 'Caveat, cursive' }}>
            Project Papa
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 pb-12">
        {/* Social Proof - with bounce animation */}
        <div className={`text-center py-8 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-center mb-4">
            <span className="text-yellow-400 text-lg animate-bounce">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-gray-600 text-sm">Geliefd door 1.000+ aanstaande papa&apos;s</p>
        </div>

        {/* Hero Section - with staggered animations */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold text-black mb-8 leading-tight transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Vind je weg door<br />de zwangerschap
          </h1>
          <p className={`text-lg md:text-xl text-gray-600 leading-relaxed mb-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Van man tot man. Alle zwangerschaps-apps zijn gemaakt voor vrouwen. Deze is voor jou.
          </p>
          
          {/* Primary CTA - with enhanced animations */}
          <div className={`transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <Button 
              onClick={onStart}
              className="w-full py-4 px-8 bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-black font-bold text-lg rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1 mb-4 group"
            >
              <span className="group-hover:scale-110 transition-transform duration-200">
                Start mijn papa-gids
              </span>
            </Button>
          </div>
          
          <p className={`text-sm text-gray-500 transition-all duration-700 delay-900 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            Het is gratis en duurt minder dan een minuut!
          </p>
        </div>

        {/* Support Section - with hover and slide animations */}
        <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 mb-12 transition-all duration-700 delay-1000 hover:-translate-y-1 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-4 animate-pulse">ONDERSTEUNING</p>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 leading-tight">
              Geef jezelf de kennis die je verdient.
            </h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            Project Papa maakt zwangerschap begrijpelijk en zelfs grappig. 
            280 dagen van echte, eerlijke updates zonder medische jargon of tuttige taal.
          </p>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start group hover:scale-105 transition-transform duration-200 p-2 rounded-lg hover:bg-gray-50">
              <span className="text-yellow-400 mr-3 group-hover:scale-125 transition-transform duration-200">✓</span>
              <span className="group-hover:text-gray-800 transition-colors duration-200">Dagelijkse updates in normale mensen-taal</span>
            </div>
            <div className="flex items-start group hover:scale-105 transition-transform duration-200 p-2 rounded-lg hover:bg-gray-50">
              <span className="text-yellow-400 mr-3 group-hover:scale-125 transition-transform duration-200">✓</span>
              <span className="group-hover:text-gray-800 transition-colors duration-200">Praktische tips die echt werken</span>
            </div>
            <div className="flex items-start group hover:scale-105 transition-transform duration-200 p-2 rounded-lg hover:bg-gray-50">
              <span className="text-yellow-400 mr-3 group-hover:scale-125 transition-transform duration-200">✓</span>
              <span className="group-hover:text-gray-800 transition-colors duration-200">Humor waar je het nodig hebt</span>
            </div>
            <div className="flex items-start group hover:scale-105 transition-transform duration-200 p-2 rounded-lg hover:bg-gray-50">
              <span className="text-yellow-400 mr-3 group-hover:scale-125 transition-transform duration-200">✓</span>
              <span className="group-hover:text-gray-800 transition-colors duration-200">Van man tot man, zonder bullshit</span>
            </div>
          </div>
        </div>

        {/* Testimonial Section - with rotation animation */}
        <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 mb-12 transition-all duration-700 delay-1200 hover:-translate-y-1 hover:rotate-1 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center">
            <div className="text-yellow-400 text-2xl mb-4 animate-pulse">★★★★★</div>
            <p className="text-gray-700 italic mb-4 leading-relaxed">
              &quot;Eindelijk een app die mijn taal spreekt. Geen roze kleurtjes, gewoon eerlijk en grappig. 
              Heeft me door de eerste 3 maanden gesleept.&quot;
            </p>
            <p className="text-gray-500 text-sm">
              <strong>Mark</strong> • Papa van 2
            </p>
          </div>
        </div>

        {/* Final CTA Section - with final animation wave */}
        <div className={`text-center mb-8 transition-all duration-700 delay-1400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-xl font-bold text-black mb-4 animate-pulse">
              Start vandaag nog
            </h3>
            <p className="text-gray-600 mb-6">
              Direct toegang tot je persoonlijke papa-gids. Gratis, geen gedoe.
            </p>
            <Button 
              onClick={onStart}
              className="w-full py-4 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 active:scale-95 text-black font-bold text-lg rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1 mb-4 group"
            >
              <span className="group-hover:scale-110 transition-transform duration-200">
                Begin mijn reis
              </span>
            </Button>
            <p className="text-xs text-gray-400 animate-pulse">
              Al 847 papa&apos;s deze week gestart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
