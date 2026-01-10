import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Bot, User, Trash2, Loader2 } from 'lucide-react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { chatApi, getErrorMessage } from '../lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  audioUrl?: string;
  timestamp: Date;
}

export const VoiceChat = ({ showToast }: { showToast: (m: string, t: any) => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudioRecorder();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (audioBlob && !isRecording) {
      handleSendVoice(audioBlob);
    }
  }, [audioBlob, isRecording]);

  const handleSendVoice = async (blob: Blob) => {
    setIsProcessing(true);
    try {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        text: 'Voice message sent...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMsg]);

      const response = await chatApi.voiceChat(blob);
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.text,
        audioUrl: response.audio_url,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMsg]);

      if (response.audio_url) {
        const audio = new Audio(response.audio_url);
        audio.play().catch(e => console.error('Auto-play failed:', e));
      }
    } catch (err) {
      showToast(`Chat failed: ${getErrorMessage(err)}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
              <Bot className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Start a Conversation</h3>
              <p className="text-sm max-w-xs">Hold the microphone to speak with VoxAI. Your responses will be transcribed and spoken back.</p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-2xl p-4 ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                {msg.audioUrl && (
                  <audio src={msg.audioUrl} controls className="h-8 w-48 opacity-60 hover:opacity-100 transition-opacity" />
                )}
                <span className="text-[10px] text-white/20 font-mono">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="flex gap-4 items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
              <span className="text-sm text-white/40">VoxAI is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/5 bg-white/5 backdrop-blur-xl rounded-b-3xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMessages([])}
            className="p-4 hover:bg-white/5 rounded-2xl text-white/20 hover:text-rose-400 transition-all"
            title="Clear Chat"
          >
            <Trash2 className="w-6 h-6" />
          </button>
          
          <div className="flex-1 relative flex items-center justify-center">
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              className={`group relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-500 ${
                isRecording 
                ? 'bg-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.5)] scale-110' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]'
              }`}
            >
              {isRecording ? (
                <Square className="w-8 h-8 text-white fill-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
              
              {!isRecording && (
                <span className="absolute -top-12 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Hold to speak
                </span>
              )}
            </button>
          </div>

          <div className="w-14" />
        </div>
      </div>
    </div>
  );
};
