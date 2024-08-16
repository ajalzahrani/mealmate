import React, { useEffect, useState } from "react";
import MealManager from "./pages/MealManager";
import mealsData from "./store/mealsData";
import MealContext from "./store/MealContext"; // Import the context

const MealEditor = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(mealsData);
  }, []);

  return (
    <div>
      {/* Wrap your component with the context provider */}
      <MealContext.Provider value={{ data, setData }}>
        <MealManager />
      </MealContext.Provider>
    </div>
  );
};

export default MealEditor;
