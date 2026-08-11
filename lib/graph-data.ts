export type GraphNode = {
  id: string
  label: string
  role: string
  group: 'core' | 'research' | 'build' | 'guardrail'
  tags: string[]
  x: number
  y: number
  connections: number
  status: 'active' | 'idle' | 'blocked'
}

export type GraphEdge = { from: string; to: string; label: string }

export const graphNodes: GraphNode[] = [
  { id: 'nexus', label: 'Nexus Core', role: 'Orchestrator', group: 'core', tags: ['#core', '#swarm'], x: 50, y: 47, connections: 6, status: 'active' },
  { id: 'research', label: 'Research Agent', role: 'Discovery', group: 'research', tags: ['#research', '#web'], x: 24, y: 22, connections: 3, status: 'active' },
  { id: 'analyst', label: 'Eligibility Analyst', role: 'Validation', group: 'research', tags: ['#research', '#risk'], x: 17, y: 64, connections: 3, status: 'idle' },
  { id: 'architect', label: 'Requirements Architect', role: 'Planning', group: 'build', tags: ['#build', '#spec'], x: 75, y: 18, connections: 3, status: 'active' },
  { id: 'builder', label: 'Backend Builder', role: 'Implementation', group: 'build', tags: ['#build', '#code'], x: 82, y: 67, connections: 4, status: 'active' },
  { id: 'auditor', label: 'Security Auditor', role: 'Guardrail', group: 'guardrail', tags: ['#security', '#risk'], x: 51, y: 82, connections: 3, status: 'blocked' },
  { id: 'clone', label: 'Digital Clone', role: 'User Proxy', group: 'core', tags: ['#clone', '#identity'], x: 40, y: 18, connections: 2, status: 'idle' },
  { id: 'qa', label: 'QA Agent', role: 'Verification', group: 'guardrail', tags: ['#qa', '#release'], x: 87, y: 42, connections: 2, status: 'idle' },
]

export const graphEdges: GraphEdge[] = [
  { from: 'nexus', to: 'research', label: 'delegates' }, { from: 'nexus', to: 'analyst', label: 'delegates' },
  { from: 'nexus', to: 'architect', label: 'delegates' }, { from: 'nexus', to: 'builder', label: 'coordinates' },
  { from: 'nexus', to: 'auditor', label: 'gates' }, { from: 'nexus', to: 'clone', label: 'represents' },
  { from: 'research', to: 'analyst', label: 'findings' }, { from: 'architect', to: 'builder', label: 'spec' },
  { from: 'builder', to: 'qa', label: 'review' }, { from: 'qa', to: 'auditor', label: 'evidence' },
  { from: 'clone', to: 'architect', label: 'preferences' },
]

export const graphGroups = [
  { id: 'core', label: 'Core + Clone', color: 'cyan' },
  { id: 'research', label: 'Research', color: 'violet' },
  { id: 'build', label: 'Build', color: 'amber' },
  { id: 'guardrail', label: 'Guardrails', color: 'emerald' },
] as const
