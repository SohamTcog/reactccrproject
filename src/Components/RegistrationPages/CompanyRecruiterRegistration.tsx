import React, { useState } from "react";
import { Button, Stepper, Step, StepLabel } from "@mui/material";
import axios from "axios";
import "../RegistrationPages/comrecRegistration.css";
import { useNavigate } from "react-router-dom";
import HorizontalNavBar from "../Common/HorizontalNavBar";

const CompanyRecruiterRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const steps = ["Company Details", "Recruiter Details"];

  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [recruiterPassword, setRecruiterPassword] = useState("");
  const [recruiterPhone, setRecruiterPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyTan, setCompanyTan] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("Form Data:", {
      company: {
        companyName: companyName,
        companyAddress: companyAddress,
        companyPhone: companyPhone,
        companyTan: companyTan,
      },
      recruiter: {
        recruiterName: recruiterName,
        recruiterPhone: recruiterPhone,
        recruiterEmail: recruiterEmail,
        recruiterPassword: recruiterPassword,
      },
    });

    try {
      const response = await axios.post("http://localhost:8090/addcompany", {
        recruiterName,
        recruiterPhone: parseInt(recruiterPhone),
        recruiterEmail,
        recruiterPassword: parseInt(recruiterPassword),
        company: {
          companyName,
          companyAddress,
          companyPhone: parseInt(companyPhone),
          companyTan: parseInt(companyTan),
        },
      });
      console.log("Response from server:", response);

      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/savedCompany");
        // window.location.reload();
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <HorizontalNavBar />
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <h1>Company Registration</h1>
      </div>
      <div className="container">
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step key="Company Details">
            <StepLabel>Company Details</StepLabel>
          </Step>
          <Step key="Recruiter Details">
            <StepLabel>Recruiter Details</StepLabel>
          </Step>
        </Stepper>

        <div className="form">
          {activeStep === 0 && (
            <div className="step">
              <input
                placeholder="Company Name"
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <br></br>
              <br></br>

              <input
                type="text"
                placeholder="Company TAN"
                id="companyTAN"
                value={companyTan}
                onChange={(e) => setCompanyTan(e.target.value)}
              />
              <br></br>
              <br></br>

              <input
                type="text"
                placeholder="Company Phone"
                id="companyPhone"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
              />
              <br></br>
              <br></br>

              <input
                type="text"
                placeholder="Company Address"
                id="companyAddress"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
              <br></br>
              <br></br>
            </div>
          )}

          {activeStep === 1 && (
            <div className="step">
              <input
                placeholder="Name"
                type="text"
                id="recruiterName"
                value={recruiterName}
                onChange={(e) => setRecruiterName(e.target.value)}
              />
              <br></br>
              <br></br>

              <input
                type="text"
                placeholder="Email"
                id="recruiterEmail"
                value={recruiterEmail}
                onChange={(e) => setRecruiterEmail(e.target.value)}
              />
              <br></br>
              <br></br>

              <input
                placeholder="Password"
                type="password"
                className="styled-inputpassword"
                id="recruiterPassword"
                value={recruiterPassword}
                onChange={(e) => setRecruiterPassword(e.target.value)}
              />
              <br></br>
              <br></br>

              <input
                type="text"
                id="recruiterPhone"
                placeholder="Phone"
                value={recruiterPhone}
                onChange={(e) => setRecruiterPhone(e.target.value)}
              />
              <br></br>
              <br></br>
            </div>
          )}

          <div className="button-container">
            {activeStep !== 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBack}
              >
                Back
              </Button>
            )}

            {activeStep !== 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                style={{ marginLeft: "auto" }}
              >
                Next
              </Button>
            )}

            {activeStep === 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyRecruiterRegistration;
