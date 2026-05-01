import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../components/header/Header";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  if (loading) return null;

  return (
    <div className="home-new">
      <Header />

      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <h2>💰 Finetrack</h2>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/dashboard")}>Dashboard</li>
            {!user && (
              <li onClick={() => navigate("/signup")}>Signup</li>
            )}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main">
          {/* HERO */}
          <div className="hero-card">
            <h1>Manage Your Money Smarter 💡</h1>
            <p>
              Track income, expenses, and get powerful insights in one place.
            </p>

            <button
              className="main-btn"
              onClick={() =>
                user ? navigate("/dashboard") : navigate("/signup")
              }
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </button>
          </div>

          {/* FEATURES */}
          <div className="features-row">
            <div className="feature-box">
              <h3>💰 Income</h3>
              <p>Track all your earnings easily</p>
            </div>

            <div className="feature-box">
              <h3>📉 Expenses</h3>
              <p>Control and reduce your spending</p>
            </div>

            <div className="feature-box">
              <h3>📊 Analytics</h3>
              <p>Visual charts for better decisions</p>
            </div>
          </div>

          {/* CTA */}
          <div className="cta-box">
            <h2>Start Tracking Today 🚀</h2>
            <p>Take control of your finances now.</p>

            <button
              className="main-btn"
              onClick={() => navigate("/signup")}
            >
              Join Now
            </button>
          </div>

          {/* FOOTER */}
          <footer className="footer">
            © {new Date().getFullYear()} Finetrack. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Home;