
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Shield, Clock, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface LocationServicesProps {
  language: string;
}

const LocationServices: React.FC<LocationServicesProps> = ({ language }) => {
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Location Services",
      currentLocation: "Current Location",
      nearbyPolice: "Nearby Police Stations",
      safeZones: "Safe Zones",
      getLocation: "Get My Location",
      locationError: "Unable to get location",
      permissionDenied: "Location permission denied",
      open24hrs: "Open 24 Hours",
      cctvCoverage: "CCTV Coverage",
      wellLit: "Well Lit Area",
      crowded: "Crowded Area"
    },
    hi: {
      title: "स्थान सेवाएं",
      currentLocation: "वर्तमान स्थान",
      nearbyPolice: "पास के पुलिस स्टेशन",
      safeZones: "सुरक्षित क्षेत्र",
      getLocation: "मेरा स्थान प्राप्त करें",
      locationError: "स्थान प्राप्त करने में असमर्थ",
      permissionDenied: "स्थान अनुमति अस्वीकृत",
      open24hrs: "24 घंटे खुला",
      cctvCoverage: "सीसीटीवी कवरेज",
      wellLit: "अच्छी रोशनी",
      crowded: "भीड़भाड़ वाला क्षेत्र"
    }
  };

  const t = translations[language as keyof typeof translations];

  // Sample police stations data
  const policeStations = [
    { name: "Central Police Station", distance: "0.5 km", phone: "100", address: "MG Road" },
    { name: "Women Police Station", distance: "1.2 km", phone: "100", address: "Park Street" },
    { name: "Cyber Crime Unit", distance: "2.1 km", phone: "1930", address: "Tech Hub" }
  ];

  // Sample safe zones data
  const safeZones = [
    { name: "City Mall", distance: "0.3 km", features: ["CCTV", "Security", "Crowded"], type: "mall" },
    { name: "Central Park", distance: "0.8 km", features: ["Well Lit", "CCTV", "Security"], type: "park" },
    { name: "Metro Station", distance: "1.0 km", features: ["24 Hours", "CCTV", "Crowded"], type: "transport" },
    { name: "Hospital Complex", distance: "1.5 km", features: ["24 Hours", "Security", "Well Lit"], type: "hospital" }
  ];

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(t.locationError);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        toast({
          title: "Location Found",
          description: "Your current location has been updated."
        });
      },
      (error) => {
        setLocationError(t.permissionDenied);
        toast({
          title: "Location Error",
          description: t.permissionDenied,
          variant: "destructive"
        });
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="space-y-6">
      {/* Current Location */}
      <Card className="border-pink-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-pink-700">
            <Navigation className="h-5 w-5" />
            <span>{t.currentLocation}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentLocation ? (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">📍 Location Updated</p>
              <p className="text-sm text-green-600 mt-1">
                Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Button onClick={getCurrentLocation} className="bg-pink-600 hover:bg-pink-700">
                <MapPin className="h-4 w-4 mr-2" />
                {t.getLocation}
              </Button>
              {locationError && (
                <p className="text-red-600 text-sm mt-2">{locationError}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nearby Police Stations */}
      <Card className="border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <Shield className="h-5 w-5" />
            <span>{t.nearbyPolice}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {policeStations.map((station, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <h4 className="font-medium text-blue-800">{station.name}</h4>
                  <p className="text-sm text-blue-600">{station.address} • {station.distance}</p>
                </div>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  <Phone className="h-4 w-4 mr-1" />
                  {station.phone}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safe Zones */}
      <Card className="border-green-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <Shield className="h-5 w-5" />
            <span>{t.safeZones}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {safeZones.map((zone, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-green-800">{zone.name}</h4>
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                    {zone.distance}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {zone.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="text-xs bg-green-100 text-green-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationServices;
