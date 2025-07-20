'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import InstallModal from './InstallModal';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  
  const { 
    isInstalled, 
    canShowInstallPrompt,
    isIOS,
    isAndroid 
  } = usePWAInstall();

  // Show install banner after 3 seconds if app is not installed and can be installed
  useEffect(() => {
    if (!isInstalled && canShowInstallPrompt) {
      const timer = setTimeout(() => {
        setShowInstallBanner(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isInstalled, canShowInstallPrompt]);

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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Jij wordt papa. Shit.
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Ze is zwanger en jij hebt geen flauw idee waar je aan begonnen bent. 
              Wel handig: wij hebben dit circus al overleefd. Hier is je survival guide.
            </p>

            {/* Quick Start Button */}
            <Button 
              onClick={onStart}
              className="w-full py-3 px-6 bg-black hover:bg-gray-800 text-white font-semibold rounded-2xl border-0 text-base transition-all duration-200 mb-6"
            >
              Laten we dit doen 🚀
            </Button>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Wie zijn wij?</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Alle zwangerschapsapps zijn voor mama&apos;s. Vol met medische termen en advies over yoga. 
                Wij dachten: wat als er nou eens iemand gewoon zegt waar het op staat? Zonder bullshit?
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Dit is voor papa&apos;s die het gewoon willen snappen. 
                Helemaal gratis. 9 maanden overleveringskansen zonder dat het je een cent kost.
              </p>
            </div>

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
              Oke, leer me overleven 💪
            </Button>
            
            <p className="text-center text-gray-500 text-sm mt-3">
              Gratis • Geen bullshit • Duurt geen minuut
            </p>
          </div>
        </div>

        {/* Install Banner */}
        {showInstallBanner && !isInstalled && (
          <div className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-xl mr-2">📱</span>
                  <h3 className="font-bold text-sm">Installeer Project Papa</h3>
                </div>
                <p className="text-xs opacity-90 leading-relaxed">
                  Krijg directe toegang vanaf je {isIOS ? 'iPhone' : isAndroid ? 'Android' : 'apparaat'} beginscherm
                </p>
              </div>
              <div className="ml-3 flex flex-col space-y-2">
                <Button 
                  onClick={() => setShowInstallModal(true)}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-lg text-xs font-semibold px-3 py-1"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Install
                </Button>
                <button 
                  onClick={() => setShowInstallBanner(false)}
                  className="text-white/70 hover:text-white text-xs underline"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Install Modal */}
      <InstallModal 
        isOpen={showInstallModal} 
        onClose={() => setShowInstallModal(false)} 
      />
    </div>
  );
}
