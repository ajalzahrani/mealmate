import React from "react";

const WeekDayViewComponent = ({ meals, week, day }) => {
  // Filter meals for the specified week and day
  const filteredMeals = meals.filter(
    (meal) => meal.mealWeek === week && meal.mealDay === day
  );

  // Group meals by meal time
  const groupedMeals = {};
  meals.forEach((meal) => {
    if (!groupedMeals[meal.mealTime]) {
      groupedMeals[meal.mealTime] = [];
    }
    groupedMeals[meal.mealTime].push(meal);
  });

  return (
    <div>
      {Object.keys(groupedMeals).map((mealTime) => (
        <div key={mealTime}>
          <h3>{mealTime}</h3>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}>
                    Category A
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}>
                    Category Ar
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedMeals[mealTime].map((meal) => (
                  <tr key={meal.id}>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}>
                      {meal.category === "A" ? meal.name : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}>
                      {meal.category === "A" ? meal.name2l : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}>
                    Category B
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}>
                    Category Br
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedMeals[mealTime].map((meal) => (
                  <tr key={meal.id}>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}>
                      {meal.category === "B" ? meal.name : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}>
                      {meal.category === "B" ? meal.name2l : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekDayViewComponent;
