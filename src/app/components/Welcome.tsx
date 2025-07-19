'use client';

import { Button } from '@/components/ui/button';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  
  return (
    <div className="min-h-screen bg-gray-400">
      {/* Mobile Status Bar Simulation */}
      <div className="bg-gray-500 text-white text-sm px-4 py-2 flex justify-between items-center">
        <span>09:19 🟢 🔄</span>
        <span>📶 📶 🔋 93%</span>
      </div>

      {/* App Header */}
      <div className="bg-gray-500 text-white px-4 py-3 flex items-center justify-between">
        <span className="font-medium">Hey, Project Papa</span>
        <div className="w-8 h-8 bg-[#FEDD03] rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-lg">🍼</span>
        </div>
      </div>

      {/* Main Content Modal/Sheet */}
      <div className="bg-white rounded-t-3xl mt-8 min-h-[calc(100vh-120px)] overflow-hidden relative">
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button className="w-8 h-8 flex items-center justify-center">
            <span className="text-gray-400 text-xl">×</span>
          </button>
        </div>

        {/* Share button */}
        <div className="absolute top-4 right-16">
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-600">↗</span>
          </button>
        </div>

        {/* App Icon in Circle */}
        <div className="flex justify-center -mt-4 mb-6">
          <div className="w-20 h-20 bg-[#FEDD03] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">🍼</span>
          </div>
        </div>

        {/* Title and Supporters */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Papa</h1>
          <div className="flex items-center justify-center text-gray-500 text-sm mb-6">
            <span className="mr-1">♡</span>
            <span>1,000+ Supporters</span>
          </div>

          {/* Main CTA Button */}
          <div className="px-6">
            <Button
              onClick={onStart}
              className="w-full bg-[#FEDD03] hover:bg-[#E5C503] text-black font-bold py-4 rounded-full text-lg shadow-lg border-0"
            >
              <span className="mr-2">🔄</span>
              Start je papa-journey
            </Button>
          </div>
        </div>

        {/* App Features List - BMAC style */}
        <div className="px-6 space-y-0">
          {/* Edit page equivalent */}
          <div className="flex items-center py-4 border-b border-gray-100">
            <div className="w-10 h-10 flex items-center justify-center mr-4">
              <span className="text-xl">📝</span>
            </div>
            <span className="text-gray-900 font-medium">Dagelijkse papa-updates</span>
          </div>

          {/* Notifications equivalent */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center mr-4">
                <span className="text-xl">🔔</span>
              </div>
              <span className="text-gray-900 font-medium">Slimme tips & tricks</span>
            </div>
            <div className="w-12 h-6 bg-[#FEDD03] rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
            </div>
          </div>

          {/* Help center equivalent */}
          <div className="flex items-center py-4 border-b border-gray-100">
            <div className="w-10 h-10 flex items-center justify-center mr-4">
              <span className="text-xl">❓</span>
            </div>
            <span className="text-gray-900 font-medium">Man-tot-man advies</span>
          </div>

          {/* Rate app equivalent */}
          <div className="flex items-center py-4 border-b border-gray-100">
            <div className="w-10 h-10 flex items-center justify-center mr-4">
              <span className="text-xl">⭐</span>
            </div>
            <span className="text-gray-900 font-medium">Humor waar je het nodig hebt</span>
          </div>

          {/* Delete account equivalent */}
          <div className="flex items-center py-4 border-b border-gray-100">
            <div className="w-10 h-10 flex items-center justify-center mr-4">
              <span className="text-xl">🎯</span>
            </div>
            <span className="text-gray-900 font-medium">Geen medische prietpraat</span>
          </div>

          {/* Final item */}
          <div className="flex items-center py-4">
            <div className="w-10 h-10 flex items-center justify-center mr-4">
              <span className="text-xl">🚀</span>
            </div>
            <span className="text-gray-900 font-medium">Klaar in 2 minuten</span>
          </div>
        </div>

        {/* Bottom testimonial section */}
        <div className="px-6 pt-6 pb-8">
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-[#FEDD03] text-xl mb-3">★★★★★</div>
            <p className="text-gray-700 italic text-sm leading-relaxed mb-3">
              &ldquo;Eindelijk iemand die me niet behandelt alsof ik een complete idioot ben. Deze app heeft me door de eerste maanden gesleept.&rdquo;
            </p>
            <p className="text-gray-500 text-xs">
              <strong>Mark</strong> • Papa van 2
            </p>
          </div>
        </div>
      </div>

      {/* Bottom indicator like iOS */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
