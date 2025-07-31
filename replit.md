# ElearnSphere - E-Learning Platform

## Overview

ElearnSphere is a comprehensive e-learning platform built with a modern full-stack architecture. The platform supports three distinct user roles (students, instructors, and admins) with role-specific dashboards and functionality. Students can enroll in courses and track their progress, instructors can create and manage courses, and admins oversee the entire platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Authentication**: Replit Auth integration with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL session store
- **API Design**: RESTful API with structured error handling

### Database Layer
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Comprehensive schema supporting courses, users, enrollments, quizzes, assignments, notifications, and payments

## Key Components

### Authentication System
- **Provider**: Replit Auth with OIDC
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Security**: HTTP-only secure cookies with 1-week TTL
- **User Management**: Automatic user creation/update on login with role-based access

### Role-Based Access Control
- **Student Role**: Course enrollment, progress tracking, quiz taking, notifications
- **Instructor Role**: Course creation, student progress monitoring, content management
- **Admin Role**: Platform-wide analytics, user management, course approval

### Course Management
- **Course Lifecycle**: Draft → Pending → Published/Rejected workflow
- **Content Types**: Lessons, quizzes, assignments with rich metadata
- **Enrollment System**: Student enrollment tracking with progress monitoring
- **Reviews & Ratings**: Course feedback system

### Payment & Commerce
- **Shopping Cart**: Session-based cart management for students
- **Payment Processing**: Structured payment tracking with status management
- **Pricing**: Flexible course pricing with discount support

### Notification System
- **Real-time Updates**: User notifications for course updates, assignments, announcements
- **Delivery**: In-app notification dropdown with read/unread status
- **Types**: Support for various notification types (course, payment, assignment, etc.)

## Data Flow

### Authentication Flow
1. User accesses protected route
2. Replit Auth middleware validates session
3. User data fetched/created in database
4. Role-based dashboard rendered

### Course Enrollment Flow
1. Student browses available courses
2. Adds courses to cart (optional)
3. Enrolls directly or through checkout
4. Progress tracking begins automatically
5. Notifications sent for course updates

### Content Creation Flow
1. Instructor creates course in draft status
2. Adds lessons, quizzes, and assignments
3. Submits for admin approval
4. Admin reviews and approves/rejects
5. Published courses become available to students

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **drizzle-orm**: Type-safe database operations
- **express**: Web framework for API routes
- **wouter**: Client-side routing
- **@tanstack/react-query**: Server state management

### UI Dependencies
- **@radix-ui/***: Headless UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating component variants
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite dev server with HMR for frontend
- **API Server**: Express server with file watching via tsx
- **Database**: Neon PostgreSQL with connection pooling
- **Environment**: Replit-optimized with special plugins for cartographer and error overlay

### Production Build
- **Frontend**: Vite production build to `dist/public`
- **Backend**: ESBuild bundle to `dist/index.js`
- **Static Assets**: Served by Express in production
- **Database**: Production PostgreSQL with migrations via Drizzle

### Configuration Management
- **Environment Variables**: DATABASE_URL, SESSION_SECRET, REPL_ID, ISSUER_URL
- **Build Scripts**: Separate dev/build/start commands
- **Type Checking**: Standalone TypeScript checking

The application follows a monorepo structure with clear separation between client, server, and shared code. The shared directory contains database schemas and types used by both frontend and backend, ensuring type safety across the entire application.