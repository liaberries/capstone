import "../styles/admin.css";

export default function AdminLayout({ title, children }) {
  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <h2>Wellness Admin</h2>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/admin">Manage Clients</a>
          <a href="/">Home</a>
        </nav>
      </aside>

      <main className="admin-main">
        <h1>{title}</h1>
        {children}
      </main>
    </div>
  );
}
