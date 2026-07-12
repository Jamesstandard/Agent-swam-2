'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/stores/app';
import { SettingsPanel } from './modals/settings-panel';
import { Settings } from '@/lib/icons';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { sidebarOpen } = useAppStore();

  return (
    <>
      {/* Top Bar */}
      <div className={`fixed top-0 right-0 h-16 border-b border-border bg-card/50 backdrop-blur-sm z-20 transition-all duration-300 ${
        sidebarOpen ? 'left-64' : 'left-20'
      }`}>
        <div className="h-full px-6 flex items-center justify-end">
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`fixed top-16 right-0 bottom-0 overflow-y-auto transition-all duration-300 ${
        sidebarOpen ? 'left-64' : 'left-20'
      }`}>
        {children}
      </div>

      {/* Settings Panel */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
