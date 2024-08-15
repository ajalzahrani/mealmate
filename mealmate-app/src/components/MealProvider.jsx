import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import PopMessage from "./PopMessage";
import "../style/MealProviderStyle.css";

const MealProvider = () => {
  const [time, setTime] = useState("Breakfast"); // Default time is breakfast
  const [day, setDay] = useState("Sunday"); // Default day is Monday
  const [week, setWeek] = useState(1); // Default week is 1
  const [mealData, setMealData] = useState([]);
  const [category, setCategory] = useState("A");

  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // useEffect(() => {
  //   console.log(`Time: ${time}, Day: ${day}, Week: ${week}`);
  // }, [time, day, week]);

  useEffect(() => {
    // Fetch meals data from the GET endpoint
    fetch("http://localhost:3000/api/meals")
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
      if (
        category === undefined ||
        time === undefined ||
        day === undefined ||
        selectedMeal === ""
      ) {
        setPopupMessage("Please select all fields");
        return;
      }

      const newDayMeal = {
        category,
        mealID: selectedMeal,
        mealTime: time,
        mealDay: day,
        mealWeek: week,
      };

      const response = await fetch("http://localhost:3000/api/add-menu-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDayMeal),
      });

      if (response.ok) {
        const data = await response.json();
        setMealData(data);
        console.log({ data });
        setPopupMessage(data[0].message);
        // You can handle success here (e.g., show a success message)
      } else {
        let errorResponse = await response.text();
        let errorResponseParsed = JSON.parse(errorResponse);
        setPopupMessage(errorResponseParsed.error.message);
      }
    } catch (error) {
      setPopupMessage("Error adding day meal");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {popupMessage && (
        <PopMessage
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
        />
      )}
      <select
        value={selectedMeal}
        onChange={(e) => setSelectedMeal(e.target.value)}>
        <option value="">Select a meal</option>
        {meals.map((meal) => (
          <option key={meal.id} value={meal.id}>
            {meal.name}
          </option>
        ))}
      </select>

      {/* <form onSubmit={handleSubmit} className="meal-form">
        <div className="grid-container">
          {meals.map((item) => (
            <div key={item.id} className="checkbox-item">
              <label>
                <input
                  type="checkbox"
                  value={item.id}
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <span>{item.name}</span>
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form> */}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="A">Category A</option>
            <option value="B">Category B</option>
          </select>
        </div>
        <div>
          <label>Time:</label>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack 1">Snack 1</option>
            <option value="Snack 2">Snack 2</option>
          </select>
        </div>
        <div>
          <label>Day:</label>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value={"Sunday"}>Sunday</option>
            <option value={"Monday"}>Monday</option>
            <option value={"Tuesday"}>Tuesday</option>
            <option value={"Wednesday"}>Wednesday</option>
            <option value={"Thursday"}>Thursday</option>
            <option value={"Friday"}>Friday</option>
            <option value={"Saturday"}>Saturday</option>
          </select>
        </div>
        <div>
          <label>Week:</label>
          <input
            type="number"
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
          />
        </div>
        <button type="submit">Add Day Meal</button>
      </form>
    </div>
  );
};

export default MealProvider;
