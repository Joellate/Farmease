git clone https://github.com/Joellate/FarmEase.git
# FarmEase — Frontend Setup & Project Overview

This README consolidates frontend setup instructions and project notes for the FarmEase client.

Quick links
- Frontend code: `frontend/`
- Backend code: `backend/`

Requirements
- Node.js (v16+ recommended)
- npm
- Backend API running (default: `http://localhost:4000/api`)

Local setup (frontend)
1. Open PowerShell and install dependencies:

```powershell
cd .\frontend\
npm install
```

2. Configure API base URL (optional)
- Default: `src/api/client.js` uses `http://localhost:4000/api`.
- To change, update `src/api/client.js` or set `VITE_API_BASE_URL` in a `.env` file in `frontend/`.

3. Run the dev server:

```powershell
npm run dev
```

The app runs at `http://localhost:5173` by default.

Authentication notes
- After login the client stores `token` and `user` in `localStorage`.
- The client attaches the `Authorization: Bearer <token>` header automatically for API requests.

User profile and phone
- Farmers can provide a `phone` number during signup (visible when choosing “Farmer”).
- Logged-in users can edit `name` and `phone` at `/profile`.

Contact behavior
- Crop cards show the farmer's phone or email as plain text. Messaging (in-app) has been removed — buyers should contact farmers externally using the displayed phone number.

Project structure (important folders)
- `frontend/src/api/client.js` — axios client and base URL
- `frontend/src/pages/` — page components (Marketplace, Login, Register, Profile, etc.)
- `frontend/src/components/` — reusable UI components (CropCard, Navbar, etc.)

Backend / DB notes (short)
- Backend runs at `http://localhost:4000` by default (see `backend/src/index.js`).
- The app uses a PostgreSQL database (Supabase recommended). The backend expects a `users` table with a `phone` text column.

Recommended DB migration (run in Supabase SQL editor)
If your `users` table lacks a `phone` column, run:

```sql
ALTER TABLE IF EXISTS "FarmEase".users
  ADD COLUMN IF NOT EXISTS phone text;
```

Important: There is a known data-model mismatch possibility — ensure `crops.user_id` type matches `users.id` (UUID). If `crops.user_id` is `bigint`, convert it or sync IDs before attempting to create crops.

Dev notes & troubleshooting
- If you see CORS errors, ensure backend allows `http://localhost:5173`.
- If crop creation fails with a type error involving UUID vs bigint, the DB schema must be adjusted (convert `crops.user_id` to UUID or align user IDs).

Commands summary
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview built site: `npm run preview`

If you'd like, I can add a short root README with backend migration steps and a checklist for deploying the app.

Author
- Teta Joella

License
- MIT
 
---

## Description

The Frontend is a React (Vite) single-page app for the Farmease project. It provides the marketplace UI where buyers browse crop listings and farmers create and manage their listings. The client talks to a Node/Express backend API at `/api`.

This README contains the minimal steps to get the frontend running locally and notes about the API and database requirements.

## Prerequisites

- Node.js v16+ and npm
- A running backend API (default: `http://localhost:4000/api`)

## Local setup (frontend)

1. Install dependencies

```powershell
cd .\frontend\
npm install
```

2. Configure API base URL (optional)

- By default the client uses `http://localhost:4000/api` as the API base URL (see `src/api/client.js`).
- To override, create a `.env` file in `frontend/` and add:

```
VITE_API_BASE_URL=http://localhost:4000/api
```

3. Start the dev server

```powershell
npm run dev
```

Open `http://localhost:5173` in your browser.

## Notes about the API and database

- The frontend expects the backend to expose the following endpoints (default base `/api`):
  - `POST /auth/signup` — create account (farmers can include `phone`)
  - `POST /auth/login` — login, returns `token` and `user`
  - `GET /crops` — list crops (includes farmer `phone`)
  - `POST /crops` — create crop (authenticated)
  - `GET /users/me` and `PUT /users/me` — get/update profile (phone)

- Make sure the database `users` table has a `phone` column (text) if you want farmers to save contact numbers. Example migration:

```sql
ALTER TABLE IF EXISTS "FarmEase".users
  ADD COLUMN IF NOT EXISTS phone text;
```

## Troubleshooting

- CORS errors: ensure backend allows `http://localhost:5173` in CORS.
- API errors: restart the backend and check its logs. If `crops` creation fails with UUID vs bigint errors, align the `crops.user_id` type with `users.id`.

## Commands summary

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

If you want this README copied to the repo root or expanded with deployment instructions, say so and I will update it.
