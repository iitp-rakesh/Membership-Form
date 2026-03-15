# Navprayas Membership Form (React)

This project is a production-ready React + TypeScript implementation of the original static membership form.

## Tech Stack

- React 18
- TypeScript (strict mode)
- Vite 6
- React Hook Form + Zod (schema-based validation)
- ESLint (TypeScript + React hooks rules)

## Features

- Responsive membership form UI migrated from legacy HTML/CSS
- Client-side validation for required fields, email, phone format, and agreement checkbox
- File upload validation (required + max 1 MB each)
- Mobile menu toggle and body-scroll lock
- Scroll-to-top button
- Production build and preview scripts

## Project Structure

- `src/App.tsx`: Main page UI and form behavior
- `src/main.tsx`: App bootstrap and style imports
- `src/styles.css`: React-specific overrides

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

### 3) Build for production

```bash
npm run build
```

Compiled assets are output to `dist/`.

### 4) Preview production build

```bash
npm run preview
```

### 5) Lint code

```bash
npm run lint
```

## Production Deployment

Deploy the `dist/` folder to any static hosting provider:

- Vercel
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront
- Nginx/Apache static hosting

## Notes for Backend Integration

Current submit flow validates data and simulates processing. To integrate real submission:

- Replace the submit handler in `src/App.tsx` with an API call
- Upload documents to your backend/storage service
- Redirect to your payment gateway after server-side verification

