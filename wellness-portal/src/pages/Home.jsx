import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";
import wellnessImg from "../assets/wellness.jpg";

export default function Home() {
  return (
    <div className="wellness-home" id="home">
      <Navbar />

      {/* HERO */}
      <header className="hero">
        <h1 className="hero-title">
          START YOUR WELLNESS
          <br />
          JOURNEY
        </h1>

        <div className="hero-cta">
          <Link to="/membership" className="btn btn-solid">
            Become a Member
          </Link>
          <button className="btn btn-outline" type="button">
            Book an Appointment
          </button>
        </div>
      </header>

      {/* ABOUT */}
      <section className="panel" id="about">
        <div className="panel-inner about-grid">
          <div className="about-photo" />
          <img
              src={wellnessImg}
              alt="Girl doing yoga"
              className="wellness-img"
          />

          <div className="about-copy">
            <h2 className="section-title">DR. JANE DOE</h2>
            <p className="section-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas laoreet massa, nec lacinia ex. Maecenas pellentesque et diam maximus molestie. 
              In malesuada nisi at risus facilisis mattis. Phasellus laoreet ligula eu posuere porttitor. 
              Fusce ex augue, consequat a leo quis, cursus vulputate felis. 
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

      {/* FOOTER */}
      <footer className="footer" id="blog">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              <img
                src={logo}
                alt="TrueWellness Logo"
                className="brand-logo"
                />
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
    </div>
  );
}