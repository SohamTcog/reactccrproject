import "./Candidate.css";
import dashIcon from "../Icon/horizontal.png";
import candidateSelected from "../Icon/candidateSelected.png";
import supportIcon from "../Icon/headphones.png";
import signoutIcon from "../Icon/exit.png";
import buildingIcon from "../Icon/building.png";
import { Link, useLocation } from 'react-router-dom';
import { useState } from "react";

function CandidateSidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  return (
    <>


      <div className="sidebar sidebarstyle">
        <div className="section1">


          <Link
            to="/candidateDashboard"
            className={`sidebarButton text1 typography1 ${activeLink === 'candidateDashboard' || location.pathname === '/candidateDashboard' ? 'active' : ''}`}
          >
            <img src={dashIcon} alt="Dashboard" />
            Dashboard
          </Link>
          <Link
            to="/companyRating"
            className={`sidebarButton text1 typography1 ${activeLink === 'companyRating' || location.pathname === '/companyRating' ? 'active' : ''}`}
          >
            <img src={buildingIcon} alt="Recruiters" /> Rate Company
          </Link>


        </div>
        <div className="section3">
          <Link to="/support" className='sidebarButton text2 typography1'>
            <img src={supportIcon} alt="Support" /> Support
          </Link>
          <Link to="/" className='sidebarButton text2 typography1'>
            <img src={signoutIcon} alt="Sign Out" /> Sign Out
          </Link>

        </div>

      </div>
    </>
  );
}

export default CandidateSidebar;
