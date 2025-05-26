import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, PlusCircle, Edit, Trash2, ToggleLeft, ToggleRight, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ManageDriversPage = () => {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockDrivers = [
      { id: 'd1', name: 'Driver One', email: 'driver1@example.com', phone: '555-0101', vehicle: 'Toyota Prius - ABC123', status: 'active', joined: '2023-01-01' },
      { id: 'd2', name: 'Driver Two', email: 'driver2@example.com', phone: '555-0102', vehicle: 'Honda Civic - XYZ789', status: 'inactive', joined: '2023-02-15' },
    ];
    setDrivers(mockDrivers);
  }, []);

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDriverStatus = (driverId) => {
    setDrivers(prevDrivers =>
      prevDrivers.map(driver =>
        driver.id === driverId ? { ...driver, status: driver.status === 'active' ? 'inactive' : 'active' } : driver
      )
    );
    toast({ title: "Driver status updated" });
  };

  const deleteDriver = (driverId) => {
    setDrivers(prevDrivers => prevDrivers.filter(driver => driver.id !== driverId));
    toast({ title: "Driver deleted", variant: "destructive" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center"><Users className="mr-2 h-8 w-8" />Manage Drivers</h1>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Driver</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Driver List</CardTitle>
          <div className="relative mt-2">
            <Input
              type="text"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Contact</th>
                  <th scope="col" className="px-6 py-3">Vehicle</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Joined</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map(driver => (
                  <tr key={driver.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{driver.name}</td>
                    <td className="px-6 py-4">
                      <div>{driver.email}</div>
                      <div className="text-xs text-gray-500">{driver.phone}</div>
                    </td>
                    <td className="px-6 py-4">{driver.vehicle}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${driver.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(driver.joined).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleDriverStatus(driver.id)}>
                        {driver.status === 'active' ? <ToggleRight className="h-5 w-5 text-green-500" /> : <ToggleLeft className="h-5 w-5 text-red-500" />}
                      </Button>
                      <Button variant="ghost" size="icon"><Edit className="h-5 w-5 text-blue-500" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteDriver(driver.id)}><Trash2 className="h-5 w-5 text-red-500" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredDrivers.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No drivers found.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ManageDriversPage;