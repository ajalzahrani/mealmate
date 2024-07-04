const fs = require("fs");

const convert_to_integer = (myNumberStr) => {
  try {
    if (!is_valid_digit_number(myNumberStr)) {
      console.error(
        `Error: Invalid integer value for MY_NUMBER: ${myNumberStr}`
      );
      return 0;
    } else {
      const myNumber = parseInt(myNumberStr, 10); // Base 10
      return myNumber;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 0;
  }
};

function is_valid_digit_number(digit) {
  const phone_regex = /^[0-9]+$/;
  return phone_regex.test(digit);
}

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

module.exports = { convert_to_integer, readJSONFile, writeJSONFile };
