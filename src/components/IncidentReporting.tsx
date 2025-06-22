
import React, { useState } from 'react';
import { FileText, Camera, Upload, MapPin, Clock, Shield, AlertTriangle, Phone, User, Lock, Scale, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface IncidentReportingProps {
  language: string;
}

const IncidentReporting: React.FC<IncidentReportingProps> = ({ language }) => {
  const [selectedIncidentType, setSelectedIncidentType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [witnessInfo, setWitnessInfo] = useState<string>('');
  const [locationDetails, setLocationDetails] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Report Incident",
      selectType: "Select Incident Type",
      physicalHarassment: "Physical Harassment/Teasing",
      cyberBullying: "Social Media Stalking/Cyberbullying", 
      photoMorphing: "Photo Morphing/Misuse",
      otherIncident: "Other Incident",
      describeIncident: "Describe the Incident in Detail",
      placeholder: "Please provide detailed information about what happened, when, where, and who was involved...",
      attachEvidence: "Attach Evidence & Documentation",
      uploadFiles: "Upload Photos/Videos/Screenshots/Documents",
      witnessInfo: "Witness Information",
      witnessPlaceholder: "Names and contact details of any witnesses...",
      locationInfo: "Location Details",
      locationPlaceholder: "Exact location, landmarks, time of incident...",
      currentLocation: "Current Location",
      getLocation: "Get My Current Location",
      submitReport: "Submit Detailed Report",
      legalRights: "Know Your Legal Rights & Next Steps",
      cybercrimePortal: "Report to National Cybercrime Portal",
      emergencyFirst: "⚠️ For immediate danger, call emergency services first (112)",
      confidentialReport: "🔒 This report will be kept strictly confidential",
      reportSubmitted: "Report submitted successfully. Reference ID will be provided.",
      additionalSupport: "Additional Support Available"
    },
    hi: {
      title: "घटना की रिपोर्ट करें",
      selectType: "घटना का प्रकार चुनें",
      physicalHarassment: "शारीरिक उत्पीड़न/छेड़छाड़",
      cyberBullying: "सोशल मीडिया स्टॉकिंग/साइबर बदमाशी",
      photoMorphing: "फोटो मॉर्फिंग/दुरुपयोग",
      otherIncident: "अन्य घटना",
      describeIncident: "घटना का विस्तृत विवरण दें",
      placeholder: "कृपया विस्तार से बताएं कि क्या हुआ, कब, कहाँ, और कौन शामिल था...",
      attachEvidence: "सबूत और दस्तावेज संलग्न करें",
      uploadFiles: "फोटो/वीडियो/स्क्रीनशॉट/दस्तावेज अपलोड करें",
      witnessInfo: "गवाहों की जानकारी",
      witnessPlaceholder: "किसी भी गवाह के नाम और संपर्क विवरण...",
      locationInfo: "स्थान का विवरण",
      locationPlaceholder: "सटीक स्थान, मुख्य निशान, घटना का समय...",
      currentLocation: "वर्तमान स्थान",
      getLocation: "मेरा वर्तमान स्थान प्राप्त करें",
      submitReport: "विस्तृत रिपोर्ट जमा करें",
      legalRights: "अपने कानूनी अधिकार और अगले कदम जानें",
      cybercrimePortal: "राष्ट्रीय साइबरक्राइम पोर्टल पर रिपोर्ट करें",
      emergencyFirst: "⚠️ तत्काल खतरे के लिए, पहले आपातकालीन सेवाओं को कॉल करें (112)",
      confidentialReport: "🔒 यह रिपोर्ट पूर्णतः गोपनीय रखी जाएगी",
      reportSubmitted: "रिपोर्ट सफलतापूर्वक जमा की गई। संदर्भ ID प्रदान की जाएगी।",
      additionalSupport: "अतिरिक्त सहायता उपलब्ध"
    }
  };

  const t = translations[language as keyof typeof translations];

  const incidentTypes = [
    {
      id: 'physical',
      title: t.physicalHarassment,
      icon: AlertTriangle,
      description: language === 'hi' 
        ? 'शारीरिक छेड़छाड़, अनुचित स्पर्श, धमकी, पीछा करना' 
        : 'Physical harassment, inappropriate touching, threats, stalking',
      color: 'red',
      urgency: 'high'
    },
    {
      id: 'cyber',
      title: t.cyberBullying,
      icon: Shield,
      description: language === 'hi' 
        ? 'ऑनलाइन स्टॉकिंग, अश्लील संदेश, साइबर बुलिंग, धमकी भरे मैसेज' 
        : 'Online stalking, vulgar messages, cyber bullying, threatening messages',
      color: 'purple',
      urgency: 'medium'
    },
    {
      id: 'photo',
      title: t.photoMorphing,
      icon: Camera,
      description: language === 'hi' 
        ? 'फोटो का दुरुपयोग, फेक प्रोफाइल, मॉर्फिंग, बिना अनुमति फोटो शेयर करना' 
        : 'Photo misuse, fake profiles, morphing, sharing photos without consent',
      color: 'orange',
      urgency: 'medium'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
    
    if (validFiles.length !== files.length) {
      toast({
        title: "File Size Warning",
        description: "Some files were too large (>10MB) and were not uploaded",
        variant: "destructive"
      });
    }
    
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by this browser",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        toast({
          title: "Location Captured",
          description: "Your current location has been recorded for the report"
        });
      },
      (error) => {
        toast({
          title: "Location Error", 
          description: "Unable to get your location. Please describe it manually.",
          variant: "destructive"
        });
      }
    );
  };

  const handleSubmitReport = () => {
    if (!selectedIncidentType || !description.trim()) {
      toast({
        title: "Incomplete Information",
        description: "Please select incident type and provide detailed description",
        variant: "destructive"
      });
      return;
    }

    // Enhanced report submission simulation
    const reportData = {
      type: selectedIncidentType,
      description,
      location: currentLocation,
      locationDetails,
      witnessInfo,
      attachments: attachments.length,
      timestamp: new Date().toISOString(),
      referenceId: `WS${Date.now()}`
    };

    console.log('Report Data:', reportData);

    toast({
      title: "Report Submitted Successfully",
      description: `${t.reportSubmitted} Reference: ${reportData.referenceId}`,
    });

    // Reset form
    setSelectedIncidentType('');
    setDescription('');
    setWitnessInfo('');
    setLocationDetails('');
    setAttachments([]);
    setCurrentLocation(null);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", accent: "bg-red-100" },
      purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", accent: "bg-purple-100" },
      orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", accent: "bg-orange-100" }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Emergency Notice */}
      <Card className="border-2 border-red-300 bg-gradient-to-r from-red-50 to-orange-50 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-red-800 mb-3 text-lg">
                {language === 'hi' ? '🚨 आपातकालीन स्थिति' : '🚨 Emergency Situation'}
              </h4>
              <p className="text-sm text-red-700 mb-4 leading-relaxed">{t.emergencyFirst}</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                  <Phone className="h-4 w-4 mr-2" />
                  {language === 'hi' ? '112 - पुलिस' : '112 - Police'}
                </Button>
                <Button size="sm" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold">
                  <User className="h-4 w-4 mr-2" />
                  {language === 'hi' ? '1098 - महिला हेल्पलाइन' : '1098 - Women Helpline'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Incident Type Selection */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-t-lg">
          <CardTitle className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">{t.selectType}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {incidentTypes.map((type) => {
              const colorClasses = getColorClasses(type.color);
              const Icon = type.icon;
              const isSelected = selectedIncidentType === type.id;
              
              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedIncidentType(type.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isSelected
                      ? `${colorClasses.border} ${colorClasses.bg} shadow-lg`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${isSelected ? colorClasses.accent : 'bg-gray-100'}`}>
                      <Icon className={`h-6 w-6 ${isSelected ? colorClasses.text : 'text-gray-600'}`} />
                    </div>
                    <Badge className={`${type.urgency === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {type.urgency === 'high' ? (language === 'hi' ? 'उच्च प्राथमिकता' : 'High Priority') : (language === 'hi' ? 'मध्यम प्राथमिकता' : 'Medium Priority')}
                    </Badge>
                  </div>
                  <h4 className={`font-bold text-lg mb-2 ${isSelected ? colorClasses.text : 'text-gray-800'}`}>
                    {type.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{type.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Report Form */}
      {selectedIncidentType && (
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-green-100 to-teal-100 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span>{t.describeIncident}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {/* Enhanced Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📝 {language === 'hi' ? 'घटना का विस्तृत विवरण' : 'Detailed Incident Description'}
              </label>
              <Textarea
                placeholder={t.placeholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-40 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
              />
            </div>

            {/* Witness Information */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                👥 {t.witnessInfo}
              </label>
              <Textarea
                placeholder={t.witnessPlaceholder}
                value={witnessInfo}
                onChange={(e) => setWitnessInfo(e.target.value)}
                className="min-h-24 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
              />
            </div>

            {/* Location Details */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📍 {t.locationInfo}
              </label>
              <Textarea
                placeholder={t.locationPlaceholder}
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
                className="min-h-24 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
              />
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={getCurrentLocation}
                  className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {t.getLocation}
                </Button>
                {currentLocation && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✅ Location captured: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced File Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📎 {t.attachEvidence}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-2">{t.uploadFiles}</p>
                  <p className="text-sm text-gray-500">
                    {language === 'hi' 
                      ? 'JPG, PNG, MP4, PDF, DOC तक 10MB' 
                      : 'JPG, PNG, MP4, PDF, DOC up to 10MB'
                    }
                  </p>
                </label>
              </div>
              
              {attachments.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-semibold mb-3 text-blue-800">
                    📁 {language === 'hi' ? 'अपलोड की गई फाइलें:' : 'Uploaded Files:'}
                  </h5>
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center space-x-2 text-sm">
                          <Camera className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{file.name}</span>
                          <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => removeAttachment(index)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button 
                onClick={handleSubmitReport} 
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 text-lg shadow-xl"
              >
                <FileText className="h-5 w-5 mr-3" />
                {t.submitReport}
              </Button>
              <div className="flex items-center justify-center mt-4 space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Lock className="h-4 w-4 mr-1" />
                  {t.confidentialReport}
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <Shield className="h-4 w-4 mr-1" />
                  {language === 'hi' ? 'सुरक्षित एन्क्रिप्शन' : 'Secure Encryption'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Legal Information */}
      {selectedIncidentType && (
        <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-blue-700">
              <Scale className="h-5 w-5" />
              <span>{t.legalRights}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 bg-white/70 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2">
                    {language === 'hi' ? '⚖️ कानूनी अधिकार' : '⚖️ Legal Rights'}
                  </h5>
                  <p className="text-sm text-blue-700">
                    {language === 'hi' 
                      ? 'आपको FIR दर्ज कराने, मुफत कानूनी सहायता लेने और त्वरित न्याय का अधिकार है।'
                      : 'You have the right to file FIR, get free legal aid, and seek speedy justice.'
                    }
                  </p>
                </div>
                <div className="p-4 bg-white/70 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2">
                    {language === 'hi' ? '📞 सहायता नंबर' : '📞 Support Numbers'}
                  </h5>
                  <p className="text-sm text-blue-700">
                    {language === 'hi' 
                      ? 'कानूनी सहायता: 15100, NCW: 7827170170, साइबर अपराध: 1930'
                      : 'Legal Aid: 15100, NCW: 7827170170, Cyber Crime: 1930'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  {t.cybercrimePortal}
                </Button>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  <Scale className="h-4 w-4 mr-2" />
                  {language === 'hi' ? 'कानूनी सहायता' : 'Legal Aid'}
                </Button>
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                  <User className="h-4 w-4 mr-2" />
                  {language === 'hi' ? 'परामर्श सेवा' : 'Counseling Service'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IncidentReporting;
