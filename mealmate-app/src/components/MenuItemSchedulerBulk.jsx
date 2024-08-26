import React, { useEffect, useState } from "react";
import PopMessage from "./PopMessage";
import axios from "axios"; // Import Axios
import "../style/MealProviderStyle.css";
import { apiUrls } from "../api-url";

const MenuItemScheduler = () => {
  const [time, setTime] = useState("Breakfast"); // Default time is breakfast
  const [day, setDay] = useState("Sunday"); // Default day is Monday
  const [week, setWeek] = useState(1); // Default week is 1
  const [mealData, setMealData] = useState([]);
  const [category, setCategory] = useState("A");

  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [mealsForCategory, setMealsForCategory] = useState([]);

  const handleTextChange = (event) => {
    const inputText = event.target.value;
    const linesArray = inputText.split("\n");
    setMealsForCategory(linesArray);
  };

  useEffect(() => {
    // Fetch meals data from the GET endpoint
    fetch(apiUrls.MEALS_URL)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
      });
  }, []);

  const handleCheckboxChange = (id) => {
    // Toggle the selected item
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle array of selected items
      if (
        category === undefined ||
        time === undefined ||
        day === undefined ||
        mealsForCategory.length === 0
      ) {
        setPopupMessage("Please select all fields");
        return;
      }

      const dayCategoryMeals = mealsForCategory.map((meal) => ({
        category,
        mealName: meal,
        mealTime: time,
        mealDay: day,
        mealWeek: week,
      }));

      for (let i = 0; i < dayCategoryMeals.length; i++) {
        const meal = dayCategoryMeals[i];

        if (meal.mealName.length === 0) {
          continue;
        }

        const response = await fetch(apiUrls.MENUITEM_INSERT_BYNAME_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(meal),
        });

        if (!response.ok) {
          console.error(`Failed to add menu for meal: '${meal.mealName}'`);
          const errorResponse = await response.text();
          const errorResponseParsed = JSON.parse(errorResponse);
          setPopupMessage(errorResponseParsed.error.message);
          return; // Stop further processing
        }
      }

      setPopupMessage("Day meal added successfully");
    } catch (error) {
      console.error("Error adding day meal:", error);
      setPopupMessage("Error adding day meal. Please try again later.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        // height: "100vh",
      }}>
      {popupMessage && (
        <PopMessage
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
        />
      )}
      <textarea
        rows={7}
        id="message"
        name="message"
        value={mealsForCategory}
        onChange={handleTextChange}
      />

      <button onClick={() => alert(mealsForCategory[7])}>This button</button>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="week">Week:</label>
              </td>
              <td>
                <select
                  id="week"
                  value={week}
                  onChange={(e) => setWeek(Number(e.target.value))}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="day">Day:</label>
              </td>
              <td>
                <select
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="time">Time:</label>
              </td>
              <td>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack 1">Snack 1</option>
                  <option value="Snack 2">Snack 2</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="category">Category:</label>
              </td>
              <td>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="A">Category A</option>
                  <option value="B">Category B</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit">Add Day Meal</button>
      </form>
    </div>
  );
};

export default MenuItemScheduler;
