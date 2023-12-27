import React from "react";
import { useNavigate } from "react-router-dom";
const SavedCompany = () => {
  const navigate = useNavigate();

  const goToRecruiterLogin = () => {
    navigate("/recruiterLogin");
  };

  return (
    <div
      style={{
        width: "40%",
        textAlign: "center",
        minHeight: "200px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px",

        padding: "0px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "1em",
        marginBottom: "10px",
      }}
    >
      <h1>Company Registered Successfully</h1>
      <p>Thank you for registering to CCR</p>

      <button onClick={goToRecruiterLogin} style={{ marginTop: "20px" }}>
        {" "}
        Go Recruiter Login Page
      </button>
    </div>
  );
};

export default SavedCompany;
