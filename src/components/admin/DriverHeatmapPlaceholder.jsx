import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map } from 'lucide-react';

const DriverHeatmapPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Map className="mr-2 h-5 w-5 text-blue-500" />
          Driver Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Driver heatmap will be displayed here.</p>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This feature requires backend integration for real-time driver location tracking and visualization.
        </p>
      </CardContent>
    </Card>
  );
};

export default DriverHeatmapPlaceholder;