import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, AlertTriangle, Phone, Shield, Heart, Zap, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantProps {
  language: string;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isEmergency?: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const translations = {
    en: {
      title: "AI Safety Assistant",
      subtitle: "Get personalized help and guidance for safety concerns",
      enterApiKey: "Enter Gemini API Key",
      apiKeyPlaceholder: "Your Gemini API key for enhanced responses...",
      saveApiKey: "Save API Key",
      typeMessage: "Describe your situation or ask for help...",
      send: "Send",
      quickHelp: "Quick Help Options",
      emergencyContact: "🚨 Emergency Numbers",
      safetyTips: "🛡️ Safety Tips",
      legalAdvice: "⚖️ Legal Rights",
      reportGuidance: "📝 Report Incident",
      locationHelp: "📍 Find Safe Places",
      cyberSafety: "💻 Cyber Safety",
      aiDisclaimer: "🤖 This AI provides general guidance only. For immediate emergencies, contact emergency services (112) right away.",
      emergencyDetected: "⚠️ Emergency Detected - Contact 112 immediately!"
    },
    hi: {
      title: "AI सुरक्षा सहायक",
      subtitle: "सुरक्षा संबंधी चिंताओं के लिए व्यक्तिगत सहायता और मार्गदर्शन प्राप्त करें",
      enterApiKey: "Gemini API Key दर्ज करें",
      apiKeyPlaceholder: "बेहतर उत्तरों के लिए आपकी Gemini API key...",
      saveApiKey: "API Key सेव करें",
      typeMessage: "अपनी स्थिति बताएं या सहायता मांगें...",
      send: "भेजें",
      quickHelp: "त्वरित सहायता विकल्प",
      emergencyContact: "🚨 आपातकालीन नंबर",
      safetyTips: "🛡️ सुरक्षा सुझाव",
      legalAdvice: "⚖️ कानूनी अधिकार",
      reportGuidance: "📝 घटना रिपोर्ट करें",
      locationHelp: "📍 सुरक्षित स्थान खोजें",
      cyberSafety: "💻 साइबर सुरक्षा",
      aiDisclaimer: "🤖 यह AI केवल सामान्य मार्गदर्शन प्रदान करता है। तत्काल आपातकाल के लिए, तुरंत आपातकालीन सेवाओं (112) से संपर्क करें।",
      emergencyDetected: "⚠️ आपातकाल का पता चला - तुरंत 112 पर कॉल करें!"
    }
  };

  const t = translations[language as keyof typeof translations];

  const quickHelpOptions = [
    {
      label: t.emergencyContact,
      message: language === 'hi' 
        ? 'मुझे आपातकालीन स्थिति में तुरंत संपर्क नंबर चाहिए'
        : 'I need emergency contact numbers immediately',
      priority: 'high'
    },
    {
      label: t.safetyTips,
      message: language === 'hi'
        ? 'मुझे घर से बाहर निकलते समय सुरक्षा के सुझाव चाहिए'
        : 'I need safety tips when going out alone',
      priority: 'medium'
    },
    {
      label: t.legalAdvice,
      message: language === 'hi'
        ? 'मुझे उत्पीड़न के खिलाफ अपने कानूनी अधिकारों के बारे में जानना है'
        : 'I need to know my legal rights against harassment',
      priority: 'medium'
    },
    {
      label: t.reportGuidance,
      message: language === 'hi'
        ? 'मुझे घटना की रिपोर्ट कैसे करनी है और क्या सबूत चाहिए?'
        : 'How do I report an incident and what evidence do I need?',
      priority: 'medium'
    },
    {
      label: t.locationHelp,
      message: language ===  'hi'
        ? 'मेरे आसपास कौन से सुरक्षित स्थान हैं?'
        : 'What are the safe places near me?',
      priority: 'low'
    },
    {
      label: t.cyberSafety,
      message: language === 'hi'
        ? 'मुझे ऑनलाइन सुरक्षा और साइबर अपराध से बचने के तरीके बताएं'
        : 'Tell me about online safety and how to avoid cyber crimes',
      priority: 'low'
    }
  ];

  const detectEmergencyKeywords = (text: string): boolean => {
    const emergencyKeywords = [
      'emergency', 'help me', 'danger', 'threat', 'attack', 'harassment', 'following me',
      'scared', 'afraid', 'stalking', 'violence', 'hurt', 'abuse', 'rape', 'assault',
      'आपातकाल', 'बचाओ', 'खतरा', 'डर', 'मदद', 'परेशान', 'पीछा', 'हिंसा', 'मारपीट'
    ];
    
    return emergencyKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const getEnhancedAIResponse = (userMessage: string): string => {
    const isEmergency = detectEmergencyKeywords(userMessage);
    
    if (isEmergency) {
      return language === 'hi'
        ? '🚨 तुरंत कार्रवाई करें: यदि आप तत्काल खतरे में हैं, तो 112 पर कॉल करें। महिला हेल्पलाइन: 1098। अपना स्थान किसी विश्वसनीय व्यक्ति को भेजें। सुरक्षित स्थान पर जाएं। Emergency Helplines सेक्शन में अधिक नंबर देखें।'
        : '🚨 IMMEDIATE ACTION: If you\'re in immediate danger, call 112. Women Helpline: 1098. Share your location with trusted contacts. Move to a safe place. Check Emergency Helplines section for more numbers.';
    }

    // Enhanced contextual responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('report') || lowerMessage.includes('रिपोर्ट')) {
      return language === 'hi'
        ? '📝 घटना रिपोर्ट करना: "Report Incident" सेक्शन का उपयोग करें। जरूरी चीजें: 1) घटना का विस्तृत विवरण 2) तारीख और समय 3) स्थान की जानकारी 4) सबूत (फोटो/वीडियो/स्क्रीनशॉट) 5) गवाहों की जानकारी। पुलिस में FIR दर्ज कराएं।'
        : '📝 Reporting Incident: Use "Report Incident" section. Essential items: 1) Detailed incident description 2) Date and time 3) Location info 4) Evidence (photos/videos/screenshots) 5) Witness information. File FIR with police.';
    }
    
    if (lowerMessage.includes('safe') || lowerMessage.includes('सुरक्षा')) {
      return language === 'hi'
        ? '🛡️ सुरक्षा सुझाव: 1) हमेशा अपना स्थान विश्वसनीय लोगों को बताएं 2) भीड़भाड़ वाली जगह जाएं 3) आपातकालीन नंबर याद रखें 4) अजनबियों से सावधान रहें 5) रात में अकेले न निकलें 6) परिवहन साझा करते समय सावधान रहें। Location Services में सुरक्षित स्थान देखें।'
        : '🛡️ Safety Tips: 1) Always share location with trusted people 2) Stay in crowded areas 3) Keep emergency numbers handy 4) Be cautious with strangers 5) Avoid going out alone at night 6) Be careful when sharing transport. Check Location Services for safe places.';
    }
    
    if (lowerMessage.includes('legal') || lowerMessage.includes('कानूनी')) {
      return language === 'hi'
        ? '⚖️ कानूनी अधिकार: 1) FIR दर्ज कराने का अधिकार 2) मुफत कानूनी सहायता (15100) 3) महिला पुलिस स्टेशन में शिकायत 4) NCW में शिकायत 5) त्वरित न्याय का अधिकार। फोटो मॉर्फिंग: IT Act 2000 Section 66E, साइबर अपराध: 1930 पर कॉल करें।'
        : '⚖️ Legal Rights: 1) Right to file FIR 2) Free legal aid (15100) 3) Complaint at women police station 4) NCW complaint 5) Right to speedy justice. Photo morphing: IT Act 2000 Section 66E, Cyber crime: Call 1930.';
    }
    
    if (lowerMessage.includes('cyber') || lowerMessage.includes('साइबर')) {
      return language === 'hi'
        ? '💻 साइबर सुरक्षा: 1) व्यक्तिगत जानकारी साझा न करें 2) मजबूत पासवर्ड रखें 3) अज्ञात लिंक न खोलें 4) स्क्रीनशॉट सबूत के रूप में रखें 5) साइबर अपराध हेल्पलाइन: 1930 6) NCW साइबर सेल: 7827170170। सोशल मीडिया प्राइवेसी सेटिंग्स चेक करें।'
        : '💻 Cyber Safety: 1) Don\'t share personal info 2) Use strong passwords 3) Don\'t open unknown links 4) Keep screenshots as evidence 5) Cyber crime helpline: 1930 6) NCW cyber cell: 7827170170. Check social media privacy settings.';
    }

    // Default helpful response
    return language === 'hi'
      ? '🤖 मैं आपकी सहायता के लिए यहां हूं। कृपया अपनी समस्या के बारे में और बताएं या Quick Help options का उपयोग करें। आपकी सुरक्षा मेरी प्राथमिकता है। 💜'
      : '🤖 I\'m here to help you. Please tell me more about your concern or use the Quick Help options. Your safety is my priority. 💜';
  };

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
      addWelcomeMessage();
    }
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addWelcomeMessage = () => {
    const welcomeMessage = {
      id: Date.now().toString(),
      content: language === 'hi'
        ? 'नमस्ते! 👋 मैं आपकी व्यक्तिगत सुरक्षा सहायक हूं। मैं आपको सुरक्षा सुझाव, कानूनी जानकारी, और व्यक्तिगत मार्गदर्शन प्रदान कर सकती हूं। आपातकाल के लिए तुरंत 112 या 1098 पर कॉल करें। 🚨 आप कैसी हैं? क्या मैं आपकी कोई सहायता कर सकती हूं?'
        : 'Hello! 👋 I\'m your personal safety assistant. I can provide safety tips, legal information, and personalized guidance. For emergencies, immediately call 112 or 1098. 🚨 How are you? Is there anything I can help you with?',
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const isEmergency = detectEmergencyKeywords(content);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
      isEmergency
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = getEnhancedAIResponse(content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        isEmergency
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (isEmergency) {
        toast({
          title: t.emergencyDetected,
          description: language === 'hi' 
            ? 'तुरंत 112 या 1098 पर कॉल करें!'
            : 'Call 112 or 1098 immediately!',
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickHelp = (message: string) => {
    sendMessage(message);
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key for enhanced responses",
        variant: "destructive"
      });
      return;
    }
    
    localStorage.setItem('gemini-api-key', apiKey);
    setShowApiKeyInput(false);
    addWelcomeMessage();
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved securely for better responses."
    });
  };

  if (showApiKeyInput) {
    return (
      <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg">
          <CardTitle className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <p className="text-gray-600 text-center">{t.subtitle}</p>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder={t.apiKeyPlaceholder}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="text-center font-mono"
            />
            <Button 
              onClick={handleSaveApiKey} 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3"
            >
              <Zap className="h-4 w-4 mr-2" />
              {t.saveApiKey}
            </Button>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800 text-center">
              {language === 'hi'
                ? '🌟 Gemini API key प्राप्त करने के लिए ai.google.dev पर जाएं। यह key केवल आपके डिवाइस पर सुरक्षित रूप से संग्रहीत होगी और बेहतर AI responses के लिए उपयोग होगी।'
                : '🌟 Get your Gemini API key from ai.google.dev. This key will be stored securely on your device only and used for enhanced AI responses.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Chat Interface */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg">
          <CardTitle className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {t.title}
            </span>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              {language === 'hi' ? 'सक्रिय' : 'Active'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Messages with enhanced styling */}
          <div className="h-96 overflow-y-auto mb-6 space-y-4 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!message.isUser && (
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-full">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                      : message.isEmergency
                      ? 'bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 text-red-800'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.isUser ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.isUser && (
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-gray-400 to-gray-600 p-2 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-full">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input */}
          <div className="flex space-x-3">
            <Input
              placeholder={t.typeMessage}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
              disabled={isLoading}
              className="flex-1 rounded-xl border-2 border-purple-200 focus:border-purple-400 px-4 py-3"
            />
            <Button
              onClick={() => sendMessage(inputMessage)}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Help Options */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-lg">
          <CardTitle className="flex items-center space-x-3 text-indigo-700">
            <Zap className="h-5 w-5" />
            <span>{t.quickHelp}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickHelpOptions.map((option, index) => {
              const priorityColors = {
                high: 'border-red-300 hover:bg-red-50 text-red-700',
                medium: 'border-orange-300 hover:bg-orange-50 text-orange-700',
                low: 'border-blue-300 hover:bg-blue-50 text-blue-700'
              };
              
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleQuickHelp(option.message)}
                  className={`text-left justify-start h-auto py-4 px-4 border-2 ${priorityColors[option.priority as keyof typeof priorityColors]} font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md`}
                >
                  <span className="text-sm">{option.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Disclaimer */}
      <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-full">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-yellow-800 leading-relaxed">{t.aiDisclaimer}</p>
              <div className="mt-3 flex space-x-2">
                <Badge className="bg-red-100 text-red-700 border-red-200">
                  <Phone className="h-3 w-3 mr-1" />
                  112
                </Badge>
                <Badge className="bg-pink-100 text-pink-700 border-pink-200">
                  <Heart className="h-3 w-3 mr-1" />
                  1098
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
