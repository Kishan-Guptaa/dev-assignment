# AI Dark Pattern Detector — Production Ready SaaS Platform

An AI-powered SaaS application that analyzes website interfaces and application screenshots to detect manipulative, coercive, or deceptive UI/UX designs (Forced Continuity, Hidden Costs, Confirmshaming, Misleading CTAs) and alerts users.

---

## 🎨 Visual System & Aesthetic
The web application is designed with a premium **Scribble UI** (hand-drawn/Excalidraw-inspired) aesthetic mixed with sleek modern dark SaaS styling:
- **Background**: `#0B1020` (Dark theme)
- **Accents**: Violet `#8B5CF6`, Cyan `#22D3EE`, Orange `#F97316`
- **Typography**: Space Grotesk (Headings), Inter (Body)
- **Features**: Hand-drawn borders, tilt cards, animated SVG flow indicators, and sketchy testimonials.

---

## 🏗 Architecture Structure

```
adpd-workspace/
├── backend/                  # Express.js Server (TypeScript)
│   ├── prisma/               # Schema configuration & Database Seeds
│   └── src/
│       ├── controllers/      # API Controllers (Auth, Scans, Reports, etc.)
│       ├── middleware/       # Rate limiting, CSRF, JWT verify
│       ├── routes/           # REST endpoints
│       └── services/         # OpenAI GPT connection engine
├── extension/                # Chrome Manifest V3 Browser Extension
├── src/                      # Next.js 16 Client Frontend
│   └── app/                  # Pages, User Dashboard, & Admin panel
└── docker-compose.yml        # Multi-container local orchestration
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or later)
- Docker Desktop (Optional, for PostgreSQL & Redis)

### 2. Configure Environment Variables
Copy `.env.example` to create `.env` in both root and backend folders:
```bash
cp .env.example .env
cp .env.example backend/.env
```

### 3. Run with Docker Compose
To spin up the database (PostgreSQL), cache (Redis), API, and client instantly:
```bash
docker-compose up --build
```

### 4. Direct Local Setup

#### A. Database Setup (Prisma)
Navigate to backend and execute:
```bash
cd backend
npm install
npx prisma db push
npx prisma db seed
```

#### B. Launch Backend Server
Run development API (port 5000):
```bash
npm run dev
```

#### C. Launch Frontend Client
From root folder, start the Next.js server (port 3000):
```bash
npm install
npm run dev
```

---

## 🔌 API Endpoints Reference

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/auth/register` | POST | Registers a new consumer profile |
| `/api/auth/login` | POST | Authenticates user & returns token JWT |
| `/api/scans/url` | POST | Crawls URL & parses layouts with OpenAI |
| `/api/upload` | POST | Uploads screenshot to Cloudinary |
| `/api/reports` | GET | Fetches historical reports list |
| `/api/reports/:id/pdf` | GET | Downloads PDF document of audit |
| `/api/admin/stats` | GET | Admin analytics tracking |

---

## 🔌 Load Chrome Extension Locally
1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle **Developer mode** in the top-right corner.
3. Click **Load unpacked** in the top-left and select the `extension/` folder.
