# Frontend (Client) — Setup & Run

This file explains how to set up and run the frontend (client) for the Farmeasee project on Windows (PowerShell).

Prerequisites
- Node.js (v16+ recommended) and npm installed.
- Backend API running at `http://localhost:4000` (default expected by the client). If your backend uses a different host/port, update `src/api/client.js`.

Install dependencies
Open PowerShell in the `frontend` folder and run:

```powershell
cd .\frontend\
npm install
```

Run dev server

```powershell
npm run dev
```

This starts Vite's dev server (default port 5173). Open `http://localhost:5173` in your browser.

API base URL
- The frontend uses `http://localhost:4000/api` by default (see `src/api/client.js`).
- If your backend runs elsewhere, update `baseURL` in `src/api/client.js` or set up a proxy if preferred.

Authentication notes
- The app stores `token` and `user` in `localStorage` after login.
- Protected API requests attach the `Authorization: Bearer <token>` header automatically.

Developer notes
- To edit the UI, modify files inside `src/components` and `src/pages`.
- The `Register` form includes a `phone` input when registering as a farmer; that value is sent to the backend during signup.
- CropFeed will fall back to local sample data if the API is unreachable — see `src/utils/sampleData.js`.

Profile
- Logged-in users can edit their `name` and `phone` via `/profile`.

What I changed recently (context)
- The app now shows farmer contact numbers on crop cards as plain text (no automatic tel/mailto links).
- Messaging functionality was removed from the UI and backend to avoid opening external apps; buyers should call or message farmers externally using the displayed phone.

Troubleshooting
- If you see CORS errors, ensure the backend allows `http://localhost:5173`.
- If API requests return 500 errors, restart the backend and check its logs. Some DB migrations (phone column, user/crops id compatibility) may be required — coordinate with backend setup.

Useful commands
- Install: `npm install`
- Dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

If you want, I can also add a short checklist to the root repo README describing backend migration steps (adding `phone` column and resolving any UUID/bigint mismatches) — let me know if you'd like that included.
