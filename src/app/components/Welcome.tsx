'use client';

import { Button } from '@/components/ui/button';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="mb-16">
          <h1 className="text-8xl font-bold text-black mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
            Project Papa
          </h1>
        </div>

        {/* Social Proof */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 text-lg text-gray-700">
            <span className="text-green-500">★★★★★</span>
            <span>Vertrouwd door 1.000+ aanstaande papa's</span>
          </div>
        </div>

        {/* Main Story Title */}
        <div className="mb-12">
          <h2 className="text-6xl font-bold text-black mb-8" style={{ fontFamily: 'Caveat, cursive' }}>
            Ons Verhaal
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-lg mx-auto">
            Alle zwangerschaps-apps zijn gemaakt voor vrouwen. Wij maakten er één voor mannen.
          </p>
        </div>

        {/* Story Content */}
        <div className="text-left space-y-8 mb-16 max-w-xl mx-auto">
          <p className="text-lg text-gray-800 leading-relaxed">
            <span className="text-6xl float-left mr-4 leading-none" style={{ fontFamily: 'Caveat, cursive' }}>A</span>
            lle zwangerschaps-apps zijn vol roze kleurtjes, "mommy-to-be" taal en medische termen. 
            Maar wat moet jij met "je kleine engeltje groeit vandaag"? Jij wilt gewoon weten wat er 
            gebeurt, zonder tuttige taal of overdreven sentiment.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed">
            Daarom maakten we Project Papa. Van man tot man. Geen bullshit, wel humor. 
            Geen medische handleiding, wel echte verhalen die je daadwerkelijk helpen.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed">
            280 dagen van zwangerschap, verteld zoals jij het wilt horen. Met de humor die je 
            nodig hebt en de eerlijkheid die je verdient. Elke dag een update in normale 
            mensen-taal, met situaties die je herkent en tips die daadwerkelijk werken.
          </p>

          <p className="text-lg text-gray-800 leading-relaxed">
            Want papa worden is al moeilijk genoeg zonder dat je je uitgesloten voelt door 
            de tools die er zijn.
          </p>
        </div>

        {/* Authority */}
        <div className="mb-8 text-center">
          <p className="text-base text-gray-600 italic">
            "Eindelijk een app die spreekt mijn taal spreekt" - <strong>Mark, papa van 2</strong>
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-6">
          <Button 
            onClick={onStart}
            className="w-full max-w-md mx-auto py-6 px-16 bg-yellow-400 hover:bg-yellow-500 text-black border-0 rounded-full font-bold text-2xl shadow-xl transition-all hover:shadow-2xl hover:scale-105"
          >
            Start mijn papa-gids
          </Button>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Gratis • Duurt 2 minuten • Geen gedoe
            </p>
            <p className="text-xs text-gray-400">
              Al 847 papa's deze week gestart
            </p>
          </div>
        </div>

        {/* Reciprocity - Free value */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 italic">
            💡 <strong>Bonus:</strong> Direct toegang tot de "Survival Kit voor Week 1" 
            zodra je start
          </p>
        </div>
      </div>
    </div>
  );
}
