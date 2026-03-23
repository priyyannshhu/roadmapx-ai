# 🚀 RoadmapX

![RoadmapX Banner](public/cca.jpg)

> **AI-powered career planning platform** that helps professionals create and execute personalized 12-month career development roadmaps with intelligent guidance and progress tracking.

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

RoadmapX is a full-stack web application designed to help professionals navigate their career transitions. Users complete an onboarding process, receive an AI-generated 12-month plan tailored to their goals, and track progress through monthly themes and actionable tasks. The platform features an AI assistant named "Priyanshu" who provides contextual guidance based on the user's current progress and selected month.

### Key Highlights

- ✨ **AI-Powered Planning**: Uses Google Gemini AI to generate personalized career roadmaps
- 🔐 **Secure Authentication**: Clerk-based user authentication with keyless development mode
- 💾 **Persistent Storage**: MongoDB Atlas integration for saving user journeys
- 📊 **Progress Tracking**: Visual progress indicators for tasks, months, and overall journey
- 💬 **AI Assistant**: Contextual chat support with Priyanshu, your career assistant
- 🎨 **Modern UI**: Clean, responsive design built with Next.js and Tailwind CSS

---

## ✨ Features

### 🚀 Onboarding & Plan Generation

- **User Profile Collection**
  - Current role and experience level
  - Desired role/target position
  - Weekly time availability
  - Personal constraints and challenges

- **AI Plan Generation**
  - 12-month structured roadmap
  - Monthly themes with clear focus areas
  - 4 tasks per month (learning, practice, networking, reflection)
  - Personalized based on user profile and constraints

### 📈 Progress Tracking

- **Task Status Management**
  - Three-state lifecycle: `not_started` → `in_progress` → `complete`
  - Weighted progress calculation (in-progress = 50%, complete = 100%)
  - Visual progress bars for each month

- **Monthly Overview**
  - Month selection and navigation
  - Theme summaries and descriptions
  - Task categorization (learning, practice, networking, reflection)
  - "Start this month" action for quick initiation

- **Overall Progress**
  - Aggregate progress across all 12 months
  - Real-time updates as tasks are completed

### 🤖 AI Career Assistant (Priyanshu)

- **Contextual Responses**
  - Understands user profile and current plan
  - References selected month and task progress
  - Provides actionable, encouraging advice

- **Conversation History**
  - Maintains chat context across sessions
  - Persists messages in MongoDB
  - Auto-scrolling for new messages

### 🔐 User Authentication & Persistence

- **Clerk Integration**
  - Secure sign-in/sign-up flows
  - Custom-styled authentication pages
  - User session management

- **Data Persistence**
  - Complete app state saved to MongoDB
  - Automatic sync on state changes
  - State restoration on login

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Lucide React** | Latest | Icon library |

### Backend & Services

| Technology | Version | Purpose |
|------------|---------|---------|
| **Clerk** | 6.37.4 | Authentication & user management |
| **Google Gemini AI** | 1.41.0 | AI plan generation & chat responses |
| **MongoDB** | 7.1.0 | Database for user state persistence |
| **Next.js API Routes** | Built-in | Server-side API endpoints |

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Tailwind CSS PostCSS** - CSS processing
- **shadcn/ui** - UI component library

---

## 🏗 Architecture

### Application Flow

```
User → Clerk Auth → Onboarding → AI Plan Generation → Progress Tracking → AI Chat
  ↓                    ↓              ↓                      ↓                ↓
MongoDB ← State Sync ← State Sync ← State Sync ← State Sync ← State Sync
```

### Data Flow

1. **Authentication**: User signs in via Clerk
2. **Onboarding**: User profile collected and sent to `/api/plan`
3. **Plan Generation**: Gemini AI generates 12-month plan
4. **State Management**: Plan saved to MongoDB via `/api/state`
5. **Progress Updates**: Task status changes trigger state sync
6. **AI Chat**: Messages sent to `/api/chat` with full context
7. **Persistence**: All state changes auto-saved to MongoDB

### Database Schema

**Collection: `user_states`**

```typescript
{
  userId: string,           // Clerk user ID
  state: {
    stage: "onboarding" | "plan",
    profile: UserProfile,
    plan: Plan,
    selectedMonthId: string | null,
    chat: ChatMessage[]
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB Atlas** account (free tier works)
- **Google AI Studio** account for Gemini API key
- **Clerk** account (optional - keyless mode works for dev)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd RoadmapXAI
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the project root:

```bash
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=roadmap_x

# Clerk Configuration (Optional for development - uses keyless mode if not set)
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
# CLERK_SECRET_KEY=sk_test_...
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
RoadmapXAI/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts          # AI chat endpoint
│   │   ├── plan/
│   │   │   └── route.ts          # Plan generation endpoint
│   │   └── state/
│   │       └── route.ts          # State persistence endpoint
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx          # Custom sign-in page
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx          # Custom sign-up page
│   ├── layout.tsx                 # Root layout with ClerkProvider
│   ├── page.tsx                  # Main application page
│   └── globals.css               # Global styles
├── lib/
│   ├── mongodb.ts                # MongoDB connection helper
│   └── utils.ts                  # Utility functions
├── public/
│   └── cca.jpg                   # Project banner image
├── middleware.ts                  # Clerk middleware
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

---

## 🔌 API Endpoints

### POST `/api/plan`

Generates a personalized 12-month career plan using Gemini AI.

**Request Body:**
```json
{
  "profile": {
    "name": "John Doe",
    "currentRole": "Software Engineer",
    "yearsExperience": "3",
    "desiredRole": "Senior Software Engineer",
    "timePerWeek": "5-8 hours",
    "constraints": "Full-time job, family",
    "challenges": "Time management, confidence"
  }
}
```

**Response:**
```json
{
  "plan": {
    "id": "plan-1234567890",
    "months": [
      {
        "id": "month-1",
        "index": 1,
        "title": "Month 1",
        "theme": "Foundations & Clarity",
        "summary": "Establish a strong base...",
        "tasks": [...]
      }
    ]
  }
}
```

### POST `/api/chat`

Sends a message to Priyanshu (AI assistant) and receives contextual response.

**Request Body:**
```json
{
  "messages": [
    { "from": "user", "content": "How do I start Month 1?" },
    { "from": "Priyanshu", "content": "Great question!..." }
  ],
  "profile": {...},
  "plan": {...},
  "selectedMonthId": "month-1"
}
```

**Response:**
```json
{
  "reply": "To start Month 1, focus on..."
}
```

### GET `/api/state`

Retrieves saved user state from MongoDB.

**Response:**
```json
{
  "state": {
    "stage": "plan",
    "profile": {...},
    "plan": {...},
    "selectedMonthId": "month-1",
    "chat": [...]
  }
}
```

### POST `/api/state`

Saves user state to MongoDB.

**Request Body:**
```json
{
  "state": {
    "stage": "plan",
    "profile": {...},
    "plan": {...},
    "selectedMonthId": "month-1",
    "chat": [...]
  }
}
```

**Response:**
```json
{
  "ok": true
}
```

---

## 🔧 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key | `AIzaSy...` |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string | `mongodb+srv://...` |
| `MONGODB_DB_NAME` | No | Database name (default: `career_compass_ai`) | `career_compass_ai` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | No* | Clerk publishable key | `pk_test_...` |
| `CLERK_SECRET_KEY` | No* | Clerk secret key | `sk_test_...` |

*Clerk keys are optional in development - the app uses keyless mode if not provided.

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Development Workflow

1. **Make changes** to code
2. **Hot reload** automatically updates the browser
3. **Check console** for errors and API responses
4. **Test authentication** flow with Clerk
5. **Verify MongoDB** connection and data persistence

### Code Style

- TypeScript strict mode enabled
- ESLint configured for Next.js
- Tailwind CSS for styling
- Functional components with hooks

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- **Netlify** - Configure build command: `npm run build`
- **Railway** - Automatic deployment from Git
- **AWS Amplify** - Full-stack deployment
- **Docker** - Containerized deployment

### Environment Variables for Production

Ensure all required environment variables are set in your deployment platform:

- `GEMINI_API_KEY`
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: "Invalid MONGODB_URI"**
- Ensure URI starts with `mongodb://` or `mongodb+srv://`
- Remove any prefixes like "connections:" or quotes
- Verify credentials are correct

**Error: "SSL/TLS connection error"**
- Check MongoDB Atlas Network Access settings
- Add your IP address or `0.0.0.0/0` for development
- Verify database user has read/write permissions

### Gemini AI Issues

**Error: "API key must be set"**
- Verify `GEMINI_API_KEY` is in `.env.local`
- Restart dev server after adding environment variables
- Check API key is valid in Google AI Studio

**Error: "Model not found"**
- The app automatically falls back to alternative models
- Check Gemini API status and model availability

### Clerk Authentication Issues

**Keyless mode not working**
- Ensure `@clerk/nextjs` is installed
- Check `middleware.ts` is properly configured
- Verify `ClerkProvider` wraps the app in `layout.tsx`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add TypeScript types for new features
- Update README if adding new features
- Test thoroughly before submitting PR

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Clerk** for seamless authentication
- **MongoDB Atlas** for reliable data storage
- **Next.js** team for the amazing framework
- **Tailwind CSS** for beautiful styling utilities

---

## 📞 Support

For issues, questions, or feature requests, please open an issue in the repository.

---

Built with ❤️ using Next.js, Gemini AI, Clerk, and MongoDB
