import React, { useState } from "react";

const PopupMessage = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    visible && (
      <div className="popup-message">
        <div className="popup-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <p>{message}</p>
        </div>
      </div>
    )
  );
};

export default PopupMessage;
