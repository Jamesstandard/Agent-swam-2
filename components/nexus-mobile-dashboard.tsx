'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Bell, Bot, ChevronRight, CircleUserRound, Home, LineChart, MessageSquare, Plus, Radio, ShieldCheck, Sparkles, UserRound, Zap } from 'lucide-react'
import { useAppStore } from '@/lib/stores/app'

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }

function SignalChart({ accent = '#818cf8' }: { accent?: string }) {
  return (
    <svg viewBox="0 0 300 74" className="h-16 w-full" role="img" aria-label="Mission signal trend">
      <defs><linearGradient id="nexusArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={accent} stopOpacity=".28" /><stop offset="1" stopColor={accent} stopOpacity="0" /></linearGradient></defs>
      <path d="M0 58 C28 54 38 35 60 41 S90 62 110 43 S135 18 153 35 S179 54 196 31 S224 7 242 26 S270 42 300 10 V74 H0Z" fill="url(#nexusArea)" />
      <path d="M0 58 C28 54 38 35 60 41 S90 62 110 43 S135 18 153 35 S179 54 196 31 S224 7 242 26 S270 42 300 10" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

const metrics = [
  { label: 'ACTIVE AGENTS', value: '08', delta: '+2.4%', icon: Bot, accent: '#67e8f9', detail: '7 autonomous / 1 supervised' },
  { label: 'TASK THROUGHPUT', value: '1.24k', delta: '+18.2%', icon: Activity, accent: '#a78bfa', detail: 'Peak velocity reached at 14:42 UTC' },
  { label: 'SYSTEM UPTIME', value: '99.98%', delta: 'stable', icon: Radio, accent: '#34d399', detail: 'All mission channels operational' },
]

export function NexusMobileDashboard() {
  const setCurrentView = useAppStore((state) => state.setCurrentView)
  const [period, setPeriod] = useState('LIVE')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [activeNav, setActiveNav] = useState('home')

  const nav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: UserRound },
  ]

  return (
    <main className="min-h-screen bg-[#080b12] text-slate-100 md:flex md:items-center md:justify-center md:p-6">
      <section className="nexus-shell relative mx-auto flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden border-x border-white/[0.06] bg-[#0b0f18] shadow-2xl md:h-[852px] md:rounded-[2rem] md:border md:border-white/10">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[0.06] bg-[#0b0f18]/80 px-5 pb-4 pt-5 backdrop-blur-md">
          <div className="flex items-center gap-3"><div className="relative flex size-10 items-center justify-center rounded-2xl border border-indigo-300/20 bg-indigo-500/10"><Sparkles className="size-5 text-indigo-300" /><span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" /></div><div><p className="font-mono text-[10px] font-semibold tracking-[0.28em] text-cyan-200/70">NEXUS CORE</p><h1 className="text-base font-semibold tracking-tight">Mission Control</h1></div></div>
          <button className="relative flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300" aria-label="Open notifications"><Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" /></button>
        </header>

        <div className="scrollbar-none flex-1 overflow-y-auto px-5 pb-32 pt-6">
          <div className="mb-6 flex items-end justify-between"><div><p className="font-mono text-[10px] tracking-[0.24em] text-slate-500">COMMAND DECK / 07:42 UTC</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Good morning,<br /><span className="text-slate-400">Operator.</span></h2></div><div className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-400 to-violet-600"><CircleUserRound className="size-6 text-white" /></div></div>

          <div className="mb-6 rounded-3xl border border-indigo-300/20 bg-gradient-to-br from-indigo-500/20 via-[#151a35] to-violet-500/10 p-5 shadow-[0_18px_60px_rgba(79,70,229,.16)]"><div className="flex items-start justify-between"><div><div className="mb-3 flex items-center gap-2"><span className="nexus-status-dot" /><span className="font-mono text-[10px] tracking-[0.22em] text-cyan-200">ALL SYSTEMS NOMINAL</span></div><h3 className="max-w-[220px] text-xl font-semibold leading-tight">Your swarm is moving<br />with intention.</h3></div><ShieldCheck className="size-6 text-cyan-300" /></div><SignalChart /><div className="mt-1 flex items-center justify-between text-[11px] text-slate-400"><span>NETWORK ACTIVITY</span><span className="font-mono text-cyan-200">+24.8%</span></div></div>

          <div className="mb-5 flex rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1">{['LIVE', '24H', '7D'].map((item) => <button key={item} onClick={() => setPeriod(item)} className="relative min-h-11 flex-1 rounded-xl font-mono text-[11px] tracking-[0.2em] text-slate-400 transition-colors">{period === item && <motion.span layoutId="period" transition={spring} className="absolute inset-0 rounded-xl bg-white/10" />}{<span className="relative">{item}</span>}</button>)}</div>

          <div className="mb-6 grid grid-cols-2 gap-3">{metrics.map((metric, index) => { const Icon = metric.icon; const isExpanded = expanded === metric.label; return <motion.button layout key={metric.label} onClick={() => setExpanded(isExpanded ? null : metric.label)} transition={spring} className={`text-left ${index === 0 ? 'col-span-2' : ''} rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors hover:bg-white/[0.06]`}><div className="mb-4 flex items-center justify-between"><span className="flex size-9 items-center justify-center rounded-xl bg-white/[0.06]" style={{ color: metric.accent }}><Icon className="size-4" /></span><ChevronRight className={`size-4 text-slate-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} /></div><p className="font-mono text-[10px] tracking-[0.16em] text-slate-500">{metric.label}</p><div className="mt-1 flex items-end justify-between"><p className="text-2xl font-semibold tracking-tight text-white">{metric.value}</p><span className="font-mono text-[10px] text-emerald-300">{metric.delta}</span></div>{isExpanded && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 border-t border-white/[0.08] pt-3 text-xs text-slate-400">{metric.detail}</motion.p>}</motion.button> })}</div>

          <div className="mb-6"><div className="mb-3 flex items-center justify-between"><p className="font-mono text-[10px] tracking-[0.2em] text-slate-500">QUICK ACTIONS</p><button onClick={() => setCurrentView('chat')} className="flex min-h-11 items-center gap-1 text-xs text-indigo-300">View all <ChevronRight className="size-4" /></button></div><div className="scrollbar-none flex gap-3 overflow-x-auto pb-1"><button onClick={() => setCurrentView('chat')} className="flex min-w-[150px] items-center gap-3 rounded-2xl border border-indigo-300/20 bg-indigo-500/10 p-4 text-left"><Zap className="size-5 text-indigo-300" /><span><span className="block text-sm font-medium">New objective</span><span className="block text-[11px] text-slate-400">Start a mission</span></span></button><button onClick={() => setCurrentView('swarms')} className="flex min-w-[150px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-left"><Bot className="size-5 text-cyan-300" /><span><span className="block text-sm font-medium">Deploy swarm</span><span className="block text-[11px] text-slate-400">Assign agents</span></span></button></div></div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4"><div className="mb-4 flex items-center justify-between"><div><p className="font-mono text-[10px] tracking-[0.2em] text-slate-500">ACTIVE MISSIONS</p><p className="mt-1 text-sm font-medium">Live operations</p></div><span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 font-mono text-[10px] text-cyan-200">03 RUNNING</span></div>{['Atlas research sweep', 'Signal routing audit', 'Memory consolidation'].map((mission, i) => <div key={mission} className="flex items-center gap-3 border-t border-white/[0.06] py-3"><span className={`size-2 rounded-full ${i === 1 ? 'bg-amber-300' : 'bg-cyan-300'} shadow-[0_0_10px_currentColor]`} /><span className="flex-1 text-sm text-slate-300">{mission}</span><span className="font-mono text-[10px] text-slate-500">{i === 0 ? '82%' : i === 1 ? '54%' : '31%'}</span></div>)}</div>
        </div>

        <nav className="absolute bottom-5 left-5 right-5 z-40 flex h-[72px] items-center justify-around rounded-3xl border border-white/10 bg-[#121827]/90 px-2 shadow-2xl backdrop-blur-xl" aria-label="Primary navigation">{nav.slice(0, 2).map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setActiveNav(item.id)} className="relative flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 text-slate-500">{activeNav === item.id && <motion.span layoutId="nav-active" transition={spring} className="absolute bottom-1 h-1 w-5 rounded-full bg-indigo-300" />}<motion.span animate={{ scale: activeNav === item.id ? 1.1 : 1 }}><Icon className="size-5" /></motion.span><span className="font-mono text-[9px]">{item.label}</span></button> })}<button onClick={() => setCurrentView('chat')} className="-mt-10 flex size-16 items-center justify-center rounded-full border-4 border-[#0b0f18] bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_0_28px_rgba(124,58,237,.5)]" aria-label="Start new objective"><Plus className="size-7 text-white" /></button>{nav.slice(2).map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setActiveNav(item.id)} className="relative flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 text-slate-500">{activeNav === item.id && <motion.span layoutId="nav-active" transition={spring} className="absolute bottom-1 h-1 w-5 rounded-full bg-indigo-300" />}<motion.span animate={{ scale: activeNav === item.id ? 1.1 : 1 }}><Icon className="size-5" /></motion.span><span className="font-mono text-[9px]">{item.label}</span></button> })}</nav>
      </section>
    </main>
  )
}
