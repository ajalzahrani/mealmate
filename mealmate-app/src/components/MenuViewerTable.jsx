import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/WeekDayViewStyle.css"; // Import your CSS file
import { apiUrls } from "../api-url";

const MenuItemEditor = ({ item, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  const handleUpdate = () => (event) => {
    console.log(item.id, event.target.value);
    // call API to update data
  };

  const handleDelete = () => {
    console.log(item.id);
    // call API to delete data
  };

  useEffect(() => {
    console.log(item);
  }, []);

  return (
    visible && (
      <div className="popup-message">
        <div className="popup-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <p>
            ID: {item.id} - Name: {item.name}
          </p>
          <input
            type="text"
            defaultValue={item.name}
            onChange={handleUpdate()}
          />
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    )
  );
};

const MenuViewerTable = ({ data, isEditable }) => {
  const [menuItems, setMenuItems] = useState(data);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    console.log("MenuViewerTable: ", menuItems);
    setMenuItems(data);
  }, [data]);

  const handleDoubleClick = (item) => {
    console.log({ id: item.id, text: item.text });
    setItemToEdit(item);
    setShowEditDialog(true);
  };

  const handleRemoveMenuItem = async (item) => {
    try {
      // Make the DELETE request
      const response = await axios.delete(apiUrls.DELETE_MENU_URL, {
        data: { id: item.id }, // Pass the ID to delete
        headers: {
          "Content-Type": "application/json",
        },
      });

      // if success then update the loacl state
      if (response.status === 200) {
        setMenuItems((prevMenuItems) =>
          prevMenuItems.filter((tem) => tem.id !== item.id)
        );

        console.log(`Item with ID ${item.name} deleted successfully.`);
      } else {
        console.log(`Failed to delete item with ID ${item.name}.`);
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
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

  // Render tables for each meal time
  const mealTimeTables = Object.keys(groupedData).map((mealTime) => {
    const { A, B } = groupedData[mealTime];
    const rowsA = A.map((item) => (
      <tr key={item.id}>
        <td onDoubleClick={() => handleDoubleClick(item)}>{item.name}</td>
        <td>{item.name2l}</td> {/* Separate column for name2l */}
        {isEditable && (
          <td>
            <button onClick={() => handleRemoveMenuItem(item)}>X</button>
          </td>
        )}
      </tr>
    ));

    const rowsB = B.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.name2l}</td> {/* Separate column for name2l */}
        {isEditable && (
          <td>
            <button onClick={() => handleRemoveMenuItem(item)}>X</button>
          </td>
        )}
      </tr>
    ));

    return (
      <div key={mealTime} className="meal-table">
        <h2>{mealTime}</h2>
        <table>
          <thead>
            <tr>
              <th>Category A</th>
              {B.length > 0 && <th>Category B</th>}
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
};

export default MenuViewerTable;
