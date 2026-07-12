'use client';

import React, { useState } from 'react';
import { Puzzle, Plus, Search, Download } from '@/lib/icons';

export function SkillsView() {
  const [searchQuery, setSearchQuery] = useState('');

  const skills = [
    {
      id: 1,
      name: 'Web Scraper',
      category: 'Data',
      description: 'Extract and parse web content',
      installed: true,
    },
    {
      id: 2,
      name: 'Email Sender',
      category: 'Communication',
      description: 'Send emails with attachments',
      installed: true,
    },
    {
      id: 3,
      name: 'Code Generator',
      category: 'Development',
      description: 'Generate code snippets from natural language',
      installed: false,
    },
    {
      id: 4,
      name: 'API Caller',
      category: 'Integration',
      description: 'Make HTTP requests to external APIs',
      installed: true,
    },
    {
      id: 5,
      name: 'Database Query',
      category: 'Data',
      description: 'Query and manipulate databases',
      installed: false,
    },
    {
      id: 6,
      name: 'File Manager',
      category: 'System',
      description: 'Read, write, and manage files',
      installed: true,
    },
  ];

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="h-full px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">MCP Skills Marketplace</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="input-lobe pl-11"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card-lobe">
            <p className="text-sm text-muted-foreground mb-1">Total Skills</p>
            <p className="text-3xl font-bold text-primary">{skills.length}</p>
          </div>
          <div className="card-lobe">
            <p className="text-sm text-muted-foreground mb-1">Installed</p>
            <p className="text-3xl font-bold text-primary">
              {skills.filter((s) => s.installed).length}
            </p>
          </div>
          <div className="card-lobe">
            <p className="text-sm text-muted-foreground mb-1">Available</p>
            <p className="text-3xl font-bold text-primary">
              {skills.filter((s) => !s.installed).length}
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="card-lobe">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Puzzle className="w-5 h-5 text-primary" />
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    skill.installed
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100'
                  }`}
                >
                  {skill.installed ? 'Installed' : 'Available'}
                </span>
              </div>

              <h3 className="font-bold text-foreground mb-1">{skill.name}</h3>
              <p className="text-xs text-primary mb-3 capitalize">{skill.category}</p>
              <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>

              <button
                className={`w-full py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  skill.installed
                    ? 'btn-lobe-secondary'
                    : 'btn-lobe-primary'
                }`}
              >
                <Download className="w-4 h-4" />
                {skill.installed ? 'Uninstall' : 'Install'}
              </button>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <Puzzle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Skills Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
