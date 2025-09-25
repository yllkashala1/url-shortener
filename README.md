# AnchorzUp – URL Shortener
A simple URL shortening service that converts long links into short, easy-to-share aliases.
Built with **React (Vite)** and **Node.js + Express**.
Data is stored in-memory for simplicity (no external database required).

## Features
- Generate unique short links (e.g. https://url-shortener-y07w.onrender.com/abc123)
- Set expiration time for each link
- Delete links when no longer needed
- Track click statistics
- Generate QR codes for short links
- Responsive UI for desktop and mobile

## Tech Stack
- Frontend: React (Vite), Axios, React QR Code
- Backend: Node.js, Express
- Deployment: Render (Backend), Netlify/Vercel (Frontend optional)

## Installation & Setup
### 1. Clone the repository
git clone https://github.com/yllkashala1/url-shortener.git
cd url-shortener

### 2. Backend
cd backend
npm install

Create `.env` in `backend/`:
BASE_URL=http://localhost:4000
PORT=4000

bash
Copy code

Run backend:
node server.js

### 3. Frontend
cd ../frontend
npm install
npm run dev

Open in browser:
http://localhost:5173

## API Endpoints
### Create Short URL
POST /api/url/shorten
Body:
{
"originalUrl": "https://google.com",
"expirationMinutes": 60
}

makefile
Copy code
Response:
{
"shortUrl": "http://localhost:4000/abc123"
}

shell
Copy code

### Redirect
GET /:shortId

### Delete Short URL
DELETE /api/url/:shortId

### Stats
GET /api/url/stats/:shortId

## Deployment
- Backend (Render): https://url-shortener-y07w.onrender.com
- Frontend: can be deployed on Netlify or Vercel

## Author
Developed by **Yllka Shala**
Submitted as part of the AnchorzUp Technical Task
