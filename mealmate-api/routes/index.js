const express = require("express");
const createError = require("http-errors");
const fs = require("fs");
const router = express.Router();
const { readJSONFile, writeJSONFile } = require("../utils/common");
const { patient } = require("../controller/patient.controller");
const {
  addMeal,
  getAllMeals,
  addMenuItem,
  addMenuItemByName,
  getDayMenu,
  deleteMenuItem,
} = require("../controller/meal.controller");

// get inpatient data
router.get("/patient", (req, res, next) => {
  patient(req, res, next);
});

// post patient selections
router.post("/submit-patient-order", (req, res, next) => {
  try {
    console.log("Received data:", req.body);

    const { pid, categories } = req.body;
    // Validate the presence of pid and categories
    if (!pid || !categories) {
      throw createError.BadRequest("Patient MRN and categories are required.");
      // return res
      //   .status(400)
      //   .json({ error: "Patient MRN and categories are required." });
    }

    // Read existing data from JSON file
    const filePath = "data.json";
    let jsonData = readJSONFile(filePath);

    // Modify JSON data with received data
    if (jsonData) {
      jsonData.push({ pid, categories });
    } else {
      jsonData = [{ pid, categories }];
    }

    // Write modified data back to JSON file
    writeJSONFile(filePath, jsonData);

    // Process the data (for demonstration, just sending a success response)
    res.json({ message: "Data received successfully." });
  } catch (error) {
    next(error);
  }
});

router.get("/fetch-patient-order", (req, res, next) => {
  try {
    // Read the data.json file asynchronously
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        // console.error("Error reading file:", err);
        // res.status(500).json({ error: "Internal Server Error" });
        // return;
        throw createError.BadRequest("Internal Server Error");
      }
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      // Respond with the JSON data
      res.json(jsonData);
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", (req, res, next) => {
  try {
    console.log("Received data:", req.body);

    const { username, password } = req.body;
    // Validate the presence of pid and categories
    if (!username || !password) {
      // return res
      //   .status(400)
      //   .json({ error: "Username and password are required." });
      throw createError.BadRequest("Username and password are required.");
    }

    // Read existing data from JSON file
    const filePath = "user.json";
    let jsonData = readJSONFile(filePath);

    // check if username and password match of jsonData array
    if (jsonData) {
      const user = jsonData.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/mode", (req, res, next) => {
  res.json({
    mode: process.env.IS_DEVELOPMENT === "true" ? "Development" : "Production",
  });
});

router.get("/meals", (req, res, next) => {
  getAllMeals(req, res, next);
});

router.post("/add-meal", (req, res, next) => {
  addMeal(req, res, next);
});

router.post("/menu", (req, res, next) => {
  getDayMenu(req, res, next);
});

router.delete("/menu", (req, res, next) => {
  // delete menu item
  deleteMenuItem(req, res, next);
});

router.post("/add-menu-item", (req, res, next) => {
  addMenuItem(req, res, next);
});

router.post("/add-menu-item-name", (req, res, next) => {
  addMenuItemByName(req, res, next);
});

module.exports = router;
