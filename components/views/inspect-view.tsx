'use client';

import React, { useState } from 'react';
import { Wrench, AlertCircle, CheckCircle, Code } from '@/lib/icons';

export function InspectView() {
  const [activeTab, setActiveTab] = useState<'logs' | 'performance' | 'state'>('logs');

  const logs = [
    {
      id: 1,
      level: 'info',
      message: 'Agent initialized: CrewAI with 3 agents',
      timestamp: Date.now() - 60000,
    },
    {
      id: 2,
      level: 'info',
      message: 'Chat conversation created',
      timestamp: Date.now() - 50000,
    },
    {
      id: 3,
      level: 'debug',
      message: 'Message sent to agent: "What is 2+2?"',
      timestamp: Date.now() - 40000,
    },
    {
      id: 4,
      level: 'info',
      message: 'Agent response received: "The answer is 4"',
      timestamp: Date.now() - 30000,
    },
    {
      id: 5,
      level: 'warning',
      message: 'High API response time detected: 1250ms',
      timestamp: Date.now() - 20000,
    },
  ];

  const performance = [
    { metric: 'Avg Response Time', value: '245ms', status: 'good' },
    { metric: 'Memory Usage', value: '126MB', status: 'good' },
    { metric: 'API Calls/min', value: '12', status: 'good' },
    { metric: 'Error Rate', value: '0.1%', status: 'good' },
  ];

  const appState = {
    currentView: 'inspect',
    sidebar: true,
    conversations: 5,
    swarms: 2,
    selectedFramework: 'crewai',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="h-full px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Inspect Panel (DevTools)
          </h1>
          <Wrench className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border pb-4">
          {['logs', 'performance', 'state'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="space-y-2">
            <div className="bg-muted/30 rounded-lg p-4 max-h-96 overflow-y-auto font-mono text-sm">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`py-2 flex gap-4 border-b border-border last:border-0 ${
                    log.level === 'error'
                      ? 'text-red-600 dark:text-red-400'
                      : log.level === 'warning'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : log.level === 'debug'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-green-600 dark:text-green-400'
                  }`}
                >
                  <span className="opacity-50 w-32 flex-shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-current/20 min-w-12 text-center capitalize">
                    {log.level}
                  </span>
                  <span className="flex-1">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performance.map((perf, idx) => (
              <div key={idx} className="card-lobe">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    {perf.metric}
                  </h3>
                  {perf.status === 'good' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <p className="text-3xl font-bold text-primary mb-2">
                  {perf.value}
                </p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* State Tab */}
        {activeTab === 'state' && (
          <div className="card-lobe">
            <div className="bg-muted/30 rounded-lg p-4 max-h-96 overflow-y-auto font-mono text-sm">
              <pre className="whitespace-pre-wrap break-words text-foreground">
                {JSON.stringify(appState, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
