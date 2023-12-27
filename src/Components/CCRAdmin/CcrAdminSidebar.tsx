import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../CCRAdmin/CcrAdminSidebarCss.css";
import buildingIcon from "../Icon/building.png";
import dashIcon from "../Icon/horizontal.png";
import candidateIcon from "../Icon/double.png";
import supportIcon from "../Icon/headphones.png";
import signoutIcon from "../Icon/exit.png";

function CcrAdminSidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  return (
    <>
      <div className="sidebar sidebarstyle">
        <div className="section1">
          <Link
            to="/ccrAdminDashboard"
            className={`sidebarButton text1 typography1 ${
              activeLink === "dashboard" ||
              location.pathname === "/ccrAdminDashboard"
                ? "active"
                : ""
            }`}
          >
            <img src={dashIcon} alt="Dashboard" />
            Dashboard
          </Link>
          {/* <Link
            to="/viewRecruiter"
            className={`sidebarButton text1 typography1 ${
              activeLink === "recruiters" ||
              location.pathname === "/viewRecruiter"
                ? "active"
                : ""
            }`}
          >
            <img src={buildingIcon} alt="Recruiters" /> HR Admins
          </Link>
          <Link
            to="/hrSearchCandidate"
            className={`sidebarButton text1 typography1 ${
              activeLink === "candidates" ||
              location.pathname === "/hrSearchCandidate"
                ? "active"
                : ""
            }`}
          >
            <img src={candidateIcon} alt="Candidates" /> Recruiters
          </Link> */}
        </div>
        <div className="section2">
          <Link to="/support" className="sidebarButton text2 typography1">
            <img src={supportIcon} alt="Support" /> Support
          </Link>
          <Link to="/" className="sidebarButton text2 typography1">
            <img src={signoutIcon} alt="Sign Out" /> Sign Out
          </Link>
        </div>
      </div>
    </>
  );
}

export default CcrAdminSidebar;
