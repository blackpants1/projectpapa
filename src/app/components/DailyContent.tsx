'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ExternalLink, Settings, X, Download } from 'lucide-react';
import Image from 'next/image';

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

interface ContentData {
  week: number;
  day: number;
  day_of_week: string;
  length_cm: number;
  weight_gr: number;
  baby_size_comparison: string;
  daily_opener: string;
  daily_opener_text: string;
  partner_observation_title: string;
  partner_observation_text: string;
  papas_life_lesson_title: string;
  papas_life_lesson_text: string;
  more_info_title: string;
  more_info_text: string;
  more_info_link: string;
  image_idea: string;
  giphy_search: string;
}

interface DailyContentProps {
  userData: OnboardingData;
  onSettings: () => void;
}

export default function DailyContent({ userData, onSettings }: DailyContentProps) {
  const [currentDay, setCurrentDay] = useState(0);
  const [contentData, setContentData] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState(true);
  // State for Giphy integration
  const [giphyUrl, setGiphyUrl] = useState<string>('');
  const [giphyLoading, setGiphyLoading] = useState(false);
  // State for app download prompt
  const [showAppPrompt, setShowAppPrompt] = useState(false);
  // State for swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const getCurrentPregnancyDay = useCallback((availableContentLength: number = 117) => {
    if (!userData.dueDate) return 0;
    
    const dueDate = new Date(userData.dueDate);
    const startDate = new Date(dueDate.getTime() - (280 * 24 * 60 * 60 * 1000)); // 40 weeks before due date
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Limit to available content length (days 0 to contentLength-1, which maps to content days 1 to contentLength)
    return Math.max(0, Math.min(availableContentLength - 1, diffDays));
  }, [userData.dueDate]);

  // Fetch Giphy GIF based on search term
  const fetchGiphy = useCallback(async (searchTerm: string) => {
    if (!searchTerm) return;
    
    setGiphyLoading(true);
    try {
      // Using Giphy's public API with demo key for development
      const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'; // Demo key
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=1&rating=g&lang=en`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setGiphyUrl(data.data[0].images.original.url);
        } else {
          // No GIFs found, keep placeholder
          setGiphyUrl('');
        }
      } else {
        console.warn('Giphy API error:', response.statusText);
        setGiphyUrl('');
      }
    } catch (error) {
      console.error('Error fetching Giphy:', error);
      // Fallback: leave empty to show placeholder
      setGiphyUrl('');
    } finally {
      setGiphyLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load content data
    fetch('/data/content.json')
      .then(response => response.json())
      .then(data => {
        setContentData(data);
        setCurrentDay(getCurrentPregnancyDay(data.length));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading content:', error);
        setLoading(false);
      });

    // Check if user should see app download prompt
    const hasSeenAppPrompt = localStorage.getItem('hasSeenAppPrompt');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!hasSeenAppPrompt && !isStandalone && isMobile) {
      // Show prompt after a short delay
      setTimeout(() => {
        setShowAppPrompt(true);
      }, 3000);
    }
  }, [userData.dueDate, getCurrentPregnancyDay]);

  // Fetch Giphy when content changes
  useEffect(() => {
    const currentContent = contentData.find(item => item.day === (currentDay + 1));
    if (currentContent?.giphy_search) {
      fetchGiphy(currentContent.giphy_search);
    }
  }, [currentDay, contentData, fetchGiphy]);

  const goToToday = () => {
    setCurrentDay(getCurrentPregnancyDay());
  };

  const goToPreviousDay = () => {
    if (isTransitioning) return;
    const newDay = Math.max(0, currentDay - 1);
    if (newDay !== currentDay) {
      setIsTransitioning(true);
      setSwipeDirection('right');
      setTimeout(() => {
        setCurrentDay(newDay);
        setIsTransitioning(false);
        setSwipeDirection(null);
      }, 200);
    }
  };

  const goToNextDay = () => {
    if (isTransitioning) return;
    const maxDay = contentData.length > 0 ? contentData.length - 1 : 116; // Use actual content length
    const newDay = Math.min(maxDay, currentDay + 1);
    if (newDay !== currentDay) {
      setIsTransitioning(true);
      setSwipeDirection('left');
      setTimeout(() => {
        setCurrentDay(newDay);
        setIsTransitioning(false);
        setSwipeDirection(null);
      }, 200);
    }
  };

  // Swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextDay();
    } else if (isRightSwipe) {
      goToPreviousDay();
    }
  };

  const personalizeText = (text: string) => {
    return text
      .replace(/\{partnerName\}/g, userData.partnerName || 'schat')
      .replace(/\{userName\}/g, userData.userName || 'maat')
      .replace(/\{babyName\}/g, userData.babyName || 'de kleine');
  };

  const handleInstallApp = () => {
    setShowAppPrompt(false);
    localStorage.setItem('hasSeenAppPrompt', 'true');
    
    // Trigger browser's install prompt if available
    if ('serviceWorker' in navigator) {
      // Show instructions for manual installation
      alert('Tip: Voeg Project Papa toe aan je startscherm!\n\niOS Safari: Tik op delen → "Voeg toe aan beginscherm"\nAndroid Chrome: Tik op menu → "App installeren"');
    }
  };

  const handleDismissPrompt = () => {
    setShowAppPrompt(false);
    localStorage.setItem('hasSeenAppPrompt', 'true');
  };

  if (loading) {
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

  // Find content for current day (we have content for days 1-28, so we map currentDay to available content)
  const todayContent = contentData.find(item => item.day === (currentDay + 1)) || contentData[0];
  
  if (!todayContent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-black mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
            Project Papa
          </h1>
          <p className="text-xl text-gray-600">Geen content beschikbaar</p>
          <Button 
            onClick={() => setCurrentDay(0)}
            className="mt-4 bg-[#FEDD03] hover:bg-[#E5C503] text-black border-0 rounded-full font-semibold"
          >
            Naar Dag 1
          </Button>
        </div>
      </div>
    );
  }

  const isToday = currentDay === getCurrentPregnancyDay(contentData.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 p-4 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Image 
            src="/logo-transparant.png" 
            alt="Project Papa" 
            width={120} 
            height={40}
            className="h-10 w-auto"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSettings}
            className="text-gray-600 hover:text-black transition-colors"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div 
        className={`max-w-md mx-auto p-6 pb-32 transition-transform duration-200 ${
          isTransitioning 
            ? swipeDirection === 'left' 
              ? '-translate-x-full opacity-50' 
              : 'translate-x-full opacity-50'
            : 'translate-x-0 opacity-100'
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Single unified content card - app-like experience */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Week indicator */}
          <div className="text-center pt-6 pb-2">
            <span className="text-gray-500 text-sm font-medium">Week {todayContent.week} • {todayContent.day_of_week}</span>
          </div>

          {/* Main Daily Opener */}
          <div className="text-center px-6 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
              {todayContent.daily_opener}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {personalizeText(todayContent.daily_opener_text)}
            </p>
          </div>

          {/* Giphy GIF */}
          <div className="px-6 pb-8">
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative">
              {giphyLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FEDD03]"></div>
                </div>
              ) : giphyUrl ? (
                <Image 
                  src={giphyUrl} 
                  alt={todayContent.image_idea}
                  className="w-full h-full object-cover"
                  fill
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎬</div>
                    <p className="text-sm">{todayContent.image_idea}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Baby Size Info */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Grootte vandaag</p>
                  <p className="font-semibold text-gray-800">{todayContent.baby_size_comparison}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">📏 {todayContent.length_cm} cm</p>
                  <p className="text-sm text-gray-500">⚖️ {todayContent.weight_gr} gram</p>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Observation */}
          <div className="px-6 pb-6">
            <h3 className="text-xl font-bold text-black mb-3">
              {personalizeText(todayContent.partner_observation_title)}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {personalizeText(todayContent.partner_observation_text)}
            </p>
          </div>

          {/* Papa's Life Lesson */}
          <div className="px-6 pb-6">
            <div className="bg-[#FEDD03]/10 border border-[#FEDD03]/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-3">
                {todayContent.papas_life_lesson_title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {personalizeText(todayContent.papas_life_lesson_text)}
              </p>
            </div>
          </div>

          {/* More Info */}
          <div className="px-6 pb-6">
            <h3 className="text-lg font-bold text-black mb-3">
              {todayContent.more_info_title}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {todayContent.more_info_text}
            </p>
            <a 
              href={todayContent.more_info_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FEDD03] hover:bg-[#E5C503] text-black font-semibold rounded-full transition-colors duration-200 w-full"
            >
              Meer lezen
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Simplified Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <span className="text-sm text-gray-500 font-medium">
                {currentDay + 1} / {contentData.length || 280}
              </span>
              <div className="text-xs text-gray-400 mt-1">
                ← swipe voor meer →
              </div>
            </div>
            
            {/* Today Button */}
            {!isToday && (
              <Button 
                onClick={goToToday}
                className="ml-4 bg-[#FEDD03] hover:bg-[#E5C503] text-black border-0 rounded-full font-semibold px-6 py-2 shadow-lg"
              >
                <Home className="w-4 h-4 mr-2" />
                Vandaag
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* App Download Prompt */}
      {showAppPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismissPrompt}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
            
            <div className="text-center">
              <div className="mb-4">
                <Download className="w-12 h-12 mx-auto text-[#FEDD03]" />
              </div>
              
              <h3 className="text-xl font-bold text-black mb-3">
                Project Papa App
              </h3>
              
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Voeg Project Papa toe aan je startscherm voor de beste ervaring! 
                Zo heb je altijd snel toegang tot je dagelijkse content.
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={handleInstallApp}
                  className="w-full bg-[#FEDD03] hover:bg-[#E5C503] text-black font-semibold rounded-full py-3"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Installeer App
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={handleDismissPrompt}
                  className="w-full text-gray-500 hover:text-gray-700"
                >
                  Misschien later
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
