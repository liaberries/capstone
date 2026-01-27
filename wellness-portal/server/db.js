// server/db.js
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the DB file you already have
const dbPath = path.join(__dirname, "data", "truewellness.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // USERS
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);

  // PRODUCTS
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price_cents INTEGER NOT NULL DEFAULT 0,
      image_url TEXT,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // BLOG POSTS
  db.run(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      cover_image_url TEXT,
      published INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
});

export default db;
