'use client';

import React from 'react';
import { useAppStore } from '@/lib/stores/app';
import { useChatStore } from '@/lib/stores/chat';
import { useSwarmsStore } from '@/lib/stores/swarms';
import {
  Plus,
  MessageSquare as MessageIcon,
  Grid3x3,
  Puzzle,
  Brain,
  Zap,
} from '@/lib/icons';
import { ChatView } from '@/components/views/chat-view';
import { SwarmsView } from '@/components/views/swarms-view';
import { SkillsView } from '@/components/views/skills-view';
import { MemoryView } from '@/components/views/memory-view';
import { InspectView } from '@/components/views/inspect-view';
import { ArtifactsView } from '@/components/views/artifacts-view';

export default function HomePage() {
  const { currentView, setCurrentView } = useAppStore();
  const { conversations } = useChatStore();
  const { swarms } = useSwarmsStore();

  if (currentView === 'chat') return <ChatView />;
  if (currentView === 'swarms') return <SwarmsView />;
  if (currentView === 'skills') return <SkillsView />;
  if (currentView === 'artifacts') return <ArtifactsView />;
  if (currentView === 'memory') return <MemoryView />;
  if (currentView === 'inspect') return <InspectView />;

  // Home Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="h-14 md:h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">MMM</h1>
        <div className="text-xs md:text-sm text-muted-foreground hidden sm:inline-block">
          AI Agent Orchestration
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Welcome Section with Hero CTA */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Welcome to MMM
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            Orchestrate powerful AI agents across multiple frameworks
          </p>
          
          {/* Prominent New Objective Button */}
          <button
            onClick={() => setCurrentView('chat')}
            className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Zap className="w-5 md:w-6 h-5 md:h-6" />
            <span>Start New Objective</span>
            <Plus className="w-5 md:w-6 h-5 md:h-6 ml-2 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Quick Stats - Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="card-lobe p-4 md:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Conversations</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {conversations.length}
                </p>
              </div>
              <MessageIcon className="w-8 md:w-10 h-8 md:h-10 text-accent opacity-20 flex-shrink-0" />
            </div>
          </div>

          <div className="card-lobe p-4 md:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Swarms</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {swarms.length}
                </p>
              </div>
              <Grid3x3 className="w-8 md:w-10 h-8 md:h-10 text-accent opacity-20 flex-shrink-0" />
            </div>
          </div>

          <div className="card-lobe p-4 md:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Skills</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">12</p>
              </div>
              <Puzzle className="w-8 md:w-10 h-8 md:h-10 text-accent opacity-20 flex-shrink-0" />
            </div>
          </div>

          <div className="card-lobe p-4 md:p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">Memory</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">24</p>
              </div>
              <Brain className="w-8 md:w-10 h-8 md:h-10 text-accent opacity-20 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* New Chat */}
          <div className="card-lobe p-4 md:p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                  Start a Conversation
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Chat with AI agents powered by your choice of framework
                </p>
              </div>
              <MessageIcon className="w-5 md:w-6 h-5 md:h-6 text-primary flex-shrink-0" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('chat')}
                className="flex-1 btn-lobe-primary flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Plus className="w-4 h-4" />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* New Swarm */}
          <div className="card-lobe p-4 md:p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                  Create a Swarm
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Organize multiple agents with a Kanban workflow
                </p>
              </div>
              <Grid3x3 className="w-5 md:w-6 h-5 md:h-6 text-primary flex-shrink-0" />
            </div>
            <button
              onClick={() => setCurrentView('swarms')}
              className="w-full btn-lobe-secondary flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Swarm
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {features.map((feature) => (
              <div key={feature.id} className="card-lobe p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base truncate">
                      {feature.title}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frameworks Section */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
            Supported Frameworks
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {frameworks.map((fw) => (
              <div key={fw.id} className="card-lobe text-center p-4 md:p-6">
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-secondary mx-auto mb-2 md:mb-3 flex items-center justify-center">
                  <Zap className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base">{fw.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {fw.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    id: 1,
    title: 'Multi-Framework Support',
    description: 'Choose from CrewAI, AutoGen, OpenClaw, and LangGraph',
    icon: Zap,
  },
  {
    id: 2,
    title: 'Intelligent Chat',
    description: 'Real-time conversations with configurable AI agents',
    icon: MessageIcon,
  },
  {
    id: 3,
    title: 'Kanban Swarms',
    description: 'Organize agent tasks with visual workflow management',
    icon: Grid3x3,
  },
  {
    id: 4,
    title: 'MCP Marketplace',
    description: 'Browse and integrate tools and skills dynamically',
    icon: Puzzle,
  },
  {
    id: 5,
    title: 'Memory System',
    description: 'Knowledge base and learned memory for agents',
    icon: Brain,
  },
  {
    id: 6,
    title: 'Inspect Panel',
    description: 'DevTools-like debugging and monitoring interface',
    icon: Zap,
  },
];

const frameworks = [
  {
    id: 1,
    name: 'CrewAI',
    description: 'Agent orchestration with hierarchical teams',
  },
  {
    id: 2,
    name: 'AutoGen',
    description: 'Multi-agent conversation framework',
  },
  {
    id: 3,
    name: 'OpenClaw',
    description: 'Flexible agent composition',
  },
  {
    id: 4,
    name: 'LangGraph',
    description: 'Supervisor + MCP workers',
  },
];
