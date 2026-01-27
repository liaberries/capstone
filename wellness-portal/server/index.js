// server/index.js
import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());


// Middleware to check for admin role
function requireAdmin(req, res, next) {
  const role = req.headers["x-role"];
  if (role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
}

// -------------------- LOGIN --------------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  db.get(
    "SELECT id, name, email, role FROM users WHERE email = ? AND password = ?",
    [email.trim().toLowerCase(), password],
    (err, user) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
      
      res.json({ 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      });
    }
  );
});

// -------------------- TEST: CREATE ADMIN USER --------------------
// TEMPORARY ENDPOINT - Remove after creating your admin user
app.get("/api/create-test-admin", (req, res) => {
  db.run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["Admin User", "admin@truewellness.com", "admin123", "admin"],
    function (err) {
      if (err) {
        if (String(err.message || "").includes("UNIQUE")) {
          return res.status(409).json({ error: "Admin user already exists" });
        }
        return res.status(500).json({ error: "DB error", message: err.message });
      }
      res.status(201).json({ 
        message: "Admin user created successfully",
        email: "admin@truewellness.com",
        password: "admin123"
      });
    }
  );
});

app.post("/api/create-test-admin", (req, res) => {
  db.run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["Admin User", "admin@truewellness.com", "admin123", "admin"],
    function (err) {
      if (err) {
        if (String(err.message || "").includes("UNIQUE")) {
          return res.status(409).json({ error: "Admin user already exists" });
        }
        return res.status(500).json({ error: "DB error" });
      }
      res.status(201).json({ 
        message: "Admin user created successfully",
        email: "admin@truewellness.com",
        password: "admin123"
      });
    }
  );
});

// DEBUG: Check all users in database
app.get("/api/debug/users", (req, res) => {
  db.all("SELECT id, name, email, role FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ count: rows.length, users: rows });
  });
});

// -------------------- USERS (ADMIN) --------------------
app.get("/api/admin/users", requireAdmin, (req, res) => {
  db.all("SELECT id, name, email, role FROM users ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});

app.post("/api/admin/users", requireAdmin, (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "name, email, password, role required" });
  }

  db.run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name.trim(), email.trim().toLowerCase(), password, role],
    function (err) {
      if (err) {
        if (String(err.message || "").includes("UNIQUE")) {
          return res.status(409).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "DB error" });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.delete("/api/admin/users/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);

  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: "DB error" });
    if (this.changes === 0) return res.status(404).json({ error: "User not found" });
    res.json({ ok: true });
  });
});

// -------------------- PRODUCTS (ADMIN) --------------------
app.get("/api/admin/products", requireAdmin, (req, res) => {
  db.all("SELECT * FROM products ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});

app.post("/api/admin/products", requireAdmin, (req, res) => {
  const { name, price_cents = 0, image_url = "", description = "" } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });

  db.run(
    "INSERT INTO products (name, price_cents, image_url, description) VALUES (?, ?, ?, ?)",
    [name.trim(), Number(price_cents) || 0, image_url, description],
    function (err) {
      if (err) return res.status(500).json({ error: "DB error" });
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.delete("/api/admin/products/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);

  db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: "DB error" });
    if (this.changes === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ ok: true });
  });
});

// -------------------- BLOG POSTS (ADMIN) --------------------
app.get("/api/admin/blog-posts", requireAdmin, (req, res) => {
  db.all("SELECT * FROM blog_posts ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});

app.post("/api/admin/blog-posts", requireAdmin, (req, res) => {
  const { title, slug, excerpt = "", content, cover_image_url = "", published = 0 } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({ error: "title, slug, content required" });
  }

  db.run(
    "INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, published) VALUES (?, ?, ?, ?, ?, ?)",
    [title.trim(), slug.trim().toLowerCase(), excerpt, content, cover_image_url, published ? 1 : 0],
    function (err) {
      if (err) {
        if (String(err.message || "").includes("UNIQUE")) {
          return res.status(409).json({ error: "Slug already exists" });
        }
        return res.status(500).json({ error: "DB error" });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.delete("/api/admin/blog-posts/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);

  db.run("DELETE FROM blog_posts WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: "DB error" });
    if (this.changes === 0) return res.status(404).json({ error: "Post not found" });
    res.json({ ok: true });
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});