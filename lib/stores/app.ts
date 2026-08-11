import { create } from 'zustand';

export type TrustTier = 'observer' | 'operator' | 'executor';
export type CloneMode = 'advisory' | 'autonomous';
export type MissionApprovalPolicy = 'always' | 'risk-based' | 'never';
export type TopologyPreference = 'adaptive' | 'pipeline' | 'mesh';
export type PermissionPosture = 'deny-by-default' | 'role-allowlist';
export type CloneContextScope = 'profile-only' | 'profile-and-history' | 'full-mission';

export interface NexusAdvancedSettings {
  missionApprovalPolicy: MissionApprovalPolicy;
  confirmIrreversibleActions: boolean;
  maxConcurrentAgents: number;
  computeCreditsPerMission: number;
  dailySpendCap: number;
  missionTimeoutMinutes: number;
  retryLimit: number;
  agentHeartbeatSeconds: number;
  topologyPreference: TopologyPreference;
  defaultAgentAutonomy: 'supervised' | 'guided' | 'autonomous';
  confidenceHandoffThreshold: number;
  permissionPosture: PermissionPosture;
  browserRecording: boolean;
  auditRetentionDays: number;
  ephemeralMemoryRetentionHours: number;
  cloneContextScope: CloneContextScope;
  sensitiveActionNotifications: boolean;
  reducedDataTelemetry: boolean;
}

export const defaultNexusAdvancedSettings: NexusAdvancedSettings = {
  missionApprovalPolicy: 'always',
  confirmIrreversibleActions: true,
  maxConcurrentAgents: 6,
  computeCreditsPerMission: 100,
  dailySpendCap: 25,
  missionTimeoutMinutes: 180,
  retryLimit: 2,
  agentHeartbeatSeconds: 30,
  topologyPreference: 'adaptive',
  defaultAgentAutonomy: 'supervised',
  confidenceHandoffThreshold: 0.8,
  permissionPosture: 'deny-by-default',
  browserRecording: true,
  auditRetentionDays: 30,
  ephemeralMemoryRetentionHours: 24,
  cloneContextScope: 'profile-only',
  sensitiveActionNotifications: true,
  reducedDataTelemetry: true,
};

export interface AppState {
  // Navigation
  sidebarOpen: boolean;
  settingsOpen: boolean;
  currentView: 'home' | 'chat' | 'swarms' | 'skills' | 'memory' | 'inspect' | 'artifacts' | 'nexus' | 'canvas';

  // Nexus Swarm
  trustTier: TrustTier;
  cloneMode: CloneMode;
  activeMissionId: string | null;
  nexusAdvanced: NexusAdvancedSettings;
  setTrustTier: (tier: TrustTier) => void;
  setCloneMode: (mode: CloneMode) => void;
  setActiveMissionId: (id: string | null) => void;
  updateNexusAdvanced: (updates: Partial<NexusAdvancedSettings>) => void;
  resetNexusAdvanced: () => void;
  
  // Appearance
  theme: 'light' | 'dark' | 'auto';
  compactMode: boolean;
  animationsEnabled: boolean;
  
  // Framework & Orchestration
  defaultFramework: 'crewai' | 'autogen' | 'openclaw' | 'langgraph';
  
  // Features
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  voiceInputEnabled: boolean;
  autoSave: boolean;
  
  // Offline & Performance
  offlineMode: boolean;
  batteryOptimization: boolean;
  
  // Communication Channels
  pushNotificationsEnabled: boolean;
  telegramEnabled: boolean;
  telegramBotToken: string;
  whatsappEnabled: boolean;
  whatsappNumber: string;
  smsEnabled: boolean;
  smsProvider: 'twilio' | 'vonage' | 'aws-sns';
  
  // Integrations
  googleDriveConnected: boolean;
  githubConnected: boolean;
  githubToken: string;
  emailIntegrationEnabled: boolean;
  emailAddress: string;
  
  // MCP Configuration
  mcpServersEnabled: boolean;
  mcpServers: Array<{ id: string; name: string; url: string; connected: boolean }>;
  
  // NLP & TTS
  nlpEnabled: boolean;
  ttsEnabled: boolean;
  ttsVoice: 'male' | 'female' | 'neutral';
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setCurrentView: (view: AppState['currentView']) => void;
  setTheme: (theme: AppState['theme']) => void;
  setDefaultFramework: (framework: AppState['defaultFramework']) => void;
  toggleSound: () => void;
  toggleAutoSave: () => void;
  toggleNotifications: () => void;
  toggleCompactMode: () => void;
  toggleAnimations: () => void;
  toggleVoiceInput: () => void;
  toggleOfflineMode: () => void;
  toggleBatteryOptimization: () => void;
  togglePushNotifications: () => void;
  toggleTelegramIntegration: () => void;
  toggleWhatsappIntegration: () => void;
  toggleSmsIntegration: () => void;
  toggleNLP: () => void;
  toggleTTS: () => void;
  setTtsVoice: (voice: AppState['ttsVoice']) => void;
  updateMcpServer: (id: string, updates: Partial<AppState['mcpServers'][0]>) => void;
  addMcpServer: (server: AppState['mcpServers'][0]) => void;
  removeMcpServer: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  sidebarOpen: true,
  settingsOpen: false,
  currentView: 'home',

  // Nexus Swarm
  trustTier: 'observer',
  cloneMode: 'advisory',
  activeMissionId: null,
  nexusAdvanced: defaultNexusAdvancedSettings,
  setTrustTier: (tier) => set({ trustTier: tier }),
  setCloneMode: (mode) => set({ cloneMode: mode }),
  setActiveMissionId: (id) => set({ activeMissionId: id }),
  updateNexusAdvanced: (updates) => set((state) => ({
    nexusAdvanced: { ...state.nexusAdvanced, ...updates },
  })),
  resetNexusAdvanced: () => set({ nexusAdvanced: defaultNexusAdvancedSettings }),
  
  // Appearance
  theme: 'light',
  compactMode: false,
  animationsEnabled: true,
  
  // Framework & Orchestration
  defaultFramework: 'langgraph',
  
  // Features
  soundEnabled: false,
  notificationsEnabled: true,
  voiceInputEnabled: false,
  autoSave: true,
  
  // Offline & Performance
  offlineMode: false,
  batteryOptimization: false,
  
  // Communication Channels
  pushNotificationsEnabled: true,
  telegramEnabled: false,
  telegramBotToken: '',
  whatsappEnabled: false,
  whatsappNumber: '',
  smsEnabled: false,
  smsProvider: 'twilio',
  
  // Integrations
  googleDriveConnected: false,
  githubConnected: false,
  githubToken: '',
  emailIntegrationEnabled: false,
  emailAddress: '',
  
  // MCP Configuration
  mcpServersEnabled: true,
  mcpServers: [],
  
  // NLP & TTS
  nlpEnabled: false,
  ttsEnabled: false,
  ttsVoice: 'neutral',
  
  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSettingsOpen: (open) => set({ settingsOpen: open }),
  setCurrentView: (view) => set({ currentView: view }),
  setTheme: (theme) => set({ theme }),
  setDefaultFramework: (framework) => set({ defaultFramework: framework }),
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleAutoSave: () => set((state) => ({ autoSave: !state.autoSave })),
  toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  toggleCompactMode: () => set((state) => ({ compactMode: !state.compactMode })),
  toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
  toggleVoiceInput: () => set((state) => ({ voiceInputEnabled: !state.voiceInputEnabled })),
  toggleOfflineMode: () => set((state) => ({ offlineMode: !state.offlineMode })),
  toggleBatteryOptimization: () => set((state) => ({ batteryOptimization: !state.batteryOptimization })),
  togglePushNotifications: () => set((state) => ({ pushNotificationsEnabled: !state.pushNotificationsEnabled })),
  toggleTelegramIntegration: () => set((state) => ({ telegramEnabled: !state.telegramEnabled })),
  toggleWhatsappIntegration: () => set((state) => ({ whatsappEnabled: !state.whatsappEnabled })),
  toggleSmsIntegration: () => set((state) => ({ smsEnabled: !state.smsEnabled })),
  toggleNLP: () => set((state) => ({ nlpEnabled: !state.nlpEnabled })),
  toggleTTS: () => set((state) => ({ ttsEnabled: !state.ttsEnabled })),
  setTtsVoice: (voice) => set({ ttsVoice: voice }),
  updateMcpServer: (id, updates) =>
    set((state) => ({
      mcpServers: state.mcpServers.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
  addMcpServer: (server) =>
    set((state) => ({
      mcpServers: [...state.mcpServers, server],
    })),
  removeMcpServer: (id) =>
    set((state) => ({
      mcpServers: state.mcpServers.filter((s) => s.id !== id),
    })),
}));
