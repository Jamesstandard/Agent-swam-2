import { create } from 'zustand';

export interface Integration {
  id: string;
  name: string;
  type: 'google-drive' | 'github' | 'email' | 'slack' | 'discord';
  connected: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  config: Record<string, any>;
}

export interface IntegrationState {
  integrations: Integration[];
  addIntegration: (integration: Integration) => void;
  updateIntegration: (id: string, updates: Partial<Integration>) => void;
  removeIntegration: (id: string) => void;
  getIntegration: (type: Integration['type']) => Integration | undefined;
  getAllConnected: () => Integration[];
}

export const useIntegrationStore = create<IntegrationState>((set, get) => ({
  integrations: [],
  
  addIntegration: (integration) =>
    set((state) => ({
      integrations: [...state.integrations, integration],
    })),
    
  updateIntegration: (id, updates) =>
    set((state) => ({
      integrations: state.integrations.map((i) =>
        i.id === id ? { ...i, ...updates } : i
      ),
    })),
    
  removeIntegration: (id) =>
    set((state) => ({
      integrations: state.integrations.filter((i) => i.id !== id),
    })),
    
  getIntegration: (type) => {
    const state = get();
    return state.integrations.find((i) => i.type === type);
  },
  
  getAllConnected: () => {
    const state = get();
    return state.integrations.filter((i) => i.connected);
  },
}));
