import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import ProfileSummaryCard from '@/components/profile/ProfileSummaryCard';
import ProfileDetailsCard from '@/components/profile/ProfileDetailsCard';
import DriverVehicleInfoCard from '@/components/profile/DriverVehicleInfoCard';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileSummaryCard />
          <div className="md:col-span-2 space-y-6">
            <ProfileDetailsCard />
            {user?.role === 'driver' && <DriverVehicleInfoCard />}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;