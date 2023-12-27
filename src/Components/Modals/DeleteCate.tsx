import React from "react";
import "./modal.css";

// import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
interface PopupModalProps {
  message: string;
  onClose: () => void;

  goToRecruiterDashboard: () => void;
}

const DeleteCate: React.FC<PopupModalProps> = ({
  message,
  onClose,
  goToRecruiterDashboard,
}) => {
  return (
    <div className="modal1">
      <div className="modal-content1">
        <ErrorOutlinedIcon
          style={{ fontSize: "xxx-large" }}
          className="ErrorOutlinedIcon1"
        ></ErrorOutlinedIcon>
        <span className="close1" onClick={onClose}>
          &times;
        </span>
        <h4>{message}</h4>

        {/* <button onClick={goToRecruiterDashboard} style={{ marginTop: "5px",marginLeft:"0px" }}>
        {" "}
        Go Recruiter Home Page
      </button>  */}
      </div>
    </div>
  );
};

export default DeleteCate;
