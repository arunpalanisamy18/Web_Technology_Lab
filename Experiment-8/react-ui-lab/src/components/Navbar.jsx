
import { useState } from "react";

export default function Navbar({
  darkMode,
  setDarkMode,
  search,
  setSearch,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-brand">
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <h2>EduDashboard</h2>
      </div>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#courses" onClick={() => setMenuOpen(false)}>Courses</a>
        <a href="#tasks" onClick={() => setMenuOpen(false)}>Tasks</a>
      </nav>

      <div className="nav-actions">
        <input
          className="search-input"
          type="search"
          placeholder="Search courses..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search courses"
        />

        <div className="notification-wrapper">
          <button
            className="icon-button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            ♧
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div className="notification-popup">
              <strong>Notifications</strong>
              <p>Welcome back! Check your pending tasks.</p>
              <button onClick={() => setShowNotifications(false)}>
                Close
              </button>
            </div>
          )}
        </div>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <img
          className="profile-image"
          src="/pfp.jpg"
          alt="Student profile"
        />
      </div>
    </header>
  );
}
