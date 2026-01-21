import { db } from "./db.js";

db.serialize(() => {
  db.run("DELETE FROM users");

  db.run(`
    INSERT INTO users (name, email, password, role)
    VALUES
      ('Admin User', 'admin@truewellness.com', 'admin123', 'admin'),
      ('Jane Doe', 'jane@truewellness.com', 'user123', 'user'),
      ('John Smith', 'john@truewellness.com', 'user123', 'user')
  `);

  db.all("SELECT id, name, email, role FROM users", (err, rows) => {
    console.log(rows);
    db.close();
  });
});
