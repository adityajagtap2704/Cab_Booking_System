import React from 'react';
import { motion } from 'framer-motion';
import { Users, Car, BookOpen, DollarSign, TrendingUp, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import DriverHeatmapPlaceholder from '@/components/admin/DriverHeatmapPlaceholder';

const AdminDashboardPage = () => {
  const stats = [
    { title: 'Total Users', value: '1,250', icon: <Users className="h-6 w-6 text-blue-500" />, color: 'bg-blue-100' },
    { title: 'Total Drivers', value: '350', icon: <Users className="h-6 w-6 text-green-500" />, color: 'bg-green-100' },
    { title: 'Total Cabs', value: '300', icon: <Car className="h-6 w-6 text-yellow-500" />, color: 'bg-yellow-100' },
    { title: 'Active Bookings', value: '75', icon: <BookOpen className="h-6 w-6 text-purple-500" />, color: 'bg-purple-100' },
    { title: 'Total Revenue', value: '$15,600', icon: <DollarSign className="h-6 w-6 text-red-500" />, color: 'bg-red-100' },
  ];

  // Mock data for revenue metrics
  const revenueMetrics = {
    totalRevenue: '$156,389.42',
    monthlyGrowth: '+12.5%',
    avgRideValue: '$23.50',
    activeDrivers: '285',
    completionRate: '95.8%',
    pendingApprovals: '12',
    systemUptime: '99.9%',
    customerSatisfaction: '4.8/5'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Administrator</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">System Status</p>
            <p className="text-sm text-green-600 flex items-center">
              <ShieldCheck className="h-4 w-4 mr-1" /> All Systems Operational
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{revenueMetrics.totalRevenue}</div>
            <p className="flex items-center text-blue-100">
              <TrendingUp className="h-4 w-4 mr-1" /> {revenueMetrics.monthlyGrowth} this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Active Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{revenueMetrics.activeDrivers}</div>
            <p className="text-muted-foreground">Currently on duty</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{revenueMetrics.completionRate}</div>
            <p className="text-muted-foreground">Successful rides</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Avg. Ride Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{revenueMetrics.avgRideValue}</div>
            <p className="text-muted-foreground">Per completed ride</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '2 minutes ago', event: 'New driver registration pending approval', type: 'warning' },
                { time: '15 minutes ago', event: 'System maintenance completed successfully', type: 'success' },
                { time: '1 hour ago', event: 'Monthly revenue report generated', type: 'info' },
                { time: '2 hours ago', event: 'Customer support ticket resolved', type: 'success' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    activity.type === 'success' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> :
                     activity.type === 'success' ? <ShieldCheck className="h-4 w-4" /> :
                     <Clock className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.event}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time monitoring and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">System Uptime</p>
                  <p className="text-2xl font-bold text-green-600">{revenueMetrics.systemUptime}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-blue-600">{revenueMetrics.customerSatisfaction}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Pending Approvals</p>
                <p className="text-2xl font-bold text-yellow-600">{revenueMetrics.pendingApprovals}</p>
                <p className="text-sm text-muted-foreground">Requires immediate attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;