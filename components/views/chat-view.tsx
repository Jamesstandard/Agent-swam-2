'use client';

import React, { useState, useRef } from 'react';
import { useChatStore, ChatConversation, ChatMessage } from '@/lib/stores/chat';
import { Plus, Send, Trash2, MessageSquare as MessageIcon, Mic, Square } from '@/lib/icons';

export function ChatView() {
  const { conversations, currentConversationId, addConversation, setCurrentConversation, addMessage, deleteConversation } = useChatStore();
  const [messageInput, setMessageInput] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<'crewai' | 'autogen' | 'openclaw' | 'langgraph'>('crewai');
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const currentConv = conversations.find((c) => c.id === currentConversationId);

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
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentConversationId) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageInput,
      timestamp: Date.now(),
      status: 'sent',
    };

    addMessage(currentConversationId, userMessage);
    setMessageInput('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-1`,
        role: 'assistant',
        content: 'I received your message and I&apos;m processing it with ' + selectedFramework + '...',
        timestamp: Date.now(),
        status: 'sent',
      };
      addMessage(currentConversationId, assistantMessage);
    }, 500);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);

      const audioChunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        // Simulate voice-to-text transcription
        setTranscribedText('This is a simulated transcription of your voice message...');
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('[v0] Microphone access denied:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="h-full px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Chat</h1>
          <button
            onClick={handleNewConversation}
            className="btn-lobe-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar - Conversations List */}
        <div className="w-64 border-r border-border bg-card/30 overflow-y-auto">
          <div className="p-4 space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setCurrentConversation(conv.id)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 group flex items-center justify-between ${
                  currentConversationId === conv.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary text-foreground'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{conv.title}</p>
                  <p className="text-xs opacity-70">{conv.messages.length} messages</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </button>
            ))}
            {conversations.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No conversations yet
              </p>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        {currentConv ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-foreground">{currentConv.title}</h2>
                <p className="text-xs text-muted-foreground capitalize">
                  {currentConv.framework}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentConv.messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <MessageIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No messages yet. Start typing!</p>
                  </div>
                </div>
              ) : (
                currentConv.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-sm rounded-lg px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary text-secondary-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm break-words">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-card p-4 md:p-6">
              {/* Transcription Display */}
              {transcribedText && (
                <div className="mb-3 p-3 bg-secondary rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Voice Transcription:</p>
                  <p className="text-sm text-foreground">{transcribedText}</p>
                </div>
              )}

              <div className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  value={messageInput || transcribedText}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    setTranscribedText('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !isRecording) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message or use voice..."
                  className="input-lobe flex-1"
                  disabled={isRecording}
                />

                {/* Voice Input Button */}
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`flex items-center justify-center w-12 h-12 rounded-lg font-medium transition-all duration-300 ${
                    isRecording
                      ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                      : 'btn-lobe-secondary hover:bg-secondary'
                  }`}
                  title={isRecording ? 'Stop recording' : 'Start voice input'}
                >
                  {isRecording ? (
                    <Square className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={isRecording}
                  className="btn-lobe-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No Chat Selected</h2>
              <p className="text-muted-foreground mb-6">
                Create a new chat or select an existing conversation
              </p>
              <button
                onClick={handleNewConversation}
                className="btn-lobe-primary flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
