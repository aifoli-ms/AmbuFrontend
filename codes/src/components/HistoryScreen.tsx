import { motion } from 'motion/react';
import { Card } from './ui/card';
import { AlertCircle, Calendar, MapPin, Clock, Phone } from 'lucide-react';

export function HistoryScreen() {
  // Mock data for demonstration - will be replaced with database data in the future
  const mockHistory = [
    {
      id: 'AMB-20251024-0231',
      date: 'Oct 24, 2025',
      time: '14:32',
      location: 'Accra Mall, East Legon',
      status: 'Completed',
      responseTime: '7 mins',
      crew: 'Kwame Mensah'
    },
    {
      id: 'AMB-20251018-0145',
      date: 'Oct 18, 2025',
      time: '09:15',
      location: 'Achimota, Accra',
      status: 'Completed',
      responseTime: '12 mins',
      crew: 'Ama Boateng'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 mt-8"
        >
          <h1 className="mb-2">Emergency History</h1>
          <p className="text-gray-600">Your past ambulance requests</p>
        </motion.div>

        {/* History List */}
        <div className="space-y-4">
          {mockHistory.length > 0 ? (
            mockHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-5 shadow-md border-gray-200 hover:border-sky-300 transition-colors cursor-pointer">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertCircle size={20} className="text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Request ID</p>
                          <p className="">{item.id}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full border text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Date & Time</p>
                          <p className="text-sm">{item.date}</p>
                          <p className="text-xs text-gray-600">{item.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Response Time</p>
                          <p className="text-sm">{item.responseTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm">{item.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                      <Phone size={14} className="text-gray-400" />
                      <p className="text-xs text-gray-600">Crew: {item.crew}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={40} className="text-gray-400" />
              </div>
              <h3 className="text-gray-900 mb-2">No History Yet</h3>
              <p className="text-gray-600 text-sm max-w-xs mx-auto">
                Your emergency requests will appear here for future reference
              </p>
            </motion.div>
          )}
        </div>

        {/* Info Notice */}
        <Card className="p-4 bg-sky-50 border-sky-200 mt-6">
          <p className="text-xs text-sky-900 text-center">
            <strong>Note:</strong> Complete history with database integration coming soon. Current data is stored locally.
          </p>
        </Card>
      </div>
    </div>
  );
}
