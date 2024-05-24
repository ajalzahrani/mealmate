const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
const port = 3001;

app.use(bodyParser.json());

const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
};

// Function to write JSON file
const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Data written to JSON file successfully.");
  } catch (error) {
    console.error("Error writing JSON file:", error);
  }
};

// POST endpoint to handle submission from React app
app.post("/submit", (req, res) => {
  const { bedId, categories } = req.body;

  // Validate the presence of bedId and categories
  if (!bedId || !categories) {
    return res
      .status(400)
      .json({ error: "Bed ID and categories are required." });
  }

  // Read existing data from JSON file
  const filePath = "data.json";
  let jsonData = readJSONFile(filePath);

  // Modify JSON data with received data
  if (jsonData) {
    jsonData.push({ bedId, categories });
  } else {
    jsonData = [{ bedId, categories }];
  }

  // Write modified data back to JSON file
  writeJSONFile(filePath, jsonData);

  console.log("Received data:", req.body);

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
