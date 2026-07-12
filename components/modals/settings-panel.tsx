'use client';

import React, { useState } from 'react';
import { X, Moon, Sun } from '@/lib/icons';
import { useAppStore } from '@/lib/stores/app';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme, setTheme } = useAppStore();
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-card z-50 shadow-lobe-md border-l border-border transition-all">
        {/* Header */}
        <div className="h-16 border-b border-border px-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-64px)] p-6 space-y-6">
          {/* Appearance Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Appearance</h3>
            <div className="space-y-3">
              {/* Theme Selection */}
              <div className="grid grid-cols-3 gap-3">
                {(['light', 'dark', 'auto'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-3 rounded-lg border-2 transition-all capitalize ${
                      theme === t
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      {t === 'light' && (
                        <Sun className="w-6 h-6 text-primary" />
                      )}
                      {t === 'dark' && (
                        <Moon className="w-6 h-6 text-primary" />
                      )}
                      {t === 'auto' && (
                        <Sun className="w-3 h-3 text-primary mr-1" />
                      )}
                    </div>
                    <span className="text-xs font-medium">{t}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Preferences</h3>
            <div className="space-y-3">
              {/* Auto-save */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <span className="text-sm font-medium text-foreground">Auto-save</span>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    autoSave ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      autoSave ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <span className="text-sm font-medium text-foreground">
                  Notifications
                </span>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="pt-6 border-t border-border">
            <h3 className="font-semibold text-foreground mb-2">About</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Multi Meta Matrix v1.0</p>
              <p>AI Agent Orchestration Platform</p>
              <p className="text-xs">© 2024 MMM Project</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
