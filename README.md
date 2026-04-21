# API Rate Limiter Full Stack Project

A complete **Full Stack Rate Limiting Application** built with:

* **Backend:** Node.js + Express
* **Frontend:** React + Vite
* **Storage:** In-Memory (`Map`)

This project demonstrates how to build a production-considerate API with per-user rate limiting and a modern dashboard to test and monitor usage in real time.

---

# 🚀 Features

## Backend Features

* Per-user rate limiting (**5 requests per minute**)
* Accurate request tracking
* Proper HTTP status codes (`200`, `400`, `429`)
* Concurrent request safe within Node.js event loop
* Modular architecture:

  * Routes
  * Controllers
  * Middleware
  * Services
* In-memory storage using `Map()`

## Frontend Features

* Modern React dashboard
* Request Tester form
* Real-time Stats Dashboard
* Quick Testing tools for rate limit validation
* Success / Error response cards
* Responsive UI for desktop and mobile
* Clean professional design

# ⚙️ Prerequisites

Install these before running:

* Node.js (v16 or later recommended)
* npm

Check versions:

```bash id="pcg9f4"
node -v
npm -v
```

---

# 🖥️ Backend Setup

## 1. Open backend project folder

```bash id="v6cjq0"
cd "APi Project"
```

## 2. Install dependencies

```bash id="1a73sj"
npm install
```

## 3. Run backend server

### Development mode

```bash id="w9s2j5"
npm run dev
```

### Production mode

```bash id="7w3s2f"
npm start
```

## Backend Runs On:

```text id="w86s9g"
http://localhost:3000
```

---

# 🌐 Frontend Setup

## 1. Open frontend folder

```bash id="6fg8me"
cd frontend
```

## 2. Install dependencies

```bash id="8w3g6a"
npm install
```

## 3. Configure Environment

Create `.env`

```env id="h05m73"
VITE_API_URL=http://localhost:3000
```

## 4. Run frontend

```bash id="f02a6e"
npm run dev
```

## Frontend Runs On:

Usually:

```text id="h5h85l"
http://localhost:5173
```

Open this URL in browser.

---

# 🔗 Backend APIs

---

# 1️⃣ POST /request

Accepts a request and applies rate limiting by `user_id`.

## URL

```text id="pr5q9k"
http://localhost:3000/request
```

## Method

```text id="h4ih5q"
POST
```

## Request Body

```json id="2w9md9"
{
  "user_id": "user1",
  "payload": "hello"
}
```

---

## Success Response (200)

```json id="1f0jv5"
{
  "message": "Request accepted",
  "user_id": "user1",
  "payload": "hello"
}
```

---

## Missing user_id (400)

```json id="9c8m2l"
{
  "error": "user_id is required"
}
```

---

## Rate Limit Exceeded (429)

```json id="33jlwm"
{
  "error": "Rate limit exceeded. Max 5 requests per minute."
}
```

---

# 2️⃣ GET /stats

Returns request statistics for all users.

## URL

```text id="x6tq5n"
http://localhost:3000/stats
```

## Method

```text id="5fwhba"
GET
```

## Example Response

```json id="l9u7s9"
{
  "user1": {
    "totalRequests": 7,
    "successRequests": 5,
    "blockedRequests": 2
  }
}
```

---

# 📊 Frontend Usage

---

# Request Tester

Use the form to:

* Enter User ID
* Enter Payload
* Send request to backend
* See success/error response instantly

---

# Stats Dashboard

Displays:

* User ID
* Total Requests
* Success Requests
* Blocked Requests

Use **Refresh Stats** button to reload latest data.

---

# Quick Testing Tools

Buttons included:

* Send 5 Requests Quickly
* Send 6th Request
* Refresh Stats
* Clear Form

These help demonstrate rate limiting quickly.

---

# 🧪 How to Test Rate Limiting

1. Start backend server
2. Start frontend app
3. Open frontend in browser
4. Enter `user1`
5. Click **Send 5 Requests Quickly**
6. Observe 5 successful requests
7. Click **Send 6th Request**
8. Observe HTTP `429` error
9. Open Stats Dashboard and verify:

```json id="s31u91"
{
  "user1": {
    "totalRequests": 6,
    "successRequests": 5,
    "blockedRequests": 1
  }
}
```

---

# 🏗️ Implementation Details

---

# Rate Limiting Logic

Each user has a list of timestamps stored in memory.

When request arrives:

1. Remove timestamps older than 60 seconds
2. If active requests >= 5 → block request
3. Else allow request
4. Update stats

---

# Concurrency Note

Node.js executes JavaScript in a single-threaded event loop.

Because this project uses synchronous `Map()` updates:

* Request counters remain accurate
* No race condition in single instance setup
* Safe for rapid local parallel requests

---

# ⚠️ Limitations of In-Memory Storage

1. Data resets when server restarts
2. Not suitable for multiple server instances
3. Memory usage grows with traffic
4. No persistence layer

---

# 🚀 Production Scaling with Redis

For real production systems, replace in-memory Maps with Redis.

Benefits:

* Shared counters across multiple servers
* Atomic operations (`INCR`, `EXPIRE`)
* Better performance
* Optional persistence
* Distributed rate limiting

Example:

```bash id="3hkt1r"
INCR user1
EXPIRE user1 60
```

---

# 🛠️ Recommended Improvements

Future upgrades:

* Add Redis
* Add JWT authentication
* Add Request Queue
* Add Retry Logic
* Add Docker support
* Add Unit Tests
* Add Logging
* Deploy on Render / Railway / AWS

---

# 💼 Why This Project Is Valuable

This project demonstrates:

* Backend API development
* Middleware design
* State management
* React frontend integration
* Real-time dashboards
* Clean architecture
* Problem solving
* Production thinking

---

# 👨‍💻 Run Both Together

Open 2 terminals:

## Terminal 1

```bash id="t4m1ur"
cd "APi Project"
npm run dev
```

## Terminal 2

```bash id="awtb7q"
cd frontend
npm run dev
```

Then open:

```text id="x48uxp"
http://localhost:5173
```

---

# ✅ Final Result

You now have a complete full stack project with:

✔ Node.js Backend
✔ React Frontend
✔ Rate Limiting
✔ Live Stats
✔ Professional UI
✔ Recruiter-Ready Structure
