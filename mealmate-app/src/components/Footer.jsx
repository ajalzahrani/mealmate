import "../style/Layout.css";
import React, { useState, useEffect } from "react";
import packageJson from "../../package.json";
import { apiUrls } from "../api-url";

const Footer = () => {
  // const { version } = require("../../../package.json"); // Get version from package.json

  const [mode, setMode] = useState(null);

  const callForMode = async () => {
    await fetch(apiUrls.FETCH_API_MODE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // console.log(data);
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
    <footer>
      <footer>
        <p>Developed by Patient Experiance Team &copy; 2024</p>
        {/* <p></p> */}
        <p>
          Version: {packageJson.version} {mode}
        </p>
      </footer>
    </footer>
  );
};

export default Footer;
