'use client';

import { Button } from '@/components/ui/button';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - buymeacoffee style */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="max-w-md mx-auto flex items-center justify-center">
          <h1 className="text-3xl font-bold text-black" style={{ fontFamily: 'Caveat, cursive' }}>
            Project Papa
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 pb-12">
        {/* Social Proof - buymeacoffee rating style */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-gray-600 text-sm">Geliefd door 1.000+ aanstaande papa's</p>
        </div>

        {/* Hero Section - buymeacoffee style mega title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
            Vind je weg door<br />de zwangerschap
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            Van man tot man. Alle zwangerschaps-apps zijn gemaakt voor vrouwen. Deze is voor jou.
          </p>
          
          {/* Primary CTA - buymeacoffee yellow button */}
          <Button 
            onClick={onStart}
            className="w-full py-4 px-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg rounded-full shadow-lg transition-all hover:shadow-xl mb-4"
          >
            Start mijn papa-gids
          </Button>
          
          <p className="text-sm text-gray-500">
            Het is gratis en duurt minder dan een minuut!
          </p>
        </div>

        {/* Support Section - buymeacoffee content style */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">ONDERSTEUNING</p>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 leading-tight">
              Geef jezelf de kennis die je verdient.
            </h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            Project Papa maakt zwangerschap begrijpelijk en zelfs grappig. 
            280 dagen van echte, eerlijke updates zonder medische jargon of tuttige taal.
          </p>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3">✓</span>
              <span>Dagelijkse updates in normale mensen-taal</span>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3">✓</span>
              <span>Praktische tips die echt werken</span>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3">✓</span>
              <span>Humor waar je het nodig hebt</span>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-400 mr-3">✓</span>
              <span>Van man tot man, zonder bullshit</span>
            </div>
          </div>
        </div>

        {/* Testimonial Section - buymeacoffee style */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="text-center">
            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
            <p className="text-gray-700 italic mb-4 leading-relaxed">
              "Eindelijk een app die mijn taal spreekt. Geen roze kleurtjes, gewoon eerlijk en grappig. 
              Heeft me door de eerste 3 maanden gesleept."
            </p>
            <p className="text-gray-500 text-sm">
              <strong>Mark</strong> • Papa van 2
            </p>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-black mb-4">
              Start vandaag nog
            </h3>
            <p className="text-gray-600 mb-6">
              Direct toegang tot je persoonlijke papa-gids. Gratis, geen gedoe.
            </p>
            <Button 
              onClick={onStart}
              className="w-full py-4 px-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg rounded-full shadow-lg transition-all hover:shadow-xl mb-4"
            >
              Begin mijn reis
            </Button>
            <p className="text-xs text-gray-400">
              Al 847 papa's deze week gestart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
