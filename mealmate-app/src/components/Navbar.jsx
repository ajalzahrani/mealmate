import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const { logout, auth } = useAuthStore();

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/order" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/kitchen" className="nav-link">
            Kitchen
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/problem-list" className="nav-link">
            Problem List
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/meal-editor" className="nav-link">
            Meal Manager
          </Link>
        </li>
        {auth?.authUsername ? (
          <li className="logout-button">
            <button
              onClick={(e) => {
                logout();
              }}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
