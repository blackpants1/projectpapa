'use client';

import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import Onboarding from './components/Onboarding';
import DailyContent from './components/DailyContent';
import Settings from './components/Settings';

interface OnboardingData {
  dueDate: string;
  partnerName: string;
  firstTime: string;
  biggestWorry: string;
  hormonalApproach: string;
  planningStyle: string;
  babyName: string;
  userName: string;
}

type AppScreen = 'welcome' | 'onboarding' | 'daily' | 'settings';

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [userData, setUserData] = useState<OnboardingData | null>(null);

  // Check if user has completed onboarding
  useEffect(() => {
    const savedData = localStorage.getItem('projectPapaUserData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as OnboardingData;
        setUserData(parsedData);
        setCurrentScreen('daily');
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Clear corrupted data
        localStorage.removeItem('projectPapaUserData');
      }
    }
  }, []);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
    localStorage.setItem('projectPapaUserData', JSON.stringify(data));
    setCurrentScreen('daily');
  };

  const handleShowSettings = () => {
    setCurrentScreen('settings');
  };

  const handleBackFromSettings = () => {
    setCurrentScreen('daily');
  };

  const handleUpdateUserData = (data: OnboardingData) => {
    setUserData(data);
    localStorage.setItem('projectPapaUserData', JSON.stringify(data));
  };

  const handleResetOnboarding = () => {
    setUserData(null);
    localStorage.removeItem('projectPapaUserData');
    setCurrentScreen('welcome');
  };

  const handleStartOnboarding = () => {
    setCurrentScreen('onboarding');
  };

  // Show welcome screen
  if (currentScreen === 'welcome') {
    return <Welcome onStart={handleStartOnboarding} />;
  }

  // Show onboarding screen
  if (currentScreen === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Show settings screen
  if (currentScreen === 'settings' && userData) {
    return (
      <Settings
        userData={userData}
        onBack={handleBackFromSettings}
        onUpdateUserData={handleUpdateUserData}
        onResetOnboarding={handleResetOnboarding}
      />
    );
  }

  // Show daily content screen
  if (currentScreen === 'daily' && userData) {
    return (
      <DailyContent
        userData={userData}
        onSettings={handleShowSettings}
      />
    );
  }

  // Loading fallback
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
          Project Papa
        </h1>
        <p className="text-xl text-gray-600">Laden...</p>
      </div>
    </div>
  );
}
