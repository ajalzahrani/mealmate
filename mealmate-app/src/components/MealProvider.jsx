import React, { useEffect, useState } from "react";
import PopMessage from "./PopMessage";

const MealProvider = () => {
  const [time, setTime] = useState("Breakfast"); // Default time is breakfast
  const [day, setDay] = useState("Sunday"); // Default day is Monday
  const [week, setWeek] = useState(1); // Default week is 1
  const [mealData, setMealData] = useState([]);
  const [category, setCategory] = useState("A");

  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [popupMessage, setPopupMessage] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newDayMeal = {
        category: category,
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

      console.log({ response: response.status });

      if (!response.ok) {
        console.error("Failed to add day meal");
        setPopupMessage("Failed to add day meal");
        return;
      }

      const data = await response.json();
      setMealData(data);
      console.log({ data });
      // You can handle success here (e.g., show a success message)
    } catch (error) {
      console.error("Error adding day meal:", error);
      setPopupMessage("Error adding day meal");
    }
  };

  return (
    <div>
      {popupMessage && (
        <PopupMessage
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
