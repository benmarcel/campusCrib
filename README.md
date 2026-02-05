# Project Documentation: Campus Crib

## 1. Project Overview

**Campus Crib** is a full-stack web application designed to help students find and book affordable housing close to their university campuses. It bridges the gap between local landlords and the student community.

* **Target Audience:** University Students & Property Managers.
* **Key Value Prop:** Verified listings, proximity-based search, and seamless booking.

That is a much more powerful and personal foundation. Using **Bethel** as a user persona makes the documentation feel human and focused.

Here is the updated **Problem & Solution** section for your README, refined to match your specific narrative:

---

## Problem Statement: The "Bethel" Scenario

Bethel, a university student, is struggling to find a safe place to live. Like thousands of others, she is trapped between two bad options:

* **Exploitative Middlemen:** Local agents charging exorbitant "viewing fees" and commissions that eat into her tuition budget.
* **The "Social Media Trap":** Fraudulent listings on platforms like Facebook and WhatsApp that lead to financial loss or unsafe living conditions.

Bethel needs more than just a list of houses; she needs a **reliable, verified ecosystem.**

## The Solution: Campus Crib

**Campus Crib** is a specialized platform (Web) designed to eliminate the risk and stress of off-campus housing. We move the process from shady group chats into a secure, transparent marketplace.

### Core Solutions

* **Verification Engine:** Every listing is vetted to ensure it actually exists, ending the era of fraudulent social media scams.
* **Cost Transparency:** By connecting students directly to verified listings, we reduce the reliance on exploitative "agent fees."
* **Trust Through Community:** Integrated **Student Reviews** allow Bethel to see what life is actually like in a building before she pays a dime.
* **Commitment Without Risk:** Features like **Saving Listings** (apartment) for later and **Onsite Visit Scheduling** ensure students can perform due diligence without pressure.

### Key Technical Features

* **Advanced Filtering:** Filter by price, proximity to specific campus gates(location), House type base on student preference, and school(university or other higher institutions).
* **Safe-List Bookmarking:** A "Save for Later" feature to compare options side-by-side.
* **Visit Coordinator:** A built-in system to schedule physical tours of the property.
* **Review System:** A peer-to-peer rating system specifically for student tenants.

---

## 2. Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Styling:** Tailwind CSS
* **State/Data:**  Supabase
* **Fonts:** Geist (Google Fonts)

---

## 3. Architecture & Layout

The project uses **Next.js Route Groups** to handle different UI requirements:

* **`(root)`**: Contains the primary user experience including the `Navbar`.
* **`(auth)`**: Handles login and registration with a clean, focused layout (no Navbar).
* **`ui/`**: Reusable atomic components and sections.

---

## 4. Getting Started

### Prerequisites

* Node.js 18.x or higher
* npm / pnpm / yarn / bun

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/benmarcel/campusCrib.git

```


2. **Install dependencies:**
```bash
npm install or bun install

```


3. **Set up Environment Variables:**
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key

```


4. **Run the development server:**
```bash
npm run dev or bun run dev

```



---

## 5. Features

* [X] **Search & Filter:** Find houses based on location, price, house type, school.
* [X] **Authentication:** Secure sign-up/login for students and landlords (supabase).
* [X] **Responsive Design:** Fully optimized for mobile (crucial for students on the go).
* [ ] **Theme Switching:** Support for system, light, and dark modes.

---

## 6. Folder Structure

```text
├── app/
│   ├── (auth)/          # Authentication routes (Login/Signup)
│   ├── (root)/          # Core app routes (Students, admin, landlords, profile)
│   ├── globals.css      # Global styles
│   ├── page.tsx         # Home page
│   └── layout.tsx       # Root configuration (Providers)
│  
├── lib/                 # supabase(config), actions, data, definitions(types), utils
├── ui/
│   ├── components/      # Shared components (Navbar, Footer, etc..)
│   ├── Landlords/       # Landlord route related component
│   ├── student/         # Student route related component
│   ├── admin/           # admin route related component
│   └── skeletons/       # Non-blocking ui componets (components that shows while user data is still fetched) 
└── public/              # Static assets (Images, Icons)

```

---

## 7. Roadmap

* [x] Initial Project Setup
* [x] Route Grouping for Auth/Root
* [X] Integration with Database
* [ ] Map View for Property Locations
* [ ] Payment Gateway Integration

---

## 8. Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
