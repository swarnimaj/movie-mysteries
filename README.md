# MovieMysteries

A web application that reveals fascinating secrets and behind-the-scenes facts about your favorite movies using AI-powered content generation.

## Features

- **Google Authentication** - Secure sign-in with your Google account
- **Movie Selection** - Choose your favorite movie for personalized content
- **AI-Generated Facts** - Fresh, interesting movie trivia on every visit
- **Responsive Design** - Beautiful, dark-themed interface with mystical aesthetics
- **User Profiles** - Display your Google profile information

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with Google Provider
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI GPT-4o-mini for content generation
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials
- OpenAI API key

### Environment Variables

Create a `.env.local` file with:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/moviemysteries"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000] in your browser

## Project Structure

```
├── app/                    # Next.js app router
│   ├── (public)/          # Public routes (sign-in)
│   ├── api/               # API routes
│   ├── onboarding/        # First-time user setup
│   └── page.tsx           # Main dashboard
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## How It Works

1. Users sign in with their Google account
2. First-time users select their favorite movie
3. The app generates unique movie facts using OpenAI's API
4. Each page refresh shows a new fascinating fact about the chosen movie
5. Users can change their movie selection anytime
