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

    console.log('PWA Debug:', {
      userAgent,
      isIOSDevice,
      isAndroidDevice,
      isInStandaloneMode,
      isInWebAppiOS
    });

    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);
    setIsInstalled(isInStandaloneMode || isInWebAppiOS);

    // For Android, even if no beforeinstallprompt, we can show instructions
    if (isAndroidDevice && !isInStandaloneMode) {
      setIsInstallable(true);
    }

    // Listen for beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event received');
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('appinstalled event received');
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
    console.log('installApp called', { 
      deferredPrompt: !!deferredPrompt, 
      isIOS, 
      isAndroid,
      userAgent: navigator.userAgent 
    });
    
    // Always show instructions for iOS
    if (isIOS && !isInstalled) {
      console.log('Showing iOS instructions');
      setShowIOSInstructions(true);
      return false;
    }

    // For Android: try native prompt first, fallback to instructions
    if (isAndroid && !isInstalled) {
      if (deferredPrompt) {
        try {
          console.log('Triggering native Android install prompt');
          await deferredPrompt.prompt();
          
          const choiceResult = await deferredPrompt.userChoice;
          console.log('User choice:', choiceResult.outcome);
          
          if (choiceResult.outcome === 'accepted') {
            setIsInstalled(true);
            setIsInstallable(false);
            setDeferredPrompt(null);
            return true;
          }
          
          return false;
        } catch (error) {
          console.error('Native prompt failed:', error);
          // Fallback to manual instructions
          setShowIOSInstructions(true);
          return false;
        }
      } else {
        console.log('No native prompt available, showing Android instructions');
        setShowIOSInstructions(true);
        return false;
      }
    }

    // Desktop or other platforms
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          setIsInstalled(true);
          setIsInstallable(false);
          setDeferredPrompt(null);
          return true;
        }
      } catch (error) {
        console.error('Install prompt error:', error);
      }
    }
    
    return false;
  };

  const getInstallInstructions = () => {
    if (isIOS) {
      return {
        title: "Installeer Project Papa",
        steps: [
          "1. Tik op het deel-icoon (□↗) onderaan",
          "2. Kies 'Voeg toe aan beginscherm'",
          "3. Tik op 'Toevoegen'"
        ],
        icon: "📱",
        note: "Dan staat Project Papa op je beginscherm!"
      };
    } else if (isAndroid) {
      return {
        title: "Installeer Project Papa",
        steps: [
          "1. Tik op het menu (⋮) in Chrome",
          "2. Kies 'App installeren' of 'Installeren'",
          "3. Bevestig met 'Installeren'"
        ],
        icon: "🤖",
        note: "Chrome toont soms geen automatische prompt - deze stappen werken altijd!"
      };
    } else {
      return {
        title: "Installeer Project Papa",
        steps: [
          "1. Zoek naar het installatie-icoon in je adresbalk",
          "2. Klik op 'Installeren'",
          "3. Project Papa wordt toegevoegd als desktop app"
        ],
        icon: "💻",
        note: "Voor snelle toegang vanaf je desktop!"
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
