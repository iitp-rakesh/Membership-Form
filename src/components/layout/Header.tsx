import { FaBars, FaTimes } from "react-icons/fa";

type HeaderProps = {
  isMenuOpen: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
};

function Header({ isMenuOpen, onOpenMenu, onCloseMenu }: HeaderProps) {
  return (
    <header className="main-header">
      <div className="logo-container">
        <a href="/" aria-label="Navigate to homepage">
          <img src="/logo-01.png" alt="Organization Logo" />
        </a>
      </div>

      <button className="hamburger-menu icon-btn" onClick={onOpenMenu} aria-label="Open menu" type="button">
        <FaBars />
      </button>

      <nav className={`navigation ${isMenuOpen ? "active" : ""}`} aria-label="Main navigation">
        <button className="close-menu icon-btn" onClick={onCloseMenu} aria-label="Close menu" type="button">
          <FaTimes />
        </button>

        <ul className="navigation-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#events">Events</a>
          </li>
          <li>
            <a href="#team">Team</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
        </ul>

        <div className="action-buttons">
          <button className="button donate-button" type="button">
            Donate
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
