import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminReportsPage = () => {
  const reportTypes = [
    { id: 'bookings', name: 'Booking Reports', description: 'Detailed reports on all bookings.' },
    { id: 'earnings', name: 'Earnings Reports', description: 'Comprehensive earnings and revenue data.' },
    { id: 'driver_performance', name: 'Driver Performance', description: 'Reports on driver ratings and efficiency.' },
    { id: 'user_activity', name: 'User Activity', description: 'Insights into user engagement and trends.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold flex items-center"><FileText className="mr-2 h-8 w-8" />Reports</h1>

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {reportTypes.map(report => (
            <TabsTrigger key={report.id} value={report.id}>{report.name}</TabsTrigger>
          ))}
        </TabsList>

        {reportTypes.map(report => (
          <TabsContent key={report.id} value={report.id}>
            <Card>
              <CardHeader>
                <CardTitle>{report.name}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Generate Report</h3>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Add date pickers or other filters here */}
                    <Button className="w-full sm:w-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Download CSV
                    </Button>
                    <Button className="w-full sm:w-auto" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Report Preview</h3>
                  <div className="border rounded-lg p-4 min-h-[200px] flex items-center justify-center bg-gray-50">
                    <p className="text-muted-foreground">Report preview will be displayed here.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
};

export default AdminReportsPage;