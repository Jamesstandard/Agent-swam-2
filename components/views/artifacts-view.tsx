'use client';

import React, { useState } from 'react';
import { Code, Download, Copy, Share2, Trash2, FileText, Plus, Search } from '@/lib/icons';

interface Artifact {
  id: string;
  name: string;
  type: 'code' | 'document' | 'report' | 'file' | 'tool';
  language?: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  size: number;
}

export function ArtifactsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'code' | 'documents' | 'reports'>('all');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const artifacts: Artifact[] = [
    {
      id: '1',
      name: 'user_analyzer.py',
      type: 'code',
      language: 'python',
      content: `def analyze_user_behavior(data):
    """Analyze user behavior patterns"""
    results = {}
    for user in data:
        results[user['id']] = calculate_metrics(user)
    return results`,
      createdAt: Date.now() - 3600000,
      updatedAt: Date.now() - 1800000,
      size: 2048,
    },
    {
      id: '2',
      name: 'market_analysis.md',
      type: 'document',
      content: '# Market Analysis Report\n\n## Executive Summary\n\nCurrent market trends show...',
      createdAt: Date.now() - 7200000,
      updatedAt: Date.now() - 3600000,
      size: 4096,
    },
    {
      id: '3',
      name: 'Q4_Performance_Report.pdf',
      type: 'report',
      content: 'Quarterly performance metrics and analysis...',
      createdAt: Date.now() - 86400000,
      updatedAt: Date.now() - 43200000,
      size: 8192,
    },
  ];

  const filteredArtifacts = artifacts.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || a.type === activeTab || 
      (activeTab === 'documents' && (a.type === 'document' || a.type === 'file'));
    return matchesSearch && matchesTab;
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'code': return 'bg-blue-100 text-blue-700 dark:bg-blue-900';
      case 'document': return 'bg-purple-100 text-purple-700 dark:bg-purple-900';
      case 'report': return 'bg-green-100 text-green-700 dark:bg-green-900';
      case 'file': return 'bg-orange-100 text-orange-700 dark:bg-orange-900';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="h-full px-4 md:px-6 flex items-center justify-between">
          <h1 className="text-lg md:text-2xl font-bold text-foreground">Artifacts</h1>
          <button className="btn-lobe-primary flex items-center gap-2 text-sm md:text-base">
            <Plus className="w-4 h-4" />
            <span>New Artifact</span>
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Search and Tabs */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artifacts..."
              className="input-lobe pl-11"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'code', 'documents', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-secondary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Artifacts List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Artifacts Grid */}
          <div className="lg:col-span-1">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredArtifacts.map((artifact) => (
                <button
                  key={artifact.id}
                  onClick={() => setSelectedArtifact(artifact)}
                  className={`w-full p-3 rounded-lg transition-all text-left ${
                    selectedArtifact?.id === artifact.id
                      ? 'bg-secondary border-2 border-primary'
                      : 'bg-card border border-border hover:border-primary'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Code className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate text-sm">{artifact.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(artifact.size)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Artifact Preview */}
          <div className="lg:col-span-2">
            {selectedArtifact ? (
              <div className="card-lobe p-4 md:p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div>
                    <h2 className="font-bold text-foreground">{selectedArtifact.name}</h2>
                    <p className={`text-xs font-medium mt-1 w-fit px-2 py-1 rounded ${getTypeColor(selectedArtifact.type)}`}>
                      {selectedArtifact.type.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Copy">
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Download">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="flex-1 overflow-auto bg-muted/20 rounded-lg p-4 font-mono text-sm text-foreground mb-4">
                  <pre className="whitespace-pre-wrap break-words">{selectedArtifact.content}</pre>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground border-t border-border pt-4">
                  <div>
                    <p className="font-medium">Created</p>
                    <p>{new Date(selectedArtifact.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Updated</p>
                    <p>{new Date(selectedArtifact.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-lobe h-full flex flex-col items-center justify-center text-center p-8">
                <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Select an artifact to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
