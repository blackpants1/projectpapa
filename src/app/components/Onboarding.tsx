'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
      question: 'Hoe noem je d\'r meestal? We gebruiken dit in de verhalen.',
      type: 'text' as const,
      placeholder: 'Schat, liefje, bij haar naam, of iets anders...'
    },
    {
      id: 'firstTime',
      question: 'Eerste keer papa worden, of ken je dit circus al?',
      type: 'radio' as const,
      options: [
        { value: 'first_clueless', label: 'Ja, en ik heb nog geen flauw idee waar ik aan begin' },
        { value: 'veteran', label: 'Nee, ik ken de drill al van de vorige keer(en)' },
        { value: 'first_warned', label: 'Ja, maar vrienden hebben me al \'voorbereid\' met horrorverhalen' }
      ]
    },
    {
      id: 'biggestWorry',
      question: 'Eerlijk gezegd, waar lig je \'s nachts het meest wakker van?',
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
      question: 'Hoe ga je om met haar hormonale buien en rare cravings?',
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
      question: 'Ben je iemand die alles tot in detail plant, of ga je gewoon zien wat er gebeurt?',
      type: 'radio' as const,
      options: [
        { value: 'spreadsheet', label: 'Ik heb al een spreadsheet met babynamen en budgetten' },
        { value: 'go_with_flow', label: 'Ik zie wel wat er op mijn pad komt, komt goed' },
        { value: 'balanced', label: 'Beetje van beide: plannen maken maar flexibel blijven' }
      ]
    },
    {
      id: 'babyName',
      question: 'Hoe wil je dat we de kleine noemen?',
      type: 'text' as const,
      placeholder: 'De naam die je al gekozen hebt, of laat leeg voor "de kleine"'
    },
    {
      id: 'userName',
      question: 'En hoe kunnen we jou noemen? Maakt het wat persoonlijker.',
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
      <div className="sticky top-0 bg-white border-b border-gray-100 p-4 z-10">
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

      <div className="max-w-md mx-auto p-6 pb-32">
        {/* Single unified content card - app-like experience */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Progress and intro */}
          <div className="text-center pt-6 pb-2">
            <div className="px-6 mb-4">
              <Progress 
                value={((currentStep + 1) / questions.length) * 100} 
                className="mb-2"
              />
              <p className="text-gray-500 text-sm font-medium">
                {currentStep === 0 ? 'Oké maat, laten we dit even regelen.' : `Vraag ${currentStep + 1} van ${questions.length}`}
              </p>
            </div>
          </div>

          {/* Question */}
          <div className="px-6 pb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 leading-tight">
              {currentQuestion.question}
            </h1>
            
            <div className="space-y-4">
              {/* Date Input */}
              {currentQuestion.type === 'date' && (
                <Input
                  type="date"
                  value={currentValue || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  max={new Date(Date.now() + 280 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  min={new Date().toISOString().split('T')[0]}
                  className="text-base p-4 rounded-xl"
                />
              )}

              {/* Text Input */}
              {currentQuestion.type === 'text' && (
                <Input
                  type="text"
                  placeholder={currentQuestion.placeholder}
                  value={currentValue || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="text-base p-4 rounded-xl"
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
                    <div key={option.value} className="flex items-start space-x-3 p-4 rounded-xl border border-gray-200 hover:border-[#FEDD03] hover:bg-[#FEDD03]/5 transition-colors">
                      <RadioGroupItem 
                        value={option.value} 
                        id={option.value}
                        className="mt-1"
                      />
                      <Label 
                        htmlFor={option.value} 
                        className="text-sm leading-relaxed text-gray-800 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* Feedback */}
              {feedback && (
                <div className="bg-[#FEDD03]/10 border border-[#FEDD03]/30 rounded-2xl p-4 mt-4">
                  <p className="text-sm italic text-gray-800">
                    {feedback}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-full font-semibold text-base disabled:opacity-50"
              >
                ← Terug
              </Button>
              
              <span className="text-sm text-gray-500 font-medium">
                {currentStep + 1} / {questions.length}
              </span>
              
              <Button 
                onClick={handleNext}
                disabled={!currentValue && currentQuestion.id !== 'userName' && currentQuestion.id !== 'babyName'}
                className="px-6 py-3 bg-[#FEDD03] hover:bg-[#E5C503] text-black border-0 rounded-full font-semibold text-base shadow-lg disabled:opacity-50"
              >
                {isLastStep ? 'Start de app!' : 'Volgende →'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
