import "./Kitchen.css";
import React, { useState, useEffect } from "react";
import apiUrl from "./config";

const Kitchen = () => {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("card");

  console.log("API URL:", apiUrl); // For debugging
  useEffect(() => {
    const apiEndpoint = apiUrl + "/data";

    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setJsonData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderTable = () => (
    <table className="meal-table">
      <thead>
        <tr>
          <th>Bed ID</th>
          <th>Breakfast</th>
          <th>Lunch</th>
          <th>Dinner</th>
          <th>Snack</th>
        </tr>
      </thead>
      <tbody>
        {jsonData.map((meal, index) => (
          <tr key={index}>
            <td>{meal.bedId}</td>
            <td>{meal.categories.Breakfast || "N/A"}</td>
            <td>{meal.categories.Lunch || "N/A"}</td>
            <td>{meal.categories.Dinner || "N/A"}</td>
            <td>{meal.categories.Snack || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="kitchen-container">
      <h2>Meal Data</h2>
      <button
        className="view-button"
        onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}>
        View as {viewMode === "card" ? "Table" : "Card"}
      </button>
      {viewMode === "card" ? (
        <div className="meal-cards">
          {jsonData.map((meal, index) => (
            <div className="meal-card" key={index}>
              <h3>Bed ID: {meal.bedId}</h3>
              <div>
                <strong>Breakfast:</strong> {meal.categories.Breakfast || "N/A"}
              </div>
              <div>
                <strong>Lunch:</strong> {meal.categories.Lunch || "N/A"}
              </div>
              <div>
                <strong>Dinner:</strong> {meal.categories.Dinner || "N/A"}
              </div>
              <div>
                <strong>Snack:</strong> {meal.categories.Snack || "N/A"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        renderTable()
      )}
    </div>
  );
};

export default Kitchen;
