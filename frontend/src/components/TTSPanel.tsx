import React, { useState } from 'react';
import { Play, Download, Loader2, Volume2, Settings2 } from 'lucide-react';
import { ttsApi, getErrorMessage } from '../lib/api';

export const TTSPanel = ({ showToast }: { showToast: (m: string, t: any) => void }) => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('neural');
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return showToast('Please enter some text', 'error');
    
    setLoading(true);
    try {
      const blob = await ttsApi.generate({ text, voice, speed, pitch });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      showToast('Speech generated successfully!', 'success');
    } catch (err) {
      showToast(`Generation failed: ${getErrorMessage(err)}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none text-lg leading-relaxed"
        />
        <div className="absolute bottom-4 right-4 text-white/20 text-sm">
          {text.length} characters
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <Volume2 className="w-4 h-4" />
            <span className="text-sm font-medium">Voice Profile</span>
          </div>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="male">Male Professional</option>
            <option value="female">Female Expressive</option>
            <option value="neural">Neural AI (Premium)</option>
          </select>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between text-white/60 mb-2">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              <span className="text-sm font-medium">Speed</span>
            </div>
            <span className="text-xs font-mono text-purple-400">{speed}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between text-white/60 mb-2">
            <div className="flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              <span className="text-sm font-medium">Pitch</span>
            </div>
            <span className="text-xs font-mono text-blue-400">{pitch > 0 ? `+${pitch}` : pitch}</span>
          </div>
          <input
            type="range"
            min="-10"
            max="10"
            step="1"
            value={pitch}
            onChange={(e) => setPitch(parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex-1 md:flex-none bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-purple-500/20"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
          Generate Speech
        </button>

        {audioUrl && (
          <div className="flex-1 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-2">
            <audio src={audioUrl} controls className="flex-1 h-10" />
            <a
              href={audioUrl}
              download="voxai-speech.wav"
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/60 hover:text-white"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
