# 🎓 COGNITION Coaching Centre — Official Website

> **Where Curiosity Meets Clarity**

🌐 **Live Site → [https://cognitionofficial.github.io](https://cognitionofficial.github.io)**

---

## 📌 About

**COGNITION Coaching Centre** is a premium physics and mathematics coaching institute based in **Kolkata, West Bengal**. This repository hosts the official static website, deployed via **GitHub Pages** at [cognitionofficial.github.io](https://cognitionofficial.github.io).

The website is built with pure **HTML5 + CSS3 + Vanilla JavaScript** — no frameworks, no build tools, no backend — making it fully compatible with GitHub Pages out of the box.

---

## ✨ Features

- 🎬 **Video Hero** — Full-screen video background with animated particle overlay
- 📱 **Fully Responsive** — Works on all devices (mobile-first, 3 breakpoints)
- ⚡ **Scroll Animations** — Reveal-on-scroll for sections, staggered card entries
- 🖱️ **Mouse Parallax** — Depth effect on the hero section
- 📝 **PDF Notes Viewer** — Inline PDF preview with tab switching
- 🎥 **Video Gallery** — Embedded YouTube class recordings
- 💬 **Testimonials Slider** — Auto-sliding with touch/swipe support
- 📊 **Animated Counters** — Stats that count up when scrolled into view
- 📍 **Live Google Maps Embed** — Directions to the coaching centre
- 💬 **WhatsApp Floating Button** — Instant chat, shakes every 9 seconds
- 📞 **Click-to-Call Button** — One-tap calling on mobile
- 🏆 **Results / Toppers Section** — Showcase of student achievements
- 🌙 **Smooth Navigation** — Sticky navbar with section spy highlighting

---

## 🗂️ Website Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Full-screen banner with video bg, stats, and CTAs |
| 2 | **About** | Institute story, values, and key highlights |
| 3 | **Courses** | ICSE (8–10), WBJEE, JEE Foundation, Board Crash Course |
| 4 | **Results** | Top-scoring students and their marks/ranks |
| 5 | **Notes** | Free PDF study materials (Physics & Maths CBSE) |
| 6 | **Gallery** | YouTube-embedded class recordings |
| 7 | **Testimonials** | Student & parent reviews |
| 8 | **Contact** | Address, phone, map, and enquiry CTAs |
| 9 | **Footer** | Quick links, programmes, contact info |

---

## 🎨 Design System

| Property | Value |
|----------|-------|
| **Primary Color** | Golden Yellow `#FFB800` |
| **Secondary Color** | Royal Purple `#7B2FBE` |
| **Heading Font** | [Poppins](https://fonts.google.com/specimen/Poppins) (400–900) |
| **Body Font** | [Open Sans](https://fonts.google.com/specimen/Open+Sans) (400–600) |
| **Border Radius** | 12px (cards), 50px (pills) |
| **Primary Shadow** | `0 20px 60px rgba(255,184,0,0.3)` |

---

## 📁 Project Structure

```
cognitionofficial.github.io/
│
├── index.html          # Main website (single-page, all sections)
├── style.css           # All styles, animations & responsive rules
├── script.js           # All JS — scroll reveals, slider, parallax, counters
├── .gitattributes      # Git LFS tracking rules for binary assets
├── README.md           # This file
│
├── images/
│   ├── logo bg removed .png    # COGNITION logo (transparent bg)
│   └── Cognition_Banner.png    # Hero / About section banner
│
└── pdfs/
    ├── Maths-SQP-CBSE.pdf      # Maths Sample Question Paper
    ├── Maths-MS-CBSE.pdf       # Maths Marking Scheme
    └── Physics-MS-CBSE.pdf     # Physics Marking Scheme
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic, ARIA-accessible) |
| Styling | CSS3 (custom properties, Grid, Flexbox, animations) |
| Interactivity | Vanilla JavaScript (ES6+, IIFE, IntersectionObserver, rAF) |
| Fonts | Google Fonts (Poppins + Open Sans) |
| Icons | Font Awesome 6 (CDN) |
| Hosting | GitHub Pages |
| Asset Storage | Git LFS (images & PDFs) |

---

## 🚀 Git LFS

Large binary files (images, PDFs) are stored using **[Git Large File Storage (LFS)](https://git-lfs.com/)**.

### Tracked extensions (via `.gitattributes`)
```
*.png  *.jpg  *.jpeg  *.gif  *.webp  *.svg
*.mp4  *.mov  *.avi
*.pdf
```

### Setup for local development
```bash
# 1. Install Git LFS (once per machine)
brew install git-lfs        # macOS
# or: apt install git-lfs   # Ubuntu/Debian

# 2. Initialize LFS in git
git lfs install

# 3. Clone the repo (LFS files download automatically)
git clone https://github.com/COGNITIONOFFICIAL/cognitionofficial.github.io.git
```

---

## 📲 Contact & Links

| | |
|--|--|
| 📞 Phone | [+91 7908570678](tel:+917908570678) |
| 💬 WhatsApp | [wa.me/917908570678](https://wa.me/917908570678) |
| 📍 Location | Kolkata, West Bengal, India |
| 🕒 Hours | Monday – Saturday · 3:00 PM – 8:00 PM |
| 🌐 Website | [https://cognitionofficial.github.io](https://cognitionofficial.github.io) |
| 🐙 GitHub | [github.com/COGNITIONOFFICIAL](https://github.com/COGNITIONOFFICIAL) |

---

## 🖥️ Local Development

No build step required — just open the file in a browser:

```bash
git clone https://github.com/COGNITIONOFFICIAL/cognitionofficial.github.io.git
cd cognitionofficial.github.io
open index.html    # macOS
# or: start index.html  (Windows)
# or: xdg-open index.html  (Linux)
```

Or serve locally with Python for iframe/PDF support:
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

---

## 📝 Customization Notes

- **Hero Video**: Replace `hero-bg.mp4` in the project root with your own video (max ~15s loop recommended)
- **Gallery Videos**: Update the YouTube `src` URLs in the `#gallery` section of `index.html`
- **Topper Cards**: Edit the `.result-card` entries in `index.html` with real student photos/names
- **Google Maps**: Replace the `<iframe>` src in the `#contact` section with your exact address embed

---

## 📜 License

© 2026 **COGNITION Coaching Centre**. All rights reserved.  
This website and its content are the exclusive property of COGNITION Coaching Centre, Kolkata.