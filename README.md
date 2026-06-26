# WhereTuWin 🏍️

> **Late to class. Need a Win. No idea where the nearest one is.**
> We've all been there. This app fixes that.

**WhereTuWin** is an interactive map for Thammasat University (Rangsit campus) students to locate the nearest motorcycle taxi (**Win / วิน**) queue spots — fast. Open the app, see where you are, find the closest Win, and get moving.

---

## What is a "Win"?

If you've never lived in Thailand: **Win** (วิน) are motorcycle taxi drivers in numbered colored vests who hang out at designated queue spots across the city. They're fast, cheap, and absolutely essential for navigating TU's sprawling Rangsit campus. Finding one when you're late is a skill. This app makes it effortless.

---

## Features

- **Interactive map** — powered by Leaflet + OpenStreetMap/CARTO tiles, centered on TU Rangsit
- **Live geolocation** — your position shows as a blue dot on the map
- **Nearest Win button** (🏍️) — one tap to fly the map to the closest queue spot
- **My Location button** (📍) — re-centers the map on you
- **Spot info cards** — tap any marker to see the spot's name, area, landmark, and operating hours
- **Smooth splash screen** — because first impressions matter
- **Hamburger menu** with About, Contact Us, and... a surprise

---

## Pages

| Route         | Description                                               |
| ------------- | --------------------------------------------------------- |
| `/`           | Animated splash / loading screen                          |
| `/dashboard`  | Main map view with all Win spots                          |
| `/about`      | What this app is, how to use it, how to report wrong data |
| `/contact-us` | Email + Instagram for the team                            |

---

> Spot missing or moved? Email **WhereTUWin@gmail.com** or hit the "Report Bug" link in the menu. (Yes, it's a link. Yes, it works. Trust us.)

---

## Tech Stack

| Layer      | Tech                       |
| ---------- | -------------------------- |
| Framework  | React 19                   |
| Language   | TypeScript                 |
| Build tool | Vite                       |
| Routing    | React Router DOM v7        |
| Map        | React-Leaflet + Leaflet.js |
| Deployment | Vercel                     |

---

## Project Structure

```
src/
├── pages/
│   ├── loading.tsx       # Splash screen with fade-out animation
│   ├── dashboard.tsx     # Main page — Navbar + Map
│   ├── about.tsx         # App info and how-to-use
│   └── contactUs.tsx     # Contact info
├── components/
│   ├── MapView.tsx       # Full map logic, geolocation, fly-to buttons
│   ├── QueueCard.tsx     # Spot info card (shown on marker click)
│   ├── navbar.tsx        # Responsive nav with hamburger + back variants
│   └── SearchBox.tsx     # Search (in progress)
└── data/
    └── queueSpots.tsx    # All spot data lives here
```

## Contact

Built by TU students who like to wander (and occasionally miss the bus).

- **Email:** WhereTUWin@gmail.com
- **Instagram:** [@WhereTUWin](https://instagram.com/WhereTUWin)

---

_Made with caffeine, Google Maps envy, and the burning urgency of being three minutes late to a 9 AM._
