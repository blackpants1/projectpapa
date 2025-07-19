'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 p-4 z-10">
        <div className="max-w-md mx-auto flex items-center justify-center">
          <Image 
            src="/logo-transparant.png" 
            alt="Project Papa" 
            width={120} 
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 pb-32">
        {/* Single unified content card - app-like experience */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Social Proof */}
          <div className="text-center pt-6 pb-2">
            <div className="flex items-center justify-center mb-2">
              <span className="text-[#FEDD03] text-lg">⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Vertrouwd door 1.000+ aanstaande papa&rsquo;s</p>
          </div>

          {/* Main Hero */}
          <div className="text-center px-6 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
              Welkom bij de club, maat
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Zwangerschap is verwarrend genoeg. Wij vertellen je gewoon waar je aan toe bent. 
              Zonder medische prietpraat, zonder tuttige taal. Gewoon van man tot man.
            </p>
            
            <Button 
              onClick={onStart}
              className="w-full py-4 px-8 bg-[#FEDD03] hover:bg-[#E5C503] active:scale-95 text-black font-bold text-lg rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1 mb-4"
            >
              Oké, laat maar zien
            </Button>
            
            <p className="text-sm text-gray-500">
              Duurt geen minuut. En het is gratis.
            </p>
          </div>

          {/* What You Get */}
          <div className="px-6 pb-6">
            <h3 className="text-xl font-bold text-black mb-4">
              Dit krijg je van ons:
            </h3>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <span className="text-[#FEDD03] mr-3 mt-1">●</span>
                <span>Dagelijks een update over wat er gebeurt. In gewone mensen-taal.</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#FEDD03] mr-3 mt-1">●</span>
                <span>Tips die daadwerkelijk helpen (niet de standaard &lsquo;wees lief&rsquo; bullshit).</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#FEDD03] mr-3 mt-1">●</span>
                <span>Humor waar je het nodig hebt. Want dit circus is soms best grappig.</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#FEDD03] mr-3 mt-1">●</span>
                <span>Eerlijkheid over wat je kunt verwachten. Geen roze bril.</span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-[#FEDD03] text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 italic mb-3 leading-relaxed">
                  &ldquo;Eindelijk iemand die me niet behandelt alsof ik een complete idioot ben. 
                  Deze app heeft me door de eerste maanden gesleept zonder dat ik gek werd.&rdquo;
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Mark</strong> • Inmiddels papa van 2
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="px-6 pb-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-black mb-3">
                Klaar om te beginnen?
              </h3>
              <p className="text-gray-600 mb-4">
                Een paar vragen en je bent klaar. Daarna krijg je elke dag precies wat je nodig hebt.
              </p>
              <Button 
                onClick={onStart}
                className="w-full py-4 px-8 bg-[#FEDD03] hover:bg-[#E5C503] active:scale-95 text-black font-bold text-lg rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              >
                Laten we gaan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
