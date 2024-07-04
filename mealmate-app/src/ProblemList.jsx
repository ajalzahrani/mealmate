import "./Kitchen.css";
import React from "react";

const ProblemList = () => {
  const renderTable = () => (
    <table className="meal-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Identify patient bed</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Identify patient meal type - Diet or General</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            QRCode distrubuting to patient where they can scan the QR,
            potantially lead to mis assign patient meal
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>Patient bed cycel</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Order time</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="Kitchen-container">
      <h2>Problem List</h2>
      {renderTable()}
    </div>
  );
};

export default ProblemList;
