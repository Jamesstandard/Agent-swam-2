'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/stores/app';
import {
  Home,
  Chat as ChatIcon,
  Grid3x3,
  Puzzle,
  Brain,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Settings,
  Code,
} from '@/lib/icons';

export function Sidebar() {
  const { sidebarOpen, settingsOpen, currentView, setSidebarOpen, setCurrentView, setSettingsOpen } = useAppStore();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Chat', icon: ChatIcon },
    { id: 'swarms', label: 'Swarms', icon: Grid3x3 },
    { id: 'skills', label: 'Skills', icon: Puzzle },
    { id: 'artifacts', label: 'Artifacts', icon: Code },
    { id: 'memory', label: 'Memory', icon: Brain },
    { id: 'inspect', label: 'Inspect', icon: Wrench },
  ];

  return (
    <>
      {/* Desktop Sidebar - Left Side */}
      <aside
        className={`hidden md:flex md:flex-col fixed md:static left-0 top-0 h-screen md:h-auto bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 ${
          sidebarOpen ? 'md:w-64' : 'md:w-20'
        }`}
      >
        {/* Logo Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                M
              </div>
              <span className="text-foreground">MMM</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors hidden md:flex"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto hidden md:flex md:flex-col">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentView === id
                  ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Desktop Settings Footer */}
        <div className="h-16 px-4 border-t border-sidebar-border flex items-center justify-between hidden md:flex">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors flex-1"
            aria-label="Open settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          {sidebarOpen && (
            <div className="flex-1 ml-2 h-10 bg-muted rounded-lg flex items-center px-3 text-sm text-muted-foreground truncate">
              User
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border md:hidden z-40 flex items-center justify-around px-2 gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id as any)}
            className={`flex flex-col items-center justify-center flex-1 py-2 rounded-lg transition-all duration-200 gap-1 ${
              currentView === id
                ? 'bg-secondary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label={label}
            title={label}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
        
        {/* Settings button in mobile nav */}
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`flex flex-col items-center justify-center flex-1 py-2 rounded-lg transition-all duration-200 gap-1 ${
            settingsOpen
              ? 'bg-secondary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label="Settings"
          title="Settings"
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs font-medium">Settings</span>
        </button>
      </nav>
    </>
  );
}
