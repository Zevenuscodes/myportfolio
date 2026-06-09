# YASH.EDIT — Cyberpunk Video Portfolio

A full 3D cyberpunk portfolio built with React, Three.js (@react-three/fiber), and Framer Motion.

## Stack

- **React 18** — UI framework
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Three.js helpers (OrbitControls, Float, Stars)
- **Framer Motion** — animations & page transitions
- **react-intersection-observer** — scroll-triggered animations

## Quick Start

```bash
cd yash-portfolio
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build for Production

```bash
npm run build
```

Outputs to the `build/` folder. Deploy to Vercel, Netlify, or any static host.

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed nav with scroll detection
│   ├── HeroScene.jsx       # Full-screen hero with 3D canvas
│   ├── Character3D.jsx     # The 3D pixel character (pure Three.js geometry)
│   ├── WorkGallery.jsx     # Portfolio grid with hover effects
│   ├── Contact.jsx         # Contact form with neon styling
│   ├── Footer.jsx          # Footer with pulsing status
│   ├── CyberDivider.jsx    # Neon gradient divider
│   └── CyberpunkCursor.jsx # Custom trailing cursor
├── styles/
│   └── global.css          # CSS variables & global resets
├── App.jsx                 # Root component
└── index.js                # Entry point
```

## Customization

### Change your name / brand
Search and replace `YASH` and `YASH.EDIT` across all components.

### Add your hero image
In `HeroScene.jsx`, you can replace the 3D character with your image:
```jsx
<img src="/your-image.png" alt="hero" style={{ ... }} />
```
Or place your image in `public/` and reference it as `/your-image.png`.

### Add real project thumbnails
In `WorkGallery.jsx`, replace the `<ThumbArt />` SVG art with:
```jsx
<img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
```
Add a `thumbnail` field to each object in `PROJECTS`.

### Update stats
In `HeroScene.jsx`, find the `stats` array and update the numbers.

### Social links
In `Contact.jsx`, find the `SOCIALS` array and update the `href` values on each `<motion.a>`.

## Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```
