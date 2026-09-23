# FuturnAI Portfolio

Personal portfolio website showcasing my work as a Full-Stack Developer and AI Engineer, with a focus on AI-powered systems, Arabic NLP, and scalable backend architecture.

## Overview

A single-page portfolio built with plain HTML, CSS, and JavaScript — no framework, no build step. It features:

- Hero section with role, bio, live status card, and quick stats
- Skills grid organized by category (languages, frontend, backend, AI/ML, databases, tools)
- Featured project cards with per-project GitHub dropdowns for multi-repo projects (frontend/backend split)
- Interactive screenshot sliders with manual navigation, auto-play, and a full-screen lightbox with keyboard support
- A working contact form (submits via [Formspree](https://formspree.io), no backend required)
- Fully responsive layout, tuned down to small phones
- Scroll-triggered reveal animations via `IntersectionObserver`
- Graceful image fallbacksif an illustration or logo fails to load, a styled placeholder renders instead

## Featured Projects

| Project | Description | Stack |
|---|---|---|
| **SolarAI** | Real-time multi-agent AI system for detecting and diagnosing faults in commercial solar PV installations | Python, FastAPI, React, TensorFlow, LangGraph, PostgreSQL, Gemini API |
| **SportsTrends** | Arabic sports news & YouTube trend analysis with an AI-driven prediction engine | FastAPI, AraBERT, CAMeL Tools, React, PyTorch, Gemini API |
| **منصة للدروس** | School management & e-learning platform with student, teacher, and admin portals | Next.js, Flask, PostgreSQL, Python |
| **Herfty** | E-commerce backend connecting Algerian artisan vendors with customers | Spring Boot, Spring Security, MySQL, Java |
| **E-Learning Platform** | Server-rendered course management system with admin/instructor control | Spring Boot, Thymeleaf, MySQL, Java |

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 — custom properties, Grid, Flexbox, no preprocessor |
| Interactivity | Vanilla JavaScript (no frameworks, no dependencies) |
| Icons | [Lucide](https://lucide.dev) via CDN, with PNG fallbacks for a few brand icons |
| Fonts | Google Fonts — Instrument Serif, Inter, JetBrains Mono, Tajawal |
| Form handling | [Formspree](https://formspree.io) |
| Hosting | GitHub Pages / Netlify / Vercel (static site, no server needed) |

## Project Structure

```text
portfolio/
├── index.html              # Page markup
├── style.css                # All styles
├── script.js                 # Nav, sliders, lightbox, reveal animations, contact form
├── futurnai.png              # Logo 
├── icons/
│   └── ...
├── Screenshots/               # Project screenshots used in the sliders
│   └── ...
└── README.md
```

## License

This project is personal portfolio code. Feel free to reference the structure, but please don't reuse the content, screenshots, or branding as your own.

## Contact

**FuturnAI** — [futurnai.pro@email.com](mailto:futurnai.pro@gmail.com) · [github.com/futurnaipro](https://github.com/futurnaipro)