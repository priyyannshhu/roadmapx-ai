# 🚀 RoadmapX

![RoadmapX Main Interface](images/main.png)

> **AI-powered career planning platform** that transforms your professional journey with personalized 12-month roadmaps, intelligent guidance, and beautiful modern design.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 About](#-about)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 Architecture](#-architecture)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔌 API Endpoints](#-api-endpoints)
- [🔧 Environment Variables](#-environment-variables)
- [💻 Development](#-development)
- [🚢 Deployment](#-deployment)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎨 **Professional UI/UX Design**
- **Modern White + Orange Theme**: Clean, professional interface with vibrant orange accents
- **Poppins Typography**: Modern, readable font family throughout the application
- **3-Column Responsive Layout**: Optimized 1:2:1 ratio for perfect space utilization
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Mobile-First Design**: Fully responsive across all device sizes

### 🤖 **AI-Powered Career Planning**
- **Personalized 12-Month Roadmaps**: AI-generated plans tailored to your goals
- **Priyanshu AI Assistant**: Your personal career guide available 24 into 7
- **Contextual Conversations**: Smart responses based on your current progress
- **Dynamic Plan Generation**: Adapts to your experience, constraints, and timeline

### 📊 **Intelligent Progress Tracking**
- **Task Management**: Three-state lifecycle (not_started → in_progress → complete)
- **Monthly Themes**: Focused areas like learning, practice, networking, reflection
- **Visual Progress Bars**: Real-time progress visualization
- **Weighted Calculations**: In-progress tasks count as 50% completion

### 🔐 **Secure Authentication & Data**
- **Clerk Authentication**: Secure sign-in/sign-up with social providers
- **MongoDB Persistence**: Automatic state saving and restoration
- **Session Management**: Seamless user experience across sessions
- **Data Privacy**: Encrypted storage and secure API communication

---

## 🎯 About

**RoadmapX** is a comprehensive career development platform that helps professionals navigate their career transitions with confidence. Whether you're looking to level up in your current field or pivot to a new role, RoadmapX provides the structure, guidance, and support you need to achieve your goals.

### How It Works

1. **🎯 Onboarding**: Share your current role, experience, goals, and constraints
2. **🤖 AI Planning**: Our AI generates a personalized 12-month roadmap
3. **📈 Execution**: Follow monthly themes and complete actionable tasks
4. **💬 Guidance**: Get help from Priyanshu, your AI career assistant
5. **📊 Tracking**: Monitor progress and adapt your plan as needed

### Key Benefits

- ✨ **Clarity**: Clear path from where you are to where you want to be
- 🎯 **Focus**: Monthly themes prevent overwhelm and maintain momentum
- 🤝 **Support**: AI assistant provides personalized guidance
- 📊 **Accountability**: Progress tracking keeps you motivated
- 🔄 **Flexibility**: Adapt plans as your goals evolve

---

## 🛠 Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React framework with App Router & Turbopack |
| **React** | 19.2.3 | UI library with modern hooks |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 3.4.19 | Utility-first styling framework |
| **Poppins** | Custom | Modern typography |
| **Lucide React** | 0.563.0 | Beautiful icon library |
| **shadcn/ui** | 3.8.4 | High-quality UI components |

### Backend & Services

| Technology | Version | Purpose |
|------------|---------|---------|
| **Clerk** | 6.37.4 | Authentication & user management |
| **Google Gemini AI** | 1.41.0 | AI plan generation & chat responses |
| **MongoDB** | 7.1.0 | NoSQL database for state persistence |
| **Next.js API Routes** | Built-in | Server-side API endpoints |

### Development Tools

- **ESLint** - Code quality and linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing and optimization
- **Tailwind Animate** - Smooth animations and transitions

---

## 🏗 Architecture

### Application Flow

```mermaid
graph TD
    A[User] --> B[Clerk Auth]
    B --> C[Onboarding Form]
    C --> D[AI Plan Generation]
    D --> E[Progress Tracking]
    E --> F[Priyanshu Chat]
    F --> E
    
    G[MongoDB] <--> B
    G <--> C
    G <--> D
    G <--> E
    G <--> F
```

### Data Flow Architecture

1. **Authentication Layer**: Clerk handles user identity and sessions
2. **API Layer**: Next.js API routes process all business logic
3. **AI Layer**: Google Gemini generates personalized content
4. **Data Layer**: MongoDB persists user state and conversations
5. **UI Layer**: React components render the user interface

### Database Schema

**Collection: `user_states`**

```typescript
{
  userId: string,           // Clerk user ID
  state: {
    stage: "onboarding" | "plan",
    profile: UserProfile,    // User career information
    plan: Plan,             // 12-month career roadmap
    selectedMonthId: string | null,
    chat: ChatMessage[]     // Conversation history
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB Atlas** account (free tier available)
- **Google AI Studio** account for Gemini API key
- **Clerk** account (optional - keyless mode works for development)

### Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/priyyannshhu/roadmapx-ai.git
cd roadmapx-ai
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the project root:

```bash
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roadmapx?appName=Cluster0
MONGODB_DB_NAME=roadmapx

# Clerk Authentication (Optional for development)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
roadmapx-ai/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # AI chat endpoint
│   │   ├── plan/route.ts          # Plan generation endpoint
│   │   └── state/route.ts         # State persistence endpoint
│   ├── sign-in/[[...sign-in]]/
│   │   └── page.tsx              # Custom sign-in page
│   ├── sign-up/[[...sign-up]]/
│   │   └── page.tsx              # Custom sign-up page
│   ├── globals.css               # Global styles with Poppins font
│   ├── layout.tsx                # Root layout with ClerkProvider
│   └── page.tsx                  # Main application page
├── components/
│   └── home/
│       └── sections.tsx          # Main UI components
├── lib/
│   ├── career-types.ts           # TypeScript type definitions
│   └── mongodb.ts                # MongoDB connection helper
├── images/
│   └── main.png                  # Main application screenshot
├── public/
│   └── ...                       # Static assets
├── middleware.ts                 # Clerk authentication middleware
├── tailwind.config.js            # Tailwind CSS configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

---

## 🔌 API Endpoints

### POST `/api/plan`

Generates a personalized 12-month career plan using Gemini AI.

**Request:**
```json
{
  "profile": {
    "name": "Sarah Johnson",
    "currentRole": "Frontend Developer",
    "yearsExperience": "2",
    "desiredRole": "Senior Frontend Engineer",
    "timePerWeek": "6-10 hours",
    "constraints": "Full-time job, learning new tech stack",
    "challenges": "Imposter syndrome, time management"
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
        "theme": "Foundation Building",
        "summary": "Strengthen core frontend fundamentals",
        "tasks": [
          {
            "id": "m1-t1",
            "title": "Master React Hooks",
            "description": "Deep dive into useState, useEffect, and custom hooks",
            "category": "learning",
            "status": "not_started"
          },
          {
            "id": "m1-t2",
            "title": "Build Component Library",
            "description": "Create reusable components for your portfolio",
            "category": "practice",
            "status": "not_started"
          },
          {
            "id": "m1-t3",
            "title": "Join React Community",
            "description": "Connect with other developers and learn from them",
            "category": "networking",
            "status": "not_started"
          },
          {
            "id": "m1-t4",
            "title": "Weekly Progress Journal",
            "description": "Document your learning journey and insights",
            "category": "reflection",
            "status": "not_started"
          }
        ]
      }
    ]
  }
}
```

### POST `/api/chat`

Interacts with Priyanshu AI assistant for career guidance.

**Request:**
```json
{
  "messages": [
    { "from": "user", "content": "How should I prioritize my tasks this month?" },
    { "from": "priyanshu", "content": "Great question! Let me help you prioritize..." }
  ],
  "profile": { ... },
  "plan": { ... },
  "selectedMonthId": "month-1"
}
```

**Response:**
```json
{
  "reply": "Based on your current progress in Month 1, I recommend starting with the React Hooks deep dive since it's foundational for the other tasks. Spend 60% of your time there, then move to building your component library..."
}
```

### GET `/api/state`

Retrieves saved user state from MongoDB.

**Response:**
```json
{
  "state": {
    "stage": "plan",
    "profile": { ... },
    "plan": { ... },
    "selectedMonthId": "month-1",
    "chat": [ ... ]
  }
}
```

### POST `/api/state`

Saves user state to MongoDB for persistence.

**Request:**
```json
{
  "state": {
    "stage": "plan",
    "profile": { ... },
    "plan": { ... },
    "selectedMonthId": "month-1",
    "chat": [ ... ]
  }
}
```

---

## 🔧 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key for AI features | `AIzaSy...` |
| `MONGODB_URI` | ✅ Yes | MongoDB Atlas connection string | `mongodb+srv://...` |
| `MONGODB_DB_NAME` | ❌ No | Database name (default: `roadmapx`) | `roadmapx` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ❌ No* | Clerk publishable key | `pk_test_...` |
| `CLERK_SECRET_KEY` | ❌ No* | Clerk secret key | `sk_test_...` |

*Clerk keys are optional in development - the app uses keyless mode if not provided.

---

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build optimized production version
npm run build

# Start production server
npm start

# Run ESLint for code quality
npm run lint
```

### Development Workflow

1. **Code Changes**: Make changes to components, styles, or logic
2. **Hot Reload**: Browser automatically updates with changes
3. **API Testing**: Check browser console for API responses
4. **Authentication**: Test sign-in/sign-up flows
5. **Database**: Verify MongoDB connection and data persistence

### Code Style Guidelines

- **TypeScript Strict Mode**: All code must be type-safe
- **Component Structure**: Functional components with hooks
- **Tailwind CSS**: Utility-first styling approach
- **File Organization**: Logical grouping by feature
- **Error Handling**: Proper try-catch blocks and user feedback

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Configure Environment Variables**
   Add all required variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
   - Clerk keys (if using production auth)

4. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Visit your deployed URL

### Other Deployment Options

**Netlify**
```bash
# Build command
npm run build

# Publish directory
.out
```

**Docker**
```bash
# Build image
docker build -t roadmapx .

# Run container
docker run -p 3000:3000 roadmapx
```

**AWS Amplify**
- Connect GitHub repository
- Configure build settings
- Deploy automatically on push

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check connection string format
mongodb+srv://username:password@cluster.mongodb.net/dbname

# Ensure IP is whitelisted in MongoDB Atlas
# Add 0.0.0.0/0 for development access
```

**Gemini API Issues**
```bash
# Verify API key is valid
curl "https://generativelanguage.googleapis.com/v1beta/models" -H "x-goog-api-key: YOUR_KEY"

# Check rate limits and quotas in Google AI Studio
```

**Clerk Authentication**
```bash
# Verify middleware configuration
cat middleware.ts

# Check ClerkProvider in layout.tsx
grep -n "ClerkProvider" app/layout.tsx
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run build
```

### Performance Optimization

- **Image Optimization**: Use Next.js Image component
- **Code Splitting**: Dynamic imports for large components
- **Database Indexing**: Add indexes for frequently queried fields
- **API Caching**: Implement response caching where appropriate

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/roadmapx-ai.git
   cd roadmapx-ai
   ```

3. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make changes and test**
   ```bash
   npm run dev
   # Test thoroughly
   npm run build
   ```

5. **Submit pull request**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```

### Contribution Guidelines

- **Code Quality**: Follow existing patterns and TypeScript best practices
- **Testing**: Ensure all features work before submitting
- **Documentation**: Update README for new features
- **UI/UX**: Maintain design consistency with existing interface
- **Performance**: Consider impact on load times and user experience

### Areas for Contribution

- 🎨 **UI Improvements**: Enhanced animations, better accessibility
- 🤖 **AI Features**: Better prompt engineering, new AI capabilities
- 📊 **Analytics**: Progress insights, achievement systems
- 🔧 **Performance**: Optimization, caching strategies
- 📱 **Mobile**: Enhanced mobile experience
- 🌐 **Internationalization**: Multi-language support

---

## 📄 License

This project is private and proprietary. All rights reserved.

© 2024 RoadmapX. Built with ❤️ for career development professionals.

---

## 🙏 Acknowledgments

Special thanks to:

- **Google Gemini AI** for powerful AI capabilities
- **Clerk** for seamless authentication solutions
- **MongoDB Atlas** for reliable database services
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for beautiful styling utilities
- **Vercel** for excellent deployment platform

---

## 📞 Support & Contact

For issues, questions, or feature requests:

- 🐛 **Report Issues**: [GitHub Issues](https://github.com/priyyannshhu/roadmapx-ai/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/priyyannshhu/roadmapx-ai/discussions)
- 📧 **Email**: Contact through GitHub profile

---

## 🚀 Live Demo

Experience RoadmapX in action at: **[Coming Soon]**

---

*Built with cutting-edge technology to transform your career journey.* 🎯
