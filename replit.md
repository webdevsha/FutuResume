# Overview

FutureSu.me is an AI-powered career mapping platform that helps Gen Z and millennials practice "skill-authoring" instead of traditional "upskilling." The application analyzes uploaded resumes and creates personalized career pathways that prioritize low-competition, high-value opportunities. Users can upload their resume, select their career goals (pivot, step-up, or new-phase), and receive 3 strategic pathways: traditional, niche (recommended), and custom role creation. The platform emphasizes creating opportunities rather than chasing predetermined career paths, with market data showing up to 70% less competition in skill-authored roles.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/UI components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **File Upload**: Custom dropzone component with drag-and-drop functionality

## Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **File Processing**: Multer for multipart file uploads with memory storage
- **PDF Processing**: PDF-parse library for text extraction from uploaded documents
- **AI Integration**: Anthropic Claude API for career analysis and recommendations
- **Storage Layer**: Abstracted storage interface with in-memory implementation (designed for easy database integration)

## Data Models
The application uses a shared schema with three main entities:
- **Users**: Basic user information with email and timestamps
- **Resumes**: File metadata, content storage, and extracted text
- **Career Analyses**: Analysis results including pathways, skills, and market data

Each career analysis includes:
- Career pathways (traditional, niche, custom) with competition levels and salary ranges
- Current skills assessment and learning recommendations
- Market data and demand scoring
- Timeline estimates for career transitions

## AI Processing Pipeline
1. **Document Processing**: Extract text from PDF/Word documents
2. **Content Analysis**: Send extracted text to Claude API for analysis
3. **Structured Output**: Parse AI response into typed career pathway objects
4. **Market Scoring**: Calculate market scores based on skills, competition, and demand

## External Dependencies

- **Database**: PostgreSQL with Drizzle ORM for schema management and migrations
- **AI Service**: Anthropic Claude API for natural language processing and career analysis
- **File Storage**: Neon Database for PostgreSQL hosting
- **UI Components**: Radix UI for accessible component primitives
- **Styling**: Tailwind CSS with custom color palette and design tokens
- **Development Tools**: Vite for development server and hot module replacement

The application is designed with a modular architecture that separates concerns between document processing, AI analysis, and data storage, making it easy to extend with additional features or swap out individual components.