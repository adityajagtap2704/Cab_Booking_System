import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Search, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import AddDialog from '@/components/admin/AddDialog';
import EditDialog from '@/components/admin/EditDialog';

const ManageCabsPage = () => {
  const { toast } = useToast();
  const [cabs, setCabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedCab, setSelectedCab] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    const mockCabs = [
      { id: 'c1', model: 'Toyota Camry', licensePlate: 'ABC-123', type: 'Sedan', driver: 'John Doe', status: 'Active' },
      { id: 'c2', model: 'Honda CRV', licensePlate: 'XYZ-789', type: 'SUV', driver: 'Jane Smith', status: 'Maintenance' },
      { id: 'c3', model: 'Ford Transit', licensePlate: 'DEF-456', type: 'XL', driver: 'Mike Brown', status: 'Active' },
    ];
    setCabs(mockCabs);
  }, []);

  const filteredCabs = cabs.filter(cab =>
    cab.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cab.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cab.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteCab = (cabId) => {
    setCabs(prevCabs => prevCabs.filter(cab => cab.id !== cabId));
    toast({ title: "Cab deleted", variant: "destructive" });
  };

  const cabTypes = ['Sedan', 'SUV', 'XL', 'Premium', 'Compact'];
  const statusOptions = ['Active', 'Maintenance', 'Reserved', 'Out_Of_Service', 'Cleaning'];

  const cabFields = [
    { name: 'model', label: 'Vehicle Model', required: true },
    { name: 'licensePlate', label: 'License Plate', required: true },
    { 
      name: 'type', 
      label: 'Vehicle Type', 
      required: true,
      type: 'select',
      options: cabTypes
    },
    { name: 'driver', label: 'Assigned Driver', required: true },
    { 
      name: 'status', 
      label: 'Status', 
      required: true,
      type: 'select',
      options: statusOptions
    },
  ];

  const handleAddCab = (data) => {
    // Validate license plate format
    const licensePlateRegex = /^[A-Z0-9-]{6,8}$/;
    if (!licensePlateRegex.test(data.licensePlate)) {
      toast({ 
        title: "Invalid License Plate", 
        description: "Please enter a valid license plate format",
        variant: "destructive" 
      });
      return;
    }

    // Check for duplicate license plate
    if (cabs.some(cab => cab.licensePlate === data.licensePlate)) {
      toast({ 
        title: "Duplicate License Plate", 
        description: "This license plate is already registered",
        variant: "destructive" 
      });
      return;
    }

    setCabs(prev => [...prev, {
      id: Date.now().toString(),
      ...data,
      status: data.status || 'Active',
      driver: data.driver || 'Unassigned'
    }]);
    toast({ title: "Cab added successfully" });
  };

  const handleEditCab = (data) => {
    // Validate license plate format
    const licensePlateRegex = /^[A-Z0-9-]{6,8}$/;
    if (!licensePlateRegex.test(data.licensePlate)) {
      toast({ 
        title: "Invalid License Plate", 
        description: "Please enter a valid license plate format",
        variant: "destructive" 
      });
      return;
    }

    // Check for duplicate license plate excluding current cab
    if (cabs.some(cab => 
      cab.licensePlate === data.licensePlate && cab.id !== selectedCab.id
    )) {
      toast({ 
        title: "Duplicate License Plate", 
        description: "This license plate is already registered",
        variant: "destructive" 
      });
      return;
    }

    setCabs(prevCabs =>
      prevCabs.map(cab =>
        cab.id === selectedCab.id ? { ...cab, ...data } : cab
      )
    );
    toast({ title: "Cab updated successfully" });
  };

  const openEditDialog = (cab) => {
    setSelectedCab(cab);
    setShowEditDialog(true);
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reserved':
        return 'bg-blue-100 text-blue-800';
      case 'Out_Of_Service':
        return 'bg-red-100 text-red-800';
      case 'Cleaning':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center"><Car className="mr-2 h-8 w-8" />Manage Cabs</h1>
        <Button onClick={() => setShowAddDialog(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add New Cab</Button>
      </div>

      <AddDialog
        title="Add New Cab"
        fields={cabFields}
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSubmit={handleAddCab}
      />

      <EditDialog
        title="Edit Cab"
        fields={cabFields}
        data={selectedCab}
        isOpen={showEditDialog}
        onClose={() => {
          setShowEditDialog(false);
          setSelectedCab(null);
        }}
        onSubmit={handleEditCab}
      />

      <Card>
        <CardHeader>
          <CardTitle>Cab List</CardTitle>
          <div className="relative mt-2">
            <Input
              type="text"
              placeholder="Search cabs..."
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
                  <th scope="col" className="px-6 py-3">Model</th>
                  <th scope="col" className="px-6 py-3">License Plate</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Assigned Driver</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCabs.map(cab => (
                  <tr key={cab.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{cab.model}</td>
                    <td className="px-6 py-4">{cab.licensePlate}</td>
                    <td className="px-6 py-4">{cab.type}</td>
                    <td className="px-6 py-4">{cab.driver}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(cab.status)}`}>
                        {cab.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(cab)}>
                        <Edit className="h-5 w-5 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteCab(cab.id)}><Trash2 className="h-5 w-5 text-red-500" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCabs.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No cabs found.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ManageCabsPage;