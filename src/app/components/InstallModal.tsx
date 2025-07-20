'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstallModal({ isOpen, onClose }: InstallModalProps) {
  const { 
    installApp, 
    getInstallInstructions, 
    isInstalled, 
    isIOS,
    isAndroid,
    showIOSInstructions,
    dismissIOSInstructions
  } = usePWAInstall();

  if (!isOpen || isInstalled) return null;

  const handleInstall = async () => {
    console.log('Install button clicked');
    
    const success = await installApp();
    if (success) {
      onClose();
    }
    // For iOS or Android without native prompt, instructions will be shown automatically by the hook
  };

  const instructions = getInstallInstructions();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-sm w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="text-5xl mb-4">{instructions.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {instructions.title}
            </h2>
            <p className="text-gray-600 text-sm">
              Krijg directe toegang vanaf je beginscherm
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Benefits */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Voordelen van installeren:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Snellere toegang vanaf je beginscherm
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Werkt offline (voor uitgevoerde content)
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Geen browser-balk voor een app-gevoel
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Push notificaties (binnenkort)
              </div>
            </div>
          </div>

          {/* Install Button or Instructions */}
          {!showIOSInstructions ? (
            <div className="space-y-4">
              <Button 
                onClick={handleInstall}
                className="w-full py-4 bg-[#FEDD03] hover:bg-[#E5C503] text-black font-bold text-lg rounded-2xl border-0 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isIOS ? 'Toon installatie-instructies' : 'Nu installeren 🚀'}
              </Button>
              
              <Button 
                onClick={onClose}
                variant="ghost"
                className="w-full text-gray-500 hover:text-gray-700"
              >
                Misschien later
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="space-y-3">
                  {instructions.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-blue-600 font-bold text-sm mr-3 mt-0.5 flex-shrink-0">
                        {step.split('.')[0]}.
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {step.substring(step.indexOf('.') + 1).trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  dismissIOSInstructions();
                  onClose();
                }}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl border-0"
              >
                Begrepen!
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
