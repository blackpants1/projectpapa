'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Home, ExternalLink } from 'lucide-react';

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

  const getCurrentPregnancyDay = useCallback(() => {
    if (!userData.dueDate) return 0;
    
    const dueDate = new Date(userData.dueDate);
    const startDate = new Date(dueDate.getTime() - (280 * 24 * 60 * 60 * 1000)); // 40 weeks before due date
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // For now, limit to available content (days 0-27, which maps to content days 1-28)
    return Math.max(0, Math.min(27, diffDays));
  }, [userData.dueDate]);

  useEffect(() => {
    // Load content data
    fetch('/data/content.json')
      .then(response => response.json())
      .then(data => {
        setContentData(data);
        setCurrentDay(getCurrentPregnancyDay());
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading content:', error);
        setLoading(false);
      });
  }, [userData.dueDate, getCurrentPregnancyDay]);

  const goToToday = () => {
    setCurrentDay(getCurrentPregnancyDay());
  };

  const goToPreviousDay = () => {
    setCurrentDay(Math.max(0, currentDay - 1));
  };

  const goToNextDay = () => {
    // Limit to available content (we have 28 days, so currentDay can be 0-27)
    setCurrentDay(Math.min(27, currentDay + 1));
  };

  const personalizeText = (text: string) => {
    return text
      .replace(/\{partnerName\}/g, userData.partnerName || 'schat')
      .replace(/\{userName\}/g, userData.userName || 'maat')
      .replace(/\{babyName\}/g, userData.babyName || 'de kleine');
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
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black border-0 rounded-full font-semibold"
          >
            Naar Dag 1
          </Button>
        </div>
      </div>
    );
  }

  const isToday = currentDay === getCurrentPregnancyDay();

  // Fetch Giphy GIF based on search term
  const fetchGiphy = async (searchTerm: string) => {
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
  };

  // Fetch Giphy when content changes
  useEffect(() => {
    if (todayContent?.giphy_search) {
      fetchGiphy(todayContent.giphy_search);
    }
  }, [todayContent?.giphy_search]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 p-4 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-black" style={{ fontFamily: 'Caveat, cursive' }}>
            Project Papa
          </h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSettings}
            className="text-gray-600 text-2xl"
          >
            ⚙️
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 pb-32">
        {/* Rating/Week indicator - buymeacoffee style */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
            <span className="ml-2 text-gray-600 text-sm">Week {todayContent.week} • {todayContent.day_of_week}</span>
          </div>
        </div>

        {/* Main Daily Opener - buymeacoffee hero style */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            {todayContent.daily_opener}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-sm mx-auto">
            {personalizeText(todayContent.daily_opener_text)}
          </p>
        </div>

        {/* Giphy GIF - buymeacoffee clean style */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
              {giphyLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                </div>
              ) : giphyUrl ? (
                <img 
                  src={giphyUrl} 
                  alt={todayContent.image_idea}
                  className="w-full h-full object-cover"
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
        </div>

        {/* Partner Observation - clean card */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              {personalizeText(todayContent.partner_observation_title)}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {personalizeText(todayContent.partner_observation_text)}
            </p>
          </div>
        </div>

        {/* Papa's Life Lesson - yellow accent like buymeacoffee button */}
        <div className="mb-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              {todayContent.papas_life_lesson_title}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              {personalizeText(todayContent.papas_life_lesson_text)}
            </p>
          </div>
        </div>

        {/* Baby Size Info - compact strip */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
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

        {/* More Info - buymeacoffee style CTA */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-bold text-black mb-4">
              {todayContent.more_info_title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {todayContent.more_info_text}
            </p>
            <a 
              href={todayContent.more_info_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition-colors duration-200"
            >
              Meer lezen
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          {/* Day Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline"
              size="sm"
              onClick={goToPreviousDay}
              disabled={currentDay === 0}
              className="rounded-full px-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Vorige
            </Button>
            
            <span className="text-sm text-gray-500 font-medium">
              {currentDay + 1} / 280
            </span>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={goToNextDay}
              disabled={currentDay === 27}
              className="rounded-full px-4"
            >
              Volgende
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Today Button */}
          {!isToday && (
            <Button 
              onClick={goToToday}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black border-0 rounded-full font-semibold text-base shadow-lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Naar Vandaag
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
