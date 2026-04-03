# 🚀 Datastream (Distributed Log Processing System)

A scalable backend system designed to collect, process, and retrieve application logs efficiently using queue-based architecture, caching, and optimized database queries.

---

## 📌 Overview

Datastream simulates a real-world logging system where multiple services send logs to a centralized backend.

The system is designed with scalability and performance in mind, evolving from a simple API → to a distributed architecture with queues, workers, and caching.

---

## 🧠 Current Features

* ✅ Log ingestion API (`POST /api/log`)
* ✅ Fetch logs API (`GET /api/logs`)
* ✅ Input validation using Zod
* ✅ Filtering logs by level (error, info, warn)
* ✅ Pagination (page & limit)
* ✅ Database indexing for performance optimization
* ✅ Queue-based log processing (BullMQ)
* ✅ Background worker for async DB writes
* ✅ Retry mechanism for failed jobs
* ✅ Redis caching for faster read performance

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL (Supabase)
* **Queue:** BullMQ
* **Cache:** Redis
* **Validation:** Zod
* **Tools:** Postman, Git

---

## 📂 Project Structure

```
src/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── db/
 ├── queue/
 ├── worker/
 └── index.js
```

---

## 📡 API Endpoints

### ➤ Create Log

```
POST /api/log
```

#### Request Body:

```json
{
  "service": "auth",
  "level": "error",
  "message": "login failed"
}
```

👉 Logs are pushed to a queue and processed asynchronously by a worker.

---

### ➤ Get Logs

```
GET /api/logs
```

#### Query Params:

| Param | Description                     |
| ----- | ------------------------------- |
| level | Filter logs (error, info, warn) |
| page  | Page number (default: 1)        |
| limit | Logs per page (default: 10)     |

#### Example:

```
GET /api/logs?level=error&page=1&limit=5
```

👉 Uses Redis caching for faster repeated queries.

---

## 🗄️ Database Schema

```sql
CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  service VARCHAR(50),
  level VARCHAR(20),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚡ Indexing (Performance Optimization)

```sql
CREATE INDEX idx_logs_level ON logs(level);
CREATE INDEX idx_logs_created_at ON logs(created_at DESC);
```

---

## 🧠 System Design (Current Architecture)

```
Client → API → Redis (Cache)
                ↓
             Queue (BullMQ)
                ↓
             Worker → PostgreSQL
```

---

## 🔄 How It Works

1. Client sends log → API
2. API pushes log to queue
3. Worker processes job asynchronously
4. Log stored in PostgreSQL
5. Fetch API uses Redis cache for faster reads

---

## 🚧 Upcoming Features

* ☁️ Cloud deployment (AWS)
* 📊 Monitoring & metrics (logs/sec)
* 📈 Dashboard (React)
* 🚨 Alert system (error spikes)
* 🧩 Dead letter queue (failed jobs handling)

---

## 🧠 Key Learnings

* Importance of input validation (Zod)
* API design with filtering & pagination
* Database indexing and query optimization
* Event-driven architecture using queues
* Async processing with workers
* Caching strategies using Redis
* Handling failures with retries

---

## 🏁 Getting Started

### 1. Clone repo

```
git clone <your-repo-link>
cd Datastream
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

```
DB_URL=your_postgres_connection_string
REDIS_URL=your_redis_connection_string
```

### 4. Run services

```bash
# Start backend
npm run dev

# Start worker (separate terminal)
node worker.js
```

---

## 💡 Author

**Anup Kumar**

---

## ⭐ Vision

To evolve Datastream into a **production-grade distributed log processing system** similar to Datadog / ELK stack with real-time analytics and scalable cloud infrastructure.
