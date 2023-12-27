import React from "react";
import "./modal.css";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
interface PopupModalProps {
  message: string;
  onClose: () => void;

  goToRecruiterDashboard: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({
  message,
  onClose,
  goToRecruiterDashboard,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <CheckCircleOutlinedIcon
          style={{ fontSize: "xxx-large", color: "green" }}
          className="CheckCircleOutlinedIcon"
        ></CheckCircleOutlinedIcon>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>

        <button
          onClick={goToRecruiterDashboard}
          style={{ marginTop: "5px", marginLeft: "0px" }}
        >
          {" "}
          Goto Home Page
        </button>

        {/* <button onClick={goToRecruiterDashboard} style={{ marginTop: "5px",marginLeft:"0px" }}>
        {" "} 
        Go to Login Page
      </button> */}
      </div>
    </div>
  );
};

export default PopupModal;
