'use client';

import React, { useState } from 'react';
import { X, Moon, Sun, Shield, SlidersHorizontal, RotateCcw } from '@/lib/icons';
import { useAppStore } from '@/lib/stores/app';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme, setTheme, trustTier, setTrustTier, cloneMode, setCloneMode, nexusAdvanced, updateNexusAdvanced, resetNexusAdvanced } = useAppStore();
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
          <div className="border-t border-border pt-6">
    <div className="mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /><h3 className="font-semibold text-foreground">Nexus Swarm Safety</h3></div>
    <p className="mb-3 text-xs leading-5 text-muted-foreground">Prototype controls only. No external execution or credential storage is enabled.</p>
    <div className="grid grid-cols-3 gap-2">{(['observer', 'operator', 'executor'] as const).map((tier) => <button key={tier} onClick={() => setTrustTier(tier)} className={`rounded-lg border p-2 text-xs capitalize ${trustTier === tier ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>{tier}</button>)}</div>
    <div className="mt-3 grid grid-cols-2 gap-2">{(['advisory', 'autonomous'] as const).map((mode) => <button key={mode} onClick={() => setCloneMode(mode)} className={`rounded-lg border p-2 text-xs capitalize ${cloneMode === mode ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>{mode} clone</button>)}</div>
  </div>
  <div className="border-t border-border pt-6">
    <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-primary" /><h3 className="font-semibold text-foreground">Advanced Orchestration</h3></div><button onClick={resetNexusAdvanced} aria-label="Reset advanced settings"><RotateCcw className="h-4 w-4" /></button></div>
    <div className="flex flex-col gap-3"><label className="flex flex-col gap-1 text-xs text-muted-foreground">Max concurrent agents<input type="number" min="1" max="12" value={nexusAdvanced.maxConcurrentAgents} onChange={(e) => updateNexusAdvanced({ maxConcurrentAgents: Math.min(12, Math.max(1, Number(e.target.value))) })} className="rounded-lg border border-border bg-input p-2 text-sm text-foreground" /></label><label className="flex flex-col gap-1 text-xs text-muted-foreground">Compute credits per mission<input type="number" min="10" max="1000" value={nexusAdvanced.computeCreditsPerMission} onChange={(e) => updateNexusAdvanced({ computeCreditsPerMission: Math.min(1000, Math.max(10, Number(e.target.value))) })} className="rounded-lg border border-border bg-input p-2 text-sm text-foreground" /></label><label className="flex flex-col gap-1 text-xs text-muted-foreground">Approval policy<select value={nexusAdvanced.missionApprovalPolicy} onChange={(e) => updateNexusAdvanced({ missionApprovalPolicy: e.target.value as typeof nexusAdvanced.missionApprovalPolicy })} className="rounded-lg border border-border bg-input p-2 text-sm text-foreground"><option value="always">Always approve</option><option value="risk-based">Risk-based</option><option value="never">Never approve</option></select></label><label className="flex flex-col gap-1 text-xs text-muted-foreground">Topology preference<select value={nexusAdvanced.topologyPreference} onChange={(e) => updateNexusAdvanced({ topologyPreference: e.target.value as typeof nexusAdvanced.topologyPreference })} className="rounded-lg border border-border bg-input p-2 text-sm text-foreground"><option value="adaptive">Adaptive mesh</option><option value="pipeline">Pipeline</option><option value="mesh">Mesh</option></select></label><label className="flex items-center justify-between rounded-lg bg-secondary/30 p-3 text-sm text-foreground">Confirm irreversible actions<input type="checkbox" checked={nexusAdvanced.confirmIrreversibleActions} onChange={(e) => updateNexusAdvanced({ confirmIrreversibleActions: e.target.checked })} /></label><label className="flex items-center justify-between rounded-lg bg-secondary/30 p-3 text-sm text-foreground">Sensitive action alerts<input type="checkbox" checked={nexusAdvanced.sensitiveActionNotifications} onChange={(e) => updateNexusAdvanced({ sensitiveActionNotifications: e.target.checked })} /></label><label className="flex items-center justify-between rounded-lg bg-secondary/30 p-3 text-sm text-foreground">Reduced-data telemetry<input type="checkbox" checked={nexusAdvanced.reducedDataTelemetry} onChange={(e) => updateNexusAdvanced({ reducedDataTelemetry: e.target.checked })} /></label></div>
  </div>
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
