'use client';

import { useMemo, useRef, useState } from 'react';
import { ArrowRight, FileText, GitBranch, Image, Link2, Minus, MousePointer2, Plus, StickyNote, Upload, ZoomIn, ZoomOut } from 'lucide-react';
import { useAppStore } from '@/lib/stores/app';
import { canvasAccentClasses, canvasColorClasses, initialCanvasEdges, initialCanvasGroups, initialCanvasNodes, type CanvasNode, type CanvasNodeColor, type CanvasNodeKind } from '@/lib/canvas-data';

type Point = { x: number; y: number };
const kindIcon: Record<CanvasNodeKind, typeof FileText> = { text: StickyNote, agent: GitBranch, file: FileText, image: Image, embed: Link2 };

export function CanvasView() {
  const { setCurrentView } = useAppStore();
  const [nodes, setNodes] = useState(initialCanvasNodes);
  const [edges, setEdges] = useState(initialCanvasEdges);
  const [groups] = useState(initialCanvasGroups);
  const [selectedId, setSelectedId] = useState<string | null>('mission');
  const [linkFrom, setLinkFrom] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.82);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [drag, setDrag] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [mode, setMode] = useState<'select' | 'link'>('select');
  const boardRef = useRef<HTMLDivElement>(null);

  const selected = nodes.find((node) => node.id === selectedId);
  const nodeMap = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);

  const boardPoint = (event: React.PointerEvent): Point => {
    const rect = boardRef.current?.getBoundingClientRect();
    return { x: ((event.clientX - (rect?.left ?? 0)) - pan.x) / zoom, y: ((event.clientY - (rect?.top ?? 0)) - pan.y) / zoom };
  };

  const addNode = (kind: CanvasNodeKind) => {
    const id = `node-${Date.now()}`;
    setNodes((current) => [...current, { id, kind, title: kind === 'agent' ? 'New agent node' : kind === 'embed' ? 'Website embed' : kind === 'file' ? 'New file' : kind === 'image' ? 'Image reference' : 'New note', body: 'Double-click or use the quick menu to shape this idea.', x: 220 + current.length * 20, y: 180 + current.length * 18, width: 240, color: kind === 'agent' ? 'violet' : 'cyan', meta: 'New canvas object' }]);
  };

  const startDrag = (event: React.PointerEvent, node: CanvasNode) => {
    if (mode === 'link') return;
    const point = boardPoint(event);
    setSelectedId(node.id);
    setDrag({ id: node.id, offsetX: point.x - node.x, offsetY: point.y - node.y });
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent) => {
    if (!drag) return;
    const point = boardPoint(event);
    setNodes((current) => current.map((node) => node.id === drag.id ? { ...node, x: Math.max(20, point.x - drag.offsetX), y: Math.max(20, point.y - drag.offsetY) } : node));
  };

  const finishDrag = () => setDrag(null);

  const handleNodeClick = (node: CanvasNode) => {
    setSelectedId(node.id);
    if (mode === 'link') {
      if (!linkFrom) setLinkFrom(node.id);
      else if (linkFrom !== node.id) { setEdges((current) => [...current, { id: `edge-${Date.now()}`, from: linkFrom, to: node.id, label: 'linked' }]); setLinkFrom(null); setMode('select'); }
    }
  };

  return <main className="flex h-[calc(100vh-0px)] min-h-[520px] flex-col overflow-hidden bg-[#111318] text-slate-100">
    <header className="flex shrink-0 items-center justify-between border-b border-slate-700/60 bg-[#171a20]/95 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex min-w-0 items-center gap-3"><button onClick={() => setCurrentView('nexus')} className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Back to Nexus"><ArrowRight className="rotate-180" /></button><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Canvas workspace</p><h1 className="truncate text-base font-semibold md:text-lg">Grant acquisition map</h1></div></div>
      <div className="flex items-center gap-2 text-xs text-slate-400"><span className="hidden md:inline">{nodes.length} objects · {edges.length} links</span><span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-cyan-200">Local board</span></div>
    </header>
    <div className="relative flex min-h-0 flex-1 overflow-hidden">
      <div ref={boardRef} onPointerMove={moveDrag} onPointerUp={finishDrag} className="canvas-grid relative flex-1 overflow-hidden" aria-label="Infinite canvas board">
        <div className="absolute inset-0 origin-top-left" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          {groups.map((group) => <div key={group.id} className={`absolute rounded-2xl border border-violet-300/25 bg-violet-300/[0.025] p-4 ${canvasColorClasses[group.color]}`} style={{ left: group.x, top: group.y, width: group.width, height: group.height }}><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-200/80"><GitBranch className="h-3.5 w-3.5" />{group.title}</div></div>)}
          <svg className="pointer-events-none absolute inset-0 h-[900px] w-[1600px] overflow-visible" aria-hidden="true">{edges.map((edge) => { const from = nodeMap.get(edge.from); const to = nodeMap.get(edge.to); if (!from || !to) return null; const x1 = from.x + from.width; const y1 = from.y + 86; const x2 = to.x; const y2 = to.y + 86; return <g key={edge.id}><path d={`M ${x1} ${y1} C ${x1 + 80} ${y1}, ${x2 - 80} ${y2}, ${x2} ${y2}`} fill="none" stroke="rgba(103,232,249,.55)" strokeWidth="2" markerEnd="url(#arrow)" /><text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} fill="rgba(148,163,184,.8)" fontSize="11" textAnchor="middle">{edge.label}</text></g>})}<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="rgba(103,232,249,.8)" /></marker></defs></svg>
          {nodes.map((node) => { const Icon = kindIcon[node.kind]; return <article key={node.id} onPointerDown={(event) => startDrag(event, node)} onClick={() => handleNodeClick(node)} className={`canvas-node absolute cursor-grab rounded-xl border p-3 shadow-2xl transition-shadow active:cursor-grabbing ${canvasColorClasses[node.color]} ${selectedId === node.id ? 'ring-2 ring-cyan-300/70 ring-offset-2 ring-offset-[#111318]' : ''}`} style={{ left: node.x, top: node.y, width: node.width }}><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><span className={`rounded-md p-1.5 ${canvasAccentClasses[node.color]} text-slate-950`}><Icon className="h-3.5 w-3.5" /></span><h2 className="text-sm font-semibold">{node.title}</h2></div><span className="text-[10px] uppercase tracking-wider text-slate-400">{node.kind}</span></div><p className="mt-3 text-xs leading-5 text-slate-300">{node.body}</p>{node.meta && <p className="mt-3 border-t border-white/10 pt-2 text-[10px] uppercase tracking-wider text-slate-400">{node.meta}</p>}</article> })}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-slate-700 bg-[#171a20]/95 p-2 shadow-2xl backdrop-blur"><ToolbarButton label="Select" active={mode === 'select'} onClick={() => setMode('select')}><MousePointer2 /></ToolbarButton><ToolbarButton label="Link nodes" active={mode === 'link'} onClick={() => { setMode('link'); setLinkFrom(null); }}><GitBranch /></ToolbarButton><span className="mx-1 h-6 w-px bg-slate-700" /><ToolbarButton label="Add note" onClick={() => addNode('text')}><StickyNote /></ToolbarButton><ToolbarButton label="Add agent" onClick={() => addNode('agent')}><GitBranch /></ToolbarButton><ToolbarButton label="Add file" onClick={() => addNode('file')}><Upload /></ToolbarButton><ToolbarButton label="Add image" onClick={() => addNode('image')}><Image /></ToolbarButton><ToolbarButton label="Add website" onClick={() => addNode('embed')}><Link2 /></ToolbarButton></div>
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-xl border border-slate-700 bg-[#171a20]/95 p-1 shadow-xl"><ToolbarButton label="Zoom out" onClick={() => setZoom((value) => Math.max(0.45, value - 0.08))}><ZoomOut /></ToolbarButton><span className="min-w-12 text-center text-xs text-slate-400">{Math.round(zoom * 100)}%</span><ToolbarButton label="Zoom in" onClick={() => setZoom((value) => Math.min(1.5, value + 0.08))}><ZoomIn /></ToolbarButton></div>
      </div>
      <aside className="hidden w-72 shrink-0 border-l border-slate-700/60 bg-[#171a20] p-4 lg:block">{selected ? <><div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Selected object</p><h2 className="mt-1 font-semibold">{selected.title}</h2></div><span className="rounded-md bg-slate-800 p-2 text-cyan-300"><MousePointer2 className="h-4 w-4" /></span></div><div className="mt-6 flex flex-col gap-3"><label className="text-xs text-slate-400">Node color<select value={selected.color} onChange={(event) => setNodes((current) => current.map((node) => node.id === selected.id ? { ...node, color: event.target.value as CanvasNodeColor } : node))} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-sm text-slate-200"><option value="cyan">Cyan</option><option value="violet">Violet</option><option value="amber">Amber</option><option value="emerald">Emerald</option><option value="slate">Slate</option></select></label><button onClick={() => { setMode('link'); setLinkFrom(selected.id); }} className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-left text-xs text-slate-300 hover:border-cyan-300/50 hover:text-cyan-200"><GitBranch className="h-4 w-4" />Start directional link</button><p className="text-xs leading-5 text-slate-500">Drag to reposition. Use Link mode to connect two nodes. Groups are visual containers for related swarm work.</p></div></> : <div className="py-8 text-center text-sm text-slate-500">Select an object to inspect it.</div>}</aside>
    </div>
    {mode === 'link' && <div className="absolute left-1/2 top-16 -translate-x-1/2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs text-cyan-100 shadow-lg">{linkFrom ? 'Select a destination node' : 'Select a source node'} · Esc to cancel</div>}
  </main>;
}

function ToolbarButton({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) { return <button onClick={onClick} aria-label={label} title={label} className={`rounded-lg p-2 transition-colors ${active ? 'bg-cyan-300 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`}>{children}</button>; }
