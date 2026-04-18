# 🌍 Green Digital Land Registry (GDLR) Engine

A high-performance, DBMS-heavy backend architecture for a next-generation national land registry. This system strictly enforces physical geography, high-concurrency cap-and-trade markets, and immutable ownership histories directly at the database level.

## 🚀 Core Engineering Features

* **Spatial Microgrid Energy Trading:** Integrates **PostGIS** to physically validate transactions. Energy credits can only be traded if land parcels are geographically adjacent or within a strict 50-meter radius (`ST_DWithin`).
* **High-Concurrency Water Quotas:** Implements `ISOLATION LEVEL SERIALIZABLE` and row-level locking (`SELECT FOR UPDATE`) to handle extreme transaction concurrency, preventing phantom reads and race conditions in seasonal water cap-and-trade markets.
* **Temporal Data Modeling:** Eradicates double-ownership fraud using PostgreSQL `EXCLUDE USING GIST` constraints. Ownership records never overlap and are never deleted, ensuring a flawless historical timeline.
* **ACID-Compliant State Machine:** Complex property transfers execute within strict `BEGIN ... COMMIT/ROLLBACK` blocks, guaranteeing absolute data integrity.
* **Immutable Audit Trail:** Automated DB-level triggers capture every data mutation seamlessly.

## 🛠 Tech Stack
* **Database:** PostgreSQL, PostGIS (Spatial Data Engine)
* **Backend:** Node.js, Express.js, `pg` (Raw SQL queries, no ORM bloat)
* **Architecture:** RESTful API, Connection Pooling, Transactional Controllers

## 🚦 Getting Started (Local Development)

### 1. Database Setup (Requires PostGIS)
```bash
brew install postgresql postgis
psql postgres -c "CREATE DATABASE gdlr;"
psql gdlr -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
psql gdlr -c "CREATE EXTENSION postgis;"
