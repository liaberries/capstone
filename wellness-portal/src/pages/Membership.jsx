import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";

export default function Membership() {
  return (
    <div className="wellness-home">
      <Navbar />

      {/* HERO */}
      <header className="hero" style={{ minHeight: '35vh' }}>
        <h1 className="hero-title" style={{ fontSize: '48px' }}>
          MEMBERSHIP
        </h1>
        <p className="strip-text" style={{ marginTop: '16px' }}>
          Join our wellness community and transform your health journey
        </p>
      </header>

      {/* MEMBERSHIP TIERS */}
      <section className="panel">
        <div className="panel-inner">
          <div className="membership-grid">
            {/* Basic Tier */}
            <div className="membership-card">
              <h3 className="membership-tier">BASIC</h3>
              <div className="membership-price">$29<span>/month</span></div>
              <ul className="membership-features">
                <li>Monthly wellness check-ins</li>
                <li>Access to educational resources</li>
                <li>Community support group</li>
                <li>10% discount on products</li>
              </ul>
              <button className="btn btn-solid" style={{ width: '100%' }}>
                Get Started
              </button>
            </div>

            {/* Premium Tier */}
            <div className="membership-card featured">
              <div className="membership-badge">MOST POPULAR</div>
              <h3 className="membership-tier">PREMIUM</h3>
              <div className="membership-price">$79<span>/month</span></div>
              <ul className="membership-features">
                <li>Everything in Basic</li>
                <li>Bi-weekly consultations</li>
                <li>Personalized wellness plan</li>
                <li>Priority appointment booking</li>
                <li>20% discount on products</li>
              </ul>
              <button className="btn btn-solid" style={{ width: '100%' }}>
                Get Started
              </button>
            </div>

            {/* Elite Tier */}
            <div className="membership-card">
              <h3 className="membership-tier">ELITE</h3>
              <div className="membership-price">$149<span>/month</span></div>
              <ul className="membership-features">
                <li>Everything in Premium</li>
                <li>Weekly one-on-one sessions</li>
                <li>24/7 support access</li>
                <li>Complimentary workshops</li>
                <li>30% discount on products</li>
              </ul>
              <button className="btn btn-solid" style={{ width: '100%' }}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="strip">
        <div className="strip-overlay">
          <h2 className="strip-title">WHY BECOME A MEMBER?</h2>
          <p className="strip-text">
            Our membership program provides ongoing support, expert guidance, and a community 
            of like-minded individuals committed to sustainable wellness.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              <img src={logo} alt="TrueWellness Logo" className="brand-logo" />
            </div>

            <ul className="footer-links">
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
    </div>
  );
}