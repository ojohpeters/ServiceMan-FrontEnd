# ServiceMan Frontend Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern service platforms like Airbnb, Upwork, and TaskRabbit for intuitive service booking workflows, combined with clean dashboard patterns from Linear and Notion for admin/serviceman interfaces.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Light Mode: 219 85% 35% (deep blue)
- Dark Mode: 219 70% 55% (lighter blue)

**Supporting Colors:**
- Success: 142 69% 58% (green for completed states)
- Warning: 38 92% 50% (amber for pending states)
- Emergency: 0 84% 60% (red for urgent requests)
- Background Light: 0 0% 98%
- Background Dark: 222 84% 5%

### Typography
**Font System:** Inter from Google Fonts
- Headlines: 600-700 weight
- Body text: 400-500 weight
- UI elements: 500 weight

### Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, and 12
- Micro spacing: p-2, m-2
- Component spacing: p-4, gap-4
- Section spacing: py-8, my-6
- Large containers: p-12

### Component Library

**Navigation:**
- Fixed glass-blur navbar with backdrop-blur-sm
- Sticky positioning with subtle shadow on scroll
- Category dropdown with hover states

**Cards & Containers:**
- Serviceman cards with subtle hover lift (transform scale-105)
- Request status cards with color-coded borders
- Dashboard panels with soft shadows

**Interactive Elements:**
- Primary buttons with the main blue palette
- Outline buttons with blurred backgrounds when over images
- Emergency badges with red background and subtle pulse animation
- Star ratings with gold fill states

**Data Display:**
- Status indicators with color-coded dots
- Progress indicators for multi-step flows
- Rating displays with star icons

### Animations
**Framer Motion Implementation:**
- Page transitions: slide and fade
- Modal entrances: scale from 0.95 to 1
- Emergency pulse: subtle 1.5s infinite animation
- Hover lifts: 0.2s spring transitions

## Visual Hierarchy

**Landing Page Structure:**
1. Hero section with service overview and main CTA
2. Featured categories grid (4-6 categories)
3. Top-rated servicemen showcase (4-5 cards)
4. Trust indicators and how-it-works section

**Dashboard Layouts:**
- Sidebar navigation for role-specific actions
- Main content area with cards/tables
- Status indicators prominently displayed
- Quick actions easily accessible

## Emergency Request Handling
- Red color treatment (0 84% 60%)
- Pulsing border animation on cards
- Priority badges with elevated visual weight
- Distinct notification styling

## Responsive Design
- Mobile-first approach with breakpoints at sm, md, lg, xl
- Collapsible navigation for mobile
- Card layouts that stack on smaller screens
- Touch-friendly interactive elements (minimum 44px)

## Images
**Hero Section:** Large background image showcasing service professionals at work, with blurred button overlays for CTAs
**Category Cards:** Icon-based representations rather than photos for consistency
**Serviceman Profiles:** Professional headshot placeholders with consistent aspect ratios
**Trust Indicators:** Simple illustrated icons for process steps and guarantees

The hero image should be prominent but not overwhelming, approximately 60vh on desktop and 40vh on mobile, with a subtle gradient overlay for text readability.