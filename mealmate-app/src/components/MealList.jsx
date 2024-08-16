import React, { useEffect } from "react";

const MealList = ({ meals }) => {
  const categoryA = meals.filter((meal) => meal.category === "A");
  const categoryB = meals.filter((meal) => meal.category === "B");

  return (
    <div>
      <h2>Category A</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Meal ID</th>
            <th>Meal Time</th>
            <th>Meal Day</th>
            <th>Meal Week</th>
          </tr>
        </thead>
        <tbody>
          {categoryA.map((meal) => (
            <tr key={meal.id}>
              <td>{meal.id}</td>
              <td>{meal.mealId}</td>
              <td>{meal.mealTime}</td>
              <td>{meal.mealDay}</td>
              <td>{meal.mealWeek}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Category B</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Meal ID</th>
            <th>Meal Time</th>
            <th>Meal Day</th>
            <th>Meal Week</th>
          </tr>
        </thead>
        <tbody>
          {categoryB.map((meal) => (
            <tr key={meal.id}>
              <td>{meal.id}</td>
              <td>{meal.mealId}</td>
              <td>{meal.mealTime}</td>
              <td>{meal.mealDay}</td>
              <td>{meal.mealWeek}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealList;
