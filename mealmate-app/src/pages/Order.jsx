import "../style/App.css";
import React, { useEffect, useState } from "react";
import Meal from "../components/Meal";
import mealsData from "../store/mealsData";
import PopupMessage from "../components/PopMessage";
import MenuShow from "../components/MenuShow";
import { apiUrls } from "../api-url.js";

const MealCategories = {
  BREAKFAST: 0,
  LUNCH: 1,
  DINNER: 2,
  SNACK1: 3,
};

const Order = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCategories, setSelectedCategories] = useState({
    Breakfast: null,
    Lunch: null,
    Dinner: null,
    Snack1: null,
  });
  const [popupMessage, setPopupMessage] = useState(null);
  const [mrn, setMrn] = useState("4056060482");
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const [UHID, setUHID] = useState(null);

  const handleCategoryClick = (mealTime, category) => {
    console.log({ mealTime, category });
    setSelectedCategories((prevCategories) => ({
      ...prevCategories,
      [mealTime]: category,
    }));
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

  const handleSubmit = async () => {
    if (data === null) {
      setPopupMessage("No patient data found");
      return;
    }
    // Map selected categories to English equivalents if the current language is Arabic
    const translatedCategories = { ...selectedCategories };

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
        setPopupMessage("order submitted successfuly");
        console.log(data);
      })
      .catch((error) => {
        setPopupMessage("Error submiting order");
        console.error("Error:", error);
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

          {data && (
            <div className="patient-data">
              <p>MRN: {data?.UHID}</p>
              <p>Patient Name: {data?.PatientName}</p>
              <p>Age: {data?.Age}</p>
              <p>
                Start Date:{" "}
                {new Date(data?.ReqiStartdate).toISOString().slice(0, 10)}{" "}
              </p>
              <p>
                End Date:{" "}
                {new Date(data?.ReqiEnddate).toISOString().slice(0, 10)}
                {""}
              </p>
              <p>Bed: {data?.BedName}</p>
              <p>Diet type: {data?.DietType}</p>
              <p>Diet category: {data?.DietCategory}</p>
              <p>Remarks: {data?.Remarks}</p>
            </div>
          )}
        </div>
        <div className="Menu-body">
          <div>
            Breakfast: {selectedCategories.Breakfast} {" | "}
            Lunch: {selectedCategories.Lunch} {" | "}
            Dinner: {selectedCategories.Dinner} {" | "}
            Snack: {selectedCategories["Snack 1"]}
          </div>

          <MenuShow
            handleCategoryClick={handleCategoryClick}
            selectedLanguage={selectedLanguage}
          />
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
