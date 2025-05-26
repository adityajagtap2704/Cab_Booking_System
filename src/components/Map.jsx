
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Map = ({ pickupLocation, dropoffLocation, driverLocation }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // This is a placeholder for OpenStreetMap integration
    // In a real implementation, we would use a proper map library
    
    const initMap = () => {
      // Simulate map initialization with a colored background
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
        
        const mapContainer = document.createElement('div');
        mapContainer.className = 'w-full h-full bg-blue-100 rounded-lg relative overflow-hidden';
        
        // Add some fake map elements
        const gridLines = document.createElement('div');
        gridLines.className = 'absolute inset-0';
        gridLines.style.backgroundImage = 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)';
        gridLines.style.backgroundSize = '20px 20px';
        
        // Add pickup marker
        if (pickupLocation) {
          const pickupMarker = document.createElement('div');
          pickupMarker.className = 'absolute w-4 h-4 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10';
          pickupMarker.style.left = '30%';
          pickupMarker.style.top = '40%';
          
          const pickupPulse = document.createElement('div');
          pickupPulse.className = 'absolute w-8 h-8 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30 pulse';
          pickupPulse.style.left = '30%';
          pickupPulse.style.top = '40%';
          
          mapContainer.appendChild(pickupPulse);
          mapContainer.appendChild(pickupMarker);
        }
        
        // Add dropoff marker
        if (dropoffLocation) {
          const dropoffMarker = document.createElement('div');
          dropoffMarker.className = 'absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10';
          dropoffMarker.style.left = '70%';
          dropoffMarker.style.top = '60%';
          
          const dropoffPulse = document.createElement('div');
          dropoffPulse.className = 'absolute w-8 h-8 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30 pulse';
          dropoffPulse.style.left = '70%';
          dropoffPulse.style.top = '60%';
          
          mapContainer.appendChild(dropoffPulse);
          mapContainer.appendChild(dropoffMarker);
        }
        
        // Add driver marker
        if (driverLocation) {
          const driverMarker = document.createElement('div');
          driverMarker.className = 'absolute w-6 h-6 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20';
          driverMarker.style.left = '50%';
          driverMarker.style.top = '50%';
          
          const driverIcon = document.createElement('div');
          driverIcon.className = 'text-white text-xs';
          driverIcon.innerHTML = '🚕';
          
          driverMarker.appendChild(driverIcon);
          mapContainer.appendChild(driverMarker);
        }
        
        // Add route line between pickup and dropoff
        if (pickupLocation && dropoffLocation) {
          const routeLine = document.createElement('div');
          routeLine.className = 'absolute h-0.5 bg-blue-500 z-5 origin-left';
          routeLine.style.left = '30%';
          routeLine.style.top = '40%';
          routeLine.style.width = '40%';
          routeLine.style.transform = 'rotate(30deg)';
          
          mapContainer.appendChild(routeLine);
        }
        
        mapContainer.appendChild(gridLines);
        mapRef.current.appendChild(mapContainer);
      }
    };
    
    initMap();
    
    return () => {
      if (mapInstanceRef.current) {
        // Cleanup if needed
      }
    };
  }, [pickupLocation, dropoffLocation, driverLocation]);

  return (
    <motion.div 
      ref={mapRef} 
      className="map-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default Map;
