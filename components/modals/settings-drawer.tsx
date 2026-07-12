'use client';

import React, { useState } from 'react';
import { X, Moon, Sun, Volume2, CheckCircle, AlertCircle, Zap } from '@/lib/icons';
import { useAppStore } from '@/lib/stores/app';

const SOUND_ENABLED = false; // Placeholder - would need actual audio implementation

export function SettingsDrawer() {
  const {
    settingsOpen,
    setSettingsOpen,
    theme,
    setTheme,
    soundEnabled,
    toggleSound,
    autoSave,
    toggleAutoSave,
    notifications,
    toggleNotifications,
    compactMode,
    toggleCompactMode,
    animationsEnabled,
    toggleAnimations,
  } = useAppStore();

  const [expandedSection, setExpandedSection] = useState<string | null>('appearance');

  if (!settingsOpen) return null;

  const playSound = () => {
    if (soundEnabled && SOUND_ENABLED) {
      // Audio implementation would go here
      // e.g., new Audio('/sounds/click.mp3').play();
    }
  };

  const handleToggle = (action: () => void, soundFeedback = true) => {
    if (soundFeedback) playSound();
    action();
  };

  const SectionHeader = ({ title, id }: { title: string; id: string }) => (
    <button
      onClick={() => {
        setExpandedSection(expandedSection === id ? null : id);
        playSound();
      }}
      className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors rounded-lg"
    >
      <h3 className="font-semibold text-foreground text-sm">{title}</h3>
      <div
        className={`w-5 h-5 flex items-center justify-center transition-transform ${
          expandedSection === id ? 'rotate-180' : ''
        }`}
      >
        ▼
      </div>
    </button>
  );

  const ToggleSwitch = ({
    enabled,
    onChange,
    label,
  }: {
    enabled: boolean;
    onChange: () => void;
    label: string;
  }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => handleToggle(onChange)}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div
        className={`w-12 h-7 rounded-full transition-all ${
          enabled ? 'bg-primary' : 'bg-muted'
        } flex items-center`}
      >
        <div
          className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </div>
    </div>
  );

  const ThemeButton = ({ t }: { t: 'light' | 'dark' | 'auto' }) => (
    <button
      onClick={() => {
        setTheme(t);
        playSound();
      }}
      className={`flex-1 p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
        theme === t
          ? 'border-primary bg-primary/10 shadow-lobe-md'
          : 'border-border hover:border-primary'
      }`}
    >
      <div className="w-8 h-8 flex items-center justify-center">
        {t === 'light' && <Sun className="w-6 h-6 text-primary" />}
        {t === 'dark' && <Moon className="w-6 h-6 text-primary" />}
        {t === 'auto' && (
          <div className="flex gap-0.5">
            <Sun className="w-3 h-3 text-primary" />
            <Moon className="w-3 h-3 text-primary" />
          </div>
        )}
      </div>
      <span className="text-xs font-medium capitalize">{t}</span>
    </button>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        onClick={() => setSettingsOpen(false)}
        aria-hidden="true"
      />

      {/* Settings Drawer - Mobile Bottom Sheet & Desktop Side Panel */}
      <div
        className={`fixed md:fixed md:right-0 md:top-0 md:bottom-0 md:w-96 bottom-20 left-4 right-4 md:left-auto bg-card rounded-3xl md:rounded-none border border-border md:border-l md:border-r-0 md:border-t-0 md:border-b-0 z-50 transition-all duration-300 md:shadow-lobe-md shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-screen md:rounded-tl-2xl md:rounded-bl-2xl ${
          settingsOpen
            ? 'opacity-100 translate-y-0 md:translate-x-0'
            : 'opacity-0 pointer-events-none translate-y-4 md:translate-x-96'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-bold text-foreground">Settings</h2>
          <button
            onClick={() => setSettingsOpen(false)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto flex-1 px-4 py-6 space-y-4">
          {/* Appearance Section */}
          <div className="space-y-3">
            <SectionHeader title="Appearance" id="appearance" />
            {expandedSection === 'appearance' && (
              <div className="space-y-3 pl-2 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-3 gap-2">
                  <ThemeButton t="light" />
                  <ThemeButton t="dark" />
                  <ThemeButton t="auto" />
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="space-y-3">
            <SectionHeader title="Features" id="features" />
            {expandedSection === 'features' && (
              <div className="space-y-3 pl-2 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <ToggleSwitch
                  enabled={animationsEnabled}
                  onChange={toggleAnimations}
                  label="Enable Animations"
                />
                <ToggleSwitch
                  enabled={compactMode}
                  onChange={toggleCompactMode}
                  label="Compact Mode"
                />
                <ToggleSwitch
                  enabled={soundEnabled}
                  onChange={toggleSound}
                  label="Sound Effects"
                />
              </div>
            )}
          </div>

          {/* Notifications Section */}
          <div className="space-y-3">
            <SectionHeader title="Notifications" id="notifications" />
            {expandedSection === 'notifications' && (
              <div className="space-y-3 pl-2 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <ToggleSwitch
                  enabled={notifications}
                  onChange={toggleNotifications}
                  label="Enable Notifications"
                />
                <p className="text-xs text-muted-foreground px-3">
                  Get real-time alerts for agent status updates and task completions
                </p>
              </div>
            )}
          </div>

          {/* Sync & Storage Section */}
          <div className="space-y-3">
            <SectionHeader title="Sync & Storage" id="sync" />
            {expandedSection === 'sync' && (
              <div className="space-y-3 pl-2 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <ToggleSwitch
                  enabled={autoSave}
                  onChange={toggleAutoSave}
                  label="Auto-Save"
                />
                <div className="p-3 rounded-lg bg-secondary/30 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Automatically save agent configurations
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Storage Info Section */}
          <div className="space-y-3">
            <SectionHeader title="Storage" id="storage" />
            {expandedSection === 'storage' && (
              <div className="space-y-3 pl-2 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <div className="p-4 rounded-lg bg-secondary/30 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Used Space</span>
                    <span className="font-medium text-foreground">12.4 MB</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-gradient-mmm rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <SectionHeader title="About" id="about" />
            {expandedSection === 'about' && (
              <div className="space-y-3 pl-2 animate-in fade-in-50 slide-in-from-top-2 duration-200">
                <div className="p-4 rounded-lg bg-secondary/30 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Build</span>
                    <span className="font-medium">240115</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License</span>
                    <span className="font-medium">MIT</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Status */}
        <div className="h-14 px-6 border-t border-border flex items-center justify-between flex-shrink-0 bg-secondary/30">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">All changes saved</span>
          </div>
        </div>
      </div>
    </>
  );
}
