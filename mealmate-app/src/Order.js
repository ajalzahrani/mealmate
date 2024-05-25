import "./App.css";
import React, { useState, useEffect } from "react";
import Meal from "./components/Meal";
import mealsData from "./mealsData";
import PopupMessage from "./components/PopMessage";

const Order = ({ bedParam }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCategories, setSelectedCategories] = useState({
    Breakfast: null,
    Lunch: null,
    Dinner: null,
    Snack: null,
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [bedId, setBedId] = useState("");
  const apiUrl = process.env.IS_DEVELOPMENT
    ? process.env.DEV_API_URL
    : process.env.PRO_API_URL;

  useEffect(() => {
    // Function to handle QR code scanning
    const handleQRCodeScanned = (scannedData) => {
      // Extract bed ID from the scanned QR code data
      const extractedBedId = extractBedIdFromQRCode(scannedData);
      setBedId(extractedBedId);
    };

    // Simulating QR code scanning for demonstration purposes
    const simulateQRCodeScanning = () => {
      // Replace with actual QR code scanning functionality
      const simulatedScannedData = bedId; // Simulated scanned data (e.g., bed ID)
      handleQRCodeScanned(simulatedScannedData);
    };

    // Simulate QR code scanning when component mounts
    simulateQRCodeScanning();
  }, [bedId]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setSelectedCategories({
      Breakfast: null,
      Lunch: null,
      Dinner: null,
      Snack: null,
    });
  };

  const handleCategoryChange = (mealName, newCategory) => {
    setSelectedCategories((prevCategories) => ({
      ...prevCategories,
      [mealName]: newCategory,
    }));
  };

  const handleSubmit = () => {
    if (!bedId) {
      alert("Please enter a valid bed ID");
      return;
    }

    // Map selected categories to English equivalents if the current language is Arabic
    const translatedCategories = { ...selectedCategories };
    if (selectedLanguage === "ar") {
      const arabicToEnglishMap = {
        فطور: "Breakfast",
        الغداء: "Lunch",
        العشاء: "Dinner",
        "وجبة خفيفة": "Snack",
      };
      Object.keys(translatedCategories).forEach((key) => {
        const englishKey = arabicToEnglishMap[key];
        translatedCategories[englishKey] = translatedCategories[key];
        delete translatedCategories[key];
      });
    }

    // Replace with your API endpoint
    const apiEndpoint = apiUrl + "/submit";

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bedId: bedId,
        categories: translatedCategories,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (selectedLanguage === "en") {
          setPopupMessage("order submitted successfuly");
        } else {
          setPopupMessage("تم تقديم الطلب بنجاح");
        }
      })
      .catch((error) => {
        if (selectedLanguage === "en") {
          setPopupMessage("Error submiting order");
        } else {
          setPopupMessage("خطأ في تقديم الطلب");
        }
      });
  };

  return (
    <div className="App">
      <div className="App-body">
        <h1>{selectedLanguage === "en" ? "Order" : "طلب"}</h1>

        <div className="language-selector">
          <label>
            {selectedLanguage === "en" ? "اختر اللغة:" : "Select Language:"}{" "}
          </label>
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
        <div className="bed-id-input">
          <label>
            {selectedLanguage === "en" ? "Bed ID:" : "رقم السرير:"}{" "}
          </label>
          <input
            type="text"
            value={bedId}
            onChange={(e) => setBedId(e.target.value)}
            placeholder="Bed ID"
          />
        </div>
        {mealsData[selectedLanguage].map((meal, index) => (
          <Meal
            key={index}
            name={meal.name}
            categories={meal.categories}
            selectedCategory={selectedCategories[meal.name]}
            onCategoryChange={handleCategoryChange}
            selectedLanguage={selectedLanguage}
          />
        ))}
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
        />
      )}
    </div>
  );
};

// Function to extract bed ID from scanned QR code data
const extractBedIdFromQRCode = (scannedData) => {
  // Implement your logic to extract the bed ID from the scanned data
  return scannedData; // For demonstration, returning the scanned data itself
};

export default Order;
