import React from 'react'
import "../Common/HorizontalNavBarCss.css";
import TCogLogo from "../Icon/tcognitionLogo.png";
import SearchLogo from "../Icon/search.png";
import BellLogo from "../Icon/bell.png";
import AvatarLogo from "../Icon/Avatar.png";

const HorizontalNavBar = () => {
  return (
    <>
    <div className='horizontalNavbar'>
        <div className='horizontalNavbarTopNav'>
        <div className='horizontalNavbarTopNavLeftSide'>
        <img className='horizontalNavbarTopNavLeftSideLogo' src={TCogLogo} />
            <label className='horizontalNavbarTopNavLeftSideText'>
                CCR
            </label>
        </div>
        <div className='horizontalNavbarTopNavRightSide'>
            <div className='horizontalNavbarTopNavRightSideFrame'>
                <div className='horizontalNavbarTopNavRightSideFrameLogos'>
                    <img className='horizontalNavbarTopNavRightSideFrameLogosSearch' src={SearchLogo}/>
                </div>
                <div className='horizontalNavbarTopNavRightSideFrameLogos'>
                    <img className='horizontalNavbarTopNavRightSideFrameLogosSearch' src={BellLogo}/>
                </div>
            </div>
            <div className='horizontalNavbarTopNavRightSideFrameUserSettings'>
                <div className='horizontalNavbarTopNavRightSideFrameUserSettings'>
                        <img src={AvatarLogo} className='horizontalNavbarTopNavRightSideFrameUserSettingsAvatar' />
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default HorizontalNavBar