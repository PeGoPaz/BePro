# BePro — Professional Services Booking Platform

**Griffith College Dublin — Web Technologies, Assignment 3**

BePro is a full-stack web application that connects customers with local service professionals. Users can browse available services, book appointments, leave reviews, and manage their schedules — all in one seamless flow.

---

## Team Members & Contributions

### Mikhail Stukalov
- Navbar (glassmorphic, responsive, profile dropdown)
- Home page (hero, search block, services grid)
- Services browse page (category filter, search, service cards)
- Reusable component library (`ServiceCard`, `DashboardAvatar`, `ActivityHeatmap`, `ServiceModal`, `StarRating`, `ReviewCard`)

### Vladimir Rainov
- Login & Register pages (forms, validation, error handling)
- `AuthContext` (session restore on page reload, role-based redirects)
- Frontend API integration (`axios` instance, proxy config)
- Avatar upload UI and photo lightbox

### Artem Postnov
- Customer Dashboard (upcoming/past bookings, cancellation, profile card)
- Provider Dashboard (pending requests, confirm/decline actions, stats)
- Booking Page (auto-fetch service, desired price field, success state)
- Activity heatmap (365-day grid, colour levels by booking status)

### Georgii Taisaev
- Provider Profile public page (header, services list, average rating)
- Reviews section on Provider Dashboard
- Star rating components (`StarDisplay`, `StarPicker`)
- Review form (service selector, star picker, comment, submit flow)

---

## Design Decisions

### Visual Identity
The design language is built around a clean, professional aesthetic with a blue-dominant palette (`#2f66ff` primary). Cards use subtle white backgrounds with soft box shadows and rounded corners (14–18 px radius), giving the interface a modern, trustworthy feel consistent with service-marketplace expectations.

The original project proposal sketched out a three-section homepage (hero, search, services grid), a card-based browse page, and role-specific dashboards. The final implementation matches this vision exactly — every screen delivered corresponds directly to a wireframe or flow described in the initial proposal document. No scope was cut; the executed design is a faithful realisation of the original concept.

### Navigation
A sticky glassmorphic top bar (`backdrop-filter: blur`) keeps navigation accessible at all times without visually dominating the content. The three-column CSS Grid layout (`1fr auto 1fr`) perfectly balances the logo, nav links, and action buttons at all viewport widths. The profile dropdown follows modern convention — first name + role badge, with profile and sign-out options.

### Dashboards
Both the Customer and Provider dashboards use the same card-based layout system, ensuring visual consistency regardless of role. The Provider dashboard includes an activity heatmap (inspired by GitHub's contribution graph) rendered with CSS Grid over a 365-day rolling window, giving providers an at-a-glance view of their booking activity.

### Colour Coding
Booking status pills use semantic colours throughout: amber for pending, green for confirmed, red for cancelled. The same palette is applied consistently in the heatmap, booking lists, and provider inbox — reducing cognitive load for users managing multiple appointments.

### Responsiveness
All layouts adapt gracefully from desktop to mobile. The navbar collapses to a hamburger, the services grid reflows to a single column, and the search bar stacks vertically. Media queries target `768 px` and `480 px` breakpoints.

---

## Tech Stack

**Frontend**
- React 19 (functional components, hooks)
- React Router v7
- Axios (with `withCredentials: true` for session cookies)
- Vite (dev server with `/api` proxy)
- Plain CSS (no framework — custom design system)

**Backend**
- Node.js & Express
- MongoDB & Mongoose
- express-session + connect-mongo
- bcrypt (password hashing)

---

## AI Tools — Consultation Only

During development the team consulted **OpenAI Codex**, **Anthropic Claude**, and **Google Gemini** strictly as reference tools — equivalent to using documentation or Stack Overflow. All architectural decisions, code structure, and design choices were made by the team. AI suggestions were reviewed, adapted, and integrated manually; no generated output was used verbatim without understanding and modification.

---

## Running the Project

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas URI)

### Backend
```bash
cd backend
npm install
# create .env with MONGO_URI and SESSION_SECRET
npm run dev        # starts on http://localhost:9000
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # starts on http://localhost:5173
```

The Vite proxy forwards all `/api/*` requests to `http://localhost:9000`, so both servers must be running simultaneously during development.
