import React, { useEffect, useState } from "react";
import MenuViewerTable from "./MenuViewerTable";
import { apiUrls } from "../api-url";

const MenuViewerForm = ({ setMealData }) => {
  const [time, setTime] = useState("Breakfast"); // Default time is breakfast
  const [day, setDay] = useState("Sunday"); // Default day is Monday
  const [week, setWeek] = useState(1); // Default week is 1
  // const [mealData, setMealData] = useState([]);
  const [viewBy, setViewBy] = useState("2");

  // useEffect(() => {
  //   console.log(`Time: ${time}, Day: ${day}, Week: ${week}`);
  // }, [time, day, week]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newDayMeal = {
        mealTime: time,
        mealDay: day,
        mealWeek: week,
        viewBy: time === "-1" ? viewBy : "3",
      };

      const response = await fetch(apiUrls.MENU_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDayMeal),
      });

      if (!response.ok) {
        console.error("Failed to fetch menu");
        return;
      }

      const data = await response.json();
      setMealData(data);
      console.log({ data });
      // You can handle success here (e.g., show a success message)
    } catch (error) {
      console.error("Error fetching menu:", error);
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
      <form onSubmit={handleSubmit} style={{ alignItems: "center" }}>
        <table style={{ alignItems: "center" }}>
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
                  <option value="-1">Select</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack 1">Snack 1</option>
                  <option value="Snack 2">Snack 2</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit">Show Menu</button>
      </form>
      {/* <MenuViewerTable data={mealData} /> */}
    </div>
  );
};

export default MenuViewerForm;
