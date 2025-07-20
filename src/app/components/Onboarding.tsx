'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
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

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Partial<OnboardingData>>({});
  const [feedback, setFeedback] = useState<string>('');

  const questions = [
    {
      id: 'dueDate',
      question: 'Wanneer is ze uitgerekend?',
      type: 'date' as const,
      placeholder: 'Selecteer de uitgerekende datum'
    },
    {
      id: 'partnerName',
      question: 'Hoe noem je d\'r meestal?',
      subtitle: 'We gebruiken dit in de verhalen.',
      type: 'text' as const,
      placeholder: 'Schat, liefje, bij haar naam...'
    },
    {
      id: 'firstTime',
      question: 'Eerste keer papa worden?',
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
      subtitle: 'Naam die je al gekozen hebt, of laat leeg',
      type: 'text' as const,
      placeholder: 'De naam, of laat leeg voor "de kleine"'
    },
    {
      id: 'userName',
      question: 'En hoe kunnen we jou noemen?',
      subtitle: 'Maakt het wat persoonlijker.',
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

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[currentStep];
    const newData = { ...data, [currentQuestion.id]: value };
    setData(newData);
    
    const newFeedback = getFeedback(currentQuestion.id, value);
    setFeedback(newFeedback);

    // Auto-advance after showing feedback (except for text inputs)
    if (currentQuestion.type === 'radio' && newFeedback) {
      setTimeout(() => {
        setFeedback('');
        if (currentStep < questions.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }, 2500);
    }
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];
    const currentValue = data[currentQuestion.id as keyof OnboardingData];
    
    if (!currentValue && currentQuestion.id !== 'userName' && currentQuestion.id !== 'babyName') {
      return; // Don't proceed if required field is empty
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
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
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setFeedback('');
    }
  };

  const currentQuestion = questions[currentStep];
  const currentValue = data[currentQuestion.id as keyof OnboardingData];
  const isLastStep = currentStep === questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center text-gray-600 disabled:text-gray-400"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Terug
          </button>
          
          <Image 
            src="/logo-transparant.png" 
            alt="Project Papa" 
            width={100} 
            height={32}
            className="h-8 w-auto"
          />
          
          <span className="text-gray-500 text-sm">
            {currentStep + 1}/{questions.length}
          </span>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Progress */}
          <div className="px-6 pt-6 pb-4">
            <Progress 
              value={((currentStep + 1) / questions.length) * 100} 
              className="mb-2 h-2"
            />
            <p className="text-gray-500 text-sm text-center">
              Stap {currentStep + 1} van {questions.length}
            </p>
          </div>

          {/* Question */}
          <div className="px-6 pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentQuestion.question}
            </h2>
            {currentQuestion.subtitle && (
              <p className="text-gray-600 text-sm mb-6">
                {currentQuestion.subtitle}
              </p>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Date Input */}
              {currentQuestion.type === 'date' && (
                <Input
                  type="date"
                  value={currentValue || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  max={new Date(Date.now() + 280 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 bg-gray-50 border-0 rounded-xl text-base"
                />
              )}

              {/* Text Input */}
              {currentQuestion.type === 'text' && (
                <Input
                  type="text"
                  placeholder={currentQuestion.placeholder}
                  value={currentValue || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full p-4 bg-gray-50 border-0 rounded-xl text-base"
                />
              )}

              {/* Radio Options */}
              {currentQuestion.type === 'radio' && currentQuestion.options && (
                <RadioGroup 
                  value={currentValue || ''} 
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div key={option.value} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <RadioGroupItem 
                        value={option.value} 
                        id={option.value}
                        className="mt-1 border-2 border-gray-300 data-[state=checked]:border-[#FEDD03] data-[state=checked]:bg-[#FEDD03]"
                      />
                      <Label 
                        htmlFor={option.value} 
                        className="text-sm leading-relaxed text-gray-800 cursor-pointer flex-1"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* Feedback */}
              {feedback && (
                <div className="bg-[#FEDD03]/10 border border-[#FEDD03]/30 rounded-xl p-4 mt-4">
                  <p className="text-sm text-gray-800 italic">
                    {feedback}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Continue Button - for text and date inputs */}
          {(currentQuestion.type === 'text' || currentQuestion.type === 'date') && (
            <div className="px-6 pb-6">
              <Button 
                onClick={handleNext}
                disabled={!currentValue && currentQuestion.id !== 'userName' && currentQuestion.id !== 'babyName'}
                className="w-full py-3 bg-[#FEDD03] hover:bg-[#E5C503] text-black font-semibold rounded-xl border-0 disabled:opacity-50"
              >
                {isLastStep ? 'Start Project Papa' : 'Volgende'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
