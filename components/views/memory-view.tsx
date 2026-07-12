'use client';

import React, { useState } from 'react';
import { Brain, Plus, Search, Edit2, Trash2 } from '@/lib/icons';

export function MemoryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'knowledge' | 'learned'>('knowledge');

  const knowledgeBase = [
    {
      id: 1,
      title: 'API Integration Patterns',
      content: 'Best practices for integrating external APIs with agents',
      tags: ['api', 'integration', 'best-practices'],
      createdAt: Date.now() - 86400000,
    },
    {
      id: 2,
      title: 'Error Handling Strategies',
      content: 'Comprehensive error handling approaches for agent systems',
      tags: ['error-handling', 'resilience', 'strategies'],
      createdAt: Date.now() - 172800000,
    },
  ];

  const learnedMemory = [
    {
      id: 1,
      title: 'User Preference: JSON Format',
      content: 'User prefers responses in JSON format for data',
      confidence: 0.85,
      createdAt: Date.now() - 3600000,
    },
    {
      id: 2,
      title: 'Common Task Pattern',
      content: 'User frequently requests data transformation tasks',
      confidence: 0.72,
      createdAt: Date.now() - 7200000,
    },
  ];

  const activeItems = activeTab === 'knowledge' ? knowledgeBase : learnedMemory;

  const filteredItems = activeItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="h-full px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Memory System</h1>
          <button className="btn-lobe-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'knowledge'
                ? 'btn-lobe-primary'
                : 'btn-lobe-secondary'
            }`}
          >
            Knowledge Base
          </button>
          <button
            onClick={() => setActiveTab('learned')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'learned'
                ? 'btn-lobe-primary'
                : 'btn-lobe-secondary'
            }`}
          >
            Learned Memory
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memory..."
              className="input-lobe pl-11"
            />
          </div>
        </div>

        {/* Memory Entries */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="card-lobe">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground flex-1">
                  {item.title}
                </h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-secondary rounded transition-colors">
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-red-500/20 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{item.content}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {activeTab === 'learned' && 'confidence' in item ? (
                  <div className="flex items-center gap-2">
                    <span>Confidence: </span>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${item.confidence * 100}%` }}
                      />
                    </div>
                    <span>{(item.confidence * 100).toFixed(0)}%</span>
                  </div>
                ) : (
                  'tags' in item && (
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )
                )}
                <span>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Memory Entries</h3>
            <p className="text-muted-foreground">
              Create your first memory entry to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
