import React from 'react'
import './RecruiterHeader.css';
import Avatar from "../Icon/Avatar.png";
import Search from "../Icon/search.png";
import Bell from "../Icon/bell.png";
import tcognitionLogo from "../Icon/tcognitionLogo.png";
function RecruiterHeader() {
  return (
    <>
      <div className="horizontalNavigation">
         <div className="topNav"> 
   
     <div className="group2675">
             <img src={tcognitionLogo}/>
          </div>
          <div className="navbarHeading">
            CCR
          </div>
      
           <div className="frame427319351">

          <img className="searchBellIcon" src={Search}></img>
          <img className="searchBellIcon"  src={Bell}></img>
            <img className="profileIcon" src={Avatar}></img> 
          </div>  
        </div> 
      </div>

      </>
  )
}

export default RecruiterHeader