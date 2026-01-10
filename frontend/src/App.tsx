import React, { useState, useEffect } from 'react';
import { 
  Mic2, 
  MessageSquare, 
  Type, 
  Settings, 
  LayoutDashboard, 
  Menu, 
  X,
  Sparkles,
  Activity,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { TTSPanel } from './components/TTSPanel';
import { STTPanel } from './components/STTPanel';
import { VoiceChat } from './components/VoiceChat';
import { Toast, ToastType } from './components/ui/Toast';
import { healthApi, getErrorMessage } from './lib/api';

type Tab = 'home' | 'tts' | 'stt' | 'chat' | 'settings';
type ConnectionStatus = 'checking' | 'online' | 'offline';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('tts');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');
  const [lastError, setLastError] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
    message: '',
    type: 'info',
    visible: false,
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, visible: true });
  };

  const checkBackendHealth = async (silent = false) => {
    if (!silent) setIsTestingConnection(true);
    try {
      const data = await healthApi.check();
      // Check if backend returns status: online or just responds
      if (data.status === 'online' || data) {
        setConnectionStatus('online');
        setLastError(null);
        if (!silent) showToast('Backend connection successful!', 'success');
      }
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setConnectionStatus('offline');
      setLastError(errorMsg);
      if (!silent) showToast(`Connection failed: ${errorMsg}`, 'error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  // Immediate test on load
  useEffect(() => {
    checkBackendHealth(true);
    
    const interval = setInterval(() => checkBackendHealth(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tts', label: 'Text to Speech', icon: Type },
    { id: 'stt', label: 'Speech to Text', icon: Mic2 },
    { id: 'chat', label: 'Voice Chat', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'tts': return <TTSPanel showToast={showToast} />;
      case 'stt': return <STTPanel showToast={showToast} />;
      case 'chat': return <VoiceChat showToast={showToast} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/20">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Welcome to VoxAI</h2>
            <p className="text-white/40 max-w-md">The next generation of AI-powered voice processing.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0f0f0f] border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 px-2 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">VoxAI</h1>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                  activeTab === item.id 
                  ? 'bg-white/5 text-white shadow-sm' 
                  : 'text-white/40 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-purple-500' : 'group-hover:text-white/60'}`} />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
            <button 
              onClick={() => checkBackendHealth()}
              disabled={isTestingConnection}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all group"
            >
              {isTestingConnection ? (
                <RefreshCw className="w-5 h-5 animate-spin text-purple-500" />
              ) : (
                <Activity className="w-5 h-5 group-hover:text-purple-500 transition-colors" />
              )}
              <span className="text-sm font-medium">Test Connection</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="lg:ml-72 min-h-screen">
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {navItems.find(i => i.id === activeTab)?.label}
                </h2>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mt-0.5">AI Voice Engine v2.4</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${
                connectionStatus === 'online' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                : connectionStatus === 'offline'
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                : 'bg-white/5 border-white/10 text-white/40'
              }`}>
                {connectionStatus === 'online' ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">API Online</span>
                  </>
                ) : connectionStatus === 'offline' ? (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider truncate max-w-[200px]">
                      {lastError || 'API Offline'}
                    </span>
                  </div>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span className="text-xs font-bold uppercase tracking-wider">Checking...</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-12 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.visible} 
        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
      />
    </div>
  );
}

export default App;
