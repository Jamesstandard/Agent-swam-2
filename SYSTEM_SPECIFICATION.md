# Multi Meta Matrix (MMM)
## Comprehensive System Specification

**Document status:** Baseline specification for the current repository  
**Version:** 1.0.0  
**Last reviewed:** 2026-08-11  
**Repository:** `Jamesstandard/Agent-swam-2`  
**Primary branch context:** `main`  

---

## 1. Executive Summary

Multi Meta Matrix (MMM) is a responsive web application for configuring, observing, and organizing AI-agent work across multiple orchestration frameworks. The current product is a client-rendered Next.js experience with a dashboard, conversation workspace, swarm Kanban board, MCP skills marketplace, memory workspace, artifacts browser, inspection panel, and settings drawer.

MMM is designed around five principles:

1. **Framework flexibility:** users can select CrewAI, AutoGen, OpenClaw, or LangGraph.
2. **Operational visibility:** conversations, swarms, artifacts, memory, and diagnostics are exposed as separate workspaces.
3. **Responsive interaction:** desktop navigation uses a collapsible sidebar; mobile navigation uses a fixed bottom bar.
4. **Progressive integration:** Firebase, MCP servers, messaging channels, and external services have configuration surfaces ready for implementation.
5. **Friendly productivity UI:** the visual system uses soft surfaces, rounded cards, blue/cyan accents, responsive spacing, and light/dark theme tokens.

This specification distinguishes **implemented behavior** from **target behavior described in existing product documents**. Items marked “current implementation” reflect the code in this repository; items marked “planned” or “integration-ready” require backend, persistence, or service work before production use.

---

## 2. Product Scope

### 2.1 In scope

- Home dashboard and workspace navigation.
- AI-agent conversation organization.
- Framework selection at application and conversation/swarm levels.
- Swarm and task organization using a Kanban-style interface.
- Skills/tool discovery and installation-state presentation.
- Knowledge-base and learned-memory presentation.
- Artifact browsing and preview.
- Logs, performance metrics, and application-state inspection surfaces.
- User-configurable appearance, behavior, performance, communication, MCP, NLP, and TTS settings.
- Firebase client initialization for authentication, Firestore, and messaging.
- Responsive UI for desktop, tablet, and mobile layouts.

### 2.2 Out of scope in the current baseline

- Production model-provider requests.
- Durable agent execution or workflow orchestration.
- Server-side persistence of Zustand state.
- Real MCP protocol negotiation and tool execution.
- Production voice transcription.
- Production Telegram, WhatsApp, SMS, email, GitHub, or Google Drive delivery.
- Complete user authentication flows and protected routes.
- Role-based access control, teams, billing, quotas, and audit retention.
- Production artifact storage and file upload processing.

---

## 3. Users and Roles

### 3.1 Primary user

An individual developer, operator, or technical product user who wants to create agent conversations, coordinate agent tasks, connect tools, and inspect system activity.

### 3.2 Future roles

The architecture should allow the following roles to be added without changing the core workspace model:

- **Member:** creates and runs conversations and swarms.
- **Operator:** monitors executions, errors, and integrations.
- **Administrator:** manages users, providers, policies, and shared MCP servers.
- **Viewer:** can inspect shared workspaces without mutation permissions.

---

## 4. Functional Requirements

### FR-1: Application shell

- The application MUST render a root shell containing navigation and the active workspace.
- The shell MUST support desktop and mobile navigation.
- The shell MUST expose settings from the desktop sidebar and mobile bottom navigation.
- The current workspace MUST be controlled by the global application state.

### FR-2: Workspace navigation

The application MUST provide these workspace identifiers:

| ID | Label | Purpose |
|---|---|---|
| `home` | Home | Dashboard, counts, quick actions, supported frameworks |
| `chat` | Chat | Conversation list and message workspace |
| `swarms` | Swarms | Agent swarm and task workflow management |
| `skills` | Skills | MCP/tool marketplace and installation state |
| `artifacts` | Artifacts | Generated file and document browsing |
| `memory` | Memory | Knowledge-base and learned-memory management |
| `inspect` | Inspect | Logs, performance, and state diagnostics |

### FR-3: Home dashboard

The Home workspace MUST:

- Display the MMM product identity and orchestration tagline.
- Display counts for conversations, swarms, skills, and memory.
- Provide a prominent “Start New Objective” action that opens Chat.
- Provide quick actions for starting a conversation and creating a swarm.
- Explain supported capabilities.
- List supported frameworks and their intended use.

Current implementation uses live counts for conversations and swarms, while skills and memory counts are currently static presentation values.

### FR-4: Chat workspace

The Chat workspace MUST:

- Create a new conversation.
- Select an existing conversation.
- Delete a conversation.
- Display message history with role, content, timestamp, and status.
- Associate each conversation with an orchestration framework.
- Send a user message to the selected conversation.
- Display an assistant response or execution status.
- Support microphone capture when browser permissions are granted.
- Stop microphone capture and present transcription output.

Current implementation simulates assistant responses and transcription. Production behavior MUST replace simulation with a server-side model/execution pipeline.

#### Chat validation and states

- Empty or whitespace-only messages MUST NOT be sent.
- Sending without an active conversation MUST be disabled or safely ignored.
- Microphone access denial MUST produce an actionable user-facing notification.
- Sending, sent, and error message states MUST be represented.
- Enter-to-submit behavior MUST account for IME composition in production.

### FR-5: Swarms workspace

The Swarms workspace MUST:

- Create, select, and delete swarms.
- Store swarm name, description, framework, agents, tasks, status, and timestamps.
- Display tasks in four workflow columns: `todo`, `in-progress`, `review`, and `completed`.
- Create tasks in a selected column.
- Track task priority, description, assignment, due date, and timestamps.
- Update task status as work progresses.
- Support drag-and-drop task movement in the production implementation.

The current UI presents a Kanban layout and status update affordance but does not yet implement full drag-and-drop behavior despite `@dnd-kit` dependencies being installed.

### FR-6: Skills workspace

The Skills workspace MUST:

- Search skills by name and category.
- Show total, installed, and available counts.
- Display skill category and description.
- Show installed versus available state.
- Install or uninstall a skill.
- In production, expose documentation, compatibility, version, ratings, and tool metadata.

The current screen uses an in-memory sample catalog and visual install buttons; installation does not yet mutate durable state.

### FR-7: Memory workspace

The Memory workspace MUST:

- Provide Knowledge Base and Learned Memory tabs.
- Search entries by title and content.
- Display content, timestamps, tags, and confidence where applicable.
- Add, edit, and delete entries.
- Support structured knowledge organization.
- Support future document ingestion and export.

The current screen renders sample entries and provides non-functional edit/delete controls. Learned-memory confidence is represented as a percentage.

### FR-8: Artifacts workspace

The Artifacts workspace MUST:

- Search artifacts by filename.
- Filter by all, code, documents, and reports.
- Display artifact name, type, size, and timestamps.
- Preview artifact content.
- Support copy, download, share, and delete actions.
- Support code, documents, reports, files, and tools.

The current screen renders sample Python, Markdown, and report artifacts. Actions are presentational and require durable storage and file handling for production.

### FR-9: Inspect workspace

The Inspect workspace MUST:

- Display structured application and agent logs.
- Categorize logs by level.
- Display performance metrics such as response time, memory, calls per minute, and error rate.
- Display a serialized application-state snapshot.
- In production, expose request/response metadata, tool calls, timing breakdowns, agent state, and execution traces.

The current logs, metrics, and state are static sample data.

### FR-10: Settings

The settings drawer MUST support:

- Appearance: light, dark, and auto themes; compact mode; animations.
- Default orchestration framework.
- Sound, notifications, voice input, and auto-save toggles.
- Offline mode and battery optimization toggles.
- Push notifications, Telegram, WhatsApp, and SMS configuration surfaces.
- MCP server enablement and server list management.
- NLP and text-to-speech toggles and voice selection.
- About/version information.

Settings MUST be validated before persistence. Secrets such as bot tokens and API keys MUST never be stored in unencrypted client state or exposed in logs.

---

## 5. Orchestration Framework Specification

MMM supports four framework identifiers:

| Framework | Default | Intended pattern | Intended use |
|---|---:|---|---|
| LangGraph | Yes | Supervisor plus MCP workers | Complex workflows and hierarchical execution |
| CrewAI | No | Role-based agent teams | Goal-oriented collaboration |
| AutoGen | No | Multi-agent conversation | Dynamic interactions and human-in-the-loop work |
| OpenClaw | No | Flexible composition | Experimental and modular agent flows |

A production framework adapter SHOULD expose a common contract:

```ts
interface AgentRuntimeAdapter {
  framework: AgentFramework
  createExecution(input: ExecutionInput): Promise<ExecutionHandle>
  streamExecution(handle: ExecutionHandle): AsyncIterable<ExecutionEvent>
  cancelExecution(handle: ExecutionHandle): Promise<void>
  inspectExecution(handle: ExecutionHandle): Promise<ExecutionSnapshot>
}
```

The UI MUST remain framework-agnostic. Framework-specific options belong in adapter configuration, not in shared conversation or swarm components.

---

## 6. Domain Model

### 6.1 Application state

`AppState` currently contains:

- Navigation: sidebar state, settings state, current view.
- Appearance: theme, compact mode, animations.
- Framework: default framework.
- Features: sound, notifications, voice input, auto-save.
- Performance: offline mode, battery optimization.
- Communication: push, Telegram, WhatsApp, SMS.
- Integrations: Google Drive, GitHub, email.
- MCP: enablement and server list.
- NLP/TTS: enablement and selected voice.

### 6.2 Conversation

```ts
interface ChatConversation {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
  framework?: AgentFramework
}
```

### 6.3 Message

```ts
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  status?: 'sending' | 'sent' | 'error'
}
```

Production extensions SHOULD add execution ID, model, token usage, tool calls, attachments, citations, and error metadata.

### 6.4 Swarm

```ts
interface Swarm {
  id: string
  name: string
  description: string
  framework: AgentFramework
  agents: SwarmAgent[]
  tasks: SwarmTask[]
  status: 'planning' | 'active' | 'completed'
  createdAt: number
  updatedAt: number
}
```

### 6.5 Task

```ts
interface SwarmTask {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'completed'
  assignedAgent?: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: number
  createdAt: number
  updatedAt: number
}
```

### 6.6 MCP server

```ts
interface McpServer {
  id: string
  name: string
  url: string
  connected: boolean
}
```

Production extensions SHOULD add transport, authentication reference, capabilities, health status, last checked time, tool count, and tenant ownership.

---

## 7. State Management and Data Flow

### Current architecture

- Zustand stores are created with `create` and are consumed by client components.
- `useAppStore` owns global UI and configuration state.
- `useChatStore` owns conversations and messages.
- `useSwarmsStore` owns swarms and tasks.
- Views render from store snapshots and dispatch store actions.
- The root layout wraps the app with `Providers`, the sidebar, and the active page.

### Required production architecture

1. Server actions or route handlers validate mutations with Zod.
2. Durable storage becomes the source of truth.
3. Zustand holds UI state and optimistic caches, not the only copy of user data.
4. Server responses reconcile optimistic updates.
5. All user-owned queries are scoped to the authenticated user or workspace.
6. Realtime updates use an explicit subscription strategy rather than ad hoc timers.

The current repository contains Firebase initialization, but does not yet demonstrate authenticated queries, Firestore collections, or durable synchronization.

---

## 8. Persistence Strategy

### 8.1 Current state

Most view data is local in component memory or Zustand memory. Reloading the page can discard conversations, swarms, and configuration unless persistence is added. Existing product documentation describes local persistence, but the current store files do not implement a persistence middleware.

### 8.2 Target state

The production system SHOULD persist:

- User profile and preferences.
- Conversations, messages, and execution metadata.
- Swarms, agents, tasks, and task history.
- Installed skills and MCP server registrations.
- Knowledge and learned-memory entries.
- Artifact metadata and references to stored files.
- Logs and execution traces according to a retention policy.

### 8.3 Recommended collection/table boundaries

- `users`
- `user_preferences`
- `workspaces`
- `workspace_members`
- `conversations`
- `messages`
- `swarms`
- `swarm_agents`
- `swarm_tasks`
- `skills`
- `installed_skills`
- `mcp_servers`
- `memory_entries`
- `artifacts`
- `executions`
- `execution_events`
- `notifications`

The repository currently uses Firebase client initialization and should use Firebase Authentication and Firestore security rules if Firebase remains the selected backend.

---

## 9. Integrations

### Firebase

Firebase is initialized in `lib/firebase.ts` for:

- Authentication via Firebase Auth.
- Firestore via `getFirestore`.
- Messaging via capability detection and `getMessaging`.

Environment variables are expected as `NEXT_PUBLIC_FIREBASE_*`. Demo fallback values exist in the current implementation and MUST be removed or blocked in production so configuration errors fail safely.

### MCP

MCP integration is intended to support:

- Multiple configured servers.
- Dynamic tool discovery.
- Connection health checks.
- Tool metadata and capability inspection.
- Tool invocation with explicit user consent and auditability.

MCP URLs MUST be validated. Server credentials MUST be stored server-side or in a managed secret system, never in browser-visible state.

### Communication channels

Planned channels include push notifications, Telegram, WhatsApp, SMS, and email. Each channel SHOULD have:

- Credential or connection status.
- Delivery status and retry policy.
- Rate limits.
- User opt-in and disable controls.
- Audit events.
- Error reporting without secret leakage.

### External productivity integrations

Google Drive and GitHub are integration-ready surfaces. Production support should use OAuth or managed short-lived credentials, least-privilege scopes, explicit account connection, and revocation handling.

---

## 10. UI and Design System

### Visual direction

MMM uses a soft, friendly Lobe-inspired interface:

- Primary brand color: Microsoft blue `#0078D4`.
- Cyan accent: `#00BCF2`.
- Light background: `#F8F9FA`.
- White cards and neutral borders.
- Dark theme based on `#1A1A1A` and `#2D2D2D`.
- Rounded corners, soft shadows, and generous whitespace.

### Design tokens

Tokens are defined in `app/globals.css` using Tailwind v4 theme variables and CSS custom properties. Components SHOULD use semantic tokens such as `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `bg-primary`, and `border-border` rather than hard-coded color utilities.

### Reusable classes

- `.card-lobe`: card surface, rounded border, padding, and soft shadow.
- `.btn-lobe-primary`: primary action button.
- `.btn-lobe-secondary`: secondary action button.
- `.input-lobe`: form input styling.
- `.shadow-lobe-soft` and `.shadow-lobe-md`: elevation utilities.

### Layout rules

- Use flexbox for primary one-dimensional layouts.
- Use CSS grid for dashboard, metric, and Kanban arrangements.
- Design mobile-first.
- Desktop sidebar is 16rem expanded and 5rem collapsed.
- Mobile content reserves space for the fixed bottom navigation.
- Interactive controls MUST have labels, focus states, and sufficient contrast.

---

## 11. Accessibility Requirements

The application MUST target WCAG 2.1 AA:

- All buttons and icon-only controls MUST have accessible names.
- Keyboard navigation MUST work across navigation, dialogs, tabs, forms, and Kanban operations.
- Focus indicators MUST remain visible.
- Color MUST not be the only indicator of status.
- Form fields MUST have labels or meaningful placeholders with associated labels.
- Dialogs and drawers MUST trap focus and close predictably.
- Live updates such as assistant responses and notifications SHOULD use appropriate live-region behavior.
- Reduced-motion preferences SHOULD disable nonessential animation.
- Touch targets SHOULD be at least 44 by 44 CSS pixels on mobile.

---

## 12. Security and Privacy

### Requirements

- Authentication MUST protect user-owned data before production launch.
- Authorization MUST be enforced server-side, not only through hidden UI.
- Firestore rules or equivalent database policies MUST enforce workspace ownership and membership.
- API keys, bot tokens, OAuth tokens, and service credentials MUST not be persisted in client-side Zustand state.
- User input MUST be validated and sanitized at all server boundaries.
- MCP tool calls MUST be auditable and permission-aware.
- Uploaded files MUST be type-checked, size-limited, scanned where applicable, and stored outside the application bundle.
- Logs MUST redact credentials, authorization headers, private prompts, and sensitive personal data.
- Deletion flows MUST define whether data is soft-deleted, hard-deleted, or retained for compliance.
- Production responses SHOULD include baseline security headers: `X-Content-Type-Options`, `Referrer-Policy`, and HSTS over HTTPS.

### Privacy controls

Users SHOULD be able to:

- Export their data.
- Delete conversations, memory, artifacts, and account data.
- Disable telemetry and nonessential notifications.
- Review connected services and revoke access.
- Configure execution and log retention.

---

## 13. Performance and Resilience

### Performance goals

- Fast first render for the application shell.
- Lazy-load heavy workspaces and charts where appropriate.
- Avoid unnecessary rerenders by selecting narrow Zustand slices.
- Virtualize long conversation, log, and artifact lists.
- Compress and progressively load artifacts and attachments.
- Keep animations purposeful and disable them in battery-saving or reduced-motion modes.

### Resilience requirements

- Network failures MUST produce clear, recoverable errors.
- Agent executions SHOULD retry transient failures with exponential backoff.
- Cancellation MUST be supported for long-running work.
- Offline mode SHOULD queue safe local mutations and reconcile after reconnect.
- Failed synchronization MUST preserve user input and expose retry controls.
- Realtime connections MUST reconnect with bounded backoff.

---

## 14. Error Handling and Observability

### Error categories

- Validation errors.
- Authentication and authorization errors.
- Integration connection errors.
- Model/provider errors.
- MCP tool errors.
- Storage and synchronization errors.
- Browser capability errors, including microphone and notifications.
- Unexpected application errors.

### Required behavior

- Show concise user-facing messages.
- Preserve technical details in structured logs.
- Assign correlation or execution IDs to server operations.
- Record timestamps, workspace, framework, operation, duration, and outcome.
- Avoid exposing provider credentials or raw sensitive payloads.
- Provide a retry or recovery path when possible.

The Inspect workspace is the intended UI surface for this data, but its current implementation uses sample values.

---

## 15. Browser and Runtime Requirements

### Current stack

- Next.js `16.2.6` with App Router.
- React 19.
- TypeScript 5.7.
- Tailwind CSS 4.
- Zustand 5.
- Firebase 12.
- Framer Motion 12.
- `@dnd-kit` packages for future drag-and-drop.
- Recharts for future visualization.
- Zod for validation.

### Supported capabilities

The browser MUST support standard modern APIs for:

- Media capture when voice input is enabled.
- Notifications when push notifications are enabled.
- IndexedDB or equivalent storage if offline mode is implemented.
- WebSocket, SSE, or fetch streaming for live execution events.

Feature detection MUST be used before invoking browser-only capabilities.

---

## 16. Routing and Component Architecture

### Current route

The product is currently a single primary route rendered from `app/page.tsx`. Workspace navigation changes global state rather than changing the URL.

### Target routing recommendation

For shareability, refresh safety, browser history, and deep links, production should consider route segments such as:

- `/`
- `/chat`
- `/chat/[conversationId]`
- `/swarms`
- `/swarms/[swarmId]`
- `/skills`
- `/memory`
- `/artifacts`
- `/inspect`
- `/settings`

URL state and server-rendered data should be introduced incrementally without breaking the current single-page experience.

### Component boundaries

- `app/layout.tsx`: metadata, viewport, providers, shell, and global navigation placement.
- `app/page.tsx`: active workspace selection and Home dashboard composition.
- `components/sidebar.tsx`: responsive navigation and settings entry point.
- `components/providers.tsx`: global UI providers, settings drawer, and toast provider.
- `components/views/*`: feature workspaces.
- `components/modals/*`: configuration and modal surfaces.
- `lib/stores/*`: client-side state domains.
- `lib/firebase.ts`: Firebase client initialization.
- `lib/icons.ts`: icon abstraction.
- `app/globals.css`: design tokens and reusable visual utilities.

---

## 17. API and Service Contracts

The current application has no production route handlers. The target service layer SHOULD expose contracts similar to:

### Conversations

- `GET /api/conversations`
- `POST /api/conversations`
- `GET /api/conversations/:id`
- `DELETE /api/conversations/:id`
- `POST /api/conversations/:id/messages`
- `POST /api/conversations/:id/cancel`

### Swarms

- `GET /api/swarms`
- `POST /api/swarms`
- `PATCH /api/swarms/:id`
- `DELETE /api/swarms/:id`
- `POST /api/swarms/:id/tasks`
- `PATCH /api/swarms/:id/tasks/:taskId`
- `DELETE /api/swarms/:id/tasks/:taskId`

### Skills and MCP

- `GET /api/skills`
- `POST /api/skills/:id/install`
- `DELETE /api/skills/:id/install`
- `GET /api/mcp/servers`
- `POST /api/mcp/servers`
- `POST /api/mcp/servers/:id/test`
- `DELETE /api/mcp/servers/:id`

### Memory and artifacts

- `GET /api/memory`
- `POST /api/memory`
- `PATCH /api/memory/:id`
- `DELETE /api/memory/:id`
- `GET /api/artifacts`
- `POST /api/artifacts`
- `GET /api/artifacts/:id/download`
- `DELETE /api/artifacts/:id`

All mutation inputs MUST be validated with schemas and all response payloads MUST be typed.

---

## 18. Testing Strategy

### Unit tests

- Store reducers/actions.
- Schema validation.
- Framework adapter normalization.
- Search and filtering logic.
- Artifact size/type helpers.
- Permission and ownership checks.

### Component tests

- Navigation changes active workspace.
- Conversation creation, selection, message send, and delete.
- Swarm creation and task state transitions.
- Skills filtering and installation state.
- Memory tabs and search.
- Artifact selection and filtering.
- Settings toggles and drawer close behavior.

### Integration tests

- Authenticated Firestore reads/writes.
- MCP server connection checks.
- Model streaming and cancellation.
- File upload and download.
- Notification delivery.

### End-to-end tests

Primary flows SHOULD cover:

1. Open dashboard and start an objective.
2. Create a conversation, send a message, and receive a response.
3. Create a swarm and move a task through workflow states.
4. Connect an MCP server and discover tools.
5. Add and search a memory entry.
6. Generate, preview, download, and delete an artifact.
7. Change settings and verify persistence after reload.
8. Use the product at mobile and desktop breakpoints.

---

## 19. Deployment and Operations

### Build and runtime

- Development command: `pnpm dev`.
- Production build: `pnpm build`.
- Production start: `pnpm start`.
- Lint command: `pnpm lint`.
- Deployment target: Vercel-compatible Next.js runtime.

The current Next.js configuration ignores TypeScript build errors. This MUST be revisited before production release; CI should fail on type errors.

### Environment configuration

Required Firebase variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Additional provider variables MUST be documented per integration and loaded through the deployment platform’s secret management system.

### Operational controls

- Error monitoring and alerting.
- Provider usage and quota monitoring.
- Execution timeout and concurrency limits.
- Database/index monitoring.
- Artifact storage lifecycle policies.
- Backup and recovery procedures.
- Security incident response and credential rotation.

---

## 20. Current Implementation Inventory

### Implemented in the repository

- Next.js App Router shell.
- Responsive desktop sidebar and mobile bottom navigation.
- Home dashboard with live conversation/swarm counts.
- Chat workspace with in-memory conversation and message operations.
- Swarms workspace with in-memory swarm/task operations.
- Skills search and static catalog presentation.
- Memory tabs and static entry presentation.
- Artifacts search, filtering, selection, and preview presentation.
- Inspect tabs for logs, performance, and state.
- Settings drawer with broad configuration surface.
- Zustand stores for app, chat, swarms, and integrations.
- Firebase app/Auth/Firestore/Messaging initialization.
- Tailwind v4 theme tokens and reusable MMM/Lobe utility classes.
- Sonner toast provider and Vercel Analytics in production.

### Partially implemented or simulated

- Assistant response generation.
- Voice transcription.
- Skill installation.
- Artifact copy/download/share/delete.
- Memory add/edit/delete.
- MCP connection and tool discovery.
- Theme application beyond the root light class.
- Persistence and synchronization.
- Authentication UI and protected data access.
- Integration credentials and delivery channels.
- Real-time execution and inspection telemetry.

### Recommended next priorities

1. Establish authentication and durable user/workspace persistence.
2. Replace simulated chat responses with a server-side execution API.
3. Add schema validation and error boundaries.
4. Implement real MCP connection lifecycle and permission checks.
5. Implement persistent swarms/tasks and accessible drag-and-drop.
6. Add artifact storage and secure download routes.
7. Add URL-based routing and reload-safe workspace state.
8. Add automated tests and remove build-time type-error suppression.

---

## 21. Acceptance Criteria

The system is ready for a production beta when:

- Users can authenticate and only access authorized workspaces and records.
- Conversations, swarms, tasks, memory, artifacts, and settings survive reloads.
- At least one framework executes a real agent request end-to-end.
- Streaming responses, cancellation, retry, and failure states work reliably.
- MCP servers can be connected, inspected, and safely invoked.
- Artifact uploads/downloads are secure and tested.
- Mobile and desktop navigation are keyboard and screen-reader accessible.
- Logs and metrics represent real operations rather than static sample data.
- Secrets are managed outside client state.
- CI passes lint, type checking, unit tests, integration tests, and production build.
- Security rules, retention, export, and deletion behavior are documented and verified.

---

## 22. Glossary

- **Agent:** An AI-driven worker configured to perform a task.
- **Artifact:** A generated or uploaded file, report, document, or code output.
- **Framework:** The orchestration runtime used to coordinate agents.
- **MCP:** Model Context Protocol, used to expose tools and resources to agents.
- **Memory:** Stored knowledge or learned patterns available to agents.
- **Swarm:** A coordinated collection of agents and tasks.
- **Task:** A unit of work tracked within a swarm.
- **Workspace:** A user-facing MMM area such as Chat, Swarms, or Memory.
- **Execution:** A single run of an agent, conversation request, or swarm task.

---

## 23. Nexus Swarm Enhancement and Configuration Contract

### 23.1 Product model
Nexus Swarm is an additive mission-control layer over MMM. Users describe a mission in natural language; the client synthesizes a preview of a dynamic swarm, including role archetypes, tools, trust requirements, cost, constraints, and handoff points. The current implementation is a deterministic local prototype: it does not call an LLM, execute tools, submit forms, deploy services, move funds, or access credentials.

### 23.2 Configuration taxonomy
Settings are organized into existing application preferences plus Nexus controls: trust tier (`observer`, `operator`, `executor`), Digital Clone mode (`advisory`, `autonomous`), approval policy, irreversible-action confirmation, maximum concurrent agents, compute credits per mission, daily spend cap, mission timeout, retry limit, heartbeat interval, topology preference, agent autonomy, confidence handoff threshold, tool/network permission posture, browser recording, audit retention, ephemeral-memory retention, clone context scope, sensitive-action notifications, and reduced-data telemetry.

### 23.3 Precedence and safe defaults
Configuration precedence is global defaults → mission preview overrides → explicit user approval. Safe defaults require approval, keep the Clone advisory, deny network/tool access by default, cap concurrency at six agents, limit mission credits, and retain reduced-data telemetry. Numeric settings are clamped to bounded ranges in the UI; production services must repeat validation server-side before execution.

### 23.4 Trust and clone safeguards
Trust tiers describe intended capability gates but do not grant real permissions in this prototype. Advisory mode pauses representative actions for review. Autonomous mode is visibly labeled prototype-only and remains unable to execute external actions. Secrets remain owned by future integrations and must never be entered, displayed, or persisted in this client state.

### 23.5 Acceptance criteria
Existing workspaces, navigation, settings, chat, Kanban swarms, memory, inspect, artifacts, and framework controls remain available. Nexus is usable at 360px, supports keyboard focus and reduced motion, provides visible guardrails for dangerous settings, and never implies that a preview has been deployed or submitted externally.

## 24. Obsidian-Inspired Canvas Panel

The Canvas workspace is an additive visual node board for mapping mission context, agent outputs, artifacts, and handoffs. It provides a non-linear grid with pan/zoom presentation, draggable text/agent/file/image/embed objects, directional SVG links, visual bounding groups, a floating creation toolbar, and a selected-node quick menu.

This first implementation is client-side prototype state: nodes and links are seeded in memory and are not persisted to a database or synced across devices. Website embeds, file ingestion, image uploads, and true infinite-canvas persistence remain integration work; the current controls create safe local reference nodes without fetching external content or executing files. Existing MMM and Nexus workspaces remain unchanged and reachable through navigation.

## 25. Change Control

Changes to this specification SHOULD include:

- Affected requirements and data models.
- Compatibility impact on existing stores and components.
- Migration or rollout steps.
- Security and privacy review for new integrations.
- Test coverage updates.
- A clear distinction between implemented behavior and planned behavior.

This document is the system baseline and should be updated when the architecture, persistence model, integration strategy, or user-facing workspaces materially change.
