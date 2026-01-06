// frontend/src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-brand">BookStore</a>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="#" className="navbar-link">Accueil</a>
          </li>
          <li className="navbar-item active">
            <a href="#" className="navbar-link">Articles</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;