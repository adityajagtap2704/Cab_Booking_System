import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProfileDetailsCard = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your personal information has been updated.",
    });
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Input id="name" name="name" value={formData.name} onChange={handleChange} className="pl-10" required />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="pl-10" required />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="pl-10" />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <Input id="address" name="address" value={formData.address} onChange={handleChange} className="pl-10" />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit"><Save className="h-4 w-4 mr-2" />Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium">{user?.name}</p></div>
                <div><p className="text-sm text-gray-500">Email Address</p><p className="font-medium">{user?.email}</p></div>
                <div><p className="text-sm text-gray-500">Phone Number</p><p className="font-medium">{user?.phone || 'Not provided'}</p></div>
                <div><p className="text-sm text-gray-500">Address</p><p className="font-medium">{user?.address || 'Not provided'}</p></div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Account Information</h3>
              <div className="space-y-3">
                <div><p className="text-sm text-gray-500">Member Since</p><p className="font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p></div>
                <div><p className="text-sm text-gray-500">Account Status</p><p className="font-medium text-green-600">Active</p></div>
                <div><p className="text-sm text-gray-500">Role</p><p className="font-medium capitalize">{user?.role}</p></div>
              </div>
            </div>
          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div><p className="font-medium">Credit/Debit Card</p><p className="text-sm text-gray-500">Add a payment method</p></div>
              </div>
              <Button variant="outline" size="sm">Add Card</Button>
            </div>
          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Security</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-500" />
                <div><p className="font-medium">Password & Security</p><p className="text-sm text-gray-500">Manage your password</p></div>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsCard;