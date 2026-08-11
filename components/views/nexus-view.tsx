'use client';

import { useMemo, useState } from 'react';
import { useAppStore } from '@/lib/stores/app';
import { useSwarmsStore } from '@/lib/stores/swarms';
import { buildMissionFromPrompt, memoryEvents, suggestedMissions } from '@/lib/nexus-data';
import { ArrowRight, CheckCircle, Grid3x3, Pause, Play, Send, Shield, Sparkles, Zap } from '@/lib/icons';

export function NexusView() {
  const { trustTier, cloneMode, setCloneMode, setCurrentView, setActiveMissionId, nexusAdvanced } = useAppStore();
  const { swarms, addSwarm } = useSwarmsStore();
  const [prompt, setPrompt] = useState('');
  const [approved, setApproved] = useState(false);
  const [paused, setPaused] = useState(false);
  const preview = useMemo(() => buildMissionFromPrompt(prompt), [prompt]);
  const active = approved || swarms.length > 0;

  function approveMission() {
    const id = `nexus-${Date.now()}`;
    addSwarm({
      id,
      name: preview.title,
      description: preview.intent,
      framework: 'langgraph',
      status: 'active',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      agents: preview.agents.map((agent) => ({ id: agent.id, name: agent.name, role: agent.role, status: agent.status === 'blocked' ? 'idle' : agent.status === 'working' ? 'working' : agent.status === 'completed' ? 'completed' : 'idle', description: agent.task, tools: agent.tools })),
      tasks: [],
    });
    setActiveMissionId(id);
    setApproved(true);
  }

  return (
    <main className="min-h-full bg-[#071018] text-slate-100 nexus-shell">
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-8 md:py-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300"><span className="nexus-status-dot" /> Nexus Core / Mission Control</div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">Describe the mission.<br /><span className="text-cyan-300">We assemble the team.</span></h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Conversational orchestration for complex work. This client prototype previews the swarm, guardrails, and handoff before any external action.</p>
          </div>
          <div className="hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-right sm:block"><p className="text-[10px] uppercase tracking-widest text-slate-500">Trust tier</p><p className="text-sm font-medium text-cyan-200">{trustTier}</p></div>
        </header>

        <section className="mt-6 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-4 shadow-2xl shadow-cyan-950/30 md:p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-300"><Sparkles className="h-4 w-4 text-cyan-300" /> Mission composer</div>
          <textarea value={prompt} onChange={(event) => { setPrompt(event.target.value); setApproved(false); }} placeholder="Tell Nexus what you want to accomplish..." className="mt-4 min-h-28 w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-sm leading-6 text-slate-100 outline-none transition focus:border-cyan-300/70" aria-label="Mission prompt" />
          <div className="mt-3 flex flex-wrap gap-2">{suggestedMissions.map((mission) => <button key={mission} onClick={() => setPrompt(mission)} className="rounded-full border border-slate-700 px-3 py-2 text-left text-xs text-slate-400 transition hover:border-cyan-300/60 hover:text-cyan-200">{mission}</button>)}</div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs text-slate-500">Safe defaults: {nexusAdvanced.maxConcurrentAgents} agents · {nexusAdvanced.computeCreditsPerMission} credits cap · approval required</span><button onClick={() => setPrompt(prompt || suggestedMissions[0])} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"><Send className="h-4 w-4" /> Analyze mission</button></div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 md:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-widest text-slate-500">Mission preview</p><h2 className="mt-1 text-xl font-semibold">{preview.title}</h2></div><span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs text-violet-200">{preview.agents.length} agents</span></div><p className="mt-3 text-sm leading-6 text-slate-400">{preview.intent}</p><div className="mt-5 grid grid-cols-3 gap-2"><Metric label="ETA" value={preview.eta} /><Metric label="Credits" value={`${preview.credits}`} /><Metric label="Trust" value={preview.trust} /></div><div className="mt-5 flex flex-col gap-2">{preview.constraints.map((item) => <div key={item} className="flex items-center gap-2 text-xs text-slate-400"><Shield className="h-3.5 w-3.5 text-cyan-300" /> {item}</div>)}</div><div className="mt-6 flex flex-col gap-2 sm:flex-row"><button onClick={approveMission} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-400 px-4 text-sm font-semibold text-slate-950 hover:bg-violet-300"><CheckCircle className="h-4 w-4" /> Approve local preview</button><button onClick={() => setPrompt(`${preview.intent} Keep all irreversible actions gated by me.`)} className="min-h-11 rounded-xl border border-slate-700 px-4 text-sm text-slate-300 hover:border-cyan-300/60">Add constraint</button></div></section>
          <aside className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 md:p-6"><p className="text-xs uppercase tracking-widest text-slate-500">Digital Clone</p><h2 className="mt-1 text-xl font-semibold">Your proxy, your boundaries</h2><p className="mt-3 text-sm leading-6 text-slate-400">Clone actions remain advisory until you explicitly change the mode. No credentials are stored here.</p><div className="mt-5 flex gap-2"><button onClick={() => setCloneMode('advisory')} className={`flex-1 rounded-xl px-3 py-3 text-xs ${cloneMode === 'advisory' ? 'bg-cyan-300 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Advisory</button><button onClick={() => setCloneMode('autonomous')} className={`flex-1 rounded-xl px-3 py-3 text-xs ${cloneMode === 'autonomous' ? 'bg-violet-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>Autonomous</button></div><div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs leading-5 text-amber-100">{cloneMode === 'advisory' ? 'Every representative action pauses for your review.' : 'Prototype only: external execution is still disabled.'}</div></aside>
        </div>

        {active && <section className="mt-5 rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-4 md:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-widest text-slate-500">Live swarm HUD</p><h2 className="mt-1 text-xl font-semibold">{preview.title} <span className="ml-2 text-xs font-normal text-cyan-300">{paused ? 'PAUSED' : 'RUNNING'}</span></h2></div><div className="flex gap-2"><button onClick={() => setPaused(!paused)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-700 px-3 text-xs text-slate-300">{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}{paused ? 'Resume' : 'Pause'}</button><button onClick={() => setCurrentView('inspect')} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-slate-800 px-3 text-xs text-slate-300">Inspect <ArrowRight className="h-4 w-4" /></button></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{preview.agents.map((agent) => <article key={agent.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><div className="flex items-center justify-between"><span className="text-sm font-medium">{agent.name}</span><span className={`nexus-agent-dot ${agent.status}`} /></div><p className="mt-1 text-xs text-cyan-200">{agent.archetype} · {agent.role}</p><p className="mt-3 min-h-10 text-xs leading-5 text-slate-400">{agent.task}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-300" style={{ width: `${agent.progress}%` }} /></div><div className="mt-2 flex justify-between text-[10px] text-slate-500"><span>{agent.progress}%</span><span>{Math.round(agent.confidence * 100)}% confidence</span></div></article>)}</div></section>}

        <section className="mt-5 grid gap-5 md:grid-cols-2"><section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 md:p-6"><div className="flex items-center gap-2"><Grid3x3 className="h-4 w-4 text-violet-300" /><h2 className="font-semibold">Shared memory stream</h2></div><div className="mt-4 flex flex-col gap-4">{memoryEvents.map((event) => <div key={event.text} className="flex gap-3"><span className={`mt-1 h-2 w-2 shrink-0 rounded-full bg-${event.tone}-300`} /><div><p className="text-xs font-medium text-slate-200">{event.label} <span className="ml-2 font-normal text-slate-500">{event.time}</span></p><p className="mt-1 text-xs leading-5 text-slate-400">{event.text}</p></div></div>)}</div></section><section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 md:p-6"><div className="flex items-center gap-2"><Zap className="h-4 w-4 text-cyan-300" /><h2 className="font-semibold">Handoff</h2></div><p className="mt-3 text-sm leading-6 text-slate-400">When the swarm reaches a decision point, its deliverables and audit trail will appear here.</p><button onClick={() => setCurrentView('swarms')} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-700 text-sm text-slate-300 hover:border-cyan-300/60">Open Swarm workspace <ArrowRight className="h-4 w-4" /></button></section></section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-slate-950/70 p-3"><p className="text-[10px] uppercase tracking-widest text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-cyan-200">{value}</p></div>; }
