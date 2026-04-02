# 🚀 Distributed Log Processing System (WIP)

A backend system designed to collect, store, and retrieve application logs efficiently with support for filtering, pagination, and query optimization.

---

## 📌 Overview

This project simulates a real-world logging system where multiple services send logs to a centralized backend.
The system is designed with scalability in mind and will evolve into a distributed architecture with queues and cloud deployment.

---

## 🧠 Current Features

* ✅ Log ingestion API (`POST /api/log`)
* ✅ Fetch logs API (`GET /api/logs`)
* ✅ Input validation using Zod
* ✅ Filtering logs by level (error, info, warn)
* ✅ Pagination (page & limit)
* ✅ Database indexing for performance optimization

---

## ⚙️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL (Supabase)
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

## 🧠 System Design (Current)

```
Client → API → PostgreSQL
```

---

## 🚧 Upcoming Features

* 🔄 Message Queue (Kafka / BullMQ)
* ⚙️ Background Workers
* ⚡ Redis Caching
* ☁️ Cloud Deployment (AWS)
* 📊 Dashboard (React)
* 🚨 Alert System

---

## 🧠 Key Learnings

* Importance of input validation (Zod)
* Efficient API design with filtering & pagination
* Database indexing for performance optimization
* Structuring backend with controllers & services

---

## 🏁 Getting Started

### 1. Clone repo

```
git clone <your-repo-link>
cd log-system
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

```
DB_URL=your_postgres_connection_string
```

### 4. Run server

```
npm run dev
```

---

## 💡 Author

**Anup Kumar**

---

## ⭐ Future Goal

To evolve this system into a **distributed, scalable log processing platform** similar to Datadog or ELK stack.
