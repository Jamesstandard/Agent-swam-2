import { create } from 'zustand';

export interface SwarmAgent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'working' | 'completed' | 'error';
  description?: string;
  tools?: string[];
}

export interface SwarmTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assignedAgent?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: number;
  createdAt: number;
  updatedAt: number;
}

export interface Swarm {
  id: string;
  name: string;
  description: string;
  framework: 'crewai' | 'autogen' | 'openclaw' | 'langgraph';
  agents: SwarmAgent[];
  tasks: SwarmTask[];
  status: 'planning' | 'active' | 'completed';
  createdAt: number;
  updatedAt: number;
}

export interface SwarmsState {
  swarms: Swarm[];
  currentSwarmId: string | null;
  addSwarm: (swarm: Swarm) => void;
  setCurrentSwarm: (id: string) => void;
  updateSwarm: (id: string, updates: Partial<Swarm>) => void;
  addTask: (swarmId: string, task: SwarmTask) => void;
  updateTask: (swarmId: string, taskId: string, updates: Partial<SwarmTask>) => void;
  deleteTask: (swarmId: string, taskId: string) => void;
  deleteSwarm: (id: string) => void;
}

export const useSwarmsStore = create<SwarmsState>((set) => ({
  swarms: [],
  currentSwarmId: null,
  addSwarm: (swarm) =>
    set((state) => ({
      swarms: [swarm, ...state.swarms],
      currentSwarmId: swarm.id,
    })),
  setCurrentSwarm: (id) => set({ currentSwarmId: id }),
  updateSwarm: (id, updates) =>
    set((state) => ({
      swarms: state.swarms.map((s) =>
        s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s
      ),
    })),
  addTask: (swarmId, task) =>
    set((state) => ({
      swarms: state.swarms.map((s) =>
        s.id === swarmId
          ? { ...s, tasks: [...s.tasks, task], updatedAt: Date.now() }
          : s
      ),
    })),
  updateTask: (swarmId, taskId, updates) =>
    set((state) => ({
      swarms: state.swarms.map((s) =>
        s.id === swarmId
          ? {
              ...s,
              tasks: s.tasks.map((t) =>
                t.id === taskId ? { ...t, ...updates, updatedAt: Date.now() } : t
              ),
              updatedAt: Date.now(),
            }
          : s
      ),
    })),
  deleteTask: (swarmId, taskId) =>
    set((state) => ({
      swarms: state.swarms.map((s) =>
        s.id === swarmId
          ? {
              ...s,
              tasks: s.tasks.filter((t) => t.id !== taskId),
              updatedAt: Date.now(),
            }
          : s
      ),
    })),
  deleteSwarm: (id) =>
    set((state) => ({
      swarms: state.swarms.filter((s) => s.id !== id),
      currentSwarmId: state.currentSwarmId === id ? null : state.currentSwarmId,
    })),
}));
