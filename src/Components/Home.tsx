import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

// import RegistrationForm from "./RegistrationPages/RegistrationForm";
// import ccr from "../Images/4565.webp";
import HorizontalNavBar from "./Common/HorizontalNavBar";

const Home = () => {
  return (
    <>
      <HorizontalNavBar />
      <div
        // style={{
        //   backgroundImage: `url(${ccr})`,
        //   backgroundSize: "cover",
        //   minHeight: "86vh",
        // }}
      >
        <div style={{ textAlign: "right" }}>
          <br />
          {/* <p
          className="heading"
          style={{
            fontWeight: "bolder",
            fontSize: "25px",
            marginLeft:"10px",
            marginTop:"-14px",
            fontFamily: '"Poppins" ,sans-serif',
          }}
        >
          Welcome To CCR
        </p> */}

          <div style={{ textAlign: "right", padding: "20px" }}>
         
            <Link to="/companyrecruiterRegistration">
              <button style={{ fontFamily: '"Poppins", sans-serif' }}>
                Create an account
              </button>
            </Link>
            &nbsp;
            <Link to="/login">
              <button style={{ fontFamily: '"Poppins", sans-serif' }}>
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
