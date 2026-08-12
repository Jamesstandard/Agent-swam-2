import { create } from 'zustand';

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskSchedule = 'manual' | 'next' | 'hourly' | 'daily';

export interface SwarmAgent { id: string; name: string; role: string; status: 'idle' | 'working' | 'completed' | 'error'; description?: string; tools?: string[]; deployed?: boolean }
export interface SwarmTask { id: string; title: string; description: string; status: TaskStatus; assignedAgent?: string; priority: TaskPriority; dueDate?: number; createdAt: number; updatedAt: number; schedule: TaskSchedule; estimatedMinutes: number; dependencies: string[]; tags: string[]; output?: string; executionCount: number; lastRunAt?: number; activeNode?: string }
export interface Swarm { id: string; name: string; description: string; framework: 'crewai' | 'autogen' | 'openclaw' | 'langgraph'; agents: SwarmAgent[]; tasks: SwarmTask[]; status: 'planning' | 'active' | 'completed'; createdAt: number; updatedAt: number }
interface SwarmsState { swarms: Swarm[]; currentSwarmId: string | null; addSwarm: (swarm: Swarm) => void; setCurrentSwarm: (id: string) => void; updateSwarm: (id: string, updates: Partial<Swarm>) => void; addTask: (swarmId: string, task: SwarmTask) => void; updateTask: (swarmId: string, taskId: string, updates: Partial<SwarmTask>) => void; deleteTask: (swarmId: string, taskId: string) => void; deployAgent: (swarmId: string, agent: SwarmAgent) => void; deleteSwarm: (id: string) => void }

export const useSwarmsStore = create<SwarmsState>((set) => ({
  swarms: [], currentSwarmId: null,
  addSwarm: (swarm) => set((state) => ({ swarms: [swarm, ...state.swarms], currentSwarmId: swarm.id })),
  setCurrentSwarm: (id) => set({ currentSwarmId: id }),
  updateSwarm: (id, updates) => set((state) => ({ swarms: state.swarms.map((s) => s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s) })),
  addTask: (swarmId, task) => set((state) => ({ swarms: state.swarms.map((s) => s.id === swarmId ? { ...s, tasks: [...s.tasks, task], updatedAt: Date.now() } : s) })),
  updateTask: (swarmId, taskId, updates) => set((state) => ({ swarms: state.swarms.map((s) => s.id === swarmId ? { ...s, tasks: s.tasks.map((t) => t.id === taskId ? { ...t, ...updates, updatedAt: Date.now() } : t), updatedAt: Date.now() } : s) })),
  deleteTask: (swarmId, taskId) => set((state) => ({ swarms: state.swarms.map((s) => s.id === swarmId ? { ...s, tasks: s.tasks.filter((t) => t.id !== taskId), updatedAt: Date.now() } : s) })),
  deployAgent: (swarmId, agent) => set((state) => ({ swarms: state.swarms.map((s) => s.id === swarmId ? { ...s, agents: [...s.agents, { ...agent, deployed: true, status: 'idle' }], status: 'active', updatedAt: Date.now() } : s) })),
  deleteSwarm: (id) => set((state) => ({ swarms: state.swarms.filter((s) => s.id !== id), currentSwarmId: state.currentSwarmId === id ? null : state.currentSwarmId })),
}));

export const makeTask = (status: TaskStatus = 'todo', index = 0): SwarmTask => ({ id: `task-${Date.now()}-${index}`, title: 'Define execution objective', description: 'Translate the swarm objective into a verifiable deliverable, identify inputs and acceptance criteria, then publish the result to the Nexus timeline.', status, priority: 'high', schedule: 'manual', estimatedMinutes: 30, dependencies: [], tags: ['planning', 'nexus'], executionCount: 0, createdAt: Date.now(), updatedAt: Date.now() });
export const seedTasks = (): SwarmTask[] => [
  { ...makeTask('todo', 1), title: 'Initialize mission context', description: 'Load objective context, constraints, tools, memory, and the current graph route before execution begins.', priority: 'critical', tags: ['context', 'nexus'] },
  { ...makeTask('todo', 2), title: 'Research and decompose objective', description: 'Break the objective into evidence-backed subtasks, assign ownership, and define the expected output contract.', schedule: 'next', tags: ['research', 'decomposition'] },
  { ...makeTask('todo', 3), title: 'Execute agent workflow', description: 'Traverse the graph through assigned agents, collect intermediate outputs, and retry blocked steps using the configured policy.', estimatedMinutes: 45, tags: ['execution', 'graph'] },
  { ...makeTask('todo', 4), title: 'Validate and publish result', description: 'Run quality checks against acceptance criteria, summarize findings, and publish a final mission report.', priority: 'medium', estimatedMinutes: 20, tags: ['quality', 'reporting'] },
];
