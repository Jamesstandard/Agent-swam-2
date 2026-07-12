'use client';

import React, { useState } from 'react';
import { X, Plus, Trash2 } from '@/lib/icons';

interface AgentBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (agent: any) => void;
}

export function AgentBuilder({ isOpen, onClose, onSave }: AgentBuilderProps) {
  const [framework, setFramework] = useState<'crewai' | 'autogen' | 'openclaw' | 'langgraph'>('crewai');
  const [agentName, setAgentName] = useState('');
  const [role, setRole] = useState('');
  const [tools, setTools] = useState<string[]>([]);
  const [newTool, setNewTool] = useState('');

  const handleAddTool = () => {
    if (newTool.trim()) {
      setTools([...tools, newTool]);
      setNewTool('');
    }
  };

  const handleRemoveTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      name: agentName,
      role,
      framework,
      tools,
    });
    setAgentName('');
    setRole('');
    setTools([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
        <div className="card-lobe">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Create Agent</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-6">
            {/* Framework Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Framework
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value as any)}
                className="input-lobe"
              >
                <option value="crewai">CrewAI</option>
                <option value="autogen">AutoGen</option>
                <option value="openclaw">OpenClaw</option>
                <option value="langgraph">LangGraph</option>
              </select>
            </div>

            {/* Agent Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Agent Name
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="e.g., Research Agent"
                className="input-lobe"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Researcher"
                className="input-lobe"
              />
            </div>

            {/* Tools */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tools
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTool();
                    }
                  }}
                  placeholder="Add a tool..."
                  className="input-lobe flex-1"
                />
                <button
                  onClick={handleAddTool}
                  className="btn-lobe-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Tools List */}
              <div className="space-y-2">
                {tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-secondary rounded-lg"
                  >
                    <span className="text-sm text-secondary-foreground">{tool}</span>
                    <button
                      onClick={() => handleRemoveTool(idx)}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 btn-lobe-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 btn-lobe-primary"
            >
              Create Agent
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
