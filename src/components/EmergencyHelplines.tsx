
import React from 'react';
import { Phone, Clock, Shield, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EmergencyHelplinesProps {
  language: string;
}

const EmergencyHelplines: React.FC<EmergencyHelplinesProps> = ({ language }) => {
  const translations = {
    en: {
      title: "Emergency Helplines",
      nationalEmergency: "National Emergency",
      womenHelplines: "Women Helplines",
      localSupport: "Local Support",
      available24x7: "Available 24x7",
      freeService: "Free Service",
      multiLanguage: "Multi-language Support",
      call: "Call"
    },
    hi: {
      title: "आपातकालीन हेल्पलाइन",
      nationalEmergency: "राष्ट्रीय आपातकाल",
      womenHelplines: "महिला हेल्पलाइन",
      localSupport: "स्थानीय सहायता",
      available24x7: "24x7 उपलब्ध",
      freeService: "निःशुल्क सेवा",
      multiLanguage: "बहुभाषी सहायता",
      call: "कॉल करें"
    }
  };

  const t = translations[language as keyof typeof translations];

  const emergencyNumbers = [
    {
      category: t.nationalEmergency,
      numbers: [
        {
          name: "Emergency Services",
          number: "112",
          description: "Police, Fire, Medical Emergency",
          features: ["24x7", "Free", "Multi-language"],
          color: "red"
        },
        {
          name: "Police",
          number: "100",
          description: "Police Emergency",
          features: ["24x7", "Free"],
          color: "blue"
        }
      ]
    },
    {
      category: t.womenHelplines,
      numbers: [
        {
          name: "Women Helpline",
          number: "1098",
          description: "Women & Child Helpline",
          features: ["24x7", "Free", "Confidential"],
          color: "pink"
        },
        {
          name: "Women Safety",
          number: "181",
          description: "Women Safety Helpline",
          features: ["24x7", "Free", "Multi-language"],
          color: "purple"
        },
        {
          name: "Domestic Violence",
          number: "1091",
          description: "Women Power Helpline",
          features: ["24x7", "Free"],
          color: "orange"
        }
      ]
    },
    {
      category: t.localSupport,
      numbers: [
        {
          name: "She Team",
          number: "9490616555",
          description: "Local Women Safety Team",
          features: ["WhatsApp", "SMS"],
          color: "green"
        },
        {
          name: "Cyber Crime",
          number: "1930",
          description: "Cyber Crime Helpline",
          features: ["24x7", "Online Support"],
          color: "indigo"
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", button: "bg-red-600 hover:bg-red-700" },
      blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", button: "bg-blue-600 hover:bg-blue-700" },
      pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700", button: "bg-pink-600 hover:bg-pink-700" },
      purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", button: "bg-purple-600 hover:bg-purple-700" },
      orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", button: "bg-orange-600 hover:bg-orange-700" },
      green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", button: "bg-green-600 hover:bg-green-700" },
      indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", button: "bg-indigo-600 hover:bg-indigo-700" }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  return (
    <div className="space-y-6">
      {emergencyNumbers.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-800">
              <Phone className="h-5 w-5" />
              <span>{category.category}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.numbers.map((helpline, index) => {
                const colorClasses = getColorClasses(helpline.color);
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${colorClasses.bg} ${colorClasses.border}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className={`font-semibold ${colorClasses.text}`}>
                          {helpline.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {helpline.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${colorClasses.text}`}>
                          {helpline.number}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {helpline.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="secondary"
                          className="text-xs bg-white/60"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className={`w-full ${colorClasses.button} text-white`}
                      onClick={() => window.open(`tel:${helpline.number}`, '_self')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {t.call} {helpline.number}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Important Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">
                {language === 'hi' ? 'महत्वपूर्ण सूचना' : 'Important Notice'}
              </h4>
              <p className="text-sm text-yellow-700">
                {language === 'hi' 
                  ? 'ये सभी सेवाएं निःशुल्क हैं और गोपनीय हैं। किसी भी आपातकाल में तुरंत संपर्क करें।'
                  : 'All these services are free and confidential. Contact immediately in any emergency situation.'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyHelplines;
