import React, { useState } from 'react';
import { Mic, Square, Upload, Copy, Trash2, Loader2, FileAudio } from 'lucide-react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { sttApi, getErrorMessage } from '../lib/api';

export const STTPanel = ({ showToast }: { showToast: (m: string, t: any) => void }) => {
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudioRecorder();
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const processAudio = async (blob: Blob) => {
    setIsProcessing(true);
    try {
      const result = await sttApi.transcribe(blob);
      setTranscription(prev => prev + (prev ? ' ' : '') + result.text);
      showToast('Transcription complete', 'success');
    } catch (err) {
      showToast(`Transcription failed: ${getErrorMessage(err)}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Effect to handle recording completion
  React.useEffect(() => {
    if (audioBlob && !isRecording) {
      processAudio(audioBlob);
    }
  }, [audioBlob, isRecording]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processAudio(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      processAudio(file);
    } else {
      showToast('Please upload an audio file', 'error');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcription);
    showToast('Copied to clipboard', 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          {isRecording && (
            <div className="absolute inset-0 bg-rose-500/5 animate-pulse" />
          )}
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                isRecording 
                ? 'bg-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.4)] scale-110' 
                : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {isRecording ? (
                <Square className="w-8 h-8 text-white fill-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-1">
                {isRecording ? 'Recording Audio...' : 'Start Recording'}
              </h3>
              <p className="text-white/40 text-sm">
                {isRecording ? 'Click to stop and transcribe' : 'Capture your voice in real-time'}
              </p>
            </div>
          </div>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center gap-4 cursor-pointer ${
            isDragging ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 hover:border-white/20 bg-white/5'
          }`}
        >
          <input type="file" id="audio-upload" className="hidden" accept="audio/*" onChange={handleFileUpload} />
          <label htmlFor="audio-upload" className="flex flex-col items-center gap-4 cursor-pointer w-full">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <Upload className="w-6 h-6 text-white/60" />
            </div>
            <div className="text-center">
              <p className="text-white font-medium">Drop audio file here</p>
              <p className="text-white/40 text-sm">Support for MP3, WAV, M4A</p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col h-full min-h-[500px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <FileAudio className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Transcription</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              disabled={!transcription}
              className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors disabled:opacity-30"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTranscription('')}
              disabled={!transcription}
              className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-rose-400 transition-colors disabled:opacity-30"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          {isProcessing && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                <span className="text-sm text-white/60 font-medium">Processing audio...</span>
              </div>
            </div>
          )}
          <textarea
            readOnly
            value={transcription}
            placeholder="Your transcription will appear here..."
            className="w-full h-full bg-transparent border-none focus:ring-0 text-white/80 placeholder:text-white/10 resize-none text-lg leading-relaxed"
          />
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-sm text-white/40">
          <span>{transcription.split(/\s+/).filter(Boolean).length} words</span>
          <span>{transcription.length} characters</span>
        </div>
      </div>
    </div>
  );
};
