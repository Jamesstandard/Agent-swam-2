'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Bell,
  Bot,
  Brain,
  ChevronRight,
  Grid3X3,
  Home,
  MessageCircle,
  Plus,
  Sparkles,
  UserRound,
  Workflow,
  Zap,
} from 'lucide-react';
import { useAppStore } from '@/lib/stores/app';
import { useChatStore } from '@/lib/stores/chat';
import { useSwarmsStore } from '@/lib/stores/swarms';

type Range = 'Daily' | 'Weekly' | 'Monthly';
type Metric = { label: string; value: string; change: string; detail: string; icon: typeof Activity; points: string; color: string };

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 };
const ranges: Range[] = ['Daily', 'Weekly', 'Monthly'];

function Sparkline({ points, color }: { points: string; color: string }) {
  return (
    <svg viewBox="0 0 160 52" className="h-12 w-full" aria-label="Activity trend" role="img" preserveAspectRatio="none">
      <defs><linearGradient id={`fill-${color}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".25" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={`${points} L160 52 L0 52 Z`} fill={`url(#fill-${color})`} />
      <path d={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MobileDashboard() {
  const { setCurrentView } = useAppStore();
  const { conversations } = useChatStore();
  const { swarms } = useSwarmsStore();
  const [range, setRange] = useState<Range>('Weekly');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [active, setActive] = useState('Home');

  const metrics: Metric[] = [
    { label: 'Active agents', value: '24', change: '+12.5%', detail: '18 agents are currently processing tasks across 6 swarms.', icon: Bot, points: 'M0 42 C18 38 20 25 36 31 S55 42 70 23 S92 17 105 27 S128 5 160 10', color: '#818cf8' },
    { label: 'Tasks completed', value: '1,284', change: '+8.2%', detail: 'Your agents completed 94 more tasks than last week.', icon: Activity, points: 'M0 40 C20 42 26 30 42 35 S60 18 78 25 S96 32 111 15 S140 22 160 8', color: '#a78bfa' },
    { label: 'Conversations', value: String(conversations.length || 18), change: '+4.6%', detail: 'A steady flow of objective-driven conversations.', icon: MessageCircle, points: 'M0 28 C17 16 26 35 42 27 S62 31 77 18 S100 28 118 17 S142 10 160 14', color: '#67e8f9' },
    { label: 'Memory indexed', value: '24.8k', change: '+16.1%', detail: 'Long-term context is healthy and ready for retrieval.', icon: Brain, points: 'M0 44 C20 40 26 24 44 29 S66 35 83 18 S102 20 118 25 S139 11 160 7', color: '#c4b5fd' },
  ];

  const navigate = (item: string) => {
    setActive(item);
    if (item === 'Messages') setCurrentView('chat');
    if (item === 'Analytics') setCurrentView('graph');
  };

  return (
    <div className="min-h-full bg-[#090b11] text-slate-100 md:bg-background">
      <div className="mx-auto min-h-full w-full max-w-[520px] overflow-hidden bg-[#090b11] shadow-2xl md:max-w-none md:shadow-none">
        <header className="sticky top-0 z-30 border-b border-white/[.07] bg-[#090b11]/80 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-violet-950/40"><Sparkles className="size-5 text-white" /></div><div><p className="text-[11px] font-medium uppercase tracking-[.18em] text-slate-500">Workspace</p><h1 className="text-lg font-semibold tracking-tight">Overview</h1></div></div>
            <div className="flex items-center gap-2"><button type="button" aria-label="Notifications" className="relative flex size-11 items-center justify-center rounded-full border border-white/[.08] bg-white/[.04] text-slate-400 transition-transform active:scale-95"><Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full bg-violet-400 ring-2 ring-[#090b11]" /></button><button type="button" aria-label="Profile" className="flex size-11 items-center justify-center rounded-full border border-indigo-400/30 bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-indigo-100"><UserRound className="size-5" /></button></div>
          </div>
        </header>

        <main className="scrollbar-none overflow-y-auto px-5 pb-32 pt-6">
          <section className="mb-7"><div className="mb-1 flex items-end justify-between"><div><p className="text-sm text-slate-400">Good morning, James</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">Your swarm is <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">thriving.</span></h2></div><div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">Live</div></div><p className="mt-3 max-w-[300px] text-sm leading-6 text-slate-500">A calm view of everything your agents are learning and shipping.</p></section>

          <div className="mb-6 flex items-center gap-1 rounded-2xl border border-white/[.08] bg-white/[.04] p-1" role="tablist" aria-label="Activity range">{ranges.map((item) => <button key={item} type="button" role="tab" aria-selected={range === item} onClick={() => setRange(item)} className="relative min-h-11 flex-1 rounded-xl text-sm font-medium text-slate-400 transition-colors">{range === item && <motion.span layoutId="range-pill" className="absolute inset-0 rounded-xl bg-indigo-500/20 ring-1 ring-indigo-400/20" transition={spring} /> }<span className="relative z-10">{item}</span></button>)}</div>

          <div className="grid grid-cols-2 gap-3">{metrics.map((metric, index) => { const Icon = metric.icon; const isExpanded = expanded === metric.label; return <motion.button key={metric.label} type="button" layout onClick={() => setExpanded(isExpanded ? null : metric.label)} transition={spring} className="min-h-[158px] rounded-3xl border border-white/[.08] bg-[#11141d] p-4 text-left shadow-lg shadow-black/10 transition-colors hover:border-indigo-400/30 active:scale-[.98]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: index * .06 }}><div className="flex items-start justify-between"><div className="flex size-9 items-center justify-center rounded-xl bg-white/[.06] text-indigo-300"><Icon className="size-4" /></div><ArrowUpRight className="size-4 text-emerald-300" /></div><p className="mt-4 text-xs text-slate-500">{metric.label}</p><div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-semibold tracking-tight">{metric.value}</p><span className="text-[10px] font-medium text-emerald-300">{metric.change}</span></div><Sparkline points={metric.points} color={metric.color} />{isExpanded && <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-white/[.08] pt-3 text-xs leading-5 text-slate-400">{metric.detail}</motion.p>}</motion.button> })}</div>

          <section className="mt-8"><div className="mb-3 flex items-center justify-between"><h3 className="text-base font-semibold">Quick actions</h3><button type="button" className="flex min-h-11 items-center gap-1 text-xs font-medium text-indigo-300">See all <ChevronRight className="size-4" /></button></div><div className="scrollbar-none -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2">{[{ label: 'New objective', icon: Zap, action: () => setCurrentView('chat') }, { label: 'Create swarm', icon: Grid3X3, action: () => setCurrentView('swarms') }, { label: 'Map agents', icon: Workflow, action: () => setCurrentView('graph') }].map(({ label, icon: Icon, action }) => <motion.button key={label} type="button" onClick={action} whileTap={{ scale: .95 }} whileHover={{ y: -2 }} className="flex min-h-[74px] min-w-[142px] snap-start items-center gap-3 rounded-2xl border border-white/[.08] bg-white/[.04] px-4 text-left"><span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-violet-300"><Icon className="size-5" /></span><span className="text-sm font-medium leading-5">{label}</span></motion.button>)}</div></section>

          <section className="mt-8 rounded-3xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/15 via-violet-500/[.08] to-transparent p-5"><div className="flex items-start justify-between"><div><p className="text-xs font-medium uppercase tracking-[.16em] text-indigo-300">Agent pulse</p><h3 className="mt-2 text-xl font-semibold">Everything is in sync</h3><p className="mt-2 max-w-[250px] text-sm leading-5 text-slate-400">{swarms.length || 6} swarms are coordinating smoothly across your workspace.</p></div><div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-400/15 text-indigo-300"><Activity className="size-6" /></div></div><button type="button" onClick={() => setCurrentView('graph')} className="mt-5 flex min-h-11 items-center gap-2 text-sm font-medium text-indigo-200">Explore the network <ArrowUpRight className="size-4" /></button></section>
        </main>

        <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-32px)] max-w-[488px] -translate-x-1/2 items-center justify-around rounded-[28px] border border-white/[.12] bg-[#151923]/90 px-2 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl pb-[max(.5rem,env(safe-area-inset-bottom))]" aria-label="Primary navigation"><NavItem label="Home" active={active} icon={Home} onClick={() => navigate('Home')} /><NavItem label="Analytics" active={active} icon={Activity} onClick={() => navigate('Analytics')} /><button type="button" aria-label="Start new objective" onClick={() => setCurrentView('chat')} className="-mt-8 flex size-[60px] items-center justify-center rounded-full border-4 border-[#090b11] bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-xl shadow-violet-950/60 transition-transform active:scale-90"><Plus className="size-7" /></button><NavItem label="Messages" active={active} icon={MessageCircle} onClick={() => navigate('Messages')} /><NavItem label="Profile" active={active} icon={UserRound} onClick={() => navigate('Profile')} /></nav>
      </div>
    </div>
  );
}

function NavItem({ label, active, icon: Icon, onClick }: { label: string; active: string; icon: typeof Home; onClick: () => void }) {
  const selected = active === label;
  return <button type="button" aria-label={label} aria-current={selected ? 'page' : undefined} onClick={onClick} className="relative flex min-h-12 min-w-12 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-medium text-slate-500 transition-colors">{selected && <motion.span layoutId="nav-active" className="absolute top-1 size-1 rounded-full bg-indigo-300" transition={spring} />}<motion.span animate={{ scale: selected ? 1.1 : 1, color: selected ? '#a5b4fc' : '#64748b' }} transition={spring}><Icon className="size-5" /></motion.span><span>{label}</span></button>;
}
