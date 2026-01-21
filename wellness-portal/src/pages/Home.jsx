import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [activeModal, setActiveModal] = useState(null); // "login" | "signup" | null

  // Auth state (set after backend login)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState(null); // "admin" | "user" | null
  const [currentName, setCurrentName] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStep, setLoginStep] = useState("form"); // "form" | "success"
  const [loginError, setLoginError] = useState("");

  // Signup form state (UI only for now)
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

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (activeModal) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModal]);

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
    // UI-only signup for now. Hook to backend later.
    setSignupMessage("Account created (demo). You can now login.");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
  };

  return (
    <div className="wellness-home" id="home">
      {/* NAV */}
      <nav className="topbar">
        <div className="topbar-inner">
          <div className="brand-mark" />

          <ul className="topnav">
            <li>
              <a href="#home">HOME</a>
            </li>
            <li>
              <a href="#membership">MEMBERSHIP</a>
            </li>
            <li>
              <a href="#products">PRODUCTS</a>
            </li>
            <li>
              <a href="#blog">BLOG</a>
            </li>
            <li>
              <a href="#educational">EDUCATIONAL</a>
            </li>
            <li>
              <a href="#about">ABOUT</a>
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

      {/* HERO */}
      <header className="hero">
        <h1 className="hero-title">
          START YOUR WELLNESS
          <br />
          JOURNEY
        </h1>

        <div className="hero-cta">
          <button className="btn btn-solid" type="button">
            Become a Member
          </button>
          <button className="btn btn-outline" type="button">
            Book an Appointment
          </button>
        </div>
      </header>

      {/* ABOUT */}
      <section className="panel" id="about">
        <div className="panel-inner about-grid">
          <div className="about-photo" />

          <div className="about-copy">
            <h2 className="section-title">DR. DIANA GALVAN</h2>
            <p className="section-text">
              If it’s broken and it pierces or hurts people, I heal people. Now I have this
              cause—helping people mentally, emotionally, physically, spiritually, and
              nutritionally by offering affordable coaching.
            </p>
            <div className="divider" />
            <button className="btn btn-solid" type="button">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="strip" id="membership">
        <div className="strip-overlay">
          <h2 className="strip-title">YOUR PARTNER IN TOTAL WELLNESS</h2>
          <p className="strip-text">
            TrueWellness exists to help you build sustainable wellness through education,
            support, and services that meet you where you are.
          </p>
        </div>
      </section>

      {/* HOURS */}
      <section className="block" id="educational">
        <div className="block-inner hours-grid">
          <div>
            <h2 className="section-title">HOURS &amp; AVAILABILITY</h2>
            <div className="hours-list">
              <p>
                <strong>Monday:</strong> 9:00AM - 11:00AM
              </p>
              <p>
                <strong>Tuesday:</strong> Closed
              </p>
              <p>
                <strong>Wednesday:</strong> 1:00PM - 5:00PM
              </p>
              <p>
                <strong>Thursday:</strong> 1:00PM - 5:00PM
              </p>
              <p>
                <strong>Friday:</strong> 1:00PM - 5:00PM
              </p>
              <p>
                <strong>Saturday:</strong> 9:00AM - 11:00AM
              </p>
              <p>
                <strong>Sunday:</strong> Closed
              </p>
            </div>
          </div>

          <div className="hours-circle" />
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="panel" id="products">
        <div className="panel-inner locations-grid">
          <div className="map-box" />
          <div>
            <h2 className="section-title">LOCATIONS</h2>
            <div className="section-text">
              <p>
                <strong>Redlands &amp; Yucaipa</strong>
              </p>
              <p>(909) 992-0297</p>
              <p>drgalvan@galvanfamilychiropractic.com</p>
              <p>
                <strong>Get Directions</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="blog">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              <div className="brand-mark small" />
              <div className="brand-name">TrueWellness</div>
            </div>

            <ul className="footer-links">
              <li>
                <a href="#home">HOME</a>
              </li>
              <li>
                <a href="#membership">MEMBERSHIP</a>
              </li>
              <li>
                <a href="#products">PRODUCTS</a>
              </li>
              <li>
                <a href="#blog">BLOG</a>
              </li>
              <li>
                <a href="#about">ABOUT</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-social">
              <a href="#email">✉</a>
              <a href="#instagram">📷</a>
              <a href="#facebook">f</a>
            </div>

            <div className="newsletter">
              <div className="newsletter-title">Stay in the loop</div>
              <div className="newsletter-row">
                <input className="newsletter-input" type="email" placeholder="Email" />
                <button className="btn btn-solid" type="button">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">© 2025</div>
      </footer>

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
                      Don’t have an account? Sign up
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
    </div>
  );
}
