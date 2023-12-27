// Create a PopupModal component to display JoiningDetailsForm as a popup
import React from "react";
import JoiningDetailsForm from "../HiredNotHiredForm/JoiningDetailsForm";
import "./modal.css";

const PopupModalWithJoiningDetails = () => {
  return (
    <div className="modal">
    <div className="modal-content">
        <JoiningDetailsForm />
      </div>
    </div>
  );
};

export default PopupModalWithJoiningDetails;
