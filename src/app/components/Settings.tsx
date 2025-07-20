'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import InstallModal from './InstallModal';

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

interface SettingsProps {
  userData: OnboardingData;
  onBack: () => void;
  onUpdateUserData: (data: OnboardingData) => void;
  onResetOnboarding: () => void;
}

export default function Settings({ userData, onBack, onUpdateUserData, onResetOnboarding }: SettingsProps) {
  const [formData, setFormData] = useState<OnboardingData>(userData);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  
  const { 
    isInstalled, 
    canShowInstallPrompt,
    isIOS,
    isAndroid 
  } = usePWAInstall();

  const handleSave = () => {
    onUpdateUserData(formData);
    onBack();
  };

  const handleReset = () => {
    if (showResetConfirm) {
      onResetOnboarding();
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 5000);
    }
  };

  const openDonationLink = () => {
    window.open('https://buymeacoffee.com/projectpapa', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 p-4 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-gray-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Terug
          </Button>
          <h1 className="text-2xl font-bold text-black" style={{ fontFamily: 'Caveat, cursive' }}>
            Instellingen
          </h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Personal Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black">
              Persoonlijke gegevens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                Uitgerekende datum
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="partnerName" className="text-sm font-medium text-gray-700">
                Hoe noem je haar meestal?
              </Label>
              <Input
                id="partnerName"
                type="text"
                value={formData.partnerName}
                onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                placeholder="schat, liefje, haar naam..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="babyName" className="text-sm font-medium text-gray-700">
                Hoe wil je dat we de kleine noemen?
              </Label>
              <Input
                id="babyName"
                type="text"
                value={formData.babyName}
                onChange={(e) => setFormData({ ...formData, babyName: e.target.value })}
                placeholder="de gekozen naam of laat leeg"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="userName" className="text-sm font-medium text-gray-700">
                Hoe kunnen we jou noemen?
              </Label>
              <Input
                id="userName"
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                placeholder="je naam of laat leeg voor 'maat'"
                className="mt-1"
              />
            </div>

            <Button 
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold"
            >
              Wijzigingen opslaan
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="border-0 shadow-lg bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black">
              Steun Project Papa ☕️
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-gray-700 leading-relaxed">
              Help je Project Papa groeien? Een klein bedrag helpt ons om meer geweldige content te maken voor aanstaande papa&apos;s.
            </p>
            <Button 
              onClick={openDonationLink}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black border-0 rounded-full font-semibold"
            >
              <span className="mr-2">☕️</span>
              Doneer een biertje voor papa
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* PWA Installation */}
        <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black">
              📱 App installeren
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isInstalled ? (
              <div className="text-center">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-base font-semibold text-green-700 mb-2">
                  App is geïnstalleerd!
                </p>
                <p className="text-sm text-gray-600">
                  Project Papa staat op je beginscherm en werkt als een echte app.
                </p>
              </div>
            ) : canShowInstallPrompt ? (
              <div>
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                  Installeer Project Papa op je {isIOS ? 'iPhone' : isAndroid ? 'Android' : 'apparaat'} voor de beste ervaring. Snellere toegang en werkt offline!
                </p>
                <Button 
                  onClick={() => setShowInstallModal(true)}
                  className="w-full bg-[#FEDD03] hover:bg-[#E5C503] text-black border-0 rounded-full font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Installeer app
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-3">🌐</div>
                <p className="text-base text-gray-700 mb-2">
                  Je gebruikt Project Papa via de browser
                </p>
                <p className="text-sm text-gray-600">
                  Voor de beste ervaring, open deze website op je telefoon om de app te installeren.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* App Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black">
              Over de app
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Project Papa</strong> - De gids voor de man, zonder gedoe</p>
              <p>Versie 1.0.0</p>
              <p>Met liefde gemaakt voor aanstaande papa&apos;s</p>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-0 shadow-lg border-red-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-red-600">
              Opnieuw beginnen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Wil je de onboarding opnieuw doorlopen? Dit wist al je instellingen.
            </p>
            <Button 
              onClick={handleReset}
              variant="outline"
              className={`w-full rounded-full font-semibold ${
                showResetConfirm 
                  ? 'border-red-500 text-red-600 hover:bg-red-50' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {showResetConfirm ? 'Klik nogmaals om te bevestigen' : 'Onboarding opnieuw doen'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Install Modal */}
      <InstallModal 
        isOpen={showInstallModal} 
        onClose={() => setShowInstallModal(false)} 
      />
    </div>
  );
}
