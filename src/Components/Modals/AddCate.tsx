import React from "react";
import "./modal.css";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
interface PopupModalProps {
  message: string;
  onClose: () => void;

  goToRecruiterDashboard: () => void;
}

const AddCate: React.FC<PopupModalProps> = ({
  message,
  onClose,
  goToRecruiterDashboard,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <CheckCircleRoundedIcon
          style={{ fontSize: "xxx-large", color: "green" }}
          className="CheckCircleRoundedIcon"
        ></CheckCircleRoundedIcon>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h4>{message}</h4>
      </div>
    </div>
  );
};

export default AddCate;
