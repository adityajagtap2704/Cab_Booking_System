import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Search, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import AddDialog from '@/components/dialogs/AddDialog';
import EditDialog from '@/components/dialogs/EditDialog';

const ManageCabsPage = () => {
  const { toast } = useToast();
  const [cabs, setCabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCab, setCurrentCab] = useState(null);

  const cabFields = [
    { name: 'model', label: 'Vehicle Model', required: true },
    { name: 'licensePlate', label: 'License Plate', required: true },
    { name: 'type', label: 'Type', type: 'select', required: true, options: ['Sedan', 'SUV', 'XL'] },
    { name: 'driver', label: 'Assigned Driver', required: true },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select',
      required: true,
      options: [
        'Active',
        'Under_Maintenance',
        'In_Inspection',
        'Reserved',
        'Out_of_Service'
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace('_', '')) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'undermaintenance': return 'bg-yellow-100 text-yellow-800';
      case 'ininspection': return 'bg-blue-100 text-blue-800';
      case 'reserved': return 'bg-purple-100 text-purple-800';
      case 'outofservice': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplay = (status) => {
    return status.replace('_', ' ');
  };

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

  const handleAdd = (cabData) => {
    const newCab = {
      id: 'c' + Date.now().toString(),
      ...cabData
    };
    setCabs([newCab, ...cabs]);
    toast({ title: "Cab Added Successfully" });
  };

  const handleEdit = (updatedData) => {
    setCabs(prevCabs =>
      prevCabs.map(cab =>
        cab.id === currentCab.id ? { ...cab, ...updatedData } : cab
      )
    );
    toast({ title: "Cab Updated Successfully" });
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
        <Button onClick={() => setIsAddDialogOpen(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add New Cab</Button>
      </div>

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
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(cab.status)}`}>
                        {getStatusDisplay(cab.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => { setCurrentCab(cab); setIsEditDialogOpen(true); }}><Edit className="h-5 w-5 text-blue-500" /></Button>
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

      {/* Add Cab Dialog */}
      <AddDialog
        title="Add New Cab"
        fields={cabFields}
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAdd}
      />

      {/* Edit Cab Dialog */}
      <EditDialog
        title="Edit Cab"
        fields={cabFields}
        data={currentCab}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEdit}
      />
    </motion.div>
  );
};

export default ManageCabsPage;