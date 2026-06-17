# Grey Plumbing Inc. — Multi-Page Website

A premium, fully responsive **multi-page** marketing website for Grey Plumbing Inc., a residential and commercial plumbing company serving Indianapolis, Indiana. The Home page is a focused hero; every other section lives on its own page reached from the top navigation / hamburger menu. Clean, modern, blue-themed UI built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

**Live site:** https://zjhunter29.github.io/innovative-cpa/

## Pages

| Page | File | Contents |
|------|------|----------|
| Home | `index.html` | Hero with trust dashboard (Licensed & Insured, 24/7, Same-Day, 5-Star) |
| About | `about.html` | Company story, Why Choose Us grid, stats, process timeline + CTA |
| Services | `services.html` | Six plumbing service cards + CTA |
| Testimonials | `testimonials.html` | Customer review carousel + CTA |
| Contact | `contact.html` | Contact details + service-request form |

## Architecture

- **`styles.css`** — shared stylesheet for every page (design tokens, glass components, layout, responsive rules).
- **`script.js`** — shared behavior: sticky/shrinking navbar, mobile menu, scroll-reveal, animated counters, testimonial carousel, and the contact form.
- **`logo.jpg`** — the Grey Plumbing logo (header, mobile nav, favicon, Open Graph image).
- Each page is a standalone HTML document that links the shared CSS/JS and marks its own nav item active.

## Brand

- **Primary:** Deep Professional Blue `#0A4FAF`, Medium Blue `#2E73D8`
- **Accent:** Bright Plumbing Blue `#3C90FF`
- **Secondary:** Slate Gray `#5B6675`, Light Gray `#E8EDF2`
- Typography: Inter (UI/body) + Source Serif 4 (display headings)

## Features

- **Multi-page navigation** — shared glass navbar + hamburger menu; the current page is highlighted.
- **Modern UI** — glassmorphism cards, gradient orbs, animated grid, soft depth, scroll-reveal, animated counters.
- **Fully responsive** — mobile-first across mobile, tablet, laptop, and desktop.
- **Accessible & resilient** — semantic HTML, focus styles, `prefers-reduced-motion`, skip link, and fallbacks so content is never left hidden if JavaScript or the IntersectionObserver is suspended.
- **SEO-ready** — unique title/description/canonical per page, Open Graph + Twitter tags, and `Plumber` schema.org data on the home page.

## Running locally

Static files — open `index.html` in a browser, or serve the folder:

```bash
npx http-server . -p 4322
```

## Deployment

Hosted on **GitHub Pages** from the `main` branch (root). Any push to `main` updates the live site.
