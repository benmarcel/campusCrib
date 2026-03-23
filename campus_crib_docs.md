# Campus Crib — Project Documentation

> **Version:** 0.2.0 · **Status:** In Development · **Last Updated:** March 2026  
> **Author:** Chima Ben · **Stack:** Next.js 16, Supabase, Tailwind CSS, Paystack, Resend

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [The Solution](#3-the-solution)
4. [Tech Stack](#4-tech-stack)
5. [Getting Started](#5-getting-started)
6. [Architecture & Folder Structure](#6-architecture--folder-structure)
7. [Authentication Flow](#7-authentication-flow)
8. [User Roles & Permissions](#8-user-roles--permissions)
9. [Database Schema](#9-database-schema)
10. [Features](#10-features)
11. [Business Model](#11-business-model)
12. [Payment Integration](#12-payment-integration)
13. [Email Notifications](#13-email-notifications)
14. [Deployment](#14-deployment)
15. [Roadmap](#15-roadmap)
16. [Contributing](#16-contributing)
17. [Changelog](#17-changelog)

---

## 1. Project Overview

**Campus Crib** is a full-stack web platform that solves the off-campus housing crisis for Nigerian university students. It bridges the gap between local landlords and the student community by creating a verified, transparent marketplace — moving the process from shady WhatsApp group chats into a secure, trusted ecosystem.

| Attribute | Details |
|---|---|
| Live URL | [https://campuscrib.net] — PLACEHOLDER |
| Repository | [https://github.com/YOUR_USERNAME/campus-crib] — PLACEHOLDER |
| Target Users | University Students, Landlords, Admins |
| Core Value | Verified listings, visit scheduling, roommate matching |

---

## 2. Problem Statement

Nigerian university students searching for off-campus housing face two dangerous options:

- **Exploitative Agents** — charging exorbitant "viewing fees" and commissions that compete directly with tuition budgets.
- **Social Media Scams** — fraudulent listings on Facebook and WhatsApp groups that lead to financial loss or unsafe living conditions.

Students need more than a list of houses — they need a **reliable, verified ecosystem.**

---

## 3. The Solution

Campus Crib moves the housing search from unstructured group chats into a secure, transparent marketplace.

| Feature | What It Solves |
|---|---|
| Verification Engine | Every listing is vetted by an admin before students can see it — ending fraudulent ghost listings |
| Direct Connect | Students talk to landlords directly, eliminating agent commission fees |
| Student Reviews | Peer-to-peer ratings let students see real experiences before paying |
| Save & Compare | Bookmark listings and compare options side by side |
| Visit Scheduler | Built-in system to book onsite tours without pressure or agent involvement |
| Advanced Filtering | Filter by price, school, location, and house type |
| Find Roomie | Connect with compatible students looking for shared housing |

---

## 4. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server Components, Route Groups, Server Actions |
| Styling | Tailwind CSS | Utility-first, responsive-first |
| Database | Supabase (PostgreSQL) | Hosted Postgres with RLS policies |
| Auth | Supabase Auth | Email/password + session management via middleware |
| ORM / Client | Supabase JS Client | `@supabase/ssr` for server-side data access |
| Payments | Paystack | NGN-native payment gateway |
| Email | Resend | Transactional email notifications |
| Fonts | Geist (Google Fonts) | Variable font for headings and body |
| Deployment | netlify | CI/CD from main branch |
| Language | TypeScript | Strict mode throughout |

---

## 5. Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm / pnpm / yarn / bun
- A Supabase project (free tier works for development)
- A Paystack account (test mode for development)
- A Resend account (free tier for development)

### Installation

**Clone the repository:**
```bash
git clone https://github.com/benmarcel/campusCrib.git
cd campusCrib
```

**Install dependencies:**
```bash
npm install
# or
bun install
```

**Configure environment variables:**

Create a `.env` file in the project root:

```bash
# Supabase — get from your Supabase project dashboard > Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key

# Paystack — get from your Paystack dashboard > Settings > API Keys
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx

# Resend — get from resend.com > API Keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev  # use your verified domain in production

# App URL — used in email links
NEXT_PUBLIC_APP_URL=http://localhost:3000  # use your production URL in production
```

**Run the development server:**
```bash
npm run dev
# or
bun run dev
```

App available at `http://localhost:3000`

### Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anon key — safe to expose in browser |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Yes | Paystack public key — safe to expose in browser |
| `PAYSTACK_SECRET_KEY` | Yes | Paystack secret key — never expose publicly |
| `RESEND_API_KEY` | Yes | Resend API key for sending emails |
| `RESEND_FROM_EMAIL` | Yes | Verified sender email address |
| `NEXT_PUBLIC_APP_URL` | Yes | Base URL used in email notification links |

---

## 6. Architecture & Folder Structure

### Route Groups

| Route Group | Path | Purpose |
|---|---|---|
| `(root)` | `app/(root)/` | Main user experience — Navbar included |
|          | `app/auth/`   | Login & Sign-up — minimal layout, no Navbar |

### Folder Structure

```
campusCrib/
├── app/
│   ├── auth/
│   │   ├── login/                   →  /login
│   │   └── register/                →  /register
│   │
│   ├── (root)/
│   │   ├── (student)/               →  bookings/, roommate/, my-bookings/, saved-apartments/
│   │   ├── landlord/
│   │   │   └── dashboard/           →  [id]/, add/, my-bookings/
│   │   ├── admin/
│   │   │   └── dashboard/           →  /admin/dashboard
│   │   ├── profile/                 →  /profile/*
│   │   ├── apartments/              →  /apartments/[id]
│   │   ├── layout.tsx               →  layout
│   │   └── page.tsx                 →  HomePage
│   │
│   ├── api/
│   │   └── webhooks/
│   │       └── paystack/            →  POST /api/webhooks/paystack
│   │
│   ├── emails/
│   │   ├── RoommateRequestEmail.tsx
│   │   └── RoommateResponseEmail.tsx
│   │
│   ├── ui/
│   │   ├── components/              →  Shared components (Navbar, Footer)
│   │   ├── admin/                   →  Admin UI components
│   │   ├── landlord/                →  Landlord UI components
│   │   ├── student/                 →  Student UI components
│   │   ├── roommate/
│   │   │   ├── RoommateCard.tsx
│   │   │   ├── RoommateProfileForm.tsx
│   │   │   ├── ConnectButton.tsx
│   │   │   ├── IncomingRequestCard.tsx
│   │   │   └── OutgoingRequestCard.tsx
│   │   └── skeletons/               →  Loading skeleton components
│   │
│   ├── globals.css
│   └── layout.tsx                   →  Root layout
│
├── lib/
│   ├── supabase/                    →  Supabase client config (browser + server)
│   ├── actions.ts                   →  Next.js Server Actions
│   ├── data.ts                      →  Data fetching functions
│   ├── email.ts                     →  Resend email utility
│   ├── definitions.ts               →  TypeScript types & interfaces
│   └── utils.ts                     →  Shared utility functions
│
└── public/                          →  Static assets
```

---

## 7. Authentication Flow

Campus Crib uses Supabase Auth with email/password.

| Step | Event | What Happens |
|---|---|---|
| 1 | User registers | Supabase creates `auth.users` entry. A trigger auto-creates a matching `profiles` row with default role `student` |
| 2 | Email confirmation | User verifies email via Supabase confirmation link |
| 3 | User logs in | Supabase returns a session. Middleware reads the session cookie |
| 4 | Role-based redirect | After login, user is redirected based on `profile.role` — student → `/student`, landlord → `/landlord`, admin → `/admin/dashboard` |
| 5 | Protected routes | Middleware checks session on every `(root)` route. Unauthenticated users are redirected to `/login` |

---

## 8. User Roles & Permissions

Three user roles stored in `profiles.role`:

### Student
- Browse and search all active, verified apartment listings
- Filter listings by price, school, location, and house type
- Save listings to personal saved list
- Schedule onsite visit bookings
- Submit reviews and ratings for apartments
- Create a roommate profile and connect with other students
- Manage their own profile

### Landlord
- Create, edit, and deactivate their own apartment listings
- Upload images for each listing
- Pay verification fee to submit listing for admin review
- View and manage incoming visit booking requests
- Accept or cancel visit bookings

### Admin
- View all listings across all landlords
- Verify listings (approve / reject after payment is confirmed)
- Verify user profiles

---

## 9. Database Schema

### Entity Overview

| Table | Description |
|---|---|
| `profiles` | One-to-one extension of `auth.users`. Stores user data and role |
| `apartments` | Apartment listings created by landlords |
| `apartment_images` | Multiple images per apartment listing |
| `bookings` | Visit/tour requests made by students for a listing |
| `reviews` | Star ratings and comments left by students on listings |
| `saved_apartments` | Wishlist — apartments bookmarked by students |
| `verification_payments` | Payment records for apartment verification fees |
| `roommate_profiles` | Student roommate-seeker profiles |
| `roommate_requests` | Connect requests between students (created after payment) |
| `roommate_payments` | ₦200 payment records for roommate connect requests |

### profiles

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | uuid (PK) | No | References `auth.users(id)` |
| `full_name` | text | Yes | User's display name |
| `phone_number` | text | No | Required for all users |
| `avatar_url` | text | Yes | Profile image URL |
| `role` | text | No | One of: `student` / `landlord` / `admin`. Default: `student` |
| `is_verified` | boolean | No | Admin-verified flag. Default: `false` |
| `school` | text | Yes | University or institution |
| `address` | text | Yes | Residential address |
| `updated_at` | timestamptz | Yes | Auto-updated timestamp |

### apartments

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | uuid (PK) | No | Auto-generated listing ID |
| `landlord_id` | uuid (FK) | Yes | References `profiles(id)` |
| `title` | text | No | Listing headline |
| `description` | text | Yes | Long-form listing description |
| `price_per_year` | numeric | No | Annual rent in NGN |
| `address` | text | No | Full physical address |
| `school` | text | Yes | Nearest university |
| `is_verified` | boolean | No | Final visibility flag. Default: `false` |
| `is_active` | boolean | No | Landlord toggle. Default: `true` |
| `verification_status` | text | No | One of: `unsubmitted` / `pending_review` / `verified` / `rejected` |
| `created_at` | timestamptz | Yes | Creation timestamp |

### verification_payments

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | uuid (PK) | No | Auto-generated payment ID |
| `apartment_id` | uuid (FK) | Yes | References `apartments(id)` |
| `landlord_id` | uuid (FK) | Yes | References `profiles(id)` |
| `amount` | numeric | No | Amount in kobo |
| `status` | text | No | One of: `pending` / `paid` / `refunded` |
| `paystack_reference` | text | Yes | Paystack transaction reference |
| `created_at` | timestamptz | Yes | Payment timestamp |

### bookings

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | uuid (PK) | No | Auto-generated booking ID |
| `apartment_id` | uuid (FK) | Yes | References `apartments(id)` |
| `student_id` | uuid (FK) | Yes | References `profiles(id)` |
| `landlord_id` | uuid (FK) | Yes | Landlord for quick access |
| `visit_date` | timestamptz | Yes | Proposed visit date |
| `visit_time` | time | Yes | Proposed visit time |
| `status` | text | No | One of: `pending` / `confirmed` / `cancelled` |
| `contact_info` | text | Yes | Student contact for landlord |
| `created_at` | timestamptz | Yes | Booking timestamp |

### reviews

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | uuid (PK) | No | Auto-generated review ID |
| `apartment_id` | uuid (FK) | Yes | References `apartments(id)` |
| `student_id` | uuid (FK) | Yes | References `profiles(id)` |
| `rating` | integer | Yes | Star rating 1–5 |
| `comment` | text | Yes | Written review body |
| `created_at` | timestamptz | Yes | Submission timestamp |

### roommate_profiles

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | uuid (PK) | No | Auto-generated profile ID |
| `student_id` | uuid (FK) | No | References `profiles(id)`. Unique — one profile per student |
| `school` | text | No | Student's university |
| `department` | text | Yes | Student's department |
| `bio` | text | Yes | Short personal intro (max 300 chars) |
| `habits` | text[] | Yes | Lifestyle tags e.g. `['early riser', 'non-smoker']`. Max 6 |
| `is_active` | boolean | No | Visibility toggle. Default: `true` |
| `created_at` | timestamptz | Yes | Creation timestamp |

### roommate_requests

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | uuid (PK) | No | Auto-generated request ID |
| `sender_id` | uuid (FK) | No | References `profiles(id)` |
| `receiver_id` | uuid (FK) | No | References `profiles(id)` |
| `message` | text | Yes | Optional message from sender |
| `status` | text | No | One of: `pending` / `accepted` / `declined` |
| `paystack_reference` | text | No | Proof of ₦200 payment |
| `created_at` | timestamptz | Yes | Request timestamp |

> **Constraint:** `UNIQUE(sender_id, receiver_id)` — one request per pair ever, regardless of status.

### roommate_payments

| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | uuid (PK) | No | Auto-generated payment ID |
| `sender_id` | uuid (FK) | No | References `profiles(id)` |
| `receiver_id` | uuid (FK) | No | References `profiles(id)` |
| `amount` | numeric | No | Amount in kobo. Default: `20000` (₦200) |
| `status` | text | No | One of: `pending` / `paid` |
| `paystack_reference` | text | Yes | Paystack transaction reference |
| `created_at` | timestamptz | Yes | Payment timestamp |

---

## 10. Features

### Implemented

| Feature | Description |
|---|---|
| Authentication | Student & landlord sign-up/login via Supabase Auth |
| Search & Filter | Filter listings by price, school, location, and house type |
| Listing Management | Landlords create, edit, and deactivate listings |
| Image Uploads | Multiple images per listing via Supabase Storage |
| Save Listings | Students bookmark listings for later review |
| Visit Booking | Students schedule onsite tours with date, time, and contact info |
| Reviews | Star ratings (1–5) and written comments on listings |
| Apartment Verification | Landlords pay ₦5,000 verification fee. Admins approve/reject |
| Admin Dashboard | Tabbed queue for pending users and apartments with live counts |
| Find Roomie — Browse | Grid of active roommate profiles with request status badges |
| Find Roomie — Create Profile | Form to create/edit roommate profile with habits and bio |
| Find Roomie — Connect | ₦200 Paystack payment to send a connect request |
| Find Roomie — Requests | Incoming/outgoing request management with accept/decline |
| Email Notifications | Resend emails on request received, accepted, and declined |
| Responsive Design | Fully mobile-optimised layout |

### Known Limitations

- Visit scheduling is not yet wired to email notifications — booking confirmation is UI-only
- Map view is not yet implemented — location is text-only
- Roommate profile requires a custom domain to send emails to all users (currently using Resend test address)

---

## 11. Business Model

Campus Crib monetizes the **supply side** — landlords and students who initiate connections — keeping the browsing experience free for all students.

### Active Revenue Streams

**Apartment Verification Fee — ₦1,000 per listing (non-refundable)**

Landlords pay a one-time fee to submit their listing for admin review. Only verified listings are visible to students. The fee covers the cost of physical/document verification and creates a natural quality gate — eliminating low-quality and fraudulent listings.

- Fee is non-refundable regardless of outcome
- Rejected landlords may resubmit after fixing issues without paying again
- Admin approves or rejects from the dashboard queue

**Roommate Connect Fee — ₦200 per request (non-refundable)**

Students pay ₦200 to send a connect request to another student on the roommate board. The fee is charged before the request is created — no payment, no request. This filters out spam and signals genuine intent.

- Fee is non-refundable
- One request per sender/receiver pair ever
- If accepted, both students' phone numbers are revealed to each other

### Planned Revenue Streams

- **Boosted listings** — landlords pay a one-time fee to pin their listing to the top of search results for 7–14 days
- **Renters insurance partnership** — referral fee per policy sold at point of booking
- **Moving/logistics referrals** — referral fee from moving company partners
- **Anonymised data insights** — housing demand reports for universities and NGOs

---

## 12. Payment Integration

Campus Crib uses **Paystack** for all payments — Nigerian-native, handles NGN, supports webhooks.

### Payment Flows

**Apartment Verification**
```
Landlord clicks "Pay to request verification"
  → initiateVerificationPayment() creates pending payment record
  → Paystack popup opens (₦5,000)
  → On payment success:
      → Webhook fires → verifies signature → updates verification_payments
      → Sets apartments.verification_status = 'pending_review'
  → Admin sees listing in review queue
  → Admin approves → is_verified = true, verification_status = 'verified'
  → Listing becomes visible to students
```

**Roommate Connect**
```
Student clicks "Connect · ₦200"
  → initiateRoommatePayment() checks no existing request, creates pending payment
  → Paystack popup opens (₦200)
  → On payment success:
      → Webhook fires → confirmRoommatePayment()
      → roommate_payments updated to 'paid'
      → roommate_requests row created with status 'pending'
      → Email sent to receiver
  → Receiver accepts/declines from /roommate/requests
  → Email sent to sender with outcome
```

### Webhook Setup

Your Paystack webhook URL:
```
https://your-domain.com/api/webhooks/paystack
```

The webhook distinguishes payment types via the `type` field in Paystack metadata:
- `type: 'apartment_verification'` → updates `verification_payments` + `apartments`
- `type: 'roommate_request'` → updates `roommate_payments` + creates `roommate_requests`

For local development use **ngrok** to expose localhost:
```bash
ngrok http 3000
# paste the https URL into Paystack dashboard > Settings > Webhooks
```

### Paystack Dashboard Settings

| Field | Value |
|---|---|
| Webhook URL | `https://your-domain.com/api/webhooks/paystack` |
| Callback URL | `https://your-domain.com/landlord/listings?payment=success` |

---

## 13. Email Notifications

Campus Crib uses **Resend** for transactional email notifications.

### Emails Sent

| Trigger | Recipient | Subject |
|---|---|---|
| Roommate request received | Receiver | `[Sender] wants to room with you 🏠` |
| Roommate request accepted | Sender | `[Receiver] accepted your roommate request! 🎉` |
| Roommate request declined | Sender | `Update on your roommate request` |

When a request is **accepted**, the receiver's phone number is included directly in the email body — no need to log in to get the contact.

### Setup

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev       # development
# RESEND_FROM_EMAIL=hello@campuscrib.net      # production (requires verified domain)
```

### Coming Later — SMS Notifications

SMS notifications via a Nigerian SMS gateway (e.g. Termii, Sendchamp) are planned for a future release. When implemented, students will receive an SMS on the same three events listed above — useful for students who may not check email frequently. This requires a verified sender ID from the SMS provider.

---

## 14. Deployment

### Deploy to Netlify or Vercel
#### if using vercel:

1. Push code to GitHub
2. Go to vercel.com → import your GitHub repository
3. Add all environment variables from `.env.local` in Vercel project settings
4. Deploy — Vercel auto-deploys on every push to `main`

### Supabase Production Config

- Dashboard → Authentication → URL Configuration → set Site URL to your Vercel URL
- Add `https://your-app.vercel.app/auth/callback` to Redirect URLs
- Run the `get_user_email` RPC function in the SQL editor:

```sql
CREATE OR REPLACE FUNCTION get_user_email(user_id uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT email FROM auth.users WHERE id = user_id;
$$;
```

---

## 15. Roadmap

| Feature | Status |
|---|---|
| Initial project setup | ✅ Done |
| Auth + role-based routing | ✅ Done |
| Apartment listings + filtering | ✅ Done |
| Supabase database integration | ✅ Done |
| Apartment verification + Paystack | ✅ Done |
| Admin dashboard | ✅ Done |
| Find Roomie — full feature | ✅ Done |
| Email notifications (Resend) | In progress |
| Map view for listings | 🔲 Planned |
| Payment gateway for rent | 🔲 Planned |
| Boosted listings | 🔲 Planned |
| SMS notifications | 🔲 Planned (after domain setup) |
| Renters insurance partnership | 🔲 Planned |
| Mobile app (React Native) | 🔲 Future |

---

## 16. Contributing

### Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready. Protected — no direct pushes |
| `dev` | Active development. Merge features here first |
| `feature/feature-name` | One branch per feature or bug fix |

### Steps

1. Fork the repository
2. Clone your fork: `git clone https://github.com/benmarcel/campusCrib.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make changes and commit: `git commit -m "feat: describe your change"`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a Pull Request targeting the `dev` branch

### Commit Convention

```
feat:     new feature
fix:      bug fix
docs:     documentation update
style:    formatting, no logic change
refactor: restructure without feature change
chore:    dependencies, config changes
```

---

## 17. Changelog

| Version | Date | Changes |
|---|---|---|
| v0.2.0 | March 2026 | Find Roomie feature, email notifications, admin dashboard, Paystack verification flow |
| v0.1.0 | February 2026 | Initial setup — auth, listings, search & filter, visit booking |