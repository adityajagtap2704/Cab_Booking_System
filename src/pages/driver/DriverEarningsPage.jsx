import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

const DriverEarningsPage = () => {
  const earningsData = {
    daily: {
      total: 120.50,
      rides: 8,
      breakdown: [
        { time: '9:00 AM', fare: 15.00, tip: 2.00 },
        { time: '10:30 AM', fare: 22.50, tip: 3.00 },
        { time: '1:00 PM', fare: 12.00, tip: 1.50 },
      ],
    },
    weekly: {
      total: 750.25,
      rides: 45,
      breakdown: [
        { day: 'Monday', earnings: 110.00 },
        { day: 'Tuesday', earnings: 130.50 },
        { day: 'Wednesday', earnings: 95.75 },
      ],
    },
    monthly: {
      total: 3200.80,
      rides: 180,
      breakdown: [
        { week: 'Week 1', earnings: 780.00 },
        { week: 'Week 2', earnings: 820.50 },
        { week: 'Week 3', earnings: 750.25 },
      ],
    },
  };

  const renderBreakdown = (period, data) => (
    <div className="mt-4 space-y-2">
      {data.breakdown.slice(0, 5).map((item, index) => (
        <div key={index} className="flex justify-between p-2 bg-gray-50 rounded-md">
          <span className="text-sm">{item.time || item.day || item.week}</span>
          <span className="text-sm font-medium">
            {period === 'daily' ? `$${(item.fare + item.tip).toFixed(2)}` : `$${item.earnings.toFixed(2)}`}
          </span>
        </div>
      ))}
      {data.breakdown.length > 5 && <p className="text-xs text-muted-foreground text-center">Showing first 5 items...</p>}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold flex items-center"><DollarSign className="mr-2 h-8 w-8" />Earnings Summary</h1>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Earnings</CardTitle>
              <CardDescription>Summary of your earnings for today.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">${earningsData.daily.total.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground mb-4">{earningsData.daily.rides} rides completed</p>
              <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> View Detailed Report</Button>
              {renderBreakdown('daily', earningsData.daily)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Earnings</CardTitle>
              <CardDescription>Summary of your earnings for this week.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">${earningsData.weekly.total.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground mb-4">{earningsData.weekly.rides} rides completed</p>
              <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> View Detailed Report</Button>
              {renderBreakdown('weekly', earningsData.weekly)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
              <CardDescription>Summary of your earnings for this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">${earningsData.monthly.total.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground mb-4">{earningsData.monthly.rides} rides completed</p>
              <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> View Detailed Report</Button>
              {renderBreakdown('monthly', earningsData.monthly)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><BarChart2 className="mr-2 h-5 w-5" />Earnings Trend</CardTitle>
          <CardDescription>Visual representation of your earnings over time.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-md">
          <p className="text-muted-foreground">Earnings chart will be displayed here.</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DriverEarningsPage;