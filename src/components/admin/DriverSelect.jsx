import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DriverSelect = ({ name, defaultValue, required }) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockDrivers = [
      { id: 'd1', name: 'John Doe', status: 'active' },
      { id: 'd2', name: 'Jane Smith', status: 'active' },
      { id: 'd3', name: 'Mike Brown', status: 'inactive' },
      { id: 'd4', name: 'Sarah Wilson', status: 'active' },
    ];
    
    // Filter only active drivers
    const activeDrivers = mockDrivers.filter(driver => driver.status === 'active');
    setDrivers(activeDrivers);
  }, []);

  return (
    <Select name={name} defaultValue={defaultValue} required={required}>
      <SelectTrigger>
        <SelectValue placeholder="Select a driver" />
      </SelectTrigger>
      <SelectContent>
        {drivers.map((driver) => (
          <SelectItem key={driver.id} value={driver.id}>
            {driver.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DriverSelect;
