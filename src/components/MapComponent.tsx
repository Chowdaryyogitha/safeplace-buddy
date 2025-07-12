
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Shield, Phone, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface MapComponentProps {
  language: string;
}

interface SafeZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'police' | 'hospital' | 'mall' | 'metro' | 'park';
  phone?: string;
  features: string[];
}

const MapComponent: React.FC<MapComponentProps> = ({ language }) => {
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearestSafeZones, setNearestSafeZones] = useState<SafeZone[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Emergency Navigation",
      currentLocation: "Your Location",
      safeZones: "Nearest Safe Zones",
      getLocation: "Get My Location",
      navigate: "Navigate",
      call: "Call",
      directions: "Get Directions",
      mapError: "Unable to load map",
      locationError: "Location access denied",
      police: "Police Station",
      hospital: "Hospital",
      mall: "Shopping Mall",
      metro: "Metro Station",
      park: "Public Park"
    },
    hi: {
      title: "आपातकालीन नेवीगेशन",
      currentLocation: "आपका स्थान",
      safeZones: "निकटतम सुरक्षित क्षेत्र",
      getLocation: "मेरा स्थान प्राप्त करें",
      navigate: "नेवीगेट करें",
      call: "कॉल करें",
      directions: "दिशा निर्देश प्राप्त करें",
      mapError: "मैप लोड करने में असमर्थ",
      locationError: "स्थान एक्सेस अस्वीकृत",
      police: "पुलिस स्टेशन",
      hospital: "अस्पताल",
      mall: "शॉपिंग मॉल",
      metro: "मेट्रो स्टेशन",
      park: "सार्वजनिक पार्क"
    }
  };

  const t = translations[language as keyof typeof translations];

  // Sample safe zones data (in real implementation, this would come from API)
  const sampleSafeZones: SafeZone[] = [
    {
      id: '1',
      name: 'Central Police Station',
      lat: 28.6139,
      lng: 77.2090,
      type: 'police',
      phone: '100',
      features: ['24/7', 'Emergency Response', 'Women Cell']
    },
    {
      id: '2',
      name: 'Apollo Hospital',
      lat: 28.6120,
      lng: 77.2100,
      type: 'hospital',
      phone: '1066',
      features: ['24/7', 'Emergency Ward', 'Ambulance']
    },
    {
      id: '3',
      name: 'Select City Walk Mall',
      lat: 28.6110,
      lng: 77.2080,
      type: 'mall',
      features: ['CCTV', 'Security', 'Crowded', 'Well Lit']
    },
    {
      id: '4',
      name: 'Saket Metro Station',
      lat: 28.6100,
      lng: 77.2070,
      type: 'metro',
      features: ['24/7', 'CCTV', 'Security', 'Crowded']
    }
  ];

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: t.locationError,
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(location);
        findNearestSafeZones(location);
        toast({
          title: "Location Found",
          description: "Your location has been updated on the map."
        });
      },
      (error) => {
        toast({
          title: "Location Error",
          description: t.locationError,
          variant: "destructive"
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const findNearestSafeZones = (userLocation: {lat: number, lng: number}) => {
    const zonesWithDistance = sampleSafeZones.map(zone => {
      const distance = calculateDistance(userLocation.lat, userLocation.lng, zone.lat, zone.lng);
      return { ...zone, distance };
    });

    const sortedZones = zonesWithDistance.sort((a, b) => a.distance - b.distance);
    setNearestSafeZones(sortedZones.slice(0, 4));
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const openGoogleMaps = (destination?: SafeZone) => {
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please enable location access first.",
        variant: "destructive"
      });
      return;
    }

    let url = `https://www.google.com/maps`;
    
    if (destination) {
      url += `/dir/${currentLocation.lat},${currentLocation.lng}/${destination.lat},${destination.lng}`;
    } else {
      url += `/@${currentLocation.lat},${currentLocation.lng},15z`;
    }
    
    window.open(url, '_blank');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'police': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'hospital': return <div className="h-4 w-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">+</div>;
      case 'mall': return <div className="h-4 w-4 bg-purple-600 rounded text-white text-xs flex items-center justify-center">M</div>;
      case 'metro': return <div className="h-4 w-4 bg-green-600 rounded text-white text-xs flex items-center justify-center">🚇</div>;
      case 'park': return <div className="h-4 w-4 bg-green-500 rounded text-white text-xs flex items-center justify-center">🌳</div>;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="space-y-6">
      {/* Google Maps Embed */}
      <Card className="border-red-200 shadow-xl bg-gradient-to-br from-red-50 to-pink-50">
        <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100 rounded-t-lg">
          <CardTitle className="flex items-center space-x-3 text-red-700">
            <Navigation className="h-5 w-5" />
            <span>{t.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-80 w-full">
            {currentLocation ? (
              <iframe
                src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${currentLocation.lat},${currentLocation.lng}&zoom=15&maptype=roadmap`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-b-lg"
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100 rounded-b-lg">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Enable location to view map</p>
                  <Button onClick={getCurrentLocation} className="bg-red-600 hover:bg-red-700">
                    <Navigation className="h-4 w-4 mr-2" />
                    {t.getLocation}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {currentLocation && (
            <div className="p-4 bg-green-50 border-t border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium">{t.currentLocation}</span>
                </div>
                <Button
                  onClick={() => openGoogleMaps()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Maps
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nearest Safe Zones */}
      {nearestSafeZones.length > 0 && (
        <Card className="border-green-200 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-green-700">
              <Shield className="h-5 w-5" />
              <span>{t.safeZones}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {nearestSafeZones.map((zone) => (
                <div key={zone.id} className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(zone.type)}
                      <div>
                        <h4 className="font-semibold text-gray-800">{zone.name}</h4>
                        <p className="text-sm text-gray-600">
                          {zone.distance ? `${zone.distance.toFixed(1)} km away` : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {zone.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => openGoogleMaps(zone)}
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      {t.navigate}
                    </Button>
                    {zone.phone && (
                      <Button
                        onClick={() => window.open(`tel:${zone.phone}`)}
                        size="sm"
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        {t.call}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Navigation Actions */}
      <Card className="border-blue-200 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => window.open('https://maps.google.com/', '_blank')}
              className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <div className="text-center">
                <ExternalLink className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">Google Maps</span>
              </div>
            </Button>
            <Button
              onClick={() => window.open('https://www.uber.com/in/en/', '_blank')}
              className="h-16 bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900"
            >
              <div className="text-center">
                <div className="text-lg font-bold mb-1">🚗</div>
                <span className="text-sm">Book Ride</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapComponent;
