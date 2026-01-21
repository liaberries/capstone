import { useEffect, useState } from "react";

export default function Home() {
  const [activeModal, setActiveModal] = useState(null); // "login" | "signup" | null

  const closeModal = () => setActiveModal(null);

  // Close modal with ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (activeModal) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModal]);

  return (
    <div className="wellness-home" id="home">
      {/* NAV */}
      <nav className="topbar">
        <div className="topbar-inner">
          <div className="brand-mark" />

          <ul className="topnav">
            <li><a href="#home">HOME</a></li>
            <li><a href="#membership">MEMBERSHIP</a></li>
            <li><a href="#products">PRODUCTS</a></li>
            <li><a href="#blog">BLOG</a></li>
            <li><a href="#educational">EDUCATIONAL</a></li>
            <li><a href="#about">ABOUT</a></li>
          </ul>

          <div className="topbar-actions">
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => setActiveModal("login")}
            >
              Login
            </button>
            <button
              className="btn btn-solid"
              type="button"
              onClick={() => setActiveModal("signup")}
            >
              Sign Up
            </button>
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
          <button className="btn btn-solid">Become a Member</button>
          <button className="btn btn-outline">Book an Appointment</button>
        </div>
      </header>

      {/* ABOUT */}
      <section className="panel" id="about">
        <div className="panel-inner about-grid">
          <div className="about-photo" />

          <div className="about-copy">
            <h2 className="section-title">DR. DIANA GALVAN</h2>
            <p className="section-text">
              If it’s broken and it pierces or hurts people, I heal people. Now I
              have this cause—helping people mentally, emotionally, physically,
              spiritually, and nutritionally by offering affordable coaching.
            </p>
            <div className="divider" />
            <button className="btn btn-solid">Learn More</button>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="strip" id="membership">
        <div className="strip-overlay">
          <h2 className="strip-title">YOUR PARTNER IN TOTAL WELLNESS</h2>
          <p className="strip-text">
            EmpowerMed exists to help you build sustainable wellness through
            education, support, and services that meet you where you are.
          </p>
        </div>
      </section>

      {/* HOURS */}
      <section className="block" id="educational">
        <div className="block-inner hours-grid">
          <div>
            <h2 className="section-title">HOURS & AVAILABILITY</h2>
            <div className="hours-list">
              <p><strong>Monday:</strong> 9:00AM - 11:00AM</p>
              <p><strong>Tuesday:</strong> Closed</p>
              <p><strong>Wednesday:</strong> 1:00PM - 5:00PM</p>
              <p><strong>Thursday:</strong> 1:00PM - 5:00PM</p>
              <p><strong>Friday:</strong> 1:00PM - 5:00PM</p>
              <p><strong>Saturday:</strong> 9:00AM - 11:00AM</p>
              <p><strong>Sunday:</strong> Closed</p>
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
              <p><strong>Redlands &amp; Yucaipa</strong></p>
              <p>(909) 992-0297</p>
              <p>drgalvan@galvanfamilychiropractic.com</p>
              <p><strong>Get Directions</strong></p>
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
              <div className="brand-name">EmpowerMed</div>
            </div>

            <ul className="footer-links">
              <li><a href="#home">HOME</a></li>
              <li><a href="#membership">MEMBERSHIP</a></li>
              <li><a href="#products">PRODUCTS</a></li>
              <li><a href="#blog">BLOG</a></li>
              <li><a href="#about">ABOUT</a></li>
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
                <input
                  className="newsletter-input"
                  type="email"
                  placeholder="Email"
                />
                <button className="btn btn-solid">Sign Up</button>
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
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            {activeModal === "login" ? (
              <div className="modal-form">
                <label className="modal-label">
                  Email
                  <input className="modal-input" type="email" />
                </label>

                <label className="modal-label">
                  Password
                  <input className="modal-input" type="password" />
                </label>

                <button className="btn btn-solid modal-submit">Login</button>

                <button
                  className="modal-switch"
                  onClick={() => setActiveModal("signup")}
                >
                  Don’t have an account? Sign up
                </button>
              </div>
            ) : (
              <div className="modal-form">
                <label className="modal-label">
                  Name
                  <input className="modal-input" type="text" />
                </label>

                <label className="modal-label">
                  Email
                  <input className="modal-input" type="email" />
                </label>

                <label className="modal-label">
                  Password
                  <input className="modal-input" type="password" />
                </label>

                <button className="btn btn-solid modal-submit">
                  Create Account
                </button>

                <button
                  className="modal-switch"
                  onClick={() => setActiveModal("login")}
                >
                  Already have an account? Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}