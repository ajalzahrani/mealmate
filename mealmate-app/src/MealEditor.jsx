import React, { useEffect, useState } from "react";
import MealManager from "./MealManager";
import mealsData from "./mealsData";
import MealContext from "./MealContext"; // Import the context

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
