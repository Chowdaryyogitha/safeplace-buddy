
import React, { useState } from 'react';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AIAssistant from './AIAssistant';

interface AIAssistantPopupProps {
  language: string;
}

const AIAssistantPopup: React.FC<AIAssistantPopupProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const translations = {
    en: {
      assistantTitle: "AI Safety Assistant",
      minimize: "Minimize",
      maximize: "Maximize",
      close: "Close",
      helpText: "Need help? Chat with AI Assistant"
    },
    hi: {
      assistantTitle: "AI सुरक्षा सहायक",
      minimize: "छोटा करें",
      maximize: "बड़ा करें", 
      close: "बंद करें",
      helpText: "सहायता चाहिए? AI असिस्टेंट से चैट करें"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-2xl animate-pulse"
            size="sm"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
          <div className="absolute -top-12 right-0 bg-black/80 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
            {t.helpText}
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
          <Card className={`pointer-events-auto shadow-2xl border-2 border-purple-200 transition-all duration-300 ${
            isMinimized 
              ? 'w-80 h-16' 
              : 'w-96 h-[600px] max-h-[80vh]'
          } max-w-[90vw]`}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg border-b">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-purple-700 text-sm">
                  {t.assistantTitle}
                </span>
              </div>
              
              <div className="flex space-x-1">
                <Button
                  onClick={() => setIsMinimized(!isMinimized)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-purple-200"
                  title={isMinimized ? t.maximize : t.minimize}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-3 w-3" />
                  ) : (
                    <Minimize2 className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-red-200 text-red-600"
                  title={t.close}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <CardContent className="p-0 flex-1 overflow-hidden">
                <div className="h-full">
                  <AIAssistant language={language} />
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default AIAssistantPopup;
