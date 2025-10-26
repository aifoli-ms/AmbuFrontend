import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { UserPlus, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface RegistrationScreenProps {
  onComplete: (userData: UserData) => void;
}

export interface UserData {
  name: string;
  age: string;
  email?: string;
  phone: string;
  insurance: string;
  ghanaCardNo: string;
}

export function RegistrationScreen({ onComplete }: RegistrationScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserData>({
    name: '',
    age: '',
    email: '',
    phone: '',
    insurance: '',
    ghanaCardNo: ''
  });

  const [errors, setErrors] = useState<Partial<UserData>>({});

  const validateStep1 = () => {
    const newErrors: Partial<UserData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || parseInt(formData.age) < 1) newErrors.age = 'Valid age is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<UserData> = {};
    if (!formData.insurance.trim()) newErrors.insurance = 'Insurance info is required';
    if (!formData.ghanaCardNo.trim()) newErrors.ghanaCardNo = 'Ghana Card number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateField = (field: keyof UserData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col p-6">
      <div className="flex-1 flex flex-col max-w-md w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-8"
        >
          <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus size={40} className="text-white" />
          </div>
          <h1 className="mb-2">Create Your Account</h1>
          <p className="text-gray-600">
            {step === 1 ? 'Basic information for emergency contact' : 'Insurance and identification'}
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-12 h-1 ${step >= 2 ? 'bg-sky-500' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1"
        >
          <Card className="p-6 shadow-lg border-sky-100">
            {step === 1 ? (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-gray-700 mb-2 block">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="e.g., Kwame Mensah"
                    className={`h-12 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="age" className="text-gray-700 mb-2 block">
                    Age <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateField('age', e.target.value)}
                    placeholder="e.g., 28"
                    className={`h-12 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                    min="1"
                  />
                  {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 mb-2 block">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="e.g., 0244123456"
                    className={`h-12 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 mb-2 block">
                    Email <span className="text-gray-400">(Optional)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="e.g., kwame@example.com"
                    className="h-12 border-gray-300"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="insurance" className="text-gray-700 mb-2 block">
                    Insurance Provider <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="insurance"
                    type="text"
                    value={formData.insurance}
                    onChange={(e) => updateField('insurance', e.target.value)}
                    placeholder="e.g., NHIS, Glico, Enterprise"
                    className={`h-12 ${errors.insurance ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.insurance && <p className="text-xs text-red-500 mt-1">{errors.insurance}</p>}
                </div>

                <div>
                  <Label htmlFor="ghanaCard" className="text-gray-700 mb-2 block">
                    Ghana Card Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ghanaCard"
                    type="text"
                    value={formData.ghanaCardNo}
                    onChange={(e) => updateField('ghanaCardNo', e.target.value)}
                    placeholder="e.g., GHA-123456789-0"
                    className={`h-12 ${errors.ghanaCardNo ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.ghanaCardNo && <p className="text-xs text-red-500 mt-1">{errors.ghanaCardNo}</p>}
                </div>

                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start space-x-2">
                    <Shield size={18} className="text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-sky-900 mb-1">Your data is secure</p>
                      <p className="text-xs text-sky-700">
                        Information is encrypted and only used for emergency medical services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button
            onClick={handleNext}
            className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center space-x-2"
          >
            <span>{step === 1 ? 'Continue' : 'Complete Registration'}</span>
            <ArrowRight size={20} />
          </Button>

          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full h-12 flex items-center justify-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
