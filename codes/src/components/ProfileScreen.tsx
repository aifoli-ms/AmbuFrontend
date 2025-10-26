import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { User, Phone, Mail, CreditCard, IdCard, Shield, Edit, LogOut } from 'lucide-react';
import { UserData } from './RegistrationScreen';

interface ProfileScreenProps {
  userData: UserData;
  onEdit: () => void;
  onLogout: () => void;
}

export function ProfileScreen({ userData, onEdit, onLogout }: ProfileScreenProps) {
  const profileItems = [
    { icon: User, label: 'Full Name', value: userData.name },
    { icon: User, label: 'Age', value: userData.age + ' years' },
    { icon: Phone, label: 'Phone Number', value: userData.phone },
    { icon: Mail, label: 'Email', value: userData.email || 'Not provided' },
    { icon: CreditCard, label: 'Insurance', value: userData.insurance },
    { icon: IdCard, label: 'Ghana Card', value: userData.ghanaCardNo }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white pb-20">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-8"
        >
          <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={48} className="text-white" />
          </div>
          <h1 className="mb-1">{userData.name}</h1>
          <p className="text-gray-600">Member since Oct 2025</p>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-6"
        >
          <Card className="p-5 shadow-md border-sky-100">
            <h3 className="text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              {profileItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <Icon size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                      <p className="text-sm text-gray-900">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Security Notice */}
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-start space-x-3">
              <Shield size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-900 mb-1">Verified Account</p>
                <p className="text-xs text-green-700">
                  Your information is encrypted and protected according to Ghana's data protection laws.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <Button
            onClick={onEdit}
            className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center space-x-2"
          >
            <Edit size={18} />
            <span>Edit Profile</span>
          </Button>

          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full h-12 border-red-300 text-red-600 hover:bg-red-50 flex items-center justify-center space-x-2"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </Button>
        </motion.div>

        <p className="text-center text-xs text-gray-500 mt-8">
          AmbuLink v1.0 • Emergency Medical Services
        </p>
      </div>
    </div>
  );
}
