
import React from 'react';
import { Phone, Clock, Shield, Heart, Users, MapPin, Laptop, Scale } from 'lucide-react';
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
      stateSpecific: "State Specific Helplines",
      specializedSupport: "Specialized Support",
      available24x7: "Available 24x7",
      freeService: "Free Service",
      multiLanguage: "Multi-language Support",
      call: "Call",
      whatsapp: "WhatsApp",
      sms: "SMS Support"
    },
    hi: {
      title: "आपातकालीन हेल्पलाइन",
      nationalEmergency: "राष्ट्रीय आपातकाल",
      womenHelplines: "महिला हेल्पलाइन",
      localSupport: "स्थानीय सहायता",
      stateSpecific: "राज्य विशिष्ट हेल्पलाइन",
      specializedSupport: "विशेषज्ञ सहायता",
      available24x7: "24x7 उपलब्ध",
      freeService: "निःशुल्क सेवा",
      multiLanguage: "बहुभाषी सहायता",
      call: "कॉल करें",
      whatsapp: "व्हाट्सऐप",
      sms: "SMS सहायता"
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
          name: "Police Emergency",
          number: "100",
          description: "Direct Police Contact",
          features: ["24x7", "Free", "Immediate Response"],
          color: "blue"
        },
        {
          name: "Fire Emergency",
          number: "101",
          description: "Fire Department",
          features: ["24x7", "Free"],
          color: "orange"
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
          features: ["24x7", "Free", "Legal Support"],
          color: "rose"
        },
        {
          name: "NCW Helpline",
          number: "7827170170",
          description: "National Commission for Women",
          features: ["WhatsApp", "24x7", "Legal Aid"],
          color: "indigo"
        }
      ]
    },
    {
      category: t.stateSpecific,
      numbers: [
        {
          name: "Delhi Women Helpline",
          number: "1091",
          description: "Delhi Police Women Cell",
          features: ["24x7", "Local Support"],
          color: "green"
        },
        {
          name: "Mumbai Police",
          number: "1298",
          description: "Mumbai Women Safety",
          features: ["24x7", "Immediate Action"],
          color: "teal"
        },
        {
          name: "Bangalore She Team",
          number: "9480805122",
          description: "Karnataka She Team",
          features: ["WhatsApp", "SMS"],
          color: "cyan"
        },
        {
          name: "Hyderabad SHE Teams",
          number: "9490616555",
          description: "Telangana SHE Teams",
          features: ["WhatsApp", "Location Based"],
          color: "emerald"
        }
      ]
    },
    {
      category: t.specializedSupport,
      numbers: [
        {
          name: "Cyber Crime",
          number: "1930",
          description: "National Cyber Crime Helpline",
          features: ["24x7", "Online Support", "Expert Help"],
          color: "slate"
        },
        {
          name: "Legal Aid",
          number: "15100",
          description: "National Legal Services Authority",
          features: ["Free Legal Aid", "Court Assistance"],
          color: "amber"
        },
        {
          name: "Mental Health",
          number: "9152987821",
          description: "NIMHANS Helpline",
          features: ["Counseling", "Support"],
          color: "violet"
        },
        {
          name: "Anti-Trafficking",
          number: "1099",
          description: "Trafficking Helpline",
          features: ["24x7", "Rescue Support"],
          color: "red"
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
      indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", button: "bg-indigo-600 hover:bg-indigo-700" },
      rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", button: "bg-rose-600 hover:bg-rose-700" },
      teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", button: "bg-teal-600 hover:bg-teal-700" },
      cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", button: "bg-cyan-600 hover:bg-cyan-700" },
      emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", button: "bg-emerald-600 hover:bg-emerald-700" },
      slate: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-700", button: "bg-slate-600 hover:bg-slate-700" },
      amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", button: "bg-amber-600 hover:bg-amber-700" },
      violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", button: "bg-violet-600 hover:bg-violet-700" }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  return (
    <div className="space-y-6">
      {emergencyNumbers.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3 text-gray-800">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">{category.category}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.numbers.map((helpline, index) => {
                const colorClasses = getColorClasses(helpline.color);
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 ${colorClasses.bg} ${colorClasses.border} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className={`font-bold text-lg ${colorClasses.text} mb-2`}>
                          {helpline.name}
                        </h4>
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                          {helpline.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className={`text-3xl font-black ${colorClasses.text} bg-white/70 rounded-lg py-2 px-4 inline-block shadow-sm`}>
                        {helpline.number}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {helpline.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="secondary"
                          className="text-xs bg-white/80 text-gray-700 border border-gray-200 shadow-sm"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Button
                        className={`w-full ${colorClasses.button} text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200`}
                        onClick={() => window.open(`tel:${helpline.number}`, '_self')}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {t.call} {helpline.number}
                      </Button>
                      
                      {helpline.features.includes("WhatsApp") && (
                        <Button
                          variant="outline"
                          className="w-full border-green-300 text-green-700 hover:bg-green-50"
                          onClick={() => window.open(`https://wa.me/91${helpline.number}`, '_blank')}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          {t.whatsapp}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Enhanced Important Notice */}
      <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-full">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-yellow-800 mb-3 text-lg">
                {language === 'hi' ? 'महत्वपूर्ण सूचना' : 'Important Notice'}
              </h4>
              <div className="space-y-2 text-sm text-yellow-700">
                <p className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {language === 'hi' 
                    ? 'ये सभी सेवाएं निःशुल्क हैं और गोपनीय हैं।'
                    : 'All these services are free and confidential.'
                  }
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {language === 'hi' 
                    ? 'आपातकाल में तुरंत संपर्क करें - देरी न करें।'
                    : 'Contact immediately in emergency - do not delay.'
                  }
                </p>
                <p className="flex items-center">
                  <Scale className="h-4 w-4 mr-2" />
                  {language === 'hi' 
                    ? 'कानूनी सहायता और परामर्श भी उपलब्ध है।'
                    : 'Legal aid and counseling services are also available.'
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyHelplines;
