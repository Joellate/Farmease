git clone https://github.com/YOUR-USERNAME/FarmEasee.git
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