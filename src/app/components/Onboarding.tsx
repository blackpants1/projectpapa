'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, X } from 'lucide-react';
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

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info';
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<OnboardingData>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize with smart default date when user reaches date question
  useEffect(() => {
    if (currentStep === 0 && !data.dueDate) {
      // Set default to approximately 8 months from now (240 days)
      const defaultDate = new Date(Date.now() + 240 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      setData(prev => ({ ...prev, dueDate: defaultDate }));
    }
  }, [currentStep, data.dueDate]);

  const questions = [
    {
      id: 'dueDate',
      question: 'Wanneer is ze uitgerekend?',
      emoji: '📅',
      type: 'date' as const,
      placeholder: 'Selecteer de uitgerekende datum'
    },
    {
      id: 'partnerName',
      question: 'Hoe noem je d\'r meestal?',
      emoji: '💕',
      subtitle: 'We gebruiken dit in de verhalen',
      type: 'text' as const,
      placeholder: 'Schat, liefje, bij haar naam...'
    },
    {
      id: 'firstTime',
      question: 'Eerste keer papa worden?',
      emoji: '🍼',
      subtitle: 'Of ken je dit circus al?',
      type: 'radio' as const,
      options: [
        { value: 'first_clueless', label: 'Ja, en ik heb nog geen flauw idee waar ik aan begin' },
        { value: 'veteran', label: 'Nee, ik ken de drill al van de vorige keer(en)' },
        { value: 'first_warned', label: 'Ja, maar vrienden hebben me al \'voorbereid\' met horrorverhalen' }
      ]
    },
    {
      id: 'biggestWorry',
      question: 'Waar lig je \'s nachts wakker van?',
      emoji: '😰',
      subtitle: 'Eerlijk gezegd...',
      type: 'radio' as const,
      options: [
        { value: 'normal_again', label: 'Of ze ooit weer wordt zoals ze was' },
        { value: 'money', label: 'Of ik dit financieel ga overleven zonder rijst-en-bonen dieet' },
        { value: 'good_father', label: 'Of ik wel een goede vader ga worden' },
        { value: 'freedom', label: 'Of mijn vrijheid nu definitief voorbij is' },
        { value: 'everything', label: 'Eigenlijk van alles een beetje' }
      ]
    },
    {
      id: 'hormonalApproach',
      question: 'Hormonale buien & rare cravings?',
      emoji: '🎭',
      subtitle: 'Hoe ga je daarmee om?',
      type: 'radio' as const,
      options: [
        { value: 'agree_nod', label: 'Knikken, "ja schat" zeggen en hopen dat het overwaait' },
        { value: 'hide', label: 'Strategisch wegduiken tot de storm voorbij is' },
        { value: 'chocolate', label: 'Chocola en ijsjes inslaan als verdedigingslinie' },
        { value: 'figuring_out', label: 'Ik ben nog steeds aan het uitzoeken wat werkt' }
      ]
    },
    {
      id: 'planningStyle',
      question: 'Ben je een planner of improvisator?',
      emoji: '📋',
      subtitle: 'Alles tot in detail of gewoon zien wat er gebeurt?',
      type: 'radio' as const,
      options: [
        { value: 'spreadsheet', label: 'Ik heb al een spreadsheet met babynamen en budgetten' },
        { value: 'go_with_flow', label: 'Ik zie wel wat er op mijn pad komt, komt goed' },
        { value: 'balanced', label: 'Beetje van beide: plannen maken maar flexibel blijven' }
      ]
    },
    {
      id: 'babyName',
      question: 'Hoe noemen we de kleine?',
      emoji: '👶',
      subtitle: 'Naam die je al gekozen hebt, of laat leeg',
      type: 'text' as const,
      placeholder: 'De naam, of laat leeg voor "de kleine"'
    },
    {
      id: 'userName',
      question: 'En hoe kunnen we jou noemen?',
      emoji: '👨',
      subtitle: 'Maakt het wat persoonlijker',
      type: 'text' as const,
      placeholder: 'Je voornaam, bijnaam, of laat leeg voor \'maat\''
    }
  ];

  const getFeedback = (questionId: string, value: string) => {
    const feedbackMap: Record<string, Record<string, string>> = {
      firstTime: {
        'first_clueless': 'Mooi, dan leer je het gewoon onderweg. Net als autorijden, maar dan met meer geschreeuw.',
        'veteran': 'Veteraan! Je weet dus al dat slapen een luxe wordt.',
        'first_warned': 'Ah, je vrienden hebben je al \'voorbereid\'. Vergeet de helft, de rest valt wel mee.'
      },
      biggestWorry: {
        'normal_again': 'Spoiler alert: ze wordt beter dan de oude versie.',
        'money': 'Welkom bij de club. Rijst met bonen wordt je beste vriend.',
        'good_father': 'Het feit dat je je zorgen maakt, betekent dat je het al snapt.',
        'freedom': 'Vrijheid wordt gewoon anders gedefinieerd. Netflix om 23:00 is het nieuwe uitgaan.',
        'everything': 'Eerlijk. Dat mag ook gewoon.'
      },
      hormonalApproach: {
        'agree_nod': 'Klassieke tactiek. Works 60% of the time, every time.',
        'hide': 'Survival mode activated. Niet de meest heldhaftige, maar wel effectief.',
        'chocolate': 'Smart man. Chocola lost bijna alles op.',
        'figuring_out': 'Tip: chocola. Altijd chocola.'
      },
      planningStyle: {
        'spreadsheet': 'Respect. Maar bereid je voor: de baby heeft je spreadsheet niet gelezen.',
        'go_with_flow': 'Zen-master approach. Kan goed uitpakken... of compleet chaos worden.',
        'balanced': 'Verstandig. Plan A tot Z, maar verwacht plan Ω.'
      }
    };

    return feedbackMap[questionId]?.[value] || '';
  };

  const showToast = (message: string, type: 'success' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[currentStep];
    const newData = { ...data, [currentQuestion.id]: value };
    setData(newData);
    
    const feedback = getFeedback(currentQuestion.id, value);
    if (feedback) {
      showToast(feedback, 'info');
    }

    // No auto-advance - user needs to click button
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    const currentValue = data[currentQuestion.id as keyof OnboardingData];
    
    if (!currentValue && currentQuestion.id !== 'userName' && currentQuestion.id !== 'babyName') {
      return;
    }

    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        const finalData: OnboardingData = {
          dueDate: data.dueDate || '',
          partnerName: data.partnerName || '',
          firstTime: data.firstTime || '',
          biggestWorry: data.biggestWorry || '',
          hormonalApproach: data.hormonalApproach || '',
          planningStyle: data.planningStyle || '',
          babyName: data.babyName || 'de kleine',
          userName: data.userName || 'maat'
        };
        onComplete(finalData);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const currentQuestion = questions[currentStep];
  const currentValue = data[currentQuestion.id as keyof OnboardingData];
  const isLastStep = currentStep === questions.length - 1;
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Minimal Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100/50 p-4 sticky top-0 z-10">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center text-gray-400 disabled:text-gray-300 hover:text-gray-600 transition-colors p-2 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <span className="text-gray-400 text-sm font-medium">
              {currentStep + 1} / {questions.length}
            </span>
          </div>
          
          <div className="w-9" /> {/* Spacer */}
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-sm mx-auto mt-3">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#FEDD03] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto p-6 pt-12">
        <div 
          className={`transition-all duration-300 ${
            isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
          }`}
        >
          {/* Question Card */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">
              {currentQuestion.emoji}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
              {currentQuestion.question}
            </h1>
            
            {currentQuestion.subtitle && (
              <p className="text-gray-500 text-sm">
                {currentQuestion.subtitle}
              </p>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Date Input */}
            {currentQuestion.type === 'date' && (
              <div className="space-y-4">
                <Input
                  type="date"
                  value={currentValue || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  max={new Date(Date.now() + 280 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-lg text-center font-medium focus:border-[#FEDD03] focus:ring-2 focus:ring-[#FEDD03]/20 transition-all"
                />
                {currentValue && (
                  <Button 
                    onClick={handleNext}
                    className="w-full py-4 bg-[#FEDD03] hover:bg-[#E5C503] text-black font-semibold rounded-2xl border-0 text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Volgende
                  </Button>
                )}
              </div>
            )}

            {/* Text Input */}
            {currentQuestion.type === 'text' && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder={currentQuestion.placeholder}
                  value={currentValue || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-lg text-center font-medium focus:border-[#FEDD03] focus:ring-2 focus:ring-[#FEDD03]/20 transition-all"
                />
                <Button 
                  onClick={handleNext}
                  className="w-full py-4 bg-[#FEDD03] hover:bg-[#E5C503] text-black font-semibold rounded-2xl border-0 text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLastStep ? '🚀 Start Project Papa' : 'Volgende'}
                </Button>
              </div>
            )}

            {/* Radio Options */}
            {currentQuestion.type === 'radio' && currentQuestion.options && (
              <div className="space-y-4">
                <RadioGroup 
                  value={currentValue || ''} 
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div 
                      key={option.value} 
                      className={`group transition-all duration-200 ${
                        index === 0 ? 'animate-fadeIn' : 
                        index === 1 ? 'animate-fadeIn animation-delay-100' :
                        index === 2 ? 'animate-fadeIn animation-delay-200' :
                        index === 3 ? 'animate-fadeIn animation-delay-300' :
                        'animate-fadeIn animation-delay-400'
                      }`}
                    >
                      <label 
                        htmlFor={option.value}
                        className="flex items-start space-x-4 p-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer transition-all hover:border-[#FEDD03]/50 hover:shadow-sm transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <RadioGroupItem 
                          value={option.value} 
                          id={option.value}
                          className="mt-1 border-2 border-gray-300 data-[state=checked]:border-[#FEDD03] data-[state=checked]:bg-[#FEDD03] transition-all"
                        />
                        <span className="text-gray-800 leading-relaxed flex-1 text-left">
                          {option.label}
                        </span>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
                
                {/* Continue Button for Radio */}
                {currentValue && (
                  <Button 
                    onClick={handleNext}
                    className="w-full py-4 bg-[#FEDD03] hover:bg-[#E5C503] text-black font-semibold rounded-2xl border-0 text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLastStep ? '🚀 Start Project Papa' : 'Volgende'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-20 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-sm mx-auto px-6">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="mb-3 p-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg animate-slideDown pointer-events-auto"
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  toast.type === 'success' ? 'bg-green-100' : 'bg-[#FEDD03]/20'
                }`}>
                  {toast.type === 'success' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <span className="text-xs">💡</span>
                  )}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed flex-1">
                  {toast.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
