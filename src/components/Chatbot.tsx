import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  ExternalLink, 
  Sparkles, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  HelpCircle,
  Wind
} from 'lucide-react';
import { INSTAGRAM_DM_URL, BUSINESS_NAME } from '../utils/constants';
import { trackEvent, trackContactClick, trackCtaClick } from '../utils/analytics';

interface ChatbotProps {
  onOpenQuote: () => void;
  onOpenCallback: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  showActions?: boolean;
}

export const Chatbot: React.FC<ChatbotProps> = ({ 
  onOpenQuote, 
  onOpenCallback 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! 👋 Welcome to ${BUSINESS_NAME}. How can we help you with your home's air quality today?`,
      showActions: true,
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Automated smart assistant response
    setTimeout(() => {
      let botResponse = "Thank you for reaching out! Our team is ready to help you with residential air duct, dryer vent, HVAC, and chimney cleaning.";
      const lower = text.toLowerCase();

      if (lower.includes('instagram') || lower.includes('dm') || lower.includes('chat')) {
        botResponse = "You can chat with our team directly on Instagram DM for instant photo sharing and questions! Click the button below to message us.";
      } else if (lower.includes('quote') || lower.includes('price') || lower.includes('cost') || lower.includes('estimate')) {
        botResponse = "We provide 100% free, upfront quotes for all services with zero obligation. You can request a quote online or message us on Instagram DM.";
      } else if (lower.includes('service') || lower.includes('duct') || lower.includes('dryer') || lower.includes('chimney')) {
        botResponse = "We specialize in residential Air Duct Cleaning, Dryer Vent Cleaning, HVAC Coil Cleaning, and Chimney Cleaning across the USA.";
      } else if (lower.includes('call') || lower.includes('phone')) {
        botResponse = "We'll be glad to call you! Use the Request a Callback option, or chat directly with our dispatch on Instagram.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          showActions: true,
        }
      ]);
    }, 450);
  };

  return (
    <>
      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none">
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/14482035397"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick('whatsapp', '+1 (448) 203-5397', 'Floating WhatsApp Button')}
          aria-label="Chat on WhatsApp with Fresh Breeze"
          className="pointer-events-auto group relative flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all border border-white/20"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z"/>
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* Floating Chat Trigger Button */}
        {!isOpen && (
          <button
            onClick={() => {
              trackEvent('chatbot_open');
              setIsOpen(true);
            }}
            aria-label="Open Fresh Breeze Chat Assistant"
            className="pointer-events-auto group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-linear-to-r from-sky-600 via-sky-700 to-emerald-600 hover:from-sky-500 hover:via-sky-600 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm shadow-[0_8px_25px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer border border-white/20"
          >
            <div className="relative">
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-sky-700 animate-pulse" />
            </div>
            <span className="hidden sm:inline">Need Help? Chat With Us</span>
            <span className="sm:hidden">Chat</span>
          </button>
        )}
      </div>

      {/* Floating Chatbot Modal Window */}
      {isOpen && (
        <div 
          className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[380px] max-w-sm bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-[0_24px_60px_-12px_rgba(15,23,42,0.3),0_0_0_1px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] border border-white/80 dark:border-slate-800 overflow-hidden flex flex-col max-h-[82vh] sm:max-h-[580px] transition-all duration-300 animate-in zoom-in-95 text-left"
          role="dialog"
          aria-label="Fresh Breeze Chat Assistant"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-sky-600/95 via-sky-700/95 to-emerald-700/95 backdrop-blur-md px-5 py-4 text-white relative shrink-0 border-b border-white/20 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-xs">
                <Wind className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white font-display">
                    Fresh Breeze Assistant
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-sky-100">
                  Online • Typically replies instantly
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat window"
              className="p-1.5 rounded-xl text-white/85 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 sm:p-5 space-y-4 overflow-y-auto grow bg-slate-50/50 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-xs'
                      : 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-xs text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Quick Action Options */}
                {msg.showActions && (
                  <div className="w-full mt-3 space-y-2 animate-in fade-in duration-200">
                    {/* PRIMARY ACTION: Instagram DM Button */}
                    <a
                      href={INSTAGRAM_DM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackContactClick('instagram', 'Instagram DM', 'Chatbot Assistant')}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-linear-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-500 hover:via-pink-500 hover:to-rose-400 text-white font-bold text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer border border-white/20"
                    >
                      <span className="text-sm">📸</span>
                      <span>Chat with us on Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                    </a>

                    {/* Secondary Quick Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          trackCtaClick('Get Free Quote', 'Chatbot Assistant');
                          setIsOpen(false);
                          onOpenQuote();
                        }}
                        className="py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300 font-bold text-[11px] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                        <span>Get Free Quote</span>
                      </button>

                      <button
                        onClick={() => {
                          trackCtaClick('Call Request', 'Chatbot Assistant');
                          setIsOpen(false);
                          onOpenCallback();
                        }}
                        className="py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold text-[11px] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Call Request</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick FAQ Question Chips */}
          <div className="px-4 py-2 bg-white/70 dark:bg-slate-900/90 backdrop-blur-xs border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSendMessage("What services do you offer?")}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors cursor-pointer"
            >
              Services?
            </button>
            <button
              onClick={() => handleSendMessage("How do I get an estimate?")}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors cursor-pointer"
            >
              Free Estimates?
            </button>
            <button
              onClick={() => handleSendMessage("Can I message on Instagram?")}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-pink-950/60 hover:bg-pink-100 dark:hover:bg-pink-900/60 text-pink-700 dark:text-pink-300 font-medium transition-colors cursor-pointer"
            >
              📸 Instagram DM?
            </button>
          </div>

          {/* Message Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question or type here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="grow px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500/25 focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
