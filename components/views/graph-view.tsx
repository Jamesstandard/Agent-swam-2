'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ChevronLeft, Filter, Focus, Gauge, Link2, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { graphEdges, graphGroups, graphNodes, type GraphNode } from '@/lib/graph-data'

const groupColor: Record<GraphNode['group'], string> = { core: 'cyan', research: 'violet', build: 'amber', guardrail: 'emerald' }
const colorMap: Record<string, string> = { cyan: '#67e8f9', violet: '#a78bfa', amber: '#fbbf24', emerald: '#6ee7b7' }

export function GraphView() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('nexus')
  const [hovered, setHovered] = useState<string | null>(null)
  const [showOrphans, setShowOrphans] = useState(true)
  const [showArrows, setShowArrows] = useState(true)
  const [showTags, setShowTags] = useState(true)
  const [repulsion, setRepulsion] = useState(54)
  const [centerForce, setCenterForce] = useState(38)
  const [panelOpen, setPanelOpen] = useState(true)
  const [zoom, setZoom] = useState(100)

  const visible = useMemo(() => graphNodes.filter((node) => {
    const matches = !query || `${node.label} ${node.role} ${node.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())
    return matches && (showOrphans || node.connections > 0)
  }), [query, showOrphans])
  const visibleIds = new Set(visible.map((node) => node.id))
  const activeId = hovered ?? selected
  const related = new Set(graphEdges.flatMap((edge) => edge.from === activeId ? [edge.to] : edge.to === activeId ? [edge.from] : []))
  const selectedNode = graphNodes.find((node) => node.id === selected) ?? graphNodes[0]

  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10"><Sparkles className="size-4 text-cyan-300" /></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Nexus / Graph</p><h1 className="text-lg font-semibold text-foreground">Swarm topology</h1></div></div>
        <div className="flex items-center gap-2"><span className="hidden text-xs text-muted-foreground sm:inline">{visible.length} agents · {graphEdges.length} links</span><button aria-label="Focus graph" onClick={() => setSelected('nexus')} className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><Focus className="size-4" /></button></div>
      </header>
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <section aria-label="Interactive swarm graph" className="graph-grid relative min-h-[440px] flex-1 overflow-hidden"><div className="absolute inset-0 origin-center transition-transform duration-200" style={{ transform: `scale(${zoom / 100})` }}>
          <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {graphEdges.map((edge, index) => { const from = graphNodes.find((n) => n.id === edge.from)!; const to = graphNodes.find((n) => n.id === edge.to)!; const muted = hovered && edge.from !== activeId && edge.to !== activeId; return <line key={`${edge.from}-${edge.to}`} x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`} stroke={muted ? 'rgba(148,163,184,.08)' : 'rgba(103,232,249,.38)'} strokeWidth={muted ? '.12' : '.24'} strokeDasharray={index % 4 === 0 ? '1 1' : undefined} markerEnd={showArrows && !muted ? 'url(#arrow)' : undefined} /> })}
            <defs><marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#67e8f9" /></marker></defs>
          </svg>
          {visible.map((node) => { const color = colorMap[groupColor[node.group]]; const isActive = node.id === activeId; const faded = hovered && node.id !== activeId && !related.has(node.id); const size = 30 + node.connections * 5; return <button key={node.id} aria-label={`${node.label}, ${node.role}`} onClick={() => setSelected(node.id)} onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)} className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${faded ? 'opacity-20' : 'opacity-100'}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}><span className={`relative flex items-center justify-center rounded-full border text-[10px] font-bold shadow-[0_0_28px_var(--node-glow)] ${isActive ? 'ring-2 ring-cyan-200/60' : ''}`} style={{ width: size, height: size, borderColor: `${color}99`, backgroundColor: `${color}18`, color, ['--node-glow' as string]: `${color}44` }}>{node.label.slice(0, 2).toUpperCase()}<i className={`absolute -right-0.5 -top-0.5 size-2 rounded-full border border-background ${node.status === 'active' ? 'bg-cyan-300' : node.status === 'blocked' ? 'bg-amber-300' : 'bg-muted-foreground'}`} /></span><span className="mt-1 block whitespace-nowrap text-[10px] font-medium text-foreground/80">{node.label}</span>{showTags && isActive && <span className="mt-0.5 block whitespace-nowrap text-[9px] text-muted-foreground">{node.tags.join(' ')}</span>}</button> })}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2 text-[10px] text-muted-foreground backdrop-blur"><span className="size-1.5 rounded-full bg-cyan-300" /> Live force simulation <span className="text-border">|</span> Drag nodes to reshape</div>
          <div className="absolute bottom-4 right-4 flex gap-1 rounded-xl border border-border bg-card/80 p-1 backdrop-blur"><button aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(50, value - 10))} className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary">−</button><span className="px-1 py-1 text-xs text-muted-foreground">{zoom}%</span><button aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(150, value + 10))} className="rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-secondary">+</button></div>
        </div></section>
        <button className="absolute right-3 top-3 z-10 rounded-lg border border-border bg-card p-2 text-muted-foreground lg:hidden" onClick={() => setPanelOpen(!panelOpen)} aria-label="Toggle graph controls">{panelOpen ? <X className="size-4" /> : <SlidersHorizontal className="size-4" />}</button>
        {panelOpen && <aside className="absolute right-0 top-0 z-[1] flex h-full w-[min(300px,88vw)] flex-col gap-5 overflow-y-auto border-l border-border bg-card/95 p-4 backdrop-blur-xl lg:relative lg:w-72 lg:bg-card/80"><div className="flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Controls</p><h2 className="mt-1 font-semibold text-foreground">Shape the swarm</h2></div><Gauge className="size-4 text-cyan-300" /></div><label className="flex items-center gap-2 rounded-xl border border-border bg-input/50 px-3 py-2"><Search className="size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter agents, tags..." className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" /></label><div className="flex flex-col gap-2">{[['Show orphaned agents', showOrphans, setShowOrphans], ['Show direction arrows', showArrows, setShowArrows], ['Show tags', showTags, setShowTags]].map(([label, value, setValue]) => <label key={label as string} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-secondary/50"><span>{label as string}</span><input type="checkbox" checked={value as boolean} onChange={(e) => (setValue as (v: boolean) => void)(e.target.checked)} /></label>)}</div><div className="flex flex-col gap-3"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-foreground">Physics</p><span className="text-[10px] text-muted-foreground">Hardware acceleration on</span></div><label className="flex flex-col gap-1 text-xs text-muted-foreground">Repulsion <input type="range" min="0" max="100" value={repulsion} onChange={(e) => setRepulsion(Number(e.target.value))} /></label><label className="flex flex-col gap-1 text-xs text-muted-foreground">Center force <input type="range" min="0" max="100" value={centerForce} onChange={(e) => setCenterForce(Number(e.target.value))} /></label></div><div className="flex flex-col gap-2"><p className="text-xs font-semibold text-foreground">Groups</p>{graphGroups.map((group) => <button key={group.id} onClick={() => setQuery(`#${group.id}`)} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-secondary"><span className="size-2 rounded-full" style={{ backgroundColor: colorMap[group.color] }} />{group.label}<span className="ml-auto text-[10px]">{graphNodes.filter((node) => node.group === group.id).length}</span></button>)}</div><div className="border-t border-border pt-4"><div className="mb-3 flex items-center gap-2"><Filter className="size-3.5 text-cyan-300" /><p className="text-xs font-semibold text-foreground">Selected agent</p></div><p className="text-sm font-medium text-foreground">{selectedNode.label}</p><p className="mt-1 text-xs text-muted-foreground">{selectedNode.role} · {selectedNode.status}</p><div className="mt-3 flex flex-wrap gap-1">{selectedNode.tags.map((tag) => <span key={tag} className="rounded-md bg-secondary px-2 py-1 text-[10px] text-muted-foreground">{tag}</span>)}</div><button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"><Link2 className="size-3.5" /> Inspect relationships</button></div></aside>}
      </div>
    </main>
  )
}
