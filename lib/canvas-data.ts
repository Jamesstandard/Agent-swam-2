export type CanvasNodeKind = 'text' | 'agent' | 'file' | 'image' | 'embed';
export type CanvasNodeColor = 'cyan' | 'violet' | 'amber' | 'emerald' | 'slate';

export type CanvasNode = {
  id: string;
  kind: CanvasNodeKind;
  title: string;
  body: string;
  x: number;
  y: number;
  width: number;
  color: CanvasNodeColor;
  meta?: string;
  url?: string;
};

export type CanvasEdge = { id: string; from: string; to: string; label?: string };
export type CanvasGroup = { id: string; title: string; x: number; y: number; width: number; height: number; color: CanvasNodeColor };

export const initialCanvasNodes: CanvasNode[] = [
  { id: 'mission', kind: 'text', title: 'Mission brief', body: 'Map the grant acquisition swarm and keep every handoff auditable.', x: 120, y: 100, width: 260, color: 'cyan', meta: 'Pinned context' },
  { id: 'research', kind: 'agent', title: 'Grant research agent', body: 'Scanning public funding sources and eligibility signals.', x: 470, y: 40, width: 250, color: 'violet', meta: 'Working · 82% confidence' },
  { id: 'eligibility', kind: 'agent', title: 'Eligibility analyst', body: 'Cross-checking requirements against the startup profile.', x: 470, y: 300, width: 250, color: 'amber', meta: 'Waiting on input' },
  { id: 'artifact', kind: 'file', title: 'Startup profile.pdf', body: '12 pages · profile context for the swarm.', x: 840, y: 180, width: 235, color: 'emerald', meta: 'Local artifact' },
  { id: 'handoff', kind: 'text', title: 'Human approval gate', body: 'Review before any application is submitted.', x: 1120, y: 390, width: 250, color: 'slate', meta: 'Required' },
];

export const initialCanvasEdges: CanvasEdge[] = [
  { id: 'edge-1', from: 'mission', to: 'research', label: 'decomposes' },
  { id: 'edge-2', from: 'mission', to: 'eligibility', label: 'context' },
  { id: 'edge-3', from: 'research', to: 'artifact', label: 'findings' },
  { id: 'edge-4', from: 'eligibility', to: 'handoff', label: 'approval' },
];

export const initialCanvasGroups: CanvasGroup[] = [
  { id: 'group-1', title: 'Grant acquisition swarm', x: 410, y: 0, width: 700, height: 620, color: 'violet' },
];

export const canvasColorClasses: Record<CanvasNodeColor, string> = {
  cyan: 'border-cyan-300/60 bg-cyan-300/10 text-cyan-100',
  violet: 'border-violet-300/60 bg-violet-300/10 text-violet-100',
  amber: 'border-amber-300/60 bg-amber-300/10 text-amber-100',
  emerald: 'border-emerald-300/60 bg-emerald-300/10 text-emerald-100',
  slate: 'border-slate-400/50 bg-slate-400/10 text-slate-100',
};

export const canvasAccentClasses: Record<CanvasNodeColor, string> = {
  cyan: 'bg-cyan-300', violet: 'bg-violet-300', amber: 'bg-amber-300', emerald: 'bg-emerald-300', slate: 'bg-slate-400',
};
