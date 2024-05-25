import "../Layout.css";
import React from "react";

const Footer = () => {
  const { version } = require("../../package.json"); // Get version from package.json
  return (
    <footer>
      <footer>
        <p>Developed by Patient Experiance Team &copy; 2024</p>
        {/* <p></p> */}
        <p>Version: {version} demo</p>
      </footer>
    </footer>
  );
};

export default Footer;
