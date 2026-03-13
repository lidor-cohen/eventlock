# Eventlock

A modern event management platform connecting clients, service providers, and event producers — built with a premium visual experience and role-based functionality.

---

## Tech Stack

| Technology | Why We Used It |
|---|---|
| **Next.js 16** | App router with server/client component boundaries, file-based routing, and seamless deployment on Vercel |
| **React 19** | Latest concurrent features and hooks for a reactive UI |
| **TypeScript** | Full type safety across the codebase, reducing runtime bugs and improving DX |
| **Tailwind CSS 4** | Utility-first styling with OKLCH color space, CSS variables for theming, and dark mode out of the box |
| **shadcn/ui** | Accessible, unstyled Radix-based components we can fully customize without fighting library opinions |
| **Framer Motion** | Declarative, performant animations for page transitions, staggered card entrances, and layout changes |
| **GSAP** | Precise timeline-based animations where Framer Motion is too high-level |
| **Three.js** | Full 3D rendering for the Ballpit hero component — physics simulation, custom shaders, real-time interaction |
| **OGL** | Lightweight WebGL for the Circular Gallery — smaller bundle than Three.js for a single scroll effect |
| **Zustand** | Minimal state management for the onboarding flow — no boilerplate, tree-shaking friendly |
| **Clerk** | Drop-in auth with Hebrew localization, `unsafeMetadata` for storing user type, and prebuilt UI components |
| **react-hook-form + Zod** | Performant form handling with TypeScript-first schema validation |
| **Sonner** | Lightweight, accessible toast notifications |
| **next-themes** | Zero-flash dark/light mode with system preference detection |
| **@radix-ui/react-direction** | RTL layout support for the Hebrew-first interface |

---

## How the User Store Works

**File:** `src/store/user-store.ts`

The store uses **Zustand with sessionStorage persistence** to handle a single edge case in the onboarding flow: a user selects their account type on the landing page, gets redirected to Clerk's signup, and we need to remember their choice when they return.

```
Landing Page → user clicks "Sign up as Provider"
   ↓
setPendingUserType("provider") → saved to sessionStorage
   ↓
Clerk signup flow (new tab/redirect)
   ↓
/onboarding page → reads pendingUserType from store
   ↓
Saves user type to Clerk unsafeMetadata → clears store
```

**Why sessionStorage (not localStorage)?**
The pending type is only relevant for the current signup session. If a user opens a new tab and signs up as a different role, sessionStorage scopes the state to each tab independently. It auto-clears when the browser session ends.

**State shape:**
```ts
{
  pendingUserType: "client" | "provider" | "producer" | null
  setPendingUserType: (type) => void
}
```

After the user completes onboarding, the type is written to `clerk.user.unsafeMetadata.userType` and the store resets to `null`.

---

## Current Features

### Landing Page
- Interactive 3D ball pit with physics simulation and cursor interaction
- WebGL circular scrolling gallery with event type imagery
- Account type selection cards (Client, Provider, Producer) with distinct visual branding
- Trusted-by social proof section
- Profile cards section
- How-it-works overview

### Authentication & Onboarding
- Clerk-powered sign-in / sign-up with Hebrew localization
- Multi-step onboarding to select account type
- Role selection persisted across the Clerk redirect flow via sessionStorage
- User type saved to Clerk metadata on confirmation

### Role-Based Dashboards

**Client Dashboard**
- Stats: Active Events, Saved Providers, Price Quotes, Messages

**Provider Dashboard**
- Stats: New Leads, Active Bookings, Portfolio Items, Monthly Revenue (₪)
- Leads table with search, filters, and status tracking

**Producer Dashboard**
- Stats: Events in Production, Provider Network, Open Tasks, Reports
- Leads table with potential leads view

### Leads Table (shared component)
- Real-time search by name, email, or phone
- Multi-filter: event type, provider type, status
- Status tracking: New / In Progress / Closed
- 8 provider categories: photographer, DJ, catering, venue, makeup, floral design, band, videographer
- Animated row transitions with staggered entrance
- Empty state handling

---

## To-Do / Upcoming Features

- [ ] **Real database integration** — replace mock leads with live data (Prisma + PostgreSQL or Supabase)
- [ ] **Provider profiles** — public-facing profile pages with portfolio, pricing, and reviews
- [ ] **Event creation flow** — Clients can create events, set budget, specify requirements
- [ ] **Quote & booking system** — Providers receive leads, send quotes, Clients accept/reject
- [ ] **Messaging system** — In-app chat between Clients and Providers
- [ ] **Producer event management** — Full event orchestration: task boards, timelines, provider assignment
- [ ] **Search & discovery** — Clients browse and filter providers by category, location, price range
- [ ] **Reviews & ratings** — Post-event feedback system
- [ ] **Notifications** — Real-time in-app and email notifications for quotes, bookings, messages
- [ ] **Calendar integration** — Provider availability, event scheduling, iCal export
- [ ] **Payment integration** — Deposits and invoicing via Stripe
- [ ] **Mobile app** — React Native or PWA wrapper

---

## Pros and Cons

| Pros | Cons |
|---|---|
| Premium visual experience — 3D hero and WebGL gallery immediately differentiate the product | High initial bundle size due to Three.js and OGL — needs aggressive code-splitting |
| Hebrew-first RTL design built in from the start — rare for SaaS tools in this market | All UI text is hard-coded in Hebrew, making future i18n/l10n harder |
| Three distinct user roles with tailored experiences — not a one-size-fits-all dashboard | Role logic is duplicated across three separate dashboard components rather than composed |
| Zustand onboarding flow elegantly solves the Clerk redirect state problem | sessionStorage means the pending type is lost if the user closes the tab mid-signup |
| Tailwind 4 + OKLCH gives a modern, consistent color system with dark mode for free | Tailwind 4 is still cutting-edge — some tooling and IDE support lags behind v3 |
| shadcn/ui components are fully owned and customizable — no vendor lock-in on UI | More components to maintain manually as shadcn updates upstream |
| Framer Motion + GSAP combo allows precise control over every animation | Two animation libraries adds complexity and potential conflicts |
| Clerk handles auth complexity (OAuth, MFA, session management) out of the box | Clerk metadata (`unsafeMetadata`) is client-accessible — not suitable for sensitive role enforcement without server-side validation |
| Intersection Observer + deferred WebGL init keeps 3D rendering performant | Physics simulation and shader rendering are CPU/GPU intensive on low-end mobile devices |
| Full TypeScript + Zod throughout — runtime safety at form and API boundaries | Adds overhead for rapid prototyping; strict mode catches errors but slows initial velocity |
