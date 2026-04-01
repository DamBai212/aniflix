# AniFlix

AniFlix is a Netflix-inspired anime discovery app built around a curated set of favorite series. The current experience focuses on cinematic presentation, fast browsing, and polished detail pages that feel closer to a streaming home screen than a plain gallery.

## Current Experience

The app currently includes:

- A hero-style landing experience with a rotating featured spotlight
- A horizontal poster slider for browsing the current collection
- Individual detail pages with richer metadata, synopsis copy, and recommendations
- Responsive navigation with desktop dropdown and mobile menu behavior
- Static content routes for contact and sign-up flows

## Tech Stack

- React
- React Router
- Create React App
- Plain CSS with custom styling and animations
- Node.js
- npm

## Running Locally

This project is pinned to Node `14.15.0` and npm `6.x`.

The repo includes both `.nvmrc` and `.node-version`, so most Node version managers can pick up the correct version automatically.

In the project directory, run:

```bash
nvm use
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Quality Checks

```bash
nvm use
npm test -- --watchAll=false
npm run build
```

## Next Steps

- Move the anime catalog out of hard-coded front-end data and into a real API or CMS-backed source
- Expand the browsing experience with genre rows, filtering, and search
- Add more route, accessibility, and interaction coverage as the UI grows
- Continue refining the streaming aesthetic with richer artwork and collection depth

## Project Direction

The next stage of AniFlix is about turning the polished front-end shell into a fuller product: a larger catalog, stronger discovery flows, and a data model that can grow beyond a single curated starter collection.
