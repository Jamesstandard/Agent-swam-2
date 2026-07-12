# Multi Meta Matrix (MMM) - AI Agent Orchestration Platform

A powerful, responsive web application for orchestrating AI agents across multiple frameworks. MMM provides an intuitive interface for managing conversations, swarms, skills, and agent memory with a clean, Lobe AI-inspired design system.

## Features

### Core Features
- **Multi-Framework Support**: Choose from CrewAI, AutoGen, OpenClaw, and LangGraph
- **Intelligent Chat Interface**: Real-time conversations with configurable AI agents
- **Kanban Swarms Board**: Organize multiple agents with visual workflow management
- **MCP Skills Marketplace**: Browse and integrate tools and skills dynamically
- **Memory System**: Knowledge base and learned memory management for agents
- **Inspect Panel**: DevTools-like debugging and monitoring interface

### Design
- Clean, friendly, Lobe AI-inspired design system
- Soft light background (#F8F9FA) with Microsoft Blue accents (#0078D4)
- Generous whitespace, large rounded corners, soft shadows
- Responsive mobile-first design
- Light/dark mode support

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with built-in features
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe development

### State Management & UI
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

### Backend & Data
- **Firebase**
  - Authentication
  - Firestore Database
  - Cloud Messaging

### Drag & Drop
- **@dnd-kit** - Headless drag-and-drop library for Kanban board

### Forms & Validation
- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with sidebar
│   ├── page.tsx             # Home dashboard
│   └── globals.css          # Global styles & Lobe AI theme
├── components/
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── main-layout.tsx      # Layout wrapper
│   ├── providers.tsx        # App providers
│   ├── views/
│   │   ├── chat-view.tsx    # Chat interface
│   │   ├── swarms-view.tsx  # Kanban board
│   │   ├── skills-view.tsx  # MCP marketplace
│   │   ├── memory-view.tsx  # Knowledge & memory
│   │   └── inspect-view.tsx # DevTools panel
│   └── modals/
│       ├── agent-builder.tsx    # Agent configuration
│       └── settings-panel.tsx   # Settings
├── lib/
│   ├── stores/
│   │   ├── app.ts          # App state
│   │   ├── chat.ts         # Chat state
│   │   └── swarms.ts       # Swarms state
│   ├── firebase.ts         # Firebase config
│   ├── icons.ts            # Icon exports
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

### Building for Production

```bash
pnpm build
pnpm start
```

## Firebase Setup

Create a `.env.local` file with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## State Management

MMM uses Zustand for efficient state management:

- **App Store**: Global UI state (sidebar, current view, theme)
- **Chat Store**: Conversations and messages
- **Swarms Store**: Agents, tasks, and workflow status

## Theming

The design system is defined in `app/globals.css` using CSS variables:

- **Primary**: #0078D4 (Microsoft Blue)
- **Secondary**: #E8F1FA (Light blue)
- **Accent**: #00BCF2 (Cyan)
- **Background**: #F8F9FA (Soft light)

Components use Tailwind's `@apply` for consistent styling:
- `.card-lobe` - Card component
- `.btn-lobe-primary` - Primary button
- `.btn-lobe-secondary` - Secondary button
- `.input-lobe` - Input field
- `.shadow-lobe-soft` - Soft shadow

## Authentication

Firebase Authentication is configured for email/password authentication. Extend `lib/firebase.ts` to add OAuth providers.

## API Integration

The app is designed to work with:
- OpenAI, Anthropic, and other AI providers
- MCP servers for tool integration
- LangGraph for supervisor patterns
- Custom backend APIs

## Performance

- Client-side state management with Zustand
- Server-side rendering with Next.js
- Optimized image loading
- CSS-in-JS with Tailwind for minimal CSS
- Responsive design optimizations

## Browser Support

- Chrome/Edge 111+
- Firefox 144+
- Safari 18.2+

## Deployment

Deploy to Vercel with a single click:

```bash
vercel deploy
```

Or build and deploy manually:

```bash
pnpm build
# Deploy the .next folder
```

## Contributing

Feel free to extend MMM with:
- Additional AI framework support
- More MCP tools and skills
- Custom agent templates
- Advanced analytics and monitoring

## License

MIT License - feel free to use and modify for your projects.

## Support

For issues, questions, or feature requests, please open an issue in the repository.

---

Built with Next.js, React, Tailwind CSS, and Firebase. Inspired by Lobe AI's design philosophy.
