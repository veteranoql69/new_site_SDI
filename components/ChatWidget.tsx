"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize session (Volatile Chat)
  useEffect(() => {
    let id = localStorage.getItem('chat_session_id');
    if (!id) {
      id = `session_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('chat_session_id', id);
    }
    setSessionId(id);

    // Initial greeting if no messages
    const savedMessages = localStorage.getItem('chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([{ role: 'assistant', content: '¡Hola! Soy el asistente virtual de SDI Multiagentes. ¿En qué puedo ayudarte hoy con nuestras soluciones de IA?' }]);
    }
  }, []);

  // Save history to local storage (for persistence across refresh within the same "volatile" session)
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat_history', JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: input }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Lo siento, no pude contactar con el asistente en este momento. Por favor, verifica tu conexión o intenta más tarde.' 
        }]);
        return;
      }

      const data = await response.json();
      
      // Extract response from n8n response structure
      // Usually it's data.output or data.message.content depending on the node
      const aiContent = data.output || data.message || data.text || "Lo siento, hubo un error al procesar tu mensaje.";

      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ocurrió un error de conexión. Por favor intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[380px] h-[550px] bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">SDI Multiagentes</h3>
                  <p className="text-xs text-blue-100/80">IA Especializada en Negocios</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-gray-200"
            >
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex items-start gap-2",
                      msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      msg.role === 'user' ? "bg-blue-100" : "bg-indigo-100"
                    )}>
                      {msg.role === 'user' ? <User size={14} className="text-blue-600" /> : <Bot size={14} className="text-indigo-600" />}
                    </div>
                    <div className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-500/20" 
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm"
                    )}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
                      <Bot size={14} className="text-indigo-600" />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu mensaje..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-gray-800 placeholder:text-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-md shadow-blue-500/30"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <p className="mt-2 text-[10px] text-center text-gray-400">
                SDI Multiagentes - Potenciado por Inteligencia Artificial
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:bg-blue-700 transition-all border-4 border-white/20 backdrop-blur-sm"
      >
        {isOpen ? <X size={28} strokeWidth={2.5} /> : <MessageCircle size={28} strokeWidth={2.5} />}
      </motion.button>
    </div>
  );
}
