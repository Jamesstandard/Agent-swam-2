# Multi Meta Matrix (MMM) - Quick Start Guide

Welcome to MMM! This guide will help you get up and running in minutes.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

1. **Install dependencies**
   ```bash
   cd /vercel/share/v0-project
   pnpm install
   ```

2. **Run development server**
   ```bash
   pnpm dev
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Navigation

The app has 6 main views accessible via the left sidebar:

### 🏠 Home
- Dashboard overview with statistics
- Quick links to start conversations and swarms
- Feature highlights
- Supported frameworks

### 💬 Chat
- Create and manage conversations
- Select AI framework
- Real-time messaging interface
- Message history

### 🎯 Swarms
- Kanban board for agent orchestration
- 4 columns: To-Do, In Progress, Review, Completed
- Drag-and-drop task management
- Agent assignments

### 🔧 Skills
- MCP Skills marketplace
- Search and filter skills
- Install/uninstall tools
- 6 demo skills included

### 🧠 Memory
- Knowledge base management
- Learned memory tracking
- Confidence scores
- Add/edit/delete entries

### 🔍 Inspect
- Real-time event logging
- Performance metrics
- State inspection
- DevTools-like debugging

## 🎨 Features

### 🎭 Theme Switching
- Click settings to toggle between Light/Dark/Auto
- Automatic detection of system preference
- Persistent across sessions

### ⌨️ Keyboard Shortcuts
- **Enter**: Send message in chat
- **Ctrl+K**: Navigate between views (when implemented)
- **Escape**: Close modals and dialogs

### 📊 Dashboard Stats
- **Conversations**: Number of active chats
- **Swarms**: Number of agent orchestrations
- **Skills**: Available tools and integrations
- **Memory**: Knowledge base entries

## 🛠️ Common Tasks

### Create a New Chat
1. Click **Chat** in sidebar
2. Click **+ New Chat** button
3. Select AI framework
4. Start typing your message
5. Press **Enter** to send

### Create a Swarm
1. Click **Swarms** in sidebar
2. Click **+ New Swarm** button
3. Configure agents
4. Add tasks to Kanban board

### Install a Skill
1. Click **Skills** in sidebar
2. Find a skill (or search)
3. Click **Install** button
4. Use in your conversations

### View Logs & Performance
1. Click **Inspect** in sidebar
2. Switch between tabs:
   - **Logs**: Event tracking
   - **Performance**: Web Vitals
   - **State**: App state JSON

## 📁 Project Structure

```
├── components/       # React components
│   ├── views/       # Main page views
│   ├── modals/      # Dialog windows
│   ├── sidebar.tsx  # Navigation
│   └── ...
├── lib/
│   ├── stores/      # Zustand state
│   ├── firebase.ts  # Firebase config
│   └── utils.ts     # Helper functions
├── app/
│   ├── page.tsx     # Home page
│   └── globals.css  # Theme & styles
└── public/          # Static assets
```

## 🔌 Next Steps: Firebase Integration

MMM is pre-configured for Firebase. To connect:

1. **Create Firebase project**
   - Go to firebase.google.com
   - Create new project
   - Enable Authentication & Firestore

2. **Update `.env.local`**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Restart dev server**
   ```bash
   pnpm dev
   ```

## 🤖 Adding AI Framework Support

### For OpenAI
```bash
pnpm add openai
```

### For Anthropic
```bash
pnpm add @anthropic-ai/sdk
```

### For CrewAI (Python backend)
```bash
# Your Python backend service
pip install crewai
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)
```bash
vercel deploy
```

### Build for Production
```bash
pnpm build
pnpm start
```

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm dev -- -p 3001
```

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

### Dependencies outdated
```bash
# Check for updates
pnpm outdated

# Update all
pnpm up
```

## 📚 Documentation

- **README.md**: Full project documentation
- **IMPLEMENTATION.md**: Technical implementation details
- **Next.js Docs**: https://nextjs.org
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com

## 💡 Tips & Tricks

### Performance
- Use React DevTools to inspect component renders
- Check Performance tab in Inspect view
- Monitor Web Vitals with `agent-browser vitals`

### Development
- Hot reload works automatically
- Edit files and see changes instantly
- No need to restart dev server

### State Management
- Zustand stores are in `lib/stores/`
- Use hooks to access state in components
- Automatic localStorage persistence available

## 🤝 Contributing

Feel free to extend MMM with:
- New AI frameworks
- Additional skills/tools
- Custom agent templates
- Enhanced visualizations
- Real-time collaboration

## ❓ FAQ

**Q: Can I use this with OpenAI?**
A: Yes! Add OpenAI SDK and connect API endpoints.

**Q: Is this production-ready?**
A: Yes! The UI is fully functional. Connect Firebase and AI frameworks for full features.

**Q: Can I deploy to my own server?**
A: Yes! Build it and deploy the `.next` folder to any Node.js host.

**Q: How do I add authentication?**
A: Firebase Auth is pre-configured. Enable it in Firebase console and uncomment auth logic.

## 📞 Support

- Check documentation files
- Review example code in components
- Inspect browser console for errors
- Use Inspect panel for debugging

---

**Happy orchestrating! 🚀**
