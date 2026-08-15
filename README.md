<div align="center">

# The Digital Forum

### Entrepreneuriat digital · Networking · Certification · Impact

**A digital entrepreneurship event platform built for the Guinean ecosystem.**

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

**Built by [Popy Traoré](https://github.com/popytech) · POPY TECH**

</div>

---

## Overview

**The Digital Forum** is a platform supporting a recurring series of events focused on digital entrepreneurship in Guinea.

The product is designed to handle more than a marketing landing page: it centralizes the public event experience, participant registration, confirmation flows, check-in operations, editions, speakers, sponsors, gallery content and administration.

The project reflects a product-first approach: connect **event operations**, **participant experience** and **digital visibility** inside one platform.

---

## Product scope

The current application includes dedicated flows for:

- Event landing and institutional presentation
- Participant registration
- Registration confirmation
- Event check-in
- Editions and event history
- Speaker presentation
- Sponsor presentation
- Team presentation
- Media gallery
- Contact experience
- Administrative area
- API routes and backend integrations

---

## Architecture

```text
app/
├── a-propos/       # About the initiative
├── admin/          # Administration
├── api/            # Server/API routes
├── check-in/       # Participant check-in
├── confirmation/   # Registration confirmation
├── contact/        # Contact flow
├── editions/       # Event editions
├── equipe/         # Team
├── galerie/        # Media gallery
├── inscription/    # Registration
├── speakers/       # Speakers
└── sponsors/       # Partners & sponsors

components/         # Reusable UI and layout components
lib/                # Application services and utilities
supabase/           # Database/backend resources
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 |
| Language | TypeScript |
| UI | React 18 |
| Styling | Tailwind CSS |
| Database / Backend | Supabase |
| Validation | Zod |
| Forms | React Hook Form |
| Motion | Framer Motion |
| PDF generation | React PDF |
| QR workflows | QRCode / QRCode React |
| Email | Nodemailer |
| Messaging integration | Africa's Talking |

---

## Product capabilities

### Registration & participant flow
The platform supports a structured journey from discovery to registration, confirmation and on-site check-in.

### Event operations
An administrative area and API layer support the operational side of the event rather than keeping the website purely informational.

### Event ecosystem
Dedicated sections surface speakers, sponsors, team members, editions and media content to make the platform reusable across multiple editions.

### Communication tooling
The codebase includes email, SMS/messaging, PDF and QR-oriented dependencies for participant communication and event operations.

---

## Local development

### 1. Clone

```bash
git clone https://github.com/popytech/thedigitalforum.git
cd thedigitalforum
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env.local` file and configure the required Supabase and application integration variables for your environment.

> Never commit production secrets, API keys or service credentials.

### 4. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 5. Production build

```bash
npm run build
npm start
```

---

## Product direction

The long-term direction is to make **The Digital Forum** a reusable digital layer for event discovery, registration, participant management, certification and community building around digital entrepreneurship in Guinea.

---

## Creator

**Popy Traoré**  
Tech Entrepreneur · Product Builder · Digital Consultant

- GitHub: [@popytech](https://github.com/popytech)
- Website: [popytech.com](https://popytech.com)
- Training: [popytech.online](https://popytech.online)

---

<div align="center">

**Built in Guinea 🇬🇳 · Designed for impact in Africa 🌍**

</div>
