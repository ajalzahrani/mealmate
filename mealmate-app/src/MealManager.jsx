import React, { useState } from "react";

const mealsData = {
  en: [
    {
      name: "Breakfast",
      categories: {
        A: ["Pancakes", "Omelette"],
        B: ["Smoothie", "Fruit Salad"],
      },
    },
    {
      name: "Lunch",
      categories: {
        A: ["Grilled Chicken", "Caesar Salad"],
        B: ["Burger", "Fries"],
      },
    },
    {
      name: "Dinner",
      categories: {
        A: ["Steak", "Mashed Potatoes"],
        B: ["Spaghetti", "Garlic Bread"],
      },
    },
    {
      name: "Snack",
      categories: {
        A: ["Granola Bar", "Yogurt"],
        B: ["Fruit", "Nuts"],
      },
    },
  ],
  ar: [
    {
      name: "فطور",
      categories: {
        A: ["بانكيك", "تورتيلا"],
        B: ["سموثي", "سلطة فواكة"],
      },
    },
    {
      name: "الغداء",
      categories: {
        A: ["دجاج مشوي", "سلطة كاليفورنيوم"],
        B: ["برقر", "بطاطس مقلية"],
      },
    },
    {
      name: "العشاء",
      categories: {
        A: ["ستيك", "بطاطس مهروسة"],
        B: ["مكرونة", "خبز الثوم"],
      },
    },
    {
      name: "وجبة خفيفة",
      categories: {
        A: ["لوح الجرانولا", "زبادي"],
        B: ["فاكهة", "مكسرات"],
      },
    },
  ],
};

const MealManager = () => {
  const [language, setLanguage] = useState("en"); // Default to English
  const [selectedMeal, setSelectedMeal] = useState(null); // Selected meal
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [selectedItem, setSelectedItem] = useState(null); // Selected item
  const [newMealName, setNewMealName] = useState(""); // New meal name (for adding)
  const [newCategoryName, setNewCategoryName] = useState(""); // New category name (for adding)
  const [newItemName, setNewItemName] = useState(""); // New item name (for adding)
  const [editItem, setEditItem] = useState(null); // Item to edit

  // Helper function to get the current meal object
  const getMeal = () => {
    return mealsData[language].find((meal) => meal.name === selectedMeal);
  };

  // Helper function to get the current category items
  const getCategoryItems = () => {
    if (selectedMeal && selectedCategory) {
      return getMeal().categories[selectedCategory];
    }
    return [];
  };

  // Handle adding a new meal
  const handleAddMeal = () => {
    if (newMealName) {
      const newMeal = {
        name: newMealName,
        categories: {},
      };
      mealsData[language].push(newMeal);
      setSelectedMeal(newMealName);
      setNewMealName("");
    }
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (selectedMeal && newCategoryName) {
      const meal = getMeal();
      meal.categories[newCategoryName] = [];
      setSelectedCategory(newCategoryName);
      setNewCategoryName("");
    }
  };

  // Handle adding a new item
  const handleAddItem = () => {
    if (selectedMeal && selectedCategory && newItemName) {
      const meal = getMeal();
      meal.categories[selectedCategory].push(newItemName);
      setSelectedItem(newItemName);
      setNewItemName("");
    }
  };

  // Handle deleting an item
  const handleDeleteItem = (itemName) => {
    if (selectedMeal && selectedCategory) {
      const meal = getMeal();
      const categoryItems = meal.categories[selectedCategory];
      const index = categoryItems.indexOf(itemName);
      if (index !== -1) {
        categoryItems.splice(index, 1);
        setSelectedItem(null);
      }
    }
  };

  // Handle updating an item
  const handleUpdateItem = () => {
    if (selectedMeal && selectedCategory && selectedItem && editItem) {
      const meal = getMeal();
      const categoryItems = meal.categories[selectedCategory];
      const editItemIndex = categoryItems.indexOf(editItem);
      if (editItemIndex !== -1) {
        categoryItems[editItemIndex] = newItemName;
        setSelectedItem(newItemName);
        setEditItem(null);
        setNewItemName("");
      }
    }
  };

  // Handle editing an item
  const handleEditItem = (itemName) => {
    setSelectedItem(itemName);
    setEditItem(itemName);
    setNewItemName(itemName); // Set edit field to current item name
  };

  return (
    <div>
      {/* Language selection */}
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="ar">Arabic</option>
      </select>

      {/* Meal selection */}
      <h2>
        {mealsData[language].map((meal) => (
          <button key={meal.name} onClick={() => setSelectedMeal(meal.name)}>
            {meal.name}
          </button>
        ))}
      </h2>

      {/* Add new meal */}
      <input
        type="text"
        placeholder="New Meal Name"
        value={newMealName}
        onChange={(e) => setNewMealName(e.target.value)}
      />
      <button onClick={handleAddMeal}>Add Meal</button>

      {selectedMeal && (
        <>
          {/* Category selection */}
          <h3>
            {Object.keys(getMeal().categories).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}>
                {category}
              </button>
            ))}
          </h3>

          {/* Add new category */}
          <input
            type="text"
            placeholder="New Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={handleAddCategory}>Add Category</button>

          {selectedCategory && (
            <>
              {/* Display category items */}
              <ul>
                {getCategoryItems().map((item) => (
                  <li key={item}>
                    {item}
                    {selectedItem === item && ( // Conditional rendering for editing
                      <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                      />
                    )}
                    {!editItem || editItem !== item ? (
                      <button onClick={() => handleEditItem(item)}>Edit</button>
                    ) : (
                      <>
                        <button onClick={handleUpdateItem}>Update</button>
                        <button onClick={() => setEditItem(null)}>
                          Cancel
                        </button>
                      </>
                    )}
                    <button onClick={() => handleDeleteItem(item)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>

              {/* Add new item */}
              <input
                type="text"
                placeholder="New Item Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <button onClick={handleAddItem}>Add Item</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MealManager;
