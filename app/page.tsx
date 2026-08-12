'use client';

import { ChatView } from '@/components/views/chat-view';
import { SwarmsView } from '@/components/views/swarms-view';
import { SkillsView } from '@/components/views/skills-view';
import { MemoryView } from '@/components/views/memory-view';
import { InspectView } from '@/components/views/inspect-view';
import { ArtifactsView } from '@/components/views/artifacts-view';
import { NexusView } from '@/components/views/nexus-view';
import { CanvasView } from '@/components/views/canvas-view';
import { GraphView } from '@/components/views/graph-view';
import { NexusMobileDashboard } from '@/components/nexus-mobile-dashboard';
import { useAppStore } from '@/lib/stores/app';

export default function HomePage() {
  const currentView = useAppStore((state) => state.currentView);
  if (currentView === 'chat') return <ChatView />;
  if (currentView === 'swarms') return <SwarmsView />;
  if (currentView === 'skills') return <SkillsView />;
  if (currentView === 'artifacts') return <ArtifactsView />;
  if (currentView === 'memory') return <MemoryView />;
  if (currentView === 'inspect') return <InspectView />;
  if (currentView === 'nexus') return <NexusView />;
  if (currentView === 'canvas') return <CanvasView />;
  if (currentView === 'graph') return <GraphView />;
  return <NexusMobileDashboard />;
}
