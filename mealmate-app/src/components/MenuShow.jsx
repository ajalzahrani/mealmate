import React, { useState, useEffect } from "react";
import { apiUrls } from "../api-url";

export default function MenuShow({ handleCategoryClick, selectedLanguage }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    handleFetchMenu();
  }, []);

  const handleFetchMenu = async () => {
    try {
      const newDayMeal = {
        mealTime: "",
        mealDay: "Sunday",
        mealWeek: "1",
        viewBy: "2",
      };

      const response = await fetch(apiUrls.FETCH_MENU_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(newDayMeal),
      });

      if (!response.ok) {
        console.error("Failed to fetch menu");
        return;
      }

      const data = await response.json();
      setMenuItems(data);
      console.log({ data });
      // You can handle success here (e.g., show a success message)
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  // Group data by meal time
  const groupedData = menuItems.reduce((acc, item) => {
    const key = item.mealTime;
    if (!acc[key]) {
      acc[key] = { A: [], B: [] };
    }
    acc[key][item.category].push(item);
    return acc;
  }, {});

  // Function to sort items within each category
  const groupedData2 = (grouped) => {
    const sortedGrouped = {};

    for (const mealTime in grouped) {
      sortedGrouped[mealTime] = { A: [], B: [] };

      // Sort each category by meal ID or any other criteria if needed
      sortedGrouped[mealTime].A = grouped[mealTime].A.sort(
        (a, b) => a.id - b.id
      );
      sortedGrouped[mealTime].B = grouped[mealTime].B.sort(
        (a, b) => a.id - b.id
      );
    }

    return sortedGrouped;
  };

  const mealOrder = ["Breakfast", "Lunch", "Dinner", "Snack 1"];
  // Render tables for each meal time
  // const mealTimeTables = Object.keys(groupedData2(groupedData)).map(
  //   (mealTime, index) => {

  const mealTimeTables = mealOrder.map((mealTime) => {
    if (!groupedData[mealTime]) return null;
    const { A, B } = groupedData2(groupedData)[mealTime];

    const rowsA = A.map((item) => (
      <tr key={item.id}>
        {selectedLanguage == "en" ? (
          <td>{item.name}</td>
        ) : (
          <td>{item.name2l}</td>
        )}
      </tr>
    ));

    const rowsB = B.map((item) => (
      <tr key={item.id}>
        {selectedLanguage == "en" ? (
          <td>{item.name}</td>
        ) : (
          <td>{item.name2l}</td>
        )}
      </tr>
    ));

    return (
      <div key={mealTime} className="meal-table">
        <h2>{mealTime}</h2>
        <table>
          <thead>
            <tr>
              <th>
                <div style={{ display: "flex" }}>
                  <div>Category A </div>
                  <button
                    style={{ marginLeft: "auto" }}
                    onClick={() => handleCategoryClick(mealTime, "A")}>
                    Choose
                  </button>
                </div>
              </th>
              {B.length > 0 && (
                <th>
                  {" "}
                  <div style={{ display: "flex" }}>
                    <div>Category B</div>
                    <button
                      style={{ marginLeft: "auto" }}
                      onClick={() => handleCategoryClick(mealTime, "B")}>
                      Choose
                    </button>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>{rowsA}</tbody>
                </table>
              </td>
              {B.length > 0 && (
                <td>
                  <table>
                    <tbody>{rowsB}</tbody>
                  </table>
                </td>
              )}
            </tr>
          </tbody>
        </table>
        {/* {showEditDialog && (
          <MenuItemEditor
            item={itemToEdit}
            onClose={() => setShowEditDialog(false)}
          />
        )} */}
      </div>
    );
  });

  return <div>{mealTimeTables}</div>;
}
