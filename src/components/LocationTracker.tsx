import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Trophy, Target, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface Checkpoint {
  id: number;
  name: string;
  lat: number;
  lng: number;
  story: string;
  conquered: boolean;
}

// QR Code checkpoints with updated coordinates
const templeCheckpoints: Checkpoint[] = [
  { id: 1, name: 'QR1', lat: 20.006801, lng: 73.795663, story: 'qr1', conquered: false },
  { id: 2, name: 'QR2', lat: 20.006805, lng: 73.795299, story: 'qr2', conquered: false },
  { id: 3, name: 'QR3', lat: 20.006807, lng: 73.795013, story: 'qr3', conquered: false },
  { id: 4, name: 'QR4', lat: 20.007058, lng: 73.795275, story: 'qr4', conquered: false },
  { id: 5, name: 'QR5', lat: 20.007059, lng: 73.795645, story: 'qr5', conquered: false },
];

interface LocationTrackerProps {
  onCheckpointConquered: (storyId: string) => void;
}

const LocationTracker: React.FC<LocationTrackerProps> = ({ onCheckpointConquered }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>(templeCheckpoints);
  const [conqueredCount, setConqueredCount] = useState<number>(0);
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);

  // Distance calculation helper (Haversine formula)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  // Initialize map
  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      // Set the access token
      mapboxgl.accessToken = mapboxToken.trim();
      
      // Check if token starts with 'pk.' (public token)
      if (!mapboxToken.startsWith('pk.')) {
        toast({
          title: "Invalid Token",
          description: "Mapbox token must start with 'pk.' - please check your token.",
          variant: "destructive"
        });
        return;
      }

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [73.795379, 20.006926], // QR locations center [lng, lat]
        zoom: 16,
        pitch: 0,
        bearing: 0,
        attributionControl: true,
        logoPosition: 'bottom-left'
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        toast({
          title: "✅ Map Loaded!",
          description: "Temple map is ready. Click 'Start Quest' to begin location tracking.",
        });
        
        // Add checkpoint markers after map loads
        addCheckpointMarkers();
        
        // Add navigation controls
        map.current?.addControl(new mapboxgl.NavigationControl(), 'top-right');
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        const error = e.error as any;
        if (error?.status === 403) {
          toast({
            title: "Authentication Error",
            description: "Your Mapbox token may not have the required permissions. Please check your account settings at mapbox.com",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Map Error", 
            description: "Failed to load map tiles. Please check your internet connection.",
            variant: "destructive"
          });
        }
      });

      map.current.on('styledata', () => {
        console.log('Map style loaded');
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      toast({
        title: "Setup Error",
        description: "Failed to initialize map. Please verify your Mapbox token is valid.",
        variant: "destructive"
      });
    }
  };

  // Add checkpoint markers to map
  const addCheckpointMarkers = () => {
    if (!map.current) return;
    
    checkpoints.forEach(checkpoint => {
      const el = document.createElement('div');
      el.className = `w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer transition-all ${
        checkpoint.conquered 
          ? 'bg-green-500 animate-pulse' 
          : 'bg-primary hover:scale-110'
      }`;
      el.innerHTML = checkpoint.conquered 
        ? '<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>'
        : '<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>';
      
      el.addEventListener('click', () => {
        if (checkpoint.conquered) {
          onCheckpointConquered(checkpoint.story);
        }
      });

      new mapboxgl.Marker(el)
        .setLngLat([checkpoint.lng, checkpoint.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">${checkpoint.name}</h3>
                <p class="text-sm text-gray-600">${checkpoint.conquered ? '✅ Conquered!' : '📍 Visit to unlock'}</p>
                <p class="text-xs text-gray-500">Lat: ${checkpoint.lat}, Lng: ${checkpoint.lng}</p>
              </div>
            `)
        )
        .addTo(map.current!);
    });
  };

  // Start location tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your device doesn't support location tracking",
        variant: "destructive"
      });
      return;
    }

    setIsTracking(true);
    setShowTokenInput(false);

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // Update user marker
        if (map.current) {
          if (userMarker.current) {
            userMarker.current.setLngLat([longitude, latitude]);
          } else {
            const el = document.createElement('div');
            el.className = 'w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse';
            
            userMarker.current = new mapboxgl.Marker(el)
              .setLngLat([longitude, latitude])
              .addTo(map.current!);
          }

          // Center map on user location occasionally
          map.current.easeTo({
            center: [longitude, latitude],
            duration: 1000
          });
        }

        // Check for nearby checkpoints (within 20 meters)
        setCheckpoints(prev => 
          prev.map(checkpoint => {
            const distance = calculateDistance(latitude, longitude, checkpoint.lat, checkpoint.lng);
            
            if (distance <= 20 && !checkpoint.conquered) {
              toast({
                title: "🎉 Checkpoint Conquered!",
                description: `You've reached ${checkpoint.name}!`,
              });
              onCheckpointConquered(checkpoint.story);
              setConqueredCount(prev => prev + 1);
              return { ...checkpoint, conquered: true };
            }
            
            return checkpoint;
          })
        );
      },
      (error) => {
        toast({
          title: "Location error",
          description: "Unable to get your location. Please enable location services.",
          variant: "destructive"
        });
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  };

  useEffect(() => {
    if (mapboxToken && !map.current) {
      initializeMap();
    }
  }, [mapboxToken]);

  return (
    <div className="p-4 space-y-4">
      {/* Mapbox Token Input */}
      {showTokenInput && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <h3 className="font-semibold">Setup Location Tracking</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to enable real-time location tracking.
              Get it from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="pk.eyJ1Ijoi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={() => mapboxToken && initializeMap()}
                disabled={!mapboxToken}
              >
                Setup
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Progress Stats */}
      {mapboxToken && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="font-semibold">Temple Quest Progress</span>
            </div>
            <Badge variant="secondary">
              {conqueredCount}/{checkpoints.length} conquered
            </Badge>
          </div>
          <div className="mt-2 w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(conqueredCount / checkpoints.length) * 100}%` }}
            />
          </div>
        </Card>
      )}

      {/* Map Container */}
      {mapboxToken && (
        <Card className="overflow-hidden">
          <div ref={mapContainer} className="w-full h-96" />
          
          {/* Controls */}
          <div className="p-4 bg-gradient-to-r from-background to-muted">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="text-sm">
                  {isTracking ? 'Tracking your location...' : 'Start location tracking'}
                </span>
              </div>
              
              <Button
                onClick={startTracking}
                disabled={isTracking}
                size="sm"
                variant={isTracking ? "secondary" : "default"}
              >
                {isTracking ? 'Tracking...' : 'Start Quest'}
              </Button>
            </div>
            
            {userLocation && (
              <p className="text-xs text-muted-foreground mt-2">
                Your location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Checkpoint List */}
      {mapboxToken && (
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Temple Checkpoints
          </h3>
          <div className="space-y-2">
            {checkpoints.map(checkpoint => (
              <div 
                key={checkpoint.id}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  checkpoint.conquered ? 'bg-green-50 dark:bg-green-900/20' : 'bg-muted'
                }`}
              >
                <span className={`text-sm ${checkpoint.conquered ? 'line-through' : ''}`}>
                  {checkpoint.name}
                </span>
                {checkpoint.conquered && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    ✅ Conquered
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default LocationTracker;