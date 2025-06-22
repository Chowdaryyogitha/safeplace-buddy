
import React, { useState } from 'react';
import { FileText, Camera, Upload, MapPin, Clock, Shield, AlertTriangle, Phone } from 'lucide-react';
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
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Report Incident",
      selectType: "Select Incident Type",
      physicalHarassment: "Physical Harassment/Teasing",
      cyberBullying: "Social Media Stalking/Cyberbullying",
      photoMorphing: "Photo Morphing/Misuse",
      otherIncident: "Other Incident",
      describeIncident: "Describe the Incident",
      placeholder: "Please provide details about what happened...",
      attachEvidence: "Attach Evidence",
      uploadFiles: "Upload Photos/Videos/Screenshots",
      currentLocation: "Current Location",
      getLocation: "Get My Location",
      submitReport: "Submit Report",
      legalRights: "Know Your Legal Rights",
      cybercrimePortal: "Report to Cybercrime Portal",
      emergencyFirst: "For immediate danger, call emergency services first",
      confidentialReport: "This report will be kept confidential"
    },
    hi: {
      title: "घटना की रिपोर्ट करें",
      selectType: "घटना का प्रकार चुनें",
      physicalHarassment: "शारीरिक उत्पीड़न/छेड़छाड़",
      cyberBullying: "सोशल मीडिया स्टॉकिंग/साइबर बदमाशी",
      photoMorphing: "फोटो मॉर्फिंग/दुरुपयोग",
      otherIncident: "अन्य घटना",
      describeIncident: "घटना का विवरण दें",
      placeholder: "कृपया बताएं कि क्या हुआ था...",
      attachEvidence: "सबूत संलग्न करें",
      uploadFiles: "फोटो/वीडियो/स्क्रीनशॉट अपलोड करें",
      currentLocation: "वर्तमान स्थान",
      getLocation: "मेरा स्थान प्राप्त करें",
      submitReport: "रिपोर्ट जमा करें",
      legalRights: "अपने कानूनी अधिकार जानें",
      cybercrimePortal: "साइबरक्राइम पोर्टल पर रिपोर्ट करें",
      emergencyFirst: "तत्काल खतरे के लिए, पहले आपातकालीन सेवाओं को कॉल करें",
      confidentialReport: "यह रिपोर्ट गोपनीय रखी जाएगी"
    }
  };

  const t = translations[language as keyof typeof translations];

  const incidentTypes = [
    {
      id: 'physical',
      title: t.physicalHarassment,
      icon: AlertTriangle,
      description: language === 'hi' ? 'शारीरिक छेड़छाड़, अनुचित स्पर्श, धमकी' : 'Physical harassment, inappropriate touching, threats',
      color: 'red'
    },
    {
      id: 'cyber',
      title: t.cyberBullying,
      icon: Shield,
      description: language === 'hi' ? 'ऑनलाइन स्टॉकिंग, अश्लील संदेश, साइबर बुलिंग' : 'Online stalking, vulgar messages, cyber bullying',
      color: 'purple'
    },
    {
      id: '  ',
      title: t.photoMorphing,
      icon: Camera,
      description: language === 'hi' ? 'फोटो का दुरुपयोग, फेक प्रोफाइल, मॉर्फिंग' : 'Photo misuse, fake profiles, morphing',
      color: 'orange'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const handleSubmitReport = () => {
    if (!selectedIncidentType || !description.trim()) {
      toast({
        title: "Incomplete Information",
        description: "Please select incident type and provide description",
        variant: "destructive"
      });
      return;
    }

    // Simulate report submission
    toast({
      title: "Report Submitted",
      description: "Your report has been submitted successfully. You will be contacted soon.",
    });

    // Reset form
    setSelectedIncidentType('');
    setDescription('');
    setAttachments([]);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
      purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
      orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  return (
    <div className="space-y-6">
      {/* Emergency Notice */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800 mb-2">
                {language === 'hi' ? 'आपातकालीन स्थिति' : 'Emergency Situation'}
              </h4>
              <p className="text-sm text-red-700 mb-2">{t.emergencyFirst}</p>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                <Phone className="h-4 w-4 mr-2" />
                {language === 'hi' ? 'तुरंत कॉल करें 112' : 'Call 112 Now'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incident Type Selection */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-pink-600" />
            <span>{t.selectType}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {incidentTypes.map((type) => {
              const colorClasses = getColorClasses(type.color);
              const Icon = type.icon;
              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedIncidentType(type.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedIncidentType === type.id
                      ? `${colorClasses.border} ${colorClasses.bg}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className={`h-6 w-6 ${selectedIncidentType === type.id ? colorClasses.text : 'text-gray-600'}`} />
                    <h4 className={`font-medium ${selectedIncidentType === type.id ? colorClasses.text : 'text-gray-800'}`}>
                      {type.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Report Form */}
      {selectedIncidentType && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{t.describeIncident}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <Textarea
                placeholder={t.placeholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-32"
              />
            </div>

            {/* File Upload */}
            <div>
              <h4 className="font-medium mb-3 flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>{t.attachEvidence}</span>
              </h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">{t.uploadFiles}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {language === 'hi' ? 'JPG, PNG, MP4 तक 10MB' : 'JPG, PNG, MP4 up to 10MB'}
                  </p>
                </label>
              </div>
              
              {attachments.length > 0 && (
                <div className="mt-3">
                  <h5 className="font-medium mb-2">
                    {language === 'hi' ? 'अपलोड की गई फाइलें:' : 'Uploaded Files:'}
                  </h5>
                  <div className="space-y-1">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <Camera className="h-4 w-4" />
                        <span>{file.name}</span>
                        <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <h4 className="font-medium mb-3 flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{t.currentLocation}</span>
              </h4>
              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                {t.getLocation}
              </Button>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button onClick={handleSubmitReport} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                <FileText className="h-4 w-4 mr-2" />
                {t.submitReport}
              </Button>
              <p className="text-sm text-gray-600 text-center mt-2">{t.confidentialReport}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legal Information for Photo Morphing */}
      {selectedIncidentType === 'photo' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">{t.legalRights}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-blue-800">
                {language === 'hi' 
                  ? 'फोटो मॉर्फिंग और दुरुपयोग के खिलाफ कानूनी उपाय उपलब्ध हैं।'
                  : 'Legal remedies are available against photo morphing and misuse.'
                }
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Shield className="h-4 w-4 mr-2" />
                {t.cybercrimePortal}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IncidentReporting;
