import { useEffect, useState } from "react";
import "../styles/admin.css";

export default function Admin() {
  const [tab, setTab] = useState("users"); // users | products | blog
  const [error, setError] = useState("");

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <div>
          <h1 className="admin-title">Admin Portal</h1>
          <p className="admin-subtitle">Manage users, products, and blog posts.</p>
        </div>

        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab ${tab === "users" ? "active" : ""}`}
            onClick={() => setTab("users")}
          >
            Users
          </button>
          <button
            type="button"
            className={`admin-tab ${tab === "products" ? "active" : ""}`}
            onClick={() => setTab("products")}
          >
            Products
          </button>
          <button
            type="button"
            className={`admin-tab ${tab === "blog" ? "active" : ""}`}
            onClick={() => setTab("blog")}
          >
            Blog Posts
          </button>
        </div>
      </div>

      {error ? <div className="admin-alert">{error}</div> : null}

      {tab === "users" && <UsersAdmin setError={setError} />}
      {tab === "products" && <ProductsAdmin setError={setError} />}
      {tab === "blog" && <BlogAdmin setError={setError} />}
    </div>
  );
}

/* ================= USERS ================= */

function UsersAdmin({ setError }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  const loadUsers = () => {
    fetch("http://localhost:4000/api/admin/users", {
      headers: { "x-role": "admin" }
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Failed to load users");
        return data;
      })
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = (e) => {
    e.preventDefault();
    setError("");

    fetch("http://localhost:4000/api/admin/users", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-role": "admin"
      },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Failed to create user");
        setForm({ name: "", email: "", password: "", role: "user" });
        loadUsers();
      })
      .catch((err) => setError(err.message));
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:4000/api/admin/users/${id}`, { 
      method: "DELETE",
      headers: { "x-role": "admin" }
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Failed to delete user");
        loadUsers();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <section className="admin-grid">
      <div className="admin-card">
        <h2 className="admin-card-title">Create User</h2>

        <form className="admin-form" onSubmit={createUser}>
          <label className="admin-label">
            Name
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
            />
          </label>

          <label className="admin-label">
            Email
            <input
              className="admin-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jane@truewellness.com"
            />
          </label>

          <label className="admin-label">
            Password
            <input
              className="admin-input"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </label>

          <label className="admin-label">
            Role
            <select
              className="admin-input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button className="admin-btn primary" type="submit">
            Create User
          </button>
        </form>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h2 className="admin-card-title">Users</h2>
          <button className="admin-btn ghost" type="button" onClick={loadUsers}>
            Refresh
          </button>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className="admin-actions">
                    <button className="admin-btn danger" type="button" onClick={() => deleteUser(u.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-empty">No users found.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ================= PRODUCTS ================= */

function ProductsAdmin({ setError }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price_cents: 0, image_url: "", description: "" });

  const load = () => {
    fetch("http://localhost:4000/api/admin/products", {
      headers: { "x-role": "admin" }
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Failed to load products");
        return data;
      })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    load();
  }, []);

  const create = (e) => {
    e.preventDefault();
    setError("");

    fetch("http://localhost:4000/api/admin/products", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-role": "admin"
      },
      body: JSON.stringify({ ...form, price_cents: Number(form.price_cents) || 0 }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Failed to add product");
        setForm({ name: "", price_cents: 0, image_url: "", description: "" });
        load();
      })
      .catch((err) => setError(err.message));
  };

  const del = (id) => {
    fetch(`http://localhost:4000/api/admin/products/${id}`, { 
      method: "DELETE",
      headers: { "x-role": "admin" }
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Failed to delete product");
        load();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <section className="admin-grid">
      <div className="admin-card">
        <h2 className="admin-card-title">Add Product</h2>

        <form className="admin-form" onSubmit={create}>
          <label className="admin-label">
            Name
            <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>

          <label className="admin-label">
            Price (cents)
            <input
              className="admin-input"
              value={form.price_cents}
              onChange={(e) => setForm({ ...form, price_cents: e.target.value })}
            />
          </label>

          <label className="admin-label">
            Image URL
            <input
              className="admin-input"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />
          </label>

          <label className="admin-label">
            Description
            <textarea
              className="admin-input"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>

          <button className="admin-btn primary" type="submit">Add Product</button>
        </form>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h2 className="admin-card-title">Products</h2>
          <button className="admin-btn ghost" type="button" onClick={load}>Refresh</button>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Price</th><th />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price_cents}</td>
                  <td className="admin-actions">
                    <button className="admin-btn danger" type="button" onClick={() => del(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-empty">No products yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ================= BLOG POSTS ================= */

function BlogAdmin({ setError }) {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    published: 0,
  });

  const load = () => {
    fetch("http://localhost:4000/api/admin/blog-posts", {
      headers: { "x-role": "admin" }
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Failed to load blog posts");
        return data;
      })
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    load();
  }, []);

  const create = (e) => {
    e.preventDefault();
    setError("");

    fetch("http://localhost:4000/api/admin/blog-posts", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-role": "admin"
      },
      body: JSON.stringify({ ...form, published: form.published ? 1 : 0 }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Failed to create post");
        setForm({ title: "", slug: "", excerpt: "", content: "", published: 0 });
        load();
      })
      .catch((err) => setError(err.message));
  };

  const del = (id) => {
    fetch(`http://localhost:4000/api/admin/blog-posts/${id}`, { 
      method: "DELETE",
      headers: { "x-role": "admin" }
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "Failed to delete post");
        load();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <section className="admin-grid">
      <div className="admin-card">
        <h2 className="admin-card-title">Create Blog Post</h2>

        <form className="admin-form" onSubmit={create}>
          <label className="admin-label">
            Title
            <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>

          <label className="admin-label">
            Slug
            <input className="admin-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </label>

          <label className="admin-label">
            Excerpt
            <textarea className="admin-input" rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </label>

          <label className="admin-label">
            Content
            <textarea className="admin-input" rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </label>

          <label className="admin-check">
            <input
              type="checkbox"
              checked={!!form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked ? 1 : 0 })}
            />
            Published
          </label>

          <button className="admin-btn primary" type="submit">Create Post</button>
        </form>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h2 className="admin-card-title">Blog Posts</h2>
          <button className="admin-btn ghost" type="button" onClick={load}>Refresh</button>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Title</th><th>Slug</th><th>Published</th><th />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.slug}</td>
                  <td>{p.published ? "Yes" : "No"}</td>
                  <td className="admin-actions">
                    <button className="admin-btn danger" type="button" onClick={() => del(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-empty">No posts yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}