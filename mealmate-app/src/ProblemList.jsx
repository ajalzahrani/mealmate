import "./Kitchen.css";
import React from "react";

const ProblemList = () => {
  const renderTable = () => (
    <table className="meal-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Problem</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Identifying Patient Beds</td>
          <td>
            The system needs to accurately identify each patient's bed to ensure
            that meal orders are assigned to the correct patient.
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Identifying Patient Meal Types - Diet or General</td>
          <td>
            it's crucial to distinguish between different meal types based on
            each patient's dietary requirements, such as specialized diets for
            medical conditions or general meal options.
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Distributing QR Codes to Patients for Meal Ordering</td>
          <td>
            The system must distribute QR codes to patients, allowing them to
            scan the code to access the meal ordering interface. However,
            there's a risk of misassignment if codes are not securely linked to
            the correct patient's information.
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>Managing Patient Bed Cycles</td>
          <td>
            Patient bed cycles, including admissions, transfers, and discharges,
            need to be tracked and synchronized with the meal ordering system to
            ensure that meal orders are managed accurately based on patient
            location and status.
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>Recording Order Time</td>
          <td>
            The system should record the time when each meal order is placed,
            providing crucial data for meal preparation, delivery scheduling,
            and monitoring of patient meal preferences and patterns.
          </td>
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
