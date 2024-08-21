import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom"; // Import Outlet

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        <Outlet /> {/* Nested routes will be rendered here */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
