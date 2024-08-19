import "../style/App.css";
import React, { useState } from "react";
import Meal from "../components/Meal";
import mealsData from "../store/mealsData";
import PopupMessage from "../components/PopMessage";
import { apiUrls } from "../api-url.js";

const Order = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCategories, setSelectedCategories] = useState({
    Breakfast: null,
    Lunch: null,
    Dinner: null,
    Snack: null,
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [mrn, setMrn] = useState("4056060482");
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const [UHID, setUHID] = useState(null);

  const handleFetchPatientData = async () => {
    setLoading(true);
    setIsError(false);
    await fetch(apiUrls.PATIENT_FETCH_URL + mrn, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setUHID(data?.UHID);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setPopupMessage(error.message);
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

  const handleSubmit = async () => {
    if (data === null) {
      setPopupMessage("No patient data found");
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

    await fetch(apiUrls.ORDER_SUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: UHID,
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
    <div>
      <div className="App-body">
        <div className="Control-body">
          <h1>Order</h1>

          <div className="Control-form">
            <div className="language-selector">
              <label>{"Language:"} </label>
              <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            <div className="bed-id-input">
              <label>MRN</label>
              <input
                type="text"
                value={mrn}
                onChange={(e) => setMrn(e.target.value)}
                placeholder="MRN"
              />
            </div>
            <button
              disabled={isLoading}
              onClick={handleFetchPatientData}
              className="submit-button">
              Find Patient
            </button>
          </div>

          {isLoading && <p>Loading ...</p>}

          {/* {isError && <p>Error fetching patient data</p>} */}

          {data && (
            <div className="patient-data">
              <p>MRN: {data?.UHID}</p>
              <p>Patient Name: {data?.PatientName}</p>
              <p>Age: {data?.Age}</p>
              <p>
                Start Date:{" "}
                {new Date(data?.ReqiStartdate).toISOString().slice(0, 10)}{" "}
              </p>
              {/* <p>Start Date: {Date(data?.ReqiStartdate, "en-GB")}</p> */}
              <p>
                End Date:{" "}
                {new Date(data?.ReqiEnddate).toISOString().slice(0, 10)}
                {""}
              </p>
              {/* <p>Gender: {data?.Gender}</p>
              <p>Nationality: {data?.Nationality}</p> */}
              <p>Bed: {data?.BedName}</p>
              <p>Diet type: {data?.DietType}</p>
              <p>Diet category: {data?.DietCategory}</p>
              <p>Remarks: {data?.Remarks}</p>
            </div>
          )}
        </div>
        <div className="Menu-body">
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

export default Order;
