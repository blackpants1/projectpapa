'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

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
  baby_size_comparison_text: string;
  partner_observation_title: string;
  partner_observation_text: string;
  papas_life_lesson_title: string;
  papas_life_lesson_text: string;
  image_idea: string;
}

interface DailyContentProps {
  userData: OnboardingData;
  onSettings: () => void;
}

export default function DailyContent({ userData, onSettings }: DailyContentProps) {
  const [currentDay, setCurrentDay] = useState(0);
  const [contentData, setContentData] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 p-4 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-5xl font-bold text-black" style={{ fontFamily: 'Caveat, cursive' }}>
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

      <div className="max-w-md mx-auto p-6 pb-24">
        {/* Week & Day Display */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold text-black mb-4">
            WEEK {todayContent.week}
          </h2>
          <p className="text-3xl text-gray-600 font-medium mb-2">
            {todayContent.day_of_week}
          </p>
          <p className="text-lg text-gray-500">
            Dag {currentDay + 1} van 280
          </p>
        </div>

        {/* Baby Size */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-black">
              {userData.babyName || 'De kleine'} is nu zo groot als...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg font-semibold text-gray-800">
              {todayContent.baby_size_comparison}
            </div>
            <div className="text-base text-gray-700 leading-relaxed">
              {personalizeText(todayContent.baby_size_comparison_text)}
            </div>
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              📏 {todayContent.length_cm} cm • ⚖️ {todayContent.weight_gr} gram
            </div>
          </CardContent>
        </Card>

        {/* Image Placeholder */}
        <Card className="mb-6 border-0 shadow-lg bg-gray-50">
          <CardContent className="pt-6">
            <div className="h-48 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🎨</div>
                <p className="text-sm font-medium">Beeld idee</p>
                <p className="text-xs mt-1 max-w-xs mx-auto">
                  {todayContent.image_idea}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partner Observation */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-black">
              {personalizeText(todayContent.partner_observation_title)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-700 leading-relaxed">
              {personalizeText(todayContent.partner_observation_text)}
            </p>
          </CardContent>
        </Card>

        {/* Papa's Life Lesson */}
        <Card className="mb-6 border-0 shadow-lg bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-black">
              {todayContent.papas_life_lesson_title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-700 leading-relaxed">
              {personalizeText(todayContent.papas_life_lesson_text)}
            </p>
          </CardContent>
        </Card>
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
