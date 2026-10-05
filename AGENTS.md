# SLOW / ROAST — Premium Coffee E-Commerce

## Overview
A React + Vite + TypeScript single-page application styled with Tailwind CSS and animated with Framer Motion. Simulates a premium specialty coffee brand storefront.

## Tech Stack
- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS 3 (custom theme tokens in `tailwind.config.js`)
- **Animation:** Framer Motion, Lenis (smooth scroll)
- **Routing:** React Router v6
- **Icons:** Lucide React

## Development
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
The app runs on port 3000 with live reload via Vite HMR.

## Project Structure
```
src/
  components/   Reusable UI (Navbar, Footer, ProductCard, etc.)
  pages/        Route-level pages (Home, Shop, ProductDetail, Cart, Checkout, About, Journal)
  context/      CartContext for global cart state
  data/         Product and journal data
  hooks/        Custom hooks (scroll animations, smooth scroll)
```

## Notes
- No backend — all data is static in `src/data/`.
- Cart state is in-memory (React Context), not persisted.
- Images use Unsplash source URLs for product photography.
