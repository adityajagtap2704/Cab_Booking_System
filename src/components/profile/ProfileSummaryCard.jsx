import React from 'react';
import { Mail, Phone, MapPin, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const ProfileSummaryCard = ({ onEditClick }) => {
  const { user } = useAuth();

  return (
    <Card className="md:col-span-1">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-2xl bg-blue-100 text-blue-800">
              {user?.name?.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">{user?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <span className="text-sm truncate">{user?.email}</span>
          </div>
          {user?.phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span className="text-sm">{user.phone}</span>
            </div>
          )}
          {user?.address && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-sm">{user.address}</span>
            </div>
          )}
          <div className="pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onEditClick} 
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummaryCard;