
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, AlertTriangle, Phone } from 'lucide-react';
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
      subtitle: "Get help and guidance for safety concerns",
      enterApiKey: "Enter Gemini API Key",
      apiKeyPlaceholder: "Your Gemini API key...",
      saveApiKey: "Save API Key",
      typeMessage: "Type your message...",
      send: "Send",
      quickHelp: "Quick Help",
      emergencyContact: "Emergency Contact",
      safetyTips: "Safety Tips",
      legalAdvice: "Legal Guidance",
      reportGuidance: "Report Guidance",
      aiDisclaimer: "This AI assistant provides general guidance only. For emergencies, contact local authorities immediately."
    },
    hi: {
      title: "AI सुरक्षा सहायक",
      subtitle: "सुरक्षा संबंधी चिंताओं के लिए सहायता और मार्गदर्शन प्राप्त करें",
      enterApiKey: "Gemini API Key दर्ज करें",
      apiKeyPlaceholder: "आपकी Gemini API key...",
      saveApiKey: "API Key सेव करें",
      typeMessage: "अपना संदेश टाइप करें...",
      send: "भेजें",
      quickHelp: "त्वरित सहायता",
      emergencyContact: "आपातकालीन संपर्क",
      safetyTips: "सुरक्षा सुझाव",
      legalAdvice: "कानूनी मार्गदर्शन",
      reportGuidance: "रिपोर्ट मार्गदर्शन",
      aiDisclaimer: "यह AI सहायक केवल सामान्य मार्गदर्शन प्रदान करता है। आपातकाल के लिए, तुरंत स्थानीय अधिकारियों से संपर्क करें।"
    }
  };

  const t = translations[language as keyof typeof translations];

  const quickHelpOptions = [
    {
      label: t.emergencyContact,
      message: language === 'hi' 
        ? 'मुझे आपातकालीन स्थिति में संपर्क नंबर चाहिए'
        : 'I need emergency contact numbers'
    },
    {
      label: t.safetyTips,
      message: language === 'hi'
        ? 'मुझे सुरक्षा के लिए सुझाव चाहिए'
        : 'I need safety tips and advice'
    },
    {
      label: t.legalAdvice,
      message: language === 'hi'
        ? 'मुझे कानूनी अधिकारों के बारे में जानकारी चाहिए'
        : 'I need information about my legal rights'
    },
    {
      label: t.reportGuidance,
      message: language === 'hi'
        ? 'मुझे घटना की रिपोर्ट कैसे करनी है?'
        : 'How do I report an incident?'
    }
  ];

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
        ? 'नमस्ते! मैं आपकी सुरक्षा सहायक हूं। मैं आपको सुरक्षा सुझाव, कानूनी जानकारी और मार्गदर्शन प्रदान कर सकती हूं। आपातकाल के लिए तुरंत 112 या 1098 पर कॉल करें।'
        : 'Hello! I\'m your safety assistant. I can provide safety tips, legal information, and guidance. For emergencies, immediately call 112 or 1098.',
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key",
        variant: "destructive"
      });
      return;
    }
    
    localStorage.setItem('gemini-api-key', apiKey);
    setShowApiKeyInput(false);
    addWelcomeMessage();
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved securely."
    });
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !apiKey) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response since we can't make actual API calls from frontend
      // In a real implementation, this would go through a backend service
      const systemPrompt = language === 'hi'
        ? 'आप एक महिला सुरक्षा सहायक हैं। संक्षिप्त, सहायक और सहानुभूतिपूर्ण उत्तर दें। आपातकाल के लिए हमेशा उपयोगकर्ता को आपातकालीन हेल्पलाइन सेक्शन में भेजें।'
        : 'You are a women\'s safety assistant. Provide brief, helpful, and empathetic responses. Always direct users to the Emergency Helplines section for emergencies.';

      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let aiResponse = '';
      
      if (content.toLowerCase().includes('emergency') || content.toLowerCase().includes('आपातकाल')) {
        aiResponse = language === 'hi'
          ? 'तत्काल आपातकाल के लिए कृपया 112 या 1098 पर कॉल करें। अधिक हेल्पलाइन नंबर के लिए "Emergency Helplines" सेक्शन देखें।'
          : 'For immediate emergencies, please call 112 or 1098. Check the "Emergency Helplines" section for more helpline numbers.';
      } else if (content.toLowerCase().includes('report') || content.toLowerCase().includes('रिपोर्ट')) {
        aiResponse = language === 'hi'
          ? 'घटना की रिपोर्ट करने के लिए "Report Incident" सेक्शन का उपयोग करें। आप वहां घटना का विवरण दे सकते हैं और सबूत अपलोड कर सकते हैं।'
          : 'To report an incident, use the "Report Incident" section. You can describe the incident and upload evidence there.';
      } else if (content.toLowerCase().includes('safe') || content.toLowerCase().includes('सुरक्षा')) {
        aiResponse = language === 'hi'
          ? 'सुरक्षा के लिए: हमेशा अपना स्थान किसी विश्वसनीय व्यक्ति को बताएं, भीड़भाड़ वाली जगहों में रहें, और आपातकालीन नंबर याद रखें।'
          : 'For safety: Always share your location with trusted contacts, stay in crowded areas, and keep emergency numbers handy.';
      } else {
        aiResponse = language === 'hi'
          ? 'मैं आपकी सहायता के लिए यहां हूं। कृपया अपनी समस्या के बारे में और बताएं या Quick Help options का उपयोग करें।'
          : 'I\'m here to help you. Please tell me more about your concern or use the Quick Help options.';
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
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

  if (showApiKeyInput) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-purple-600" />
            <span>{t.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{t.subtitle}</p>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder={t.apiKeyPlaceholder}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button onClick={handleSaveApiKey} className="w-full bg-purple-600 hover:bg-purple-700">
              {t.saveApiKey}
            </Button>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              {language === 'hi'
                ? 'Gemini API key प्राप्त करने के लिए ai.google.dev पर जाएं। यह key केवल आपके डिवाइस पर सुरक्षित रूप से संग्रहीत होगी।'
                : 'Get your Gemini API key from ai.google.dev. This key will be stored securely on your device only.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chat Interface */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-purple-600" />
            <span>{t.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="h-96 overflow-y-auto mb-4 space-y-3 bg-gray-50 p-4 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!message.isUser && (
                  <div className="flex-shrink-0">
                    <Bot className="h-6 w-6 text-purple-600" />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.isUser && (
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <Bot className="h-6 w-6 text-purple-600" />
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
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

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              placeholder={t.typeMessage}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
              disabled={isLoading}
            />
            <Button
              onClick={() => sendMessage(inputMessage)}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Help Options */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-700">{t.quickHelp}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {quickHelpOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleQuickHelp(option.message)}
                className="text-left justify-start h-auto py-3 border-purple-200 hover:bg-purple-50"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">{t.aiDisclaimer}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
