import React from "react";
import "../style/WeekDayViewStyle.css"; // Import your CSS file

const WeekDayView2 = ({ data }) => {
  // Group data by meal time
  const groupedData = data.reduce((acc, item) => {
    const key = item.mealTime;
    if (!acc[key]) {
      acc[key] = { A: [], B: [] };
    }
    acc[key][item.category].push(item);
    return acc;
  }, {});

  // Render tables for each meal time
  const mealTimeTables = Object.keys(groupedData).map((mealTime) => {
    const { A, B } = groupedData[mealTime];
    const rowsA = A.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.name2l}</td> {/* Separate column for name2l */}
        {/* Add other columns for category A */}
      </tr>
    ));
    const rowsB = B.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.name2l}</td> {/* Separate column for name2l */}
        {/* Add other columns for category B */}
      </tr>
    ));

    return (
      <div key={mealTime} className="meal-table">
        <h2>{mealTime}</h2>
        <table>
          <thead>
            <tr>
              <th>Category A</th>
              <th>Category B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>{rowsA}</tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>{rowsB}</tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });

  return <div>{mealTimeTables}</div>;
};

export default WeekDayView2;
