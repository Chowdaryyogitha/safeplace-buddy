
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, FileText, Globe, Shield, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import LocationServices from '@/components/LocationServices';
import EmergencyHelplines from '@/components/EmergencyHelplines';
import IncidentReporting from '@/components/IncidentReporting';
import AIAssistant from '@/components/AIAssistant';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('location');

  const translations = {
    en: {
      title: "Women's Safety Hub",
      subtitle: "Your safety is our priority",
      location: "Location Services",
      helplines: "Emergency Helplines",
      report: "Report Incident",
      assistant: "AI Assistant",
      quickAccess: "Quick Access",
      emergency: "Emergency"
    },
    hi: {
      title: "महिला सुरक्षा केंद्र",
      subtitle: "आपकी सुरक्षा हमारी प्राथमिकता है",
      location: "स्थान सेवाएं",
      helplines: "आपातकालीन हेल्पलाइन",
      report: "घटना की रिपोर्ट करें",
      assistant: "AI सहायक",
      quickAccess: "त्वरित पहुंच",
      emergency: "आपातकाल"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-pink-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>
      </header>

      {/* Quick Emergency Access */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <Phone className="h-5 w-5" />
            <span className="font-semibold">{t.emergency}: 112 | Women Helpline: 1098</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="location" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">{t.location}</span>
            </TabsTrigger>
            <TabsTrigger value="helplines" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{t.helplines}</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t.report}</span>
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t.assistant}</span>
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

          <TabsContent value="assistant">
            <AIAssistant language={currentLanguage} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
        <div className="grid grid-cols-4">
          {[
            { id: 'location', icon: MapPin, label: t.location },
            { id: 'helplines', icon: Phone, label: t.helplines },
            { id: 'report', icon: FileText, label: t.report },
            { id: 'assistant', icon: MessageCircle, label: t.assistant }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center py-2 px-3 ${
                activeTab === id ? 'text-pink-600' : 'text-gray-500'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
