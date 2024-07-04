require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const errorHandler = require("./middleware/Error_Handling");
const { readJSONFile, writeJSONFile } = require("./utils/common");
const { logEvents } = require("./middleware/Log_Event");
const { menu } = require("./menu.controller");

const app = express();
app.use(cors());

app.use(bodyParser.json());

// GET endpoint to retrieve data from database
app.get("/menu", (req, res) => {
  menu(req, res);
});

// POST endpoint to handle submission from React app
app.post("/submit", (req, res) => {
  console.log("Received data:", req.body);

  const { pid, categories } = req.body;
  // Validate the presence of pid and categories
  if (!pid || !categories) {
    return res
      .status(400)
      .json({ error: "Patient MRN and categories are required." });
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
});

app.get("/data", (req, res) => {
  // Read the data.json file asynchronously
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    // Respond with the JSON data
    res.json(jsonData);
  });
});

app.post("/login", (req, res) => {
  console.log("Received data:", req.body);

  const { username, password } = req.body;
  // Validate the presence of pid and categories
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
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
});

const PORT = process.env.PORT || 3001;

// Start the Express server
app.listen(PORT, () => {
  console.log(
    `Server listening at http://localhost:${PORT} for ${
      process.env.IS_DEVELOPMENT ? "Development" : "Production"
    }`
  );
});

// custom error reporter
app.use(errorHandler);
