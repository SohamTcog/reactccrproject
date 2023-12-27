import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

interface CalculatedScore {
  averageScore: number;
  candidateId: number;
  recruiterId: number;
}

const SavedResponse = () => {
  const navigate = useNavigate();
  const [interview, setInterview] = useState<CalculatedScore[]>([]);

  const goToRecruiterDashboard = () => {
    let role =localStorage.getItem("recruiterRole");
    console.log(role)
    if(role=="hradmin")
    {
      navigate("/hradminDashboard");
    }
    else{
      navigate("/recruiterDashbord");
    }
  
  };
  return (
    <div
      style={{
        width: "40%",
        textAlign: "center",
        minHeight: "200px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "40px",

        padding: "0px",
        border: "2px solid #ccc",
        borderRadius: "5px",
        fontSize: "1em",
        marginBottom: "10px",
      }}
    >
      <h2> Thank You For Submitting Your Responses. </h2>
      <button
        onClick={goToRecruiterDashboard}
        style={{ marginTop: "15px", marginLeft: "-10px" }}
      >
        {" "}
        Go Recruiter Home Page
      </button>
    </div>
  );
};

export default SavedResponse;
