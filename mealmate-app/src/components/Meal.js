import React from "react";
import Category from "./Category";

const Meal = ({
  name,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedLanguage,
}) => {
  const getSelectedCategoryLang = (category) => {
    if (selectedLanguage === "ar") {
      if (category === "A") {
        return "ب";
      } else if (category === "B") {
        return "أ";
      }
    } else if (selectedLanguage === "en") {
      if (category === "A") {
        return "A";
      } else if (category === "B") {
        return "B";
      }
    }
  };

  return (
    <div className="meal">
      <h2>{name}</h2>
      <div className="categories">
        {Object.keys(categories).map((category) => (
          <Category
            key={category}
            name={getSelectedCategoryLang(category)}
            items={categories[category]}
            isSelected={category === selectedCategory}
            onChoose={() => onCategoryChange(name, category)}
            selectedLanguage={selectedLanguage}
          />
        ))}
      </div>
    </div>
  );
};

export default Meal;
