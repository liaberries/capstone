import { useEffect, useState } from "react";
import "../styles/admin.css";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState("admin"); // "admin" | "user"
  const [error, setError] = useState("");

  const changeMode = (newMode) => {
    setMode(newMode);
    setError("");
    setUsers([]);
  };

  useEffect(() => {
    let cancelled = false;

    fetch(`http://localhost:4000/api/admin/users?as=${mode}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || `Request failed (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setUsers(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [mode]);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>TrueWellness Admin Portal</h1>

        <div className="admin-toggle">
          <span>Demo as:</span>
          <button
            type="button"
            className={mode === "admin" ? "active" : ""}
            onClick={() => changeMode("admin")}
          >
            Admin
          </button>
          <button
            type="button"
            className={mode === "user" ? "active" : ""}
            onClick={() => changeMode("user")}
          >
            User
          </button>
        </div>
      </div>

      {error ? (
        <div className="admin-error">{error}</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
