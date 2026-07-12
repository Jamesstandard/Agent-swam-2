'use client';

import React, { useState } from 'react';
import { useSwarmsStore, Swarm, SwarmTask } from '@/lib/stores/swarms';
import { Plus, Trash2, Grid3x3 } from '@/lib/icons';

export function SwarmsView() {
  const { swarms, currentSwarmId, addSwarm, setCurrentSwarm, addTask, updateTask, deleteSwarm } = useSwarmsStore();
  const [selectedFramework, setSelectedFramework] = useState<'crewai' | 'autogen' | 'openclaw' | 'langgraph'>('crewai');

  const currentSwarm = swarms.find((s) => s.id === currentSwarmId);

  const handleNewSwarm = () => {
    const newSwarm: Swarm = {
      id: `swarm-${Date.now()}`,
      name: `Swarm ${swarms.length + 1}`,
      description: 'A new agent swarm',
      framework: selectedFramework,
      agents: [],
      tasks: [],
      status: 'planning',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addSwarm(newSwarm);
  };

  const handleAddTask = (status: 'todo' | 'in-progress' | 'review' | 'completed') => {
    if (!currentSwarmId) return;

    const newTask: SwarmTask = {
      id: `task-${Date.now()}`,
      title: 'New Task',
      description: 'Task description',
      status,
      priority: 'medium',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addTask(currentSwarmId, newTask);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="h-full px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Swarms</h1>
          <button
            onClick={handleNewSwarm}
            className="btn-lobe-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Swarm
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Swarms List */}
        <div className="w-64 border-r border-border bg-card/30 overflow-y-auto">
          <div className="p-4 space-y-2">
            {swarms.map((swarm) => (
              <button
                key={swarm.id}
                onClick={() => setCurrentSwarm(swarm.id)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 group flex items-center justify-between ${
                  currentSwarmId === swarm.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary text-foreground'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{swarm.name}</p>
                  <p className="text-xs opacity-70">{swarm.tasks.length} tasks</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSwarm(swarm.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </button>
            ))}
            {swarms.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No swarms yet
              </p>
            )}
          </div>
        </div>

        {/* Kanban Board */}
        {currentSwarm ? (
          <div className="flex-1 flex flex-col">
            {/* Swarm Header */}
            <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-foreground">{currentSwarm.name}</h2>
                <p className="text-xs text-muted-foreground capitalize">
                  {currentSwarm.framework} • {currentSwarm.tasks.length} tasks
                </p>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="flex-1 overflow-x-auto p-6">
              <div className="flex gap-6 min-w-max">
                {(['todo', 'in-progress', 'review', 'completed'] as const).map((status) => (
                  <div key={status} className="flex-1 min-w-80">
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground capitalize">
                        {status.replace('-', ' ')}
                      </h3>
                      <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-medium">
                        {currentSwarm.tasks.filter((t) => t.status === status).length}
                      </span>
                    </div>

                    {/* Column Container */}
                    <div className="bg-muted/30 rounded-lg p-4 min-h-96 space-y-3">
                      {currentSwarm.tasks
                        .filter((t) => t.status === status)
                        .map((task) => (
                          <div key={task.id} className="card-lobe cursor-grab active:cursor-grabbing">
                            <h4 className="font-medium text-foreground mb-2">
                              {task.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {task.description}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <span className={`px-2 py-1 rounded ${
                                task.priority === 'high'
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                                  : task.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                                    : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                              }`}>
                                {task.priority}
                              </span>
                              <button
                                onClick={() => {
                                  const newStatus = status === 'completed' ? 'review' : 'completed';
                                  updateTask(currentSwarm.id, task.id, { status: newStatus });
                                }}
                                className="p-1 hover:bg-secondary rounded transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}

                      {/* Add Task Button */}
                      <button
                        onClick={() => handleAddTask(status)}
                        className="w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-secondary/30 transition-all text-muted-foreground hover:text-primary"
                      >
                        <Plus className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Grid3x3 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No Swarm Selected</h2>
              <p className="text-muted-foreground mb-6">
                Create a new swarm to get started with Kanban workflow
              </p>
              <button
                onClick={handleNewSwarm}
                className="btn-lobe-primary flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                New Swarm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
