export type NexusStatus = 'idle' | 'working' | 'completed' | 'blocked';

export interface NexusAgent {
  id: string;
  name: string;
  role: string;
  archetype: string;
  tools: string[];
  status: NexusStatus;
  progress: number;
  confidence: number;
  task: string;
}

export interface MissionPreview {
  title: string;
  intent: string;
  agents: NexusAgent[];
  eta: string;
  credits: number;
  trust: 'Observer' | 'Operator' | 'Executor';
  constraints: string[];
}

const grantAgents: NexusAgent[] = [
  { id: 'research', name: 'Grant Research', role: 'Opportunity discovery', archetype: 'Scout', tools: ['Web search', 'PDF parser'], status: 'working', progress: 68, confidence: 0.91, task: 'Scanning UK government grant portals' },
  { id: 'eligibility', name: 'Eligibility Analyst', role: 'Compliance validation', archetype: 'Verifier', tools: ['Document analysis'], status: 'working', progress: 42, confidence: 0.87, task: 'Comparing profile against eligibility rules' },
  { id: 'manager', name: 'Application Manager', role: 'Timeline orchestration', archetype: 'Coordinator', tools: ['Calendar', 'Task planner'], status: 'idle', progress: 12, confidence: 0.82, task: 'Preparing submission timeline' },
  { id: 'clone', name: 'Digital Clone', role: 'User proxy', archetype: 'Delegate', tools: ['Profile memory'], status: 'blocked', progress: 0, confidence: 0.96, task: 'Waiting for your approval before representing you' },
];

const botAgents: NexusAgent[] = [
  { id: 'architect', name: 'Requirements Architect', role: 'Mission decomposition', archetype: 'Planner', tools: ['LLM reasoning', 'Templates'], status: 'working', progress: 74, confidence: 0.94, task: 'Drafting the bot product brief' },
  { id: 'backend', name: 'Backend Developer', role: 'Service construction', archetype: 'Builder', tools: ['Code interpreter', 'Docker'], status: 'working', progress: 31, confidence: 0.79, task: 'Generating webhook service skeleton' },
  { id: 'security', name: 'Security Auditor', role: 'Risk review', archetype: 'Guardian', tools: ['Static analysis'], status: 'idle', progress: 0, confidence: 0.9, task: 'Queued behind the first build' },
  { id: 'qa', name: 'QA Agent', role: 'Acceptance testing', archetype: 'Verifier', tools: ['Test runner'], status: 'idle', progress: 0, confidence: 0.88, task: 'Waiting for a candidate build' },
];

export function buildMissionFromPrompt(prompt: string): MissionPreview {
  const isBot = /telegram|bot|deploy|crypto|webhook/i.test(prompt);
  return {
    title: isBot ? 'AlphaHound Deployment Swarm' : 'Grant Acquisition Swarm',
    intent: prompt || (isBot ? 'Build and deploy a Telegram intelligence bot.' : 'Find and prepare relevant government grants.'),
    agents: isBot ? botAgents : grantAgents,
    eta: isBot ? '45 min' : '72 hrs',
    credits: isBot ? 48 : 100,
    trust: isBot ? 'Operator' : 'Observer',
    constraints: isBot ? ['No production deploy without approval', 'Secrets remain integration-owned'] : ['Draft-only applications', 'Final submission requires approval'],
  };
}

export const suggestedMissions = [
  'Find and apply for UK government grants for my AI startup',
  'Build and deploy a Telegram bot for crypto alpha',
  'Research competitors and prepare a launch brief',
];

export const memoryEvents = [
  { label: 'Finding', text: '3 grant opportunities match your startup profile.', time: '2m ago', tone: 'cyan' },
  { label: 'Decision', text: 'Clone paused before any user-representative action.', time: '8m ago', tone: 'violet' },
  { label: 'Artifact', text: 'Eligibility checklist is ready for review.', time: '14m ago', tone: 'green' },
];
