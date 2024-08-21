import React, { useState, useEffect } from "react";
import MenuViewerTable from "./MenuViewerTable";
import { apiUrls } from "../api-url";

export default function MenuShow() {
  // TODO: get today menu
  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    handleFetchMenu();
  }, []);

  const handleFetchMenu = async () => {
    try {
      const newDayMeal = {
        mealTime: "",
        mealDay: "Wednesday",
        mealWeek: "1",
        viewBy: "2",
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
    <div>
      <h1>Menu</h1>
      <MenuViewerTable data={mealData} isEditable={false} />
    </div>
  );
}
