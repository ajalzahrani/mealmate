import React, { useState } from "react";
import NewMenuItem from "../components/NewMenuItem";
import MenuViewerForm from "../components/MenuViewerForm";
import MenuItemScheduler from "../components/MenuItemScheduler";
import MenuItemSchedulerBulk from "../components/MenuItemSchedulerBulk";
import MenuViewerTable from "../components/MenuViewerTable";

const MealManager = () => {
  const [mealData, setMealData] = useState([]);

  const handleSetData = (data) => {
    setMealData(data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <h1>Meal Manager</h1>
      <h3>Add new meal item</h3>
      <NewMenuItem />

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Add menu item</h3>
          <MenuItemScheduler />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Show Menu</h3>
          <MenuViewerForm setMealData={handleSetData} />
        </div>
      </div>

      <MenuViewerTable data={mealData} isEditable={true} />

      <h3>Bulk Insert</h3>
      <MenuItemSchedulerBulk />
    </div>
  );
};

export default MealManager;
