'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Detect platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isAndroidDevice = /android/.test(userAgent);
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as { standalone?: boolean }).standalone === true;

    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);
    setIsInstalled(isInStandaloneMode || isInWebAppiOS);

    // Listen for beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async (): Promise<boolean> => {
    if (!deferredPrompt) {
      // For iOS or when prompt is not available, show instructions
      if (isIOS && !isInstalled) {
        setShowIOSInstructions(true);
        return false;
      }
      return false;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user's response
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error during app installation:', error);
      return false;
    }
  };

  const getInstallInstructions = () => {
    if (isIOS) {
      return {
        title: "Installeer Project Papa",
        steps: [
          "1. Tik op het deel-icoon (□↗) onderaan je scherm",
          "2. Scroll naar beneden en tik op 'Voeg toe aan beginscherm'",
          "3. Tik op 'Toevoegen' om te bevestigen",
          "4. Project Papa staat nu op je beginscherm!"
        ],
        icon: "📱"
      };
    } else if (isAndroid) {
      return {
        title: "Installeer Project Papa",
        steps: [
          "1. Tik op het menu (⋮) in je browser",
          "2. Zoek naar 'App installeren' of 'Toevoegen aan startscherm'",
          "3. Tik op 'Installeren' om te bevestigen",
          "4. Project Papa staat nu op je startscherm!"
        ],
        icon: "🤖"
      };
    } else {
      return {
        title: "Installeer Project Papa",
        steps: [
          "1. Zoek naar het installatie-icoon in je adresbalk",
          "2. Klik op 'Installeren' wanneer gevraagd",
          "3. Project Papa wordt toegevoegd als desktop app",
          "4. Open de app vanaf je desktop!"
        ],
        icon: "💻"
      };
    }
  };

  const canShowInstallPrompt = () => {
    return isInstallable || (isIOS && !isInstalled) || (isAndroid && !isInstalled && !deferredPrompt);
  };

  const dismissIOSInstructions = () => {
    setShowIOSInstructions(false);
  };

  return {
    isInstallable,
    isInstalled,
    isIOS,
    isAndroid,
    showIOSInstructions,
    canShowInstallPrompt: canShowInstallPrompt(),
    installApp,
    getInstallInstructions,
    dismissIOSInstructions
  };
};
