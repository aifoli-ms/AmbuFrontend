import { useState, useEffect } from 'react';
import { RegistrationScreen, UserData } from './components/RegistrationScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { EmergencyRequestScreen } from './components/EmergencyRequestScreen';
import { VoiceInputScreen } from './components/VoiceInputScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { TrackingScreen } from './components/TrackingScreen';
import { OfflineFallbackScreen } from './components/OfflineFallbackScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { DataInsightsScreen } from './components/DataInsightsScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type Screen = 
  | 'registration'
  | 'onboarding' 
  | 'main'
  | 'voice-input' 
  | 'confirmation' 
  | 'tracking' 
  | 'offline'
  | 'complete';

type Tab = 'home' | 'history' | 'profile' | 'insights';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('registration');
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  // Check if user is already registered
  useEffect(() => {
    const savedUserData = localStorage.getItem('ambulink_user');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setIsRegistered(true);
      setCurrentScreen('main');
    }
  }, []);

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('ambulink_user', JSON.stringify(data));
    setIsRegistered(true);
    setCurrentScreen('onboarding');
    toast.success('Registration successful!');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('main');
  };

  const handleRequestAmbulance = () => {
    toast.success('Processing your emergency request...');
    setTimeout(() => {
      setCurrentScreen('confirmation');
    }, 1000);
  };

  const handleVoiceInput = () => {
    setCurrentScreen('voice-input');
  };

  const handleVoiceConfirm = () => {
    toast.success('Emergency details confirmed');
    setTimeout(() => {
      setCurrentScreen('confirmation');
    }, 800);
  };

  const handleTrackAmbulance = () => {
    setCurrentScreen('tracking');
  };

  const handleOfflineMode = () => {
    setCurrentScreen('offline');
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
  };

  const handleTrackingComplete = () => {
    setCurrentScreen('complete');
  };

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab);
    if (currentScreen !== 'main') {
      setCurrentScreen('main');
    }
  };

  const handleEditProfile = () => {
    toast.info('Profile editing coming soon');
  };

  const handleLogout = () => {
    localStorage.removeItem('ambulink_user');
    setUserData(null);
    setIsRegistered(false);
    setCurrentScreen('registration');
    toast.success('Logged out successfully');
  };

  // Show navigation for main screens only
  const showNavigation = currentScreen === 'main' && isRegistered;

  // Render main screen content based on current tab
  const renderMainContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <EmergencyRequestScreen
            onRequestAmbulance={handleRequestAmbulance}
            onVoiceInput={handleVoiceInput}
            onOfflineMode={handleOfflineMode}
          />
        );
      case 'history':
        return <HistoryScreen />;
      case 'insights':
        return <DataInsightsScreen />;
      case 'profile':
        return userData ? (
          <ProfileScreen
            userData={userData}
            onEdit={handleEditProfile}
            onLogout={handleLogout}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        {currentScreen === 'registration' && (
          <RegistrationScreen onComplete={handleRegistrationComplete} />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        )}

        {currentScreen === 'main' && renderMainContent()}

        {currentScreen === 'voice-input' && (
          <VoiceInputScreen
            onConfirm={handleVoiceConfirm}
            onBack={handleBackToMain}
          />
        )}

        {currentScreen === 'confirmation' && (
          <ConfirmationScreen onTrack={handleTrackAmbulance} />
        )}

        {currentScreen === 'tracking' && (
          <TrackingScreen onComplete={handleTrackingComplete} />
        )}

        {currentScreen === 'offline' && (
          <OfflineFallbackScreen onBack={handleBackToMain} />
        )}

        {currentScreen === 'complete' && (
          <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6 pb-20">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">✓</span>
              </div>
              <h1 className="mb-4">Ambulance Arrived</h1>
              <p className="text-gray-600 mb-8">
                You're in safe hands now. The paramedics will take care of you.
              </p>
              <button
                onClick={() => {
                  setCurrentScreen('main');
                  setCurrentTab('home');
                }}
                className="text-sky-600 hover:text-sky-700"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        {showNavigation && (
          <BottomNavigation currentTab={currentTab} onTabChange={handleTabChange} />
        )}
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
