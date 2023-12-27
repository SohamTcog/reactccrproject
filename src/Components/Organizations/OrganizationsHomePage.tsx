import React from 'react';
import "../Organizations/OrganizationsHomePageCss.css";
import buildingIcon from "../Icon/building.png"
import dashIcon from "../Icon/horizontal.png"
import candidateIcon from "../Icon/double.png"
import supportIcon from "../Icon/headphones.png"
import signoutIcon from "../Icon/exit.png"
import Avatar from "../Icon/Avatar.png"

const OrganizationsHomePage = () => {
  return (
    <>
        <div className='sidebar sidebarstyle'>
        {/* <div className='section1'>
          <p><label className='text1 typography1'><img src={Avatar}></img>Soham Kulkarni </label>
           <label className='text1 typographyEmail'>Soham@gmail.com</label></p>
        </div> */}

        <div className='section2'>

          <button className='text2 typography2'><img src={dashIcon}></img> Dashboard</button>
          <button className='text2 typography2'><img src={dashIcon}></img> Organizations</button>
          <button className='text2 typography2'><img src={buildingIcon}></img> Recruiters</button>
          <button className='text2 typography2'><img src={candidateIcon}></img> Candidates</button>
        </div>
        <div className='section3'>
          <button className='text3 typography2'><img src={supportIcon}></img>Support</button>
          <button className='text3 typography2'><img src={signoutIcon}></img>Sign Out</button>
        </div>
      </div>
    </>
  )
}

export default OrganizationsHomePage;