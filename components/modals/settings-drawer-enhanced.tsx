'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/stores/app';
import { 
  X, 
  ChevronDown, 
  Sun, 
  Moon, 
  Settings,
  Zap,
  MessageSquare,
  Brain,
  Volume2,
} from '@/lib/icons';

interface SettingSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function SettingSection({ title, icon: Icon, children }: SettingSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3 animate-in fade-in-50 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

function ToggleSwitch({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onChange}
      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div
        className={`w-10 h-6 rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-muted'
        } flex items-center px-1`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  );
}

export function SettingsDrawerEnhanced() {
  const {
    settingsOpen,
    setSettingsOpen,
    theme,
    setTheme,
    defaultFramework,
    setDefaultFramework,
    compactMode,
    toggleCompactMode,
    animationsEnabled,
    toggleAnimations,
    soundEnabled,
    toggleSound,
    notificationsEnabled,
    toggleNotifications,
    voiceInputEnabled,
    toggleVoiceInput,
    autoSave,
    toggleAutoSave,
    offlineMode,
    toggleOfflineMode,
    batteryOptimization,
    toggleBatteryOptimization,
    pushNotificationsEnabled,
    togglePushNotifications,
    telegramEnabled,
    toggleTelegramIntegration,
    whatsappEnabled,
    toggleWhatsappIntegration,
    smsEnabled,
    toggleSmsIntegration,
    nlpEnabled,
    toggleNLP,
    ttsEnabled,
    toggleTTS,
    ttsVoice,
    setTtsVoice,
    mcpServersEnabled,
    mcpServers,
    addMcpServer,
    removeMcpServer,
  } = useAppStore();

  const [newMcpServer, setNewMcpServer] = useState({ name: '', url: '' });

  if (!settingsOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200"
        onClick={() => setSettingsOpen(false)}
      />

      {/* Settings Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 md:bottom-auto md:right-0 md:top-0 md:left-auto w-full md:w-96 h-screen md:h-screen max-h-screen bg-card border-t md:border-t-0 md:border-l border-border shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ${
          settingsOpen ? 'translate-y-0 translate-x-0' : 'translate-y-full md:translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-lg md:text-xl font-bold text-foreground">Settings</h2>
          </div>
          <button
            onClick={() => setSettingsOpen(false)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="divide-y divide-border">
          {/* Appearance Settings */}
          <SettingSection title="Appearance" icon={Sun}>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'dark', 'auto'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        theme === t
                          ? 'bg-primary text-white'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <ToggleSwitch
                enabled={compactMode}
                onChange={toggleCompactMode}
                label="Compact Mode"
              />
              <ToggleSwitch
                enabled={animationsEnabled}
                onChange={toggleAnimations}
                label="Animations"
              />
            </div>
          </SettingSection>

          {/* Framework Selection */}
          <SettingSection title="Orchestration Framework" icon={Zap}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground block">
                Default Framework
              </label>
              <select
                value={defaultFramework}
                onChange={(e) => setDefaultFramework(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground"
              >
                <option value="langgraph">LangGraph (Default)</option>
                <option value="crewai">CrewAI</option>
                <option value="autogen">AutoGen (AG2)</option>
                <option value="openclaw">OpenClaw</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Used for new agents and swarms. Can be overridden per agent.
              </p>
            </div>
          </SettingSection>

          {/* Features & Capabilities */}
          <SettingSection title="Features" icon={Brain}>
            <div className="space-y-2">
              <ToggleSwitch enabled={soundEnabled} onChange={toggleSound} label="Sound Effects" />
              <ToggleSwitch
                enabled={notificationsEnabled}
                onChange={toggleNotifications}
                label="Notifications"
              />
              <ToggleSwitch
                enabled={voiceInputEnabled}
                onChange={toggleVoiceInput}
                label="Voice Input"
              />
              <ToggleSwitch enabled={autoSave} onChange={toggleAutoSave} label="Auto-Save" />
            </div>
          </SettingSection>

          {/* Performance & Battery */}
          <SettingSection title="Performance" icon={Zap}>
            <div className="space-y-2">
              <ToggleSwitch
                enabled={offlineMode}
                onChange={toggleOfflineMode}
                label="Offline Mode"
              />
              <p className="text-xs text-muted-foreground px-3">
                Works with cached data when connection is unavailable
              </p>
              <ToggleSwitch
                enabled={batteryOptimization}
                onChange={toggleBatteryOptimization}
                label="Battery Optimization"
              />
              <p className="text-xs text-muted-foreground px-3">
                Reduces animations and background syncing on low battery
              </p>
            </div>
          </SettingSection>

          {/* Communication Channels */}
          <SettingSection title="Communication Channels" icon={MessageSquare}>
            <div className="space-y-3">
              <ToggleSwitch
                enabled={pushNotificationsEnabled}
                onChange={togglePushNotifications}
                label="Push Notifications"
              />

              <div className="border-t border-border/50 pt-3">
                <ToggleSwitch
                  enabled={telegramEnabled}
                  onChange={toggleTelegramIntegration}
                  label="Telegram Integration"
                />
                {telegramEnabled && (
                  <input
                    type="password"
                    placeholder="Bot Token"
                    className="mt-2 w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm"
                  />
                )}
              </div>

              <div className="border-t border-border/50 pt-3">
                <ToggleSwitch
                  enabled={whatsappEnabled}
                  onChange={toggleWhatsappIntegration}
                  label="WhatsApp Integration"
                />
                {whatsappEnabled && (
                  <input
                    type="tel"
                    placeholder="+1234567890"
                    className="mt-2 w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm"
                  />
                )}
              </div>

              <div className="border-t border-border/50 pt-3">
                <ToggleSwitch
                  enabled={smsEnabled}
                  onChange={toggleSmsIntegration}
                  label="SMS Notifications"
                />
                {smsEnabled && (
                  <div className="mt-2 space-y-2">
                    <select className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm">
                      <option>Twilio</option>
                      <option>Vonage</option>
                      <option>AWS SNS</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </SettingSection>

          {/* MCP Integration */}
          <SettingSection title="MCP Servers" icon={Zap}>
            <div className="space-y-3">
              <ToggleSwitch
                enabled={mcpServersEnabled}
                onChange={() => {}}
                label="Enable MCP Servers"
              />
              <p className="text-xs text-muted-foreground px-3">
                Multi-Server MCP Client with dynamic tool discovery
              </p>

              {mcpServersEnabled && (
                <div className="space-y-2 border-t border-border/50 pt-3">
                  <label className="text-sm font-medium text-foreground block">
                    Connected Servers ({mcpServers.length})
                  </label>
                  {mcpServers.map((server) => (
                    <div key={server.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{server.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{server.url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            server.connected ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        />
                        <button
                          onClick={() => removeMcpServer(server.id)}
                          className="text-xs text-destructive hover:text-destructive/80"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-border/50 pt-3">
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Add New Server
                    </label>
                    <input
                      type="text"
                      placeholder="Server Name"
                      value={newMcpServer.name}
                      onChange={(e) =>
                        setNewMcpServer({ ...newMcpServer, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm mb-2"
                    />
                    <input
                      type="url"
                      placeholder="Server URL"
                      value={newMcpServer.url}
                      onChange={(e) =>
                        setNewMcpServer({ ...newMcpServer, url: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm"
                    />
                    <button
                      onClick={() => {
                        if (newMcpServer.name && newMcpServer.url) {
                          addMcpServer({
                            id: Date.now().toString(),
                            ...newMcpServer,
                            connected: false,
                          });
                          setNewMcpServer({ name: '', url: '' });
                        }
                      }}
                      className="mt-2 w-full py-2 rounded-lg bg-primary text-white text-sm font-medium"
                    >
                      Add Server
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SettingSection>

          {/* NLP & TTS */}
          <SettingSection title="NLP & Text-to-Speech" icon={Volume2}>
            <div className="space-y-2">
              <ToggleSwitch enabled={nlpEnabled} onChange={toggleNLP} label="Enable NLP" />
              <p className="text-xs text-muted-foreground px-3">
                Natural Language Processing for intent detection
              </p>

              <div className="border-t border-border/50 pt-3">
                <ToggleSwitch
                  enabled={ttsEnabled}
                  onChange={toggleTTS}
                  label="Enable Text-to-Speech"
                />
                {ttsEnabled && (
                  <div className="mt-2">
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Voice
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['male', 'female', 'neutral'] as const).map((voice) => (
                        <button
                          key={voice}
                          onClick={() => setTtsVoice(voice)}
                          className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                            ttsVoice === voice
                              ? 'bg-primary text-white'
                              : 'bg-muted text-foreground hover:bg-muted/80'
                          }`}
                        >
                          {voice.charAt(0).toUpperCase() + voice.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SettingSection>

          {/* About */}
          <SettingSection title="About" icon={Settings}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium text-foreground">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Build</span>
                <span className="font-medium text-foreground">240115</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">License</span>
                <span className="font-medium text-foreground">MIT</span>
              </div>
              <p className="text-xs text-muted-foreground pt-2">
                Multi Meta Matrix (MMM) - AI Agent Orchestration Platform
              </p>
            </div>
          </SettingSection>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 text-xs text-muted-foreground">
          ⚡ All changes saved automatically
        </div>
      </div>
    </>
  );
}
