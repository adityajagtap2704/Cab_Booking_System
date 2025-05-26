import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import ProfileSummaryCard from '@/components/profile/ProfileSummaryCard';
import ProfileDetailsCard from '@/components/profile/ProfileDetailsCard';
import DriverVehicleInfoCard from '@/components/profile/DriverVehicleInfoCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const DriverProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Driver Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileSummaryCard />
          <div className="md:col-span-2 space-y-6">
            <ProfileDetailsCard />
            <DriverVehicleInfoCard />
            <Card>
              <CardHeader>
                <CardTitle>Ratings & Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <Star className="h-5 w-5 text-gray-300 mr-1" />
                  <span className="ml-2 text-lg font-semibold">4.8</span>
                  <span className="text-sm text-muted-foreground ml-1">(125 reviews)</span>
                </div>
                <p className="text-muted-foreground">Recent reviews will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DriverProfilePage;