import React from 'react'
import RecruiterHeader from './RecruiterHeader'
import RecruiterSidebar from './RecruiterSidebar'
import HrAdminSidebar from './HrAdminSidebar';
import { Link } from 'react-router-dom';
import Rightarrow from "../Icon/rightarrow.png";

function ViewRecruiter() {
  let Role = localStorage.getItem("role");
  return (
    <>
    <div className="hrAdminCadidateScreen">
    <RecruiterHeader />
    <div className="hrSearchCandidateFrame">
      {
        Role == "ROLE_HRADMIN" ? (
          <HrAdminSidebar />
        ) : (
          <RecruiterSidebar />
        )
      }

      <div className="hrSearchRightContainer">
        <div className="hrSearchFrameFirstbar">
          <div className="hrSearchBreadcrumb">

            {
              Role == "ROLE_HRADMIN" ? (
                <Link to='/hradminDashboard'>Home</Link>
              ) : (
                <Link to="/recruiterDashboard">Home</Link>
              )
            }

          </div>
          

<img src={Rightarrow} className="hrSearchBreadcrumb" />
              <div className="hrSearchBreadcrumb">
                <label>Recruiter</label>
              </div>
            </div>
            <div className="hrSearchFrameSecondbar">
              <div className="hrSearchFrameSecondbarLeftContainer">
                <label className="hrSearchFrameSecondbarLeftContainerLayout hrSearchFrameSecondbarLeftContainerLayoutTypography">
                  Recruiters
                </label>
              </div>
              </div>
          </div>
          </div>
          </div>
              </>
        )
      }

export default ViewRecruiter