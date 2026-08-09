# IBEX Investments Group — Corporate Website

Premium corporate website for **IBEX Investments Group** — gas station acquisitions, commercial real estate, fuel distribution, sale-leaseback / NNN partnerships, and multi-state retail operations across the United States.

**Tagline:** Strong Foundation • Smarter Futures • Lasting Legacy

---

## Overview

This site presents IBEX as a professional investment and operating company with:

- Nearly two decades of industry experience (since **2006**)
- **90+** locations and multi-state operations
- **$200M+** asset portfolio
- Active acquisitions, investor partnerships, and fuel brand relationships

Built for speed, mobile responsiveness, and a charcoal + gold brand identity.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Components | Shadcn UI / Base UI |
| Motion | Framer Motion |
| Icons | Lucide React |
| Maps | Leaflet + React Leaflet |
| Images | Next.js Image + Sharp |

---

## Features

- **Hero slider** — short intro video first, then brand photography
- **Investment Opportunities** — hover/tap reveal panels with lazy-loaded videos
- **Multi-state portfolio map** — Texas, Louisiana, Mississippi (no public asking prices)
- **Floating contact** — WhatsApp, call, and location shortcuts
- **Testimonials carousel** — partner / operator feedback
- **Our Companies** — subsidiary / partner brand showcase
- **Contact form** — lead capture UI
- **IBEX favicon & branding** — custom logo in browser tab and UI
- **Performance-minded media** — compressed web videos; oversized source files ignored by Git

---

## Pages / Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, stats, services, investments, companies, testimonials, CTAs |
| `/about` | About Us | Company story, leadership, values, milestones |
| `/services` | Services | Acquisitions, operations, leases, fuel, franchises |
| `/properties` | Properties | Portfolio map + state listings (no prices shown) |
| `/fuel-distribution` | Fuel Distribution | Supply, brands, commercial fuel programs |
| `/our-companies` | Our Companies | Related companies and brands |
| `/careers` | Careers | Culture and open roles / apply CTA |
| `/contact` | Contact | Form, phone, email, address |

---

## Project Structure

```
Ibex_Investment_Group/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Home
│   ├── about/
│   ├── services/
│   ├── properties/
│   ├── fuel-distribution/
│   ├── our-companies/
│   ├── careers/
│   ├── contact/
│   ├── layout.tsx            # Root layout, navbar, footer, floating contact
│   ├── globals.css
│   ├── icon.png / favicon.ico
│   └── apple-icon.png
├── components/
│   ├── home/                 # Homepage sections (hero, investments, etc.)
│   ├── layout/               # Navbar, footer, floating contact, background
│   ├── properties/           # Portfolio map
│   ├── shared/               # Reusable UI blocks
│   └── ui/                   # Buttons, inputs, cards, etc.
├── lib/
│   ├── constants.ts          # Company data, portfolio, content
│   ├── animations.ts
│   ├── icons.ts
│   └── utils.ts
├── public/
│   ├── hero/                 # Hero images + compressed intro video
│   ├── videos/               # Investment panel videos (web-optimized)
│   ├── logo*.png
│   └── favicon / icons
├── package.json
└── next.config.ts
```

---

## Getting Started

### Requirements

- Node.js **20+** recommended
- npm

### Install & run (development)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Configuration & Content

Most business copy and listings live in:

- `lib/constants.ts` — company info, leadership, services, portfolio locations, testimonials, nav links

Update phone, email, address, and leadership there so the whole site stays in sync.

### Portfolio map

- Locations: `PORTFOLIO_LOCATIONS` in `lib/constants.ts`
- UI: `components/properties/portfolio-map.tsx`
- Optional Google My Maps embed: set `GOOGLE_MY_MAPS_EMBED_URL` in constants (if empty, Leaflet map is used)
- **Asking prices are not displayed** on the public site

### Media notes

Git ignores oversized source videos (GitHub size limits). The site uses compressed web versions, for example:

- `public/hero/hero-intro.mp4`
- `public/videos/station-cinematic-web.mp4`

---

## Company Information

| Role | Name |
|------|------|
| CEO | Zaied Musleh |
| Vice President | Abdilaziz Altahri |

| Field | Value |
|-------|--------|
| Company | IBEX Investments Group |
| Founded | 2006 |
| Address | 45 E Main Street, Unit 203, Newark, DE 19711, United States |
| Phone | +1 (347) 613-9829 |
| Email | info@ibexinvestments.com |

---

## Brand

| Token | Value |
|-------|--------|
| Charcoal | `#141820` |
| Gold | `#D4AF37` |
| Ivory | `#F7F5F1` |

---

## Deploy

Recommended host: **[Vercel](https://vercel.com)** (native Next.js support).

1. Push this repository to GitHub  
2. Import the repo in Vercel  
3. Deploy (default Next.js settings)  
4. Add a custom domain when ready  

Other hosts that support Next.js (Netlify, Cloudflare, Node VPS) can also work with the correct adapter / Node runtime.

---

## Repository

Primary remote for this project:

```text
https://github.com/Ibexgroups/Ibexg-website-.git
```

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## License

Private / proprietary — IBEX Investments Group. All rights reserved.
