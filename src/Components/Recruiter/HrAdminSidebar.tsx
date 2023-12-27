import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
 import './RecruiterSidebar.css';
import buildingIcon from "../Icon/building.png";
import dashIcon from "../Icon/horizontal.png";
import candidateIcon from "../Icon/double.png";
import supportIcon from "../Icon/headphones.png";
import signoutIcon from "../Icon/exit.png";
import Avatar from "../Icon/Avatar.png";
import { Button } from '@mui/material';


function HrAdminSidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();

  function signOutLogic(): void {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <div className='sidebar sidebarstyle'>
        <div className='section1'>
          <Link
            to="/hradminDashboard"
            className={`sidebarButton text1 typography1 ${activeLink === 'dashboard' || location.pathname === '/hradminDashboard' ? 'active' : ''}`}
  
          >
            <img src={dashIcon} alt="Dashboard" />
            Dashboard
          </Link>
          <Link
            to="/viewRecruiter"
            className={`sidebarButton text1 typography1 ${activeLink === 'recruiters' || location.pathname === '/viewRecruiter' ? 'active' : ''}`}
    
          >
            <img src={buildingIcon} alt="Recruiters" /> Recruiters
          </Link>
          <Link
            to="/searchCandidate"
            className={`sidebarButton text1 typography1 ${activeLink === 'candidates' || location.pathname === '/searchCandidate' ? 'active' : ''}`}
          >
            <img src={candidateIcon} alt="Candidates" /> Candidates
          </Link>
        </div>
        <div className='section2'>
          <Link to="/support" className='sidebarButton text2 typography1'>
            <img src={supportIcon} alt="Support" /> Support
          </Link>
          <button onClick={()=> signOutLogic()} className='sidebarButton text2 typography1'>
            <img src={signoutIcon} alt="Sign Out" /> Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

export default HrAdminSidebar;
