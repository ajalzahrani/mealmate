import React from "react";

const Category = ({ name, items, isSelected, onChoose, selectedLanguage }) => {
  return (
    <div className={`category-card ${isSelected ? "selected" : ""}`}>
      {selectedLanguage === "ar" ? (
        <h3>القائمة ({name}) </h3>
      ) : (
        <h3>Category ({name})</h3>
      )}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={onChoose} className="choose-button">
        {isSelected
          ? selectedLanguage === "ar"
            ? "اختيارك"
            : "Choose"
          : selectedLanguage === "ar"
          ? "أختر"
          : "Chosen"}
      </button>
    </div>
  );
};

export default Category;
