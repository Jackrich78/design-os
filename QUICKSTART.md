# Design OS — Quick Start & Overview

## What Is Design OS?

Design OS is a product planning tool that sits between your idea and your code. Instead of jumping straight into development, you work through a structured design process with AI to:

- Define what you're building and why
- Map out your data structure
- Design your UI system and screens
- Export everything as a handoff package for implementation

Think of it as a "specification generator" that captures your design decisions before code is written—making implementation faster and more accurate.

## When Should You Use It?

- Building a new product or feature
- Want a clear specification before coding
- Planning with AI agents (they work better with specs)
- Need consistent design and data structure across a team
- Exporting designs to hand off to developers

## Quick Start (5 minutes)

### Prerequisites

- Docker and Docker Compose installed
- ~30 minutes for first build (npm dependencies)

### Start the App

```bash
docker-compose up
```

Open **http://localhost:3000** in your browser.

The app runs in a secure Docker container. All npm packages stay isolated, nothing pollutes your system.

### Stop

```bash
# Stop the container
docker-compose down

# Or clean up everything (including volumes)
docker-compose down -v
```

## The Design Process

Design OS guides you through 4 main phases:

### 1. Product Planning
Define your product's core identity, problems it solves, and key features. Break your product into 3-5 logical sections that can be designed independently.

**Output:** Product overview and roadmap document

### 2. Data Model
Define the main "nouns" in your system (User, Product, Order, etc.) and how they relate. This ensures consistent terminology across your entire product.

**Output:** Data model specification

### 3. Design System
Choose your visual identity: colors (from Tailwind palette) and typography (from Google Fonts). Design your app shell (navigation, layout, header/footer).

**Output:** Color and typography tokens, shell design

### 4. Sections (Repeat for Each Feature)
For each section from your roadmap:
- **Spec:** Write requirements and user flows
- **Sample Data:** Create realistic test data
- **Screen Designs:** Design each screen in the section
- **Screenshots:** Capture designs as reference

**Output:** Screen designs and component code for each section

### 5. Export
Generate a complete handoff package with all components, design tokens, specifications, and AI-friendly prompts for implementation.

**Output:** `product-plan/` directory with everything needed to build

## How to Use It

When you first load the app, follow the left navigation:

1. **Product** — Define your vision
2. **Data Model** — Model your entities
3. **Design** — Choose colors, fonts, design shell
4. **Sections** — Add and design feature areas
5. **Export** — Generate implementation package

Each page guides you step-by-step. The AI (Claude) is your thinking partner—ask questions, provide direction, refine as you go.

## For Developers / Contributing

### Setup

The project uses Docker for safe, isolated development. No need to install Node.js globally.

```bash
# Start dev server with hot reload
docker-compose up

# Run npm commands inside the container
docker-compose exec design-os npm install package-name
docker-compose exec design-os npm run build
docker-compose exec design-os npm run lint
```

### Project Structure

```
src/
├── components/          # React pages and UI components
├── lib/                # Router, data loaders, utilities
├── types/              # TypeScript interfaces
└── sections/           # Sample section designs

docs/                   # Project documentation
product/                # App-generated design output
product-plan/           # App-generated export packages
```

### Technology Stack

- **React 19** + TypeScript — UI framework and type safety
- **Vite 7** — Lightning-fast build tool
- **Tailwind CSS v4** — Utility-first CSS
- **shadcn/ui** — Accessible component library
- **React Router v7** — Client-side routing
- **Node 20 Alpine** (Docker) — Lightweight, secure runtime

### Development Workflow

1. Start: `docker-compose up`
2. Edit files in `src/`
3. Changes reload instantly (Vite HMR)
4. Build: `docker-compose exec design-os npm run build`

### Key npm Commands

```bash
# Development
docker-compose exec design-os npm run dev       # Start dev server

# Production
docker-compose exec design-os npm run build     # Compile & optimize
docker-compose exec design-os npm run preview   # Preview production build

# Quality
docker-compose exec design-os npm run lint      # Run linter
```

## Docker Details

### What's Included

- **Dockerfile** — Alpine-based Node 20 image (50MB, lightweight)
- **docker-compose.yml** — Orchestration and volume configuration
- **.dockerignore** — Excludes unnecessary files from build

### Volumes & Persistence

- **`node_modules`** — Named volume, persists between restarts (fast restart)
- **`./src`** — Mounted live for instant hot reload
- **Config files** — Mounted for live editing

### Benefits

✅ **Security** — All npm packages isolated in container
✅ **Speed** — Persistent volumes = instant restarts
✅ **Consistency** — Same environment every time
✅ **Easy Cleanup** — One command removes everything
✅ **Development** — Hot reload works perfectly

### Complete Cleanup

```bash
# Remove container and volumes
docker-compose down -v

# Verify no leftover volumes
docker volume ls | grep node_modules
```

## Contributing

Design OS is open source. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make changes in `src/`
4. Test with: `docker-compose up`
5. Lint with: `docker-compose exec design-os npm run lint`
6. Submit a pull request

## Resources

- **Full Documentation** → [buildermethods.com/design-os](https://buildermethods.com/design-os)
- **API Documentation** → See `docs/` folder
- **Changelog** → [CHANGELOG.md](CHANGELOG.md)
- **Issues & Support** → [GitHub Issues](https://github.com/buildermethods/design-os/issues)

## Troubleshooting

**Port 3000 already in use?**
```bash
# Find process using port 3000
lsof -i :3000

# Or use a different port in docker-compose.yml
# Change "3000:3000" to "3001:3000"
```

**Docker daemon not running?**
```bash
# On macOS, start Docker Desktop or use:
colima start
```

**Changes not appearing?**
```bash
# Rebuild image after package.json changes
docker-compose up --build
```

**Want to see what's in the container?**
```bash
docker-compose exec design-os sh
```

---

**Ready to design?** Run `docker-compose up` and start building your product's vision! 🚀
