import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Phone, Shield, Heart, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const translations = {
    en: {
      title: "AI Safety Assistant",
      subtitle: "Get personalized help and guidance for safety concerns",
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

  useEffect(() => {
    addWelcomeMessage();
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
        : 'Hello! 👋 I\'m your personal safety assistant powered by AI. I can provide safety tips, legal information, and personalized guidance. For emergencies, immediately call 112 or 1098. 🚨 How are you? Is there anything I can help you with?',
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
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: content, language }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
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
      console.error('AI Chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive"
      });
      
      // Add fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: language === 'hi'
          ? '🤖 क्षमा करें, कुछ समस्या हुई। कृपया पुनः प्रयास करें। आपातकाल के लिए 112 या 1098 पर कॉल करें।'
          : '🤖 Sorry, something went wrong. Please try again. For emergencies, call 112 or 1098.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickHelp = (message: string) => {
    sendMessage(message);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            {!message.isUser && (
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-full flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                message.isUser
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-tr-sm'
                  : message.isEmergency
                  ? 'bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 text-red-800 rounded-tl-sm'
                  : 'bg-white border border-purple-200 text-gray-800 rounded-tl-sm'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              <span className={`text-xs mt-1 block ${message.isUser ? 'text-white/70' : 'text-gray-400'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {message.isUser && (
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-2 rounded-full flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-full">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white border border-purple-200 p-3 rounded-2xl rounded-tl-sm shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Help Options */}
      <div className="p-3 border-t border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50">
        <p className="text-xs text-purple-600 mb-2 font-medium">{t.quickHelp}:</p>
        <div className="flex flex-wrap gap-1">
          {quickHelpOptions.slice(0, 4).map((option, index) => (
            <Button
              key={index}
              onClick={() => handleQuickHelp(option.message)}
              size="sm"
              variant="outline"
              className={`text-xs py-1 px-2 h-auto ${
                option.priority === 'high'
                  ? 'border-red-300 text-red-600 hover:bg-red-50'
                  : 'border-purple-200 text-purple-600 hover:bg-purple-50'
              }`}
              disabled={isLoading}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-purple-200 bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={t.typeMessage}
            className="flex-1 border-purple-200 focus:border-purple-400 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage(inputMessage)}
            disabled={isLoading}
          />
          <Button 
            onClick={() => sendMessage(inputMessage)}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">{t.aiDisclaimer}</p>
      </div>
    </div>
  );
};

export default AIAssistant;
