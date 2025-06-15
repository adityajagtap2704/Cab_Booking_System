
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Car, BookOpen, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DriverHeatmapPlaceholder from '@/components/admin/DriverHeatmapPlaceholder';

const AdminDashboardPage = () => {
  const stats = [
    { title: 'Total Users', value: '1,250', icon: <Users className="h-6 w-6 text-blue-500" />, color: 'bg-blue-100' },
    { title: 'Total Drivers', value: '350', icon: <Users className="h-6 w-6 text-green-500" />, color: 'bg-green-100' },
    { title: 'Total Cabs', value: '300', icon: <Car className="h-6 w-6 text-yellow-500" />, color: 'bg-yellow-100' },
    { title: 'Active Bookings', value: '75', icon: <BookOpen className="h-6 w-6 text-purple-500" />, color: 'bg-purple-100' },
    { title: 'Total Revenue', value: '$15,600', icon: <DollarSign className="h-6 w-6 text-red-500" />, color: 'bg-red-100' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month (mock data)
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Booking data will be displayed here. Backend required.</p>
          </CardContent>
        </Card>
        <DriverHeatmapPlaceholder />
      </div>
      <p className="text-sm text-muted-foreground">
        Driver auto-reassignment is a backend process. If a ride isn't accepted quickly, it's automatically offered to another driver. No direct UI for this on admin dash unless showing reassignment events.
      </p>
    </motion.div>
  );
};

export default AdminDashboardPage;