// MealComponent.js

import React, { useState, useEffect } from "react";
import PopupMessage from "./PopMessage";

const MealComponent = () => {
  const [newMealName, setNewMealName] = useState("");
  const [newMealWeight, setNewMealWeight] = useState("");
  const [newMealCalories, setNewMealCalories] = useState("");
  const [newMealName2l, setNewMealName2l] = useState("");
  const [newMealWeight2l, setNewMealWeight2l] = useState("");
  const [newMealCalories2l, setNewMealCalories2l] = useState("");

  // Function to add a new meal
  const addMeal = async () => {
    try {
      const newMeal = {
        name: newMealName,
        weight: newMealWeight,
        calories: newMealCalories,
        name2l: newMealName2l,
        weight2l: newMealWeight2l,
        calories2l: newMealCalories2l,
      };

      const res = await fetch("http://localhost:3000/api/meal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeal),
      });

      if (!res.ok) {
        alert("Failed to add meal");
        return;
      }

      // Handle success response
      alert("Meal added successfully");
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  // Call the addMeal function when needed (e.g., on button click)

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // height: "100vh",
      }}>
      <table border="1" width="200" cellpadding="10">
        <tr>
          <td>Meal Name</td>
          <td>Meal Weight</td>
          <td>Meal Calories</td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              value={newMealName}
              onChange={(e) => setNewMealName(e.target.value)}
              placeholder="Meal Name"
            />
          </td>
          <td>
            <input
              type="text"
              value={newMealWeight}
              onChange={(e) => setNewMealWeight(e.target.value)}
              placeholder="Meal Weight"
            />
          </td>
          <td>
            <input
              type="text"
              value={newMealCalories}
              onChange={(e) => setNewMealCalories(e.target.value)}
              placeholder="Meal Calories"
            />
          </td>
        </tr>
        <tr>
          <td>Meal Name 2</td>
          <td>Meal Weight 2</td>
          <td>Meal Calories 2</td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              value={newMealName2l}
              onChange={(e) => setNewMealName2l(e.target.value)}
              placeholder="Meal Name 2l"
            />
          </td>
          <td>
            <input
              type="text"
              value={newMealWeight2l}
              onChange={(e) => setNewMealWeight2l(e.target.value)}
              placeholder="Meal Weight 2l"
            />
          </td>
          <td>
            <input
              type="text"
              value={newMealCalories2l}
              onChange={(e) => setNewMealCalories2l(e.target.value)}
              placeholder="Meal Calories 2l"
            />
          </td>
        </tr>
        <tr>
          <td colSpan="3">
            <button onClick={addMeal}>Add New Meal</button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default MealComponent;
