import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [currentName, setCurrentName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStep, setLoginStep] = useState("form");
  const [loginError, setLoginError] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const openLogin = () => {
    setActiveModal("login");
    setLoginStep("form");
    setLoginError("");
  };

  const openSignup = () => {
    setActiveModal("signup");
    setSignupMessage("");
  };

  const closeModal = () => {
    setActiveModal(null);
    setLoginStep("form");
    setLoginError("");
    setSignupMessage("");
  };

  const handleLogin = async () => {
    setLoginError("");

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || `Login failed (${res.status})`);
      }

      setIsLoggedIn(true);
      setCurrentRole(data.role);
      setCurrentName(data.name || data.email || "");
      setLoginStep("success");
    } catch (err) {
      setLoginError(err.message || "Login failed");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentRole(null);
    setCurrentName("");
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupMessage("Account created (demo). You can now login.");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
  };

  return (
    <>
      <nav className="topbar">
        <div className="topbar-inner">
          <Link to="/">
            <img src={logo} alt="TrueWellness Logo" className="brand-logo" />
          </Link>

          <ul className="topnav">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/membership">MEMBERSHIP</Link>
            </li>
            <li>
              <Link to="/products">PRODUCTS</Link>
            </li>
            <li>
              <Link to="/blog">BLOG</Link>
            </li>
            <li>
              <a href="/#about">ABOUT</a>
            </li>
          </ul>

          <div className="topbar-actions">
            {isLoggedIn && currentRole === "admin" && (
              <Link className="btn btn-outline" to="/admin">
                Admin Portal
              </Link>
            )}

            {!isLoggedIn ? (
              <>
                <button className="btn btn-outline" type="button" onClick={openLogin}>
                  Login
                </button>
                <button className="btn btn-solid" type="button" onClick={openSignup}>
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <div className="nav-welcome">
                  {currentName ? `Welcome, ${currentName}` : "Welcome"}{" "}
                  {currentRole ? `(${currentRole})` : ""}
                </div>
                <button className="btn btn-outline" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MODALS */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">
                {activeModal === "login" ? "Login" : "Create Account"}
              </h3>
              <button type="button" className="modal-close" onClick={closeModal}>
                X
              </button>
            </div>

            {activeModal === "login" ? (
              <>
                {loginStep === "form" ? (
                  <div className="modal-form">
                    <label className="modal-label">
                      Email
                      <input
                        className="modal-input"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="admin@truewellness.com"
                        autoComplete="username"
                      />
                    </label>

                    <label className="modal-label">
                      Password
                      <input
                        className="modal-input"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </label>

                    {loginError ? <div className="modal-error">{loginError}</div> : null}

                    <button
                      className="btn btn-solid modal-submit"
                      type="button"
                      onClick={handleLogin}
                      disabled={!loginEmail || !loginPassword}
                    >
                      Login
                    </button>

                    <button className="modal-switch" type="button" onClick={openSignup}>
                      Don't have an account? Sign up
                    </button>
                  </div>
                ) : (
                  <div className="modal-success">
                    <div className="modal-success-title">You are logged in.</div>

                    <div className="modal-success-sub">
                      {currentRole ? `Role: ${currentRole}` : ""}
                    </div>

                    <div className="modal-success-actions">
                      {currentRole === "admin" ? (
                        <Link className="btn btn-solid" to="/admin" onClick={closeModal}>
                          Go to Admin Portal
                        </Link>
                      ) : null}

                      <button className="btn btn-outline" type="button" onClick={closeModal}>
                        Continue
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <form className="modal-form" onSubmit={handleSignup}>
                <label className="modal-label">
                  Name
                  <input
                    className="modal-input"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="modal-label">
                  Email
                  <input
                    className="modal-input"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="modal-label">
                  Password
                  <input
                    className="modal-input"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                  />
                </label>

                {signupMessage ? <div className="modal-success-sub">{signupMessage}</div> : null}

                <button className="btn btn-solid modal-submit" type="submit">
                  Create Account
                </button>

                <button className="modal-switch" type="button" onClick={openLogin}>
                  Already have an account? Login
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}