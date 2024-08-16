import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { apiUrls } from "../api-url.js";

export default function Navbar() {
  const { logout, auth } = useAuthStore();
  const { navigate } = useNavigate();
  const [mode, setMode] = useState(null);

  const handleLogout = () => {
    logout();
    // navigate("/login");
  };

  const callForMode = async () => {
    await fetch(apiUrls.MODE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setMode(data?.mode);
          return data;
        }
      })
      .catch((error) => {
        console.log(error);
        setMode(null);
      });
  };

  useEffect(() => {
    callForMode();
  }, []);

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
        {/* <li className="nav-item">
          <Link to="/problem-list" className="nav-link">
            Problem List
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/meal-editor" className="nav-link">
            Meal Manager
          </Link>
        </li>
        {auth?.authUsername ? (
          <>
            <li>{mode}</li>
            <li className="logout-button">
              <button
                onClick={(e) => {
                  handleLogout();
                }}>
                Logout
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}
