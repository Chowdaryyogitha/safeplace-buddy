import React, { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, FileText, Globe, Shield, Camera, Upload, Heart, Users, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import LocationServices from '@/components/LocationServices';
import EmergencyHelplines from '@/components/EmergencyHelplines';
import IncidentReporting from '@/components/IncidentReporting';
import MapComponent from '@/components/MapComponent';
import AIAssistantPopup from '@/components/AIAssistantPopup';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('location');

  const translations = {
    en: {
      title: "Women's Safety Hub",
      subtitle: "Your safety is our priority - 24/7 support available",
      location: "Location Services",
      helplines: "Emergency Helplines",
      report: "Report Incident",
      map: "Emergency Map",
      quickAccess: "Quick Access",
      emergency: "Emergency",
      safetyFirst: "Safety First",
      alwaysHere: "We're always here to help you stay safe"
    },
    hi: {
      title: "महिला सुरक्षा केंद्र",
      subtitle: "आपकी सुरक्षा हमारी प्राथमिकता है - 24/7 सहायता उपलब्ध",
      location: "स्थान सेवाएं",
      helplines: "आपातकालीन हेल्पलाइन",
      report: "घटना की रिपोर्ट करें",
      map: "आपातकालीन मैप",
      quickAccess: "त्वरित पहुंच",
      emergency: "आपातकाल",
      safetyFirst: "सुरक्षा पहले",
      alwaysHere: "हम आपकी सुरक्षा के लिए हमेशा यहाँ हैं"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header with enhanced styling */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <Heart className="h-4 w-4 text-pink-500 mr-1" />
                  {t.subtitle}
                </p>
              </div>
            </div>
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>
      </header>

      {/* Enhanced Emergency Access Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 text-center">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 animate-pulse" />
              <span className="font-bold">{t.emergency}: 112</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-red-300"></div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="font-bold">Women Helpline: 1098</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-red-300"></div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="font-bold">Cyber Crime: 1930</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with enhanced styling */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border border-pink-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{t.safetyFirst}</h2>
            <p className="text-gray-600">{t.alwaysHere}</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/60 backdrop-blur-sm border border-pink-200">
            <TabsTrigger 
              value="location" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">{t.location}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="helplines" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{t.helplines}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="report" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t.report}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              <Navigation className="h-4 w-4" />
              <span className="hidden sm:inline">{t.map}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="location">
            <LocationServices language={currentLanguage} />
          </TabsContent>

          <TabsContent value="helplines">
            <EmergencyHelplines language={currentLanguage} />
          </TabsContent>

          <TabsContent value="report">
            <IncidentReporting language={currentLanguage} />
          </TabsContent>

          <TabsContent value="map">
            <MapComponent language={currentLanguage} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Enhanced Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 sm:hidden shadow-2xl">
        <div className="grid grid-cols-4">
          {[
            { id: 'location', icon: MapPin, label: t.location, color: 'text-pink-600' },
            { id: 'helplines', icon: Phone, label: t.helplines, color: 'text-blue-600' },
            { id: 'report', icon: FileText, label: t.report, color: 'text-orange-600' },
            { id: 'map', icon: Navigation, label: t.map, color: 'text-green-600' }
          ].map(({ id, icon: Icon, label, color }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center py-3 px-3 transition-all duration-200 ${
                activeTab === id ? `${color} bg-gradient-to-t from-gray-100 to-transparent` : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${activeTab === id ? 'scale-110' : ''} transition-transform duration-200`} />
              <span className="text-xs font-medium">{label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Assistant Popup */}
      <AIAssistantPopup language={currentLanguage} />
    </div>
  );
};

export default Index;
