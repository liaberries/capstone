import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Temporary demo auth using query param ?as=admin or ?as=user
app.use((req, res, next) => {
  req.user = { role: req.query.as || "user" };
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT id, name, email, role FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json(user);
    }
  );
});


app.get("/api/admin/users", (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  db.all(
    "SELECT id, name, email, role FROM users",
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(rows);
    }
  );
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
