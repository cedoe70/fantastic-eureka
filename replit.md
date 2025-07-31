# Email Management Platform

## Overview

This is a full-stack email management platform built with React, Express, and PostgreSQL. The application provides transactional email functionality with template management, contact organization, and analytics tracking. It features a modern glassmorphism UI design with a sidebar navigation structure.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: Radix UI components with Tailwind CSS styling
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and build processes

### Backend Architecture  
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Email Service**: SendGrid integration with fallback simulation
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API endpoints

## Key Components

### Database Schema
- **Users**: Authentication and user management
- **Email Templates**: Reusable email templates with variables and usage tracking
- **Sent Emails**: Email delivery tracking with status updates
- **Contacts**: Contact management with tagging system

### Frontend Components
- **Dashboard**: Overview with stats, quick actions, and recent activity
- **Templates**: Template creation and management interface
- **Email Composer**: Rich email composition with template selection
- **Analytics**: Email performance metrics and charts
- **Contacts**: Contact management with CRUD operations
- **Settings**: Account and email configuration

### Backend Services
- **Storage Interface**: Abstracted data access layer for all database operations
- **Email Service**: SendGrid integration with simulation fallback for development
- **Template Processing**: Variable substitution and template rendering
- **Analytics**: Email tracking and performance metrics calculation

## Data Flow

1. **Email Composition**: Users select templates or compose emails from scratch
2. **Template Processing**: Variables are processed and content is rendered
3. **Email Sending**: Emails are sent via SendGrid with status tracking
4. **Analytics Collection**: Delivery, open, and engagement metrics are recorded
5. **Dashboard Updates**: Real-time statistics and activity feeds are updated

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **@sendgrid/mail**: Email delivery service
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: UI component library
- **react-hook-form**: Form state management
- **zod**: Schema validation

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Server bundling for production

## Deployment Strategy

The application is configured for deployment with:

### Build Process
- **Client**: Vite builds React app to `dist/public`
- **Server**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations manage schema changes

### Environment Configuration
- **Development**: Local development with hot reloading via Vite
- **Production**: Bundled server serves static assets and API endpoints
- **Database**: PostgreSQL connection via environment variable

### Key Scripts
- `npm run dev`: Development mode with hot reloading
- `npm run build`: Production build for both client and server
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment

The application uses a monorepo structure with shared types and schemas between client and server, ensuring type safety across the full stack.

## Recent Changes

### January 31, 2025 - Vercel Deployment Configuration
- ✅ Added Vercel deployment configuration with `vercel.json`
- ✅ Created serverless function entry point at `api/index.ts`
- ✅ Modified server architecture to support both development and production modes
- ✅ Fixed TypeScript type issues in storage layer for proper null handling
- ✅ Resolved navigation component accessibility warnings
- ✅ Created comprehensive deployment documentation (`VERCEL_DEPLOYMENT.md`)
- ✅ Added deployment script (`deploy-to-vercel.sh`) for easy deployment

The application is now ready for deployment to Vercel with proper serverless function support and production configuration.