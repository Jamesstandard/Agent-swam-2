'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useChatStore, ChatConversation, ChatMessage } from '@/lib/stores/chat';
import { Plus, Send, Trash2, MessageSquare as MessageIcon, Mic, Square, X } from '@/lib/icons';

export function ChatView() {
  const { conversations, currentConversationId, addConversation, setCurrentConversation, addMessage, deleteConversation } = useChatStore();
  const [messageInput, setMessageInput] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<'crewai' | 'autogen' | 'openclaw' | 'langgraph'>('crewai');
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [mobileRailOpen, setMobileRailOpen] = useState(false);
  const [micError, setMicError] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const replyTimersRef = useRef<number[]>([]);

  const currentConv = conversations.find((conversation) => conversation.id === currentConversationId);

  useEffect(() => () => {
    replyTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
  }, []);

  const handleNewConversation = () => {
    const newConv: ChatConversation = {
      id: `conv-${Date.now()}`,
      title: `Conversation ${conversations.length + 1}`,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      framework: selectedFramework,
    };
    addConversation(newConv);
    setMobileRailOpen(false);
  };

  const handleSendMessage = () => {
    const content = messageInput.trim() || transcribedText.trim();
    if (!content || !currentConversationId || isRecording) return;

    const now = Date.now();
    const userMessage: ChatMessage = { id: `msg-${now}`, role: 'user', content, timestamp: now, status: 'sent' };
    addMessage(currentConversationId, userMessage);
    setMessageInput('');
    setTranscribedText('');

    const timer = window.setTimeout(() => {
      addMessage(currentConversationId, {
        id: `msg-${Date.now()}-1`,
        role: 'assistant',
        content: `I received your message and I’m processing it with ${selectedFramework}…`,
        timestamp: Date.now(),
        status: 'sent',
      });
    }, 500);
    replyTimersRef.current.push(timer);
  };

  const handleStartRecording = async () => {
    setMicError('');
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setMicError('Voice input is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      recorder.onstop = () => {
        setTranscribedText('Voice note ready to send.');
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start();
    } catch {
      setMicError('Microphone access was blocked. Check browser permissions and try again.');
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    setIsRecording(false);
  };

  return (
    <main className="flex min-h-full min-w-0 flex-col bg-background">
      <header className="sticky top-0 z-20 flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card/90 px-3 backdrop-blur-sm sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <button aria-label="Open conversations" onClick={() => setMobileRailOpen(true)} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary lg:hidden"><MessageIcon /></button>
          <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Nexus chat</p><h1 className="truncate text-lg font-bold text-foreground sm:text-xl">Workspace conversations</h1></div>
        </div>
        <button onClick={handleNewConversation} className="btn-lobe-primary flex shrink-0 items-center gap-2 px-3 py-2 text-sm"><Plus /> <span className="hidden sm:inline">New Chat</span></button>
      </header>

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <aside className={`absolute inset-y-0 left-0 z-30 w-[min(86vw,18rem)] border-r border-border bg-card shadow-xl transition-transform duration-200 lg:relative lg:z-0 lg:w-64 lg:translate-x-0 lg:shadow-none ${mobileRailOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-full flex-col gap-3 p-3 sm:p-4">
            <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Conversations</p><button aria-label="Close conversations" onClick={() => setMobileRailOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary lg:hidden"><X /></button></div>
            <label className="flex flex-col gap-1 text-xs text-muted-foreground">Framework<select value={selectedFramework} onChange={(event) => setSelectedFramework(event.target.value as typeof selectedFramework)} className="input-lobe px-3 py-2 text-sm"><option value="crewai">CrewAI</option><option value="autogen">AutoGen</option><option value="openclaw">OpenClaw</option><option value="langgraph">LangGraph</option></select></label>
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
              {conversations.map((conv) => <div key={conv.id} className={`group flex items-center gap-2 rounded-xl border p-2 transition-colors ${currentConversationId === conv.id ? 'border-primary/40 bg-secondary' : 'border-transparent hover:bg-secondary/60'}`}><button onClick={() => { setCurrentConversation(conv.id); setMobileRailOpen(false); }} className="min-w-0 flex-1 text-left"><p className="truncate text-sm font-medium text-foreground">{conv.title}</p><p className="text-xs text-muted-foreground">{conv.messages.length} messages</p></button><button aria-label={`Delete ${conv.title}`} onClick={() => deleteConversation(conv.id)} className="rounded-lg p-2 text-muted-foreground opacity-70 hover:bg-destructive/10 hover:text-destructive"><Trash2 /></button></div>)}
              {conversations.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No conversations yet.</p>}
            </div>
          </div>
        </aside>
        {mobileRailOpen && <button aria-label="Close conversation menu" onClick={() => setMobileRailOpen(false)} className="absolute inset-0 z-20 bg-background/60 lg:hidden" />}

        {currentConv ? <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-14 shrink-0 items-center justify-between border-b border-border bg-card px-3 sm:px-5"><div className="min-w-0"><h2 className="truncate font-bold text-foreground">{currentConv.title}</h2><p className="text-xs capitalize text-muted-foreground">{currentConv.framework} runtime</p></div><span className="hidden rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground sm:inline">{currentConv.messages.length} messages</span></div>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-5 sm:px-6 sm:py-6"><div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-end gap-4">{currentConv.messages.length === 0 ? <div className="flex flex-1 items-center justify-center text-center"><div><MessageIcon className="mx-auto mb-3 text-muted-foreground/30" /><p className="text-sm text-muted-foreground">Start a conversation with your swarm workspace.</p></div></div> : currentConv.messages.map((msg) => <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><article className={`max-w-[92%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${msg.role === 'user' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md bg-secondary text-secondary-foreground'}`}><p className="whitespace-pre-wrap break-words text-sm leading-6">{msg.content}</p><p className="mt-1 text-[11px] opacity-70">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p></article></div>)}</div></div>
          <div className="shrink-0 border-t border-border bg-card/95 p-3 sm:p-5"><div className="mx-auto flex w-full max-w-3xl flex-col gap-2">{(transcribedText || micError) && <div role={micError ? 'alert' : 'status'} className={`rounded-xl border px-3 py-2 text-xs ${micError ? 'border-destructive/40 text-destructive' : 'border-border text-muted-foreground'}`}>{micError || transcribedText}</div>}<div className="flex items-end gap-2"><textarea aria-label="Message" value={messageInput} onChange={(event) => setMessageInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); handleSendMessage(); } }} placeholder="Message your swarm..." rows={1} disabled={isRecording} className="input-lobe min-h-11 max-h-32 flex-1 resize-none py-3" /><button aria-label={isRecording ? 'Stop recording' : 'Start voice input'} onClick={isRecording ? handleStopRecording : handleStartRecording} className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${isRecording ? 'bg-destructive text-destructive-foreground' : 'btn-lobe-secondary'}`}>{isRecording ? <Square /> : <Mic />}</button><button aria-label="Send message" onClick={handleSendMessage} disabled={isRecording || !(messageInput.trim() || transcribedText.trim())} className="btn-lobe-primary flex size-11 shrink-0 items-center justify-center p-0 disabled:opacity-50"><Send /></button></div><p className="hidden text-[11px] text-muted-foreground sm:block">Enter to send · Shift + Enter for a new line</p></div></div>
        </section> : <section className="flex flex-1 items-center justify-center p-6 text-center"><div><MessageIcon className="mx-auto mb-4 text-muted-foreground/30" /><h2 className="text-xl font-bold text-foreground">No chat selected</h2><p className="mb-5 mt-2 text-sm text-muted-foreground">Create a new conversation to begin.</p><button onClick={handleNewConversation} className="btn-lobe-primary inline-flex items-center gap-2"><Plus /> New Chat</button></div></section>}
      </div>
    </main>
  );
}
