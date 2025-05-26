import React, { useState } from 'react';
import { Car, Edit2, Save, ShieldCheck, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const DriverVehicleInfoCard = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    vehicleModel: user?.vehicleModel || '',
    licensePlate: user?.licensePlate || '',
    vehicleColor: user?.vehicleColor || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(vehicleData);
    setIsEditing(false);
    toast({
      title: "Vehicle Info Updated",
      description: "Your vehicle information has been updated.",
    });
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleModel">Vehicle Model</Label>
              <div className="relative">
                <Input id="vehicleModel" name="vehicleModel" value={vehicleData.vehicleModel} onChange={handleChange} className="pl-10" placeholder="e.g., Toyota Camry" required />
                <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <div className="relative">
                <Input id="licensePlate" name="licensePlate" value={vehicleData.licensePlate} onChange={handleChange} className="pl-10" placeholder="e.g., ABC-123" required />
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleColor">Vehicle Color</Label>
              <div className="relative">
                <Input id="vehicleColor" name="vehicleColor" value={vehicleData.vehicleColor} onChange={handleChange} className="pl-10" placeholder="e.g., Blue" />
                <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit"><Save className="h-4 w-4 mr-2" />Save Vehicle Info</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vehicle Information</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Vehicle Model</p>
          <p className="font-medium">{user?.vehicleModel || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">License Plate</p>
          <p className="font-medium">{user?.licensePlate || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Vehicle Color</p>
          <p className="font-medium">{user?.vehicleColor || 'Not provided'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverVehicleInfoCard;