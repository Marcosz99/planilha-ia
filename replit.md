# Planilha Financeira IA - Member Area

## Overview

This is a financial education member area application built with React and TypeScript. The application provides a course platform for teaching personal finance management using an AI-powered spreadsheet system. Users can access video lessons, downloadable resources, and premium content through a gated learning experience with progress tracking and unlock functionality.

The platform features a multi-module course structure with lessons that include video tutorials, PDF guides, and downloadable templates. It includes authentication, content unlocking mechanisms, and progress tracking to deliver a complete online learning experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18.3.1 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Tailwind CSS for utility-first styling with custom theme configuration
- Lucide React for consistent iconography throughout the UI

**Component Structure:**
The application follows a component-based architecture with clear separation of concerns:

- `App.tsx`: Root component managing authentication state and routing between login and member area
- `LoginPage.tsx`: Handles user authentication with email/password validation
- `MemberArea.tsx`: Main authenticated view coordinating sidebar, content area, and progress tracking
- `Sidebar.tsx`: Navigation component displaying course modules and lessons with completion tracking
- `ContentArea.tsx`: Dynamic content renderer supporting multiple content types (video, download, text, locked)
- `Header.tsx`: Displays course information and progress bar
- `UnlockModal.tsx`: Modal dialog for premium content activation
- `WhatsAppButton.tsx`: Floating support button for customer assistance

**State Management:**
Local React state with hooks (useState, useEffect) is used throughout. No external state management library is employed, keeping the architecture simple. localStorage is utilized for:
- Authentication state persistence (`isLoggedIn`)
- Premium content unlock status (`contentUnlocked`)
- Lesson completion tracking (`completedLessons`)

**Design Decisions:**
- Single Page Application (SPA) architecture without routing library - simpler for a single-course platform
- Client-side authentication using hardcoded credentials stored in data configuration
- Progressive disclosure pattern with locked/unlocked content states
- Mobile-first responsive design using Tailwind's breakpoint system
- Dark gradient theme with emerald/green accent colors for financial/growth branding

### Data Architecture

**Data Model:**
The application uses a TypeScript-based data structure defined in `src/lib/data.ts`:

- `Course`: Top-level course metadata (title, subtitle, theme color)
- `Module`: Course sections with ordering
- `Lesson`: Individual learning units with content type variants
- `ModuleWithLessons`: Denormalized structure combining modules with their lessons

**Content Types:**
Lessons support multiple content formats:
- `video`: Embedded YouTube iframe players
- `download`: External links to downloadable resources (Google Drive)
- `pdf`: Document links
- `text`: Rich text content displayed inline
- `locked`: Premium content requiring activation key

**Data Flow:**
Static data is imported from `data.ts` and transformed at runtime based on unlock state. When premium content is unlocked, the module structure is dynamically updated to reveal additional lessons previously hidden or locked.

**Trade-offs:**
Using static TypeScript data instead of a backend API simplifies deployment and eliminates server costs but requires redeployment for content updates. This is acceptable for a course that changes infrequently. Future migration to a CMS or database would require minimal refactoring due to the typed interfaces.

### Authentication & Authorization

**Authentication Mechanism:**
Simple credential-based authentication without external service:
- Email and password validated against constants (`LOGIN_EMAIL`, `LOGIN_PASSWORD`)
- Session persistence via localStorage
- No JWT tokens or session management - purely client-side state

**Authorization Pattern:**
Two-tier access control:
1. Basic authentication gates the entire member area
2. Premium content unlock via activation key (`UNLOCK_KEY`)

**Security Considerations:**
This implementation prioritizes simplicity over security since sensitive data is not involved. Credentials are stored as plain constants. For production with real user data, this should be replaced with proper backend authentication (OAuth, JWT) and encrypted storage.

**Rationale:**
The simple auth approach is appropriate for a single-user educational product with low security requirements. It reduces complexity and hosting costs while providing sufficient access control for digital content delivery.

### Styling & UI Framework

**Tailwind CSS Configuration:**
Custom configuration extends the default theme while maintaining utility-first approach. The design system uses:
- Emerald/green color palette for financial growth theming
- Custom gradient backgrounds for premium feel
- Consistent spacing scale and typography
- Border radius tokens for modern card-based layouts

**Responsive Design:**
Mobile-first breakpoints ensure usability across devices:
- Flexible grid layouts that adapt from mobile to desktop
- Collapsible/expandable module sections for mobile navigation
- Touch-friendly button sizes and spacing

**Dark Theme:**
The login page features a dark gradient background (`from-[#0a1f1a] via-[#0d2818] to-[#051a12]`) while the member area uses light backgrounds for content readability - balancing visual appeal with usability.

### Build & Development Configuration

**Vite Configuration:**
Optimized for Replit deployment:
- Server configured to listen on `0.0.0.0:5000` for external access
- HMR client port set to 443 for HTTPS proxy compatibility
- Lucide React excluded from optimization to prevent build issues

**TypeScript Configuration:**
Strict type checking enabled with:
- Project references separating app code from node configuration
- Bundler module resolution for modern import syntax
- Isolated modules for build performance

**ESLint Setup:**
React-specific linting with TypeScript support:
- React Hooks rules enforced for proper hook usage
- React Refresh rules for fast development iteration
- TypeScript-ESLint for type-aware linting

## External Dependencies

### Supabase Integration

The application includes `@supabase/supabase-js` (v2.57.4) in dependencies, indicating planned or potential backend integration. However, current implementation does not actively use Supabase.

**Potential Use Cases:**
- User authentication and management
- Content delivery and storage
- Progress tracking database
- Analytics and user activity logging

**Migration Path:**
The typed data interfaces provide a clear schema that could be mapped to Supabase tables with minimal refactoring. Authentication could be upgraded from localStorage to Supabase Auth.

### YouTube Embed Service

Video content is delivered via YouTube embeds with specific parameters:
- `rel=0`: Disable related videos at end
- `modestbranding=1`: Minimize YouTube branding
- `showinfo=0`: Hide video information
- `controls=1`: Enable player controls

This provides free video hosting while maintaining brand consistency.

### Google Drive

Downloadable resources (spreadsheets, PDFs) are hosted on Google Drive with shared links. This eliminates storage costs while providing reliable file delivery.

**Trade-off:**
Dependency on external service availability, but acceptable given Drive's reliability and zero hosting cost.

### WhatsApp Business Integration

Support functionality links directly to WhatsApp Web/App with pre-filled message template, enabling instant customer communication without building a support ticketing system.

### Development Tools

**Build Pipeline:**
- Vite for bundling and development server
- PostCSS with Autoprefixer for CSS processing
- Tailwind CSS for utility generation

**Type Checking:**
- TypeScript compiler for static type analysis
- Separate typecheck script for CI/CD integration

**Code Quality:**
- ESLint for code style and best practices
- React-specific plugins for framework conventions