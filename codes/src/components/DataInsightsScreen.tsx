import { motion } from 'motion/react';
import { Card } from './ui/card';
import { BarChart3, MapPin, AlertCircle, TrendingUp, Clock } from 'lucide-react';

export function DataInsightsScreen() {
  // Mock aggregated, anonymized data for research purposes
  const incidentTypes = [
    { type: 'Road Accidents', count: 234, percentage: 38, color: 'bg-red-500' },
    { type: 'Cardiac Events', count: 156, percentage: 25, color: 'bg-orange-500' },
    { type: 'Falls/Injuries', count: 98, percentage: 16, color: 'bg-yellow-500' },
    { type: 'Breathing Issues', count: 87, percentage: 14, color: 'bg-blue-500' },
    { type: 'Other', count: 43, percentage: 7, color: 'bg-gray-500' }
  ];

  const hotspots = [
    { location: 'Accra Mall Area', incidents: 45, avgTime: '8 mins' },
    { location: 'Achimota Junction', incidents: 38, avgTime: '12 mins' },
    { location: 'Tema Motorway', incidents: 32, avgTime: '15 mins' },
    { location: 'East Legon', incidents: 28, avgTime: '7 mins' }
  ];

  const stats = [
    { label: 'Total Emergencies', value: '618', icon: AlertCircle, color: 'text-red-600' },
    { label: 'Avg Response Time', value: '9.2 min', icon: Clock, color: 'text-sky-600' },
    { label: 'Active Ambulances', value: '42', icon: TrendingUp, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white pb-20">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 mt-8"
        >
          <h1 className="mb-2">Emergency Insights</h1>
          <p className="text-gray-600">Aggregated data for research & planning</p>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4 text-center shadow-md border-sky-100">
                <Icon size={24} className={`${stat.color} mx-auto mb-2`} />
                <p className="text-sm mb-1">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </Card>
            );
          })}
        </motion.div>

        {/* Incident Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="p-5 shadow-md border-sky-100">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 size={20} className="text-sky-600" />
              <h3 className="text-gray-900">Incident Types (Last 30 Days)</h3>
            </div>
            <div className="space-y-4">
              {incidentTypes.map((incident, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-700">{incident.type}</span>
                    <span className="text-gray-900">{incident.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${incident.percentage}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      className={`${incident.color} h-2.5 rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Emergency Hotspots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="p-5 shadow-md border-sky-100">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin size={20} className="text-sky-600" />
              <h3 className="text-gray-900">Emergency Hotspots</h3>
            </div>
            <div className="space-y-3">
              {hotspots.map((spot, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-0.5">{spot.location}</p>
                    <p className="text-xs text-gray-500">{spot.incidents} incidents</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Avg Response</p>
                    <p className="text-sm text-sky-600">{spot.avgTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Heatmap Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card className="p-5 shadow-md border-sky-100">
            <h3 className="text-gray-900 mb-3">Geographic Distribution</h3>
            <div className="relative h-48 bg-gradient-to-br from-sky-100 via-green-50 to-yellow-50 rounded-lg overflow-hidden">
              {/* Simulated heatmap visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-sky-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Interactive heatmap</p>
                  <p className="text-xs text-gray-500">Visual data coming soon</p>
                </div>
              </div>
              
              {/* Heat points */}
              <motion.div
                className="absolute w-16 h-16 bg-red-500 rounded-full opacity-30 blur-xl"
                style={{ top: '20%', left: '60%' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-12 h-12 bg-orange-500 rounded-full opacity-30 blur-xl"
                style={{ top: '60%', left: '30%' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-10 h-10 bg-yellow-500 rounded-full opacity-30 blur-xl"
                style={{ top: '40%', left: '70%' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </Card>
        </motion.div>

        {/* Privacy Notice */}
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-xs text-green-900 text-center">
            <strong>Privacy Protected:</strong> All data is aggregated and anonymized. No personal information is displayed or stored for research purposes.
          </p>
        </Card>
      </div>
    </div>
  );
}
