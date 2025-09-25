AnchorzUp – URL Shortener

A simple URL shortening service that converts long links into short, easy-to-share aliases. Built with React (Vite), Node.js + Express, and MongoDB Atlas.

Features

Generate unique short links (e.g. http://localhost:4000/abc123)

Set expiration time for each link

Delete links when no longer needed

Track click statistics

Generate QR codes for short links

Installation & Setup

1. Clone the repository
git clone https://github.com/yllkashala1/url-shortener.git
cd url-shortener

2. Backend
cd backend
npm install


Create .env in backend/:

MONGO_URI=your-mongodb-connection-string
PORT=4000
BASE_URL=http://localhost:4000


Run backend:

node server.js

3. Frontend
cd ../frontend
npm install
npm run dev


Open in browser:

http://localhost:5173

Author

Developed by Yllka Shala for the AnchorzUp Technical Task.
