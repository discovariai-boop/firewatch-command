# Fire Dashboard

A fire incident management dashboard built with React, Vite, and Tailwind CSS.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router DOM v6
- **Data Fetching**: TanStack React Query
- **Maps**: Leaflet / React Leaflet
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

## Project Structure

```
src/
  App.tsx          - Root component with routing
  main.tsx         - App entry point
  pages/           - Page-level components
  components/      - Reusable UI components
    ui/            - shadcn/ui primitive components
    fire/          - Fire dashboard specific components
  hooks/           - Custom React hooks
  data/            - Static/mock data
  lib/             - Utility functions
```

## Development

```bash
npm run dev      # Start dev server on port 5000
npm run build    # Production build
npm run preview  # Preview production build
```

## Notes

- Migrated from Lovable to Replit. Lovable-specific tooling (lovable-tagger, lovable playwright config) has been removed.
- The app runs on port 5000 and binds to 0.0.0.0 for Replit compatibility.
- This is a pure frontend application with no backend server.
