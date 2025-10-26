import { motion } from 'motion/react';
import { Button } from './ui/button';
import { MapPin, Mic, Phone, Edit3, Wifi, WifiOff, AlertCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

interface EmergencyRequestScreenProps {
  onRequestAmbulance: () => void;
  onVoiceInput: () => void;
  onOfflineMode: () => void;
}

export function EmergencyRequestScreen({
  onRequestAmbulance,
  onVoiceInput,
  onOfflineMode
}: EmergencyRequestScreenProps) {
  const [location, setLocation] = useState('Detecting location...');
  const [isOnline, setIsOnline] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Simulate location detection
    setTimeout(() => {
      setLocation('Accra Mall, East Legon, Accra');
    }, 1500);

    // Monitor connection status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (showCountdown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showCountdown && countdown === 0) {
      setShowCountdown(false);
      onRequestAmbulance();
      setCountdown(7);
    }

    return () => clearTimeout(timer);
  }, [showCountdown, countdown, onRequestAmbulance]);

  const handleEmergencyClick = () => {
    setShowCountdown(true);
    setCountdown(7);
  };

  const handleCancelCountdown = () => {
    setShowCountdown(false);
    setCountdown(7);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-sky-500 text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white">AmbuLink</h2>
          <div className="flex items-center space-x-1">
            {isOnline ? (
              <Wifi size={16} className="text-white" />
            ) : (
              <WifiOff size={16} className="text-red-200" />
            )}
          </div>
        </div>
        <p className="text-sky-100 text-sm">Emergency ambulance service</p>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 -mt-4">
        {/* Location Card */}
        <Card className="w-full max-w-md bg-white shadow-lg rounded-xl p-4 mb-8 border-sky-100">
          <div className="flex items-start space-x-3">
            <MapPin className="text-sky-500 flex-shrink-0 mt-1" size={20} />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Your current location</p>
              <p className="text-sm text-gray-800">{location}</p>
            </div>
            <button className="text-sky-500 hover:text-sky-600">
              <Edit3 size={16} />
            </button>
          </div>
        </Card>

        {/* Main Emergency Button */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{
              scale: isPressed ? 0.95 : 1,
            }}
            transition={{ duration: 0.1 }}
          >
            <motion.button
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
              onTouchStart={() => setIsPressed(true)}
              onTouchEnd={() => setIsPressed(false)}
              onClick={handleEmergencyClick}
              className="relative w-64 h-64 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-2xl flex flex-col items-center justify-center text-white hover:from-red-600 hover:to-red-700 transition-all active:shadow-xl"
            >
              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 rounded-full bg-red-400"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <AlertCircle size={64} strokeWidth={2} className="mb-3 relative z-10" />
              <span className="text-2xl relative z-10">Request</span>
              <span className="text-2xl relative z-10">Ambulance</span>
              <span className="text-sm mt-2 text-red-100 relative z-10">Tap here</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-3 mb-6">
          <Button
            onClick={onVoiceInput}
            className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center space-x-3"
          >
            <Mic size={20} />
            <span>Describe Emergency by Voice</span>
          </Button>

          {!isOnline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-hidden"
            >
              <Button
                onClick={onOfflineMode}
                variant="outline"
                className="w-full h-14 border-orange-500 text-orange-600 hover:bg-orange-50 flex items-center justify-center space-x-3"
              >
                <Phone size={20} />
                <span>Call Emergency Line (Offline)</span>
              </Button>
            </motion.div>
          )}

          <p className="text-center text-xs text-gray-500 pt-2">
            Average response time: 8-12 minutes
          </p>
        </div>
      </div>

      {/* Countdown Dialog */}
      <AlertDialog open={showCountdown} onOpenChange={setShowCountdown}>
        <AlertDialogContent className="max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Requesting Ambulance...</AlertDialogTitle>
          </AlertDialogHeader>
          
          <div className="my-6 text-center">
            <motion.div
              className="w-32 h-32 mx-auto rounded-full bg-red-500 flex items-center justify-center text-white mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-6xl">{countdown}</span>
            </motion.div>
            <p className="text-gray-700 mb-2">
              Ambulance will be dispatched in {countdown} seconds
            </p>
            <p className="text-sm text-gray-500">
              Tap cancel if this was a mistake
            </p>
          </div>

          <AlertDialogFooter className="flex-col space-y-2 sm:space-y-2">
            <Button
              onClick={handleCancelCountdown}
              variant="outline"
              className="w-full h-12 border-red-500 text-red-600 hover:bg-red-50 flex items-center justify-center space-x-2"
            >
              <X size={18} />
              <span>Cancel Request</span>
            </Button>
            <p className="text-xs text-gray-500 text-center">
            
            </p>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
