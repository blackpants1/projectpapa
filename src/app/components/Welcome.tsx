'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-100 p-4">
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

      <div className="max-w-md mx-auto p-6">
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="text-center px-6 pt-8 pb-6">
            <div className="w-20 h-20 bg-[#FEDD03] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <span className="text-3xl">🍼</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welkom bij Project Papa
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              De zwangerschapsapp voor papa&rsquo;s die gewoon willen weten waar ze aan toe zijn. 
              Zonder medische prietpraat, zonder tuttige taal. Van man tot man.
            </p>

            <div className="flex items-center justify-center text-gray-500 text-sm mb-8">
              <span className="mr-1">♡</span>
              <span>Vertrouwd door 1,000+ papa&rsquo;s</span>
            </div>
          </div>

          {/* Features */}
          <div className="px-6 pb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Dit krijg je:
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#FEDD03]/10 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-lg">📝</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dagelijkse updates</h4>
                  <p className="text-gray-600 text-sm">Wat er gebeurt, in gewone mensen-taal</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#FEDD03]/10 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-lg">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Praktische tips</h4>
                  <p className="text-gray-600 text-sm">Die daadwerkelijk helpen (geen standaard bullshit)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#FEDD03]/10 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-lg">😄</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Humor & eerlijkheid</h4>
                  <p className="text-gray-600 text-sm">Want dit circus is soms best grappig</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#FEDD03]/10 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Snel setup</h4>
                  <p className="text-gray-600 text-sm">Klaar in 2 minuten, gratis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-[#FEDD03] text-xl mb-3">★★★★★</div>
              <p className="text-gray-700 italic text-sm leading-relaxed mb-3">
                &ldquo;Eindelijk iemand die me niet behandelt alsof ik een complete idioot ben. 
                Deze app heeft me door de eerste maanden gesleept zonder dat ik gek werd.&rdquo;
              </p>
              <p className="text-gray-500 text-xs">
                <strong>Mark</strong> • Papa van 2
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 pb-8">
            <Button 
              onClick={onStart}
              className="w-full py-4 px-8 bg-[#FEDD03] hover:bg-[#E5C503] text-black font-bold text-lg rounded-full shadow-lg border-0 transition-all duration-200"
            >
              Start je papa-journey
            </Button>
            
            <p className="text-center text-gray-500 text-sm mt-3">
              Gratis • Duurt geen minuut
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
