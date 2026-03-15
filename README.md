# ConstructTrust MERN Platform

A complete MERN stack website for a construction company with:

- Public project showcase
- AR-enabled completed-project viewing
- Signup and login (JWT authentication)
- Customer dashboard
- Inquiry management module
- Admin analytics module
- Responsive UI with custom visual theme

## Tech Stack

- Frontend: React + Vite + React Router + Axios + Framer Motion
- Backend: Node.js + Express + MongoDB + Mongoose + JWT

## 1. Setup

### Prerequisites

- Node.js 18+
- MongoDB local or MongoDB Atlas

### Install dependencies

```bash
npm run install-all
```

Or install manually:

```bash
cd backend
npm install
cd ../frontend
npm install
```

## 2. Backend Configuration

Copy sample env:

```bash
cd backend
copy .env.example .env
```

Update `backend/.env` values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/constructar
JWT_SECRET=replace_with_strong_secret
```

## 3. Seed Sample Projects

```bash
npm run seed
```

This also seeds an admin account:

- Email: `admin@constructtrust.com`
- Password: `Admin@123`

## 4. Run Application

### Option A: Single command (Windows)

```bash
npm run dev
```

### Option B: Run separately

Backend:

```bash
npm run dev:backend
```

Frontend:

```bash
npm run dev:frontend
```

- Frontend URL: `http://localhost:5173`
- Backend URL: `http://localhost:5000`

## 5. API Modules

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Projects

- `GET /api/projects`
- `GET /api/projects/:slug`
- `POST /api/projects` (admin)
- `PUT /api/projects/:id` (admin)
- `DELETE /api/projects/:id` (admin)

### Inquiries

- `POST /api/inquiries`
- `GET /api/inquiries/mine`
- `GET /api/inquiries` (admin)
- `PUT /api/inquiries/:id/status` (admin)

### Dashboard

- `GET /api/dashboard/stats` (admin)

## 6. Frontend Pages

- `/` Home + trust-focused value proposition
- `/projects` searchable project gallery
- `/projects/:slug` full details + AR model/embed viewer
- `/signup` account creation
- `/login` authentication
- `/dashboard` inquiry submission + tracking + admin stats

## 7. AR Feature Notes

- Project schema supports `arModelUrl` and `arEmbedUrl`
- Uses `<model-viewer>` for AR-capable models (`.glb`)
- Supports Scene Viewer / WebXR / Quick Look where available

## 8. Suggested Next Modules

- Payment milestones and invoicing
- File upload for floor plans and permits
- Project progress timeline with notifications
- Admin CMS for testimonials and team profiles

