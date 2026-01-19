import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Headphones, ArrowRight } from 'lucide-react';

export default function ServerError() {
  // Generate error ID once on mount using useState lazy initializer
  const [errorId] = useState(() => Math.random().toString(36).substring(7));
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white transition-colors duration-200">
      
      {/* TopNavBar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-10 py-3 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="w-8 h-8 text-primary dark:text-primary">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
            </svg>
          </Link>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Mithivoices</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
            {/* Optional nav items */}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex h-full grow flex-col justify-center items-center p-4">
        <div className="px-4 py-5 w-full max-w-[640px] flex flex-col items-center">
            
            {/* Main Error Content */}
            <div className="flex flex-col items-center gap-8 px-4 py-6 w-full animate-in fade-in zoom-in duration-500">
                {/* Hero Icon */}
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-orange-50 dark:bg-orange-900/20 mb-2 border border-orange-100 dark:border-orange-800/30">
                    <AlertTriangle className="w-12 h-12 text-orange-500" />
                </div>

                {/* Text Content */}
                <div className="flex max-w-[480px] flex-col items-center gap-3 text-center">
                    <h1 className="text-slate-900 dark:text-white text-[32px] font-bold leading-tight tracking-[-0.015em]">
                        Something Went Wrong
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-normal">
                        We're experiencing technical difficulties. Please try again.
                    </p>
                    <p className="text-slate-400 text-xs font-mono pt-1">Error ID: {errorId}</p>
                </div>

                {/* Primary Action */}
                <button 
                  onClick={() => window.location.reload()}
                  className="flex min-w-[120px] w-full max-w-[240px] items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md shadow-primary/20"
                >
                    <span className="truncate">Try Again</span>
                </button>
            </div>

            {/* Secondary Action / ActionPanel Component */}
            <div className="w-full max-w-[480px] mt-4">
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                    <p className="text-slate-900 dark:text-white text-base font-bold leading-tight flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-gray-400" />
                        Need help?
                    </p>
                    <a href="#" className="text-sm font-bold leading-normal tracking-[0.015em] flex gap-2 text-primary dark:text-primary hover:underline items-center">
                        Report Issue
                        <ArrowRight className="w-5 h-5" />
                    </a>
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
}
