# Innovative Small Business Solutions CPA — Multi-Page Site

A premium, fully responsive **multi-page** marketing website for a modern CPA / accounting firm. The Home page is a focused hero; every other section lives on its own page reached from the top navigation / hamburger menu. Liquid-glass / fintech-inspired UI built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

**Live site:** https://zjhunter29.github.io/innovative-cpa/

## Pages

| Page | File | Contents |
|------|------|----------|
| Home | `index.html` | Hero with static "Your Business at a Glance" dashboard |
| Services | `services.html` | Six service cards + CTA |
| Industries | `industries.html` | Six industry cards + CTA |
| About | `about.html` | Firm intro, animated stats, testimonials carousel, process timeline + CTA |
| Contact | `contact.html` | Contact details + message form |

## Architecture

- **`styles.css`** — shared stylesheet for every page (design tokens, glass components, layout, responsive rules).
- **`script.js`** — shared behavior: sticky/shrinking navbar, mobile menu, scroll-reveal, animated counters, testimonial carousel, newsletter + contact forms.
- Each page is a standalone HTML document that links the shared CSS/JS and marks its own nav item active.

## Features

- **Multi-page navigation** — shared glass navbar + hamburger menu; the current page is highlighted.
- **Liquid-glass UI** — glassmorphism cards, gradient orbs, animated grid, soft depth.
- **Fully responsive** — mobile-first across mobile, tablet, laptop, and desktop.
- **Accessible & resilient** — semantic HTML, focus styles, `prefers-reduced-motion`, skip link, and fallbacks so content is never left hidden if JavaScript or the IntersectionObserver is suspended.
- **SEO-ready** — unique title/description/canonical per page, Open Graph tags, and `AccountingService` schema.org data on the home page.

## Running locally

Static files — open `index.html` in a browser, or serve the folder:

```bash
npx http-server . -p 4322
```

## Deployment

Hosted on **GitHub Pages** from the `main` branch (root). Any push to `main` updates the live site.
