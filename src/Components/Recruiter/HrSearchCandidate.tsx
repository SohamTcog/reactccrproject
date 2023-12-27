// HrSearchCandidate.tsx

import React, { useState, useEffect } from "react";
import RecruiterSidebar from "./RecruiterSidebar";
import "../Recruiter/HrSearchCandidateCss.css";
import Search from "../Icon/search.png";
import Rightarrow from "../Icon/rightarrow.png";
import filterslider from "../Icon/filterslider.png";
import Cookies from "js-cookie";
import axios from "axios";
import CandidateProfile from "./CandidateProfile";
import HorizontalNavBar from "../Common/HorizontalNavBar";
import { Link, useNavigate } from "react-router-dom";
import HrAdminSidebar from "./HrAdminSidebar";
import DownArrow from "../Icon/downarrow.png";
import Avatar from "../Icon/Avatar.png";

interface candidateDetailsDto {
  userId: string;
  candidateName: String;
  candidateEmail: String;
  candidateAadhar: number;
  phoneNumber: number;
  candidateId: string;
}

const HrSearchCandidate = () => {
  const [candidateDetails, setCandidateDetails] = useState<
    candidateDetailsDto[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  const accessToken = Cookies.get("accessToken");
  let Role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/getCandidateDetails`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (response) => {

          setCandidateDetails(response.data);
        },
        (error: any) => {
          console.log("error");
        }
      );
  }, []);

  function handleSubmit(candidateId: string, userId: string): void {
    localStorage.setItem("currentSelectedCandidate", userId);
    localStorage.setItem("candidateId", candidateId);
    navigate("/candidateProfile");
  }

  return (
    <>
      <HorizontalNavBar />
      <div className="hrAdminCandidateScreen">
        <div className="hrSearchCandidateFrame">
          {Role == "ROLE_HRADMIN" ? <HrAdminSidebar /> : <RecruiterSidebar />}

          <div className="hrSearchRightContainer">
            <div className="hrSearchFrameFirstbar">
              <div className="hrSearchBreadcrumb">
                {Role == "ROLE_HRADMIN" ? (
                  <Link to="/hradminDashboard">Home</Link>
                ) : (
                  <Link to="/recruiterDashboard">Home</Link>
                )}
              </div>
              <img src={Rightarrow} className="hrSearchBreadcrumb" />
              <div className="hrSearchBreadcrumb">
                <label>Candidates</label>
              </div>
            </div>
            <div className="hrSearchFrameSecondbar">
              <div className="hrSearchFrameSecondbarLeftContainer">
                <label className="hrSearchFrameSecondbarLeftContainerLayout hrSearchFrameSecondbarLeftContainerLayoutTypography">
                  Candidates
                </label>
              </div>
              <div className="hrSearchFrameSecondbarRightContainer">
                <div className="hrSearchFrameSecondbarRightContainerInnerContainer">
                  <div className="hrSearchFrameSecondbarRightContainerInnerContainerSearch">
                    <div className="hrSearchFrameSecondbarRightContainerInnerContainerSearchText">
                      <img
                        className="hrSearchFrameSecondbarRightContainerInnerContainerSearchImage"
                        src={Search}
                      />
                      <input
                        type="text"
                        onChange={(event) => {
                          setSearchTerm(event.target.value);
                        }}
                        className="hrSearchFrameSecondbarRightContainerInnerContainerSearchText1 hrSearchFrameSecondbarRightContainerInnerContainerSearchTextTypology"
                        placeholder="Enter Aadhar Number or Email"
                      />
                    </div>
                  </div>
                  <div className="hrSearchFrameSecondbarRightContainerFilter">
                    <img
                      src={filterslider}
                      className="hrSearchFrameSecondbarRightContainerFilterLogo"
                    />
                    <label className="hrSearchFrameSecondbarRightContainerFilterText">
                      Filters
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="hrSearchFrameThirdbar">
              <div className="hrSearchFrameThirdbarTabBase">
                <label className="hrSearchFrameThirdbarTabBaseText">All</label>
              </div>
              <div className="hrSearchFrameThirdbarTabBase">
                <label className="hrSearchFrameThirdbarTabBaseText">
                  <Link to="/inReviewCandidates">
                    In Review
                  </Link>

                </label>
              </div>
              <div className="hrSearchFrameThirdbarTabBase">
                <label className="hrSearchFrameThirdbarTabBaseText">
                  <Link to="/todayJoiningCandidate">
                    Today's Joining Candidate
                  </Link>

                </label>
              </div>
            </div>
            {/* <div className="hrSearchFrameSectionContainer">
              <table className="hrSearchFrameSectionContainerTable mainContainer">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Candidate Aadhar number</th>
                    <th>Candidate Email</th>
                    <th>View Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateDetails
                    .filter((candidate) => {
                      if (searchTerm === "") {
                        return true;
                      } else {
                        return (
                          candidate.candidateName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          candidate.candidateEmail
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        );
                      }
                    })
                    .map((candidate) => (
                      <tr key={candidate.userId}>
                        <td>{candidate.candidateName}</td>
                        <td>{candidate.candidateAadhar}</td>
                        <td>{candidate.candidateEmail}</td>
                        <td>
                          <button
                            
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div> */}

            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "80vh",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                        width: "200px",
                        backgroundColor: "#f2f2f2",
                        height: "40px",
                      }}
                    >
                      Candidate Name
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                        width: "200px",
                        backgroundColor: "#f2f2f2",
                        height: "40px",
                      }}
                    >
                      Candidate Aadhar number
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                        width: "200px",
                        backgroundColor: "#f2f2f2",
                        height: "40px",
                      }}
                    >
                      Candidate Email
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                        width: "200px",
                        backgroundColor: "#f2f2f2",
                        height: "40px",
                      }}
                    >
                      Candidate Phone Number
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                        width: "200px",
                        backgroundColor: "#f2f2f2",
                        height: "40px",
                      }}
                    >
                      View Profile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidateDetails
                    .filter((candidate) => {
                      if (searchTerm === "") {
                        return true;
                      } else {
                        return (
                          candidate.candidateName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          candidate.candidateEmail
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          candidate.candidateAadhar
                            .toString()
                            .includes(searchTerm) ||
                          candidate.phoneNumber
                            .toString()
                            .includes(searchTerm)
                        );
                      }
                    })
                    .map((candidate) => (
                      <tr key={candidate.userId}>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                            height: "30px",
                          }}
                        >
                          <img
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                            }}
                            src={Avatar}
                            alt="Candidate Avatar"
                          />
                          <label
                            style={{
                              fontSize: "15px",
                              fontWeight: "600",
                              lineHeight: "22px",
                            }}
                          >
                            {candidate.candidateName}
                          </label>
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                            height: "30px",
                          }}
                        >
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              lineHeight: "20px",
                            }}
                          >
                            {candidate.candidateAadhar}
                          </label>
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                            height: "30px",
                          }}
                        >
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              lineHeight: "20px",
                            }}
                          >
                            {candidate.candidateEmail}
                          </label>
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                            height: "30px",
                          }}
                        >
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              lineHeight: "20px",
                            }}
                          >
                            {candidate.phoneNumber}
                          </label>
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                            height: "30px",
                          }}
                        >
                          <button type="submit" onClick={() => handleSubmit(candidate.candidateId, candidate.userId)}>
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HrSearchCandidate;

// HrSearchCandidate.tsx

// import React, { useState, useEffect } from "react";
// import RecruiterSidebar from "./RecruiterSidebar";
// import Search from "../Icon/search.png";
// import Rightarrow from "../Icon/rightarrow.png";
// import filterslider from "../Icon/filterslider.png";
// import Cookies from "js-cookie";
// import axios from "axios";
// import HorizontalNavBar from "../Common/HorizontalNavBar";
// import { Link } from "react-router-dom";
// import HrAdminSidebar from "./HrAdminSidebar";
// import DownArrow from "../Icon/downarrow.png";
// import Avatar from "../Icon/Avatar.png";

// interface candidateDetailsDto {
//   userId: number;
//   candidateName: String;
//   candidateEmail: String;
//   candidateAadhar: number;
// }

// const HrSearchCandidate = () => {
//   const [candidateDetails, setCandidateDetails] = useState<candidateDetailsDto[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const accessToken = Cookies.get("accessToken");
//   let Role = localStorage.getItem("role");

//   useEffect(() => {
//     axios
//       .get(`/getCandidateDetails`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then(
//         (response) => {
//           setCandidateDetails(response.data);
//         },
//         (error: any) => {
//           console.log("error");
//         }
//       );
//   }, []);

//   return (
//     <>
//       <HorizontalNavBar />
//       <div className="hrAdminCandidateScreen">
//         <div className="hrSearchCandidateFrame">
//           {Role == "ROLE_HRADMIN" ? <HrAdminSidebar /> : <RecruiterSidebar />}

//           <div style={{ padding: "20px", flex: "1 0 0" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "4px", alignSelf: "stretch" }}>
//               <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: "1 0 0" }}>
//                 <label style={{ alignSelf: "stretch" }} className="hrSearchFrameSecondbarLeftContainerLayout hrSearchFrameSecondbarLeftContainerLayoutTypography">
//                   Candidates
//                 </label>
//               </div>
//               <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "24px" }}>
//                 <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
//                   <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "234px", gap: "8px", borderRadius: "3px", border: "1px solid #e5e5e7" }}>
//                     <div style={{ display: "flex", padding: "10px 14px", justifyContent: "center", alignItems: "center", gap: "8px", borderRadius: "8px", border: "1px solid #e0e2e7", background: "#fff" }}>
//                       <img style={{ width: "20px", height: "20px" }} src={filterslider} alt="Filter Logo" />
//                       <label style={{ color: "#667085", fontSize: "14px", fontWeight: "500", lineHeight: "20px", letterSpacing: "0.07px" }}>
//                         Filters
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", alignSelf: "stretch", borderBottom: "1px solid #cccccf" }}>
//               <div style={{ display: "flex", height: "20px", padding: "10px 0px", justifyContent: "center", alignItems: "center", gap: "8px", borderBottom: "2px solid #e5e5e7" }}>
//                 <label style={{ color: "#858c95", fontSize: "15px", fontWeight: "600", lineHeight: "22px" }}>
//                   All
//                 </label>
//               </div>
//               <div style={{ display: "flex", height: "20px", padding: "10px 0px", justifyContent: "center", alignItems: "center", gap: "8px", borderBottom: "2px solid #e5e5e7" }}>
//                 <label style={{ color: "#858c95", fontSize: "15px", fontWeight: "600", lineHeight: "22px" }}>
//                   In Review
//                 </label>
//               </div>
//             </div>
//             <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "80vh" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//                 <thead>
//                   <tr>
//                     <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", width: "200px", backgroundColor: "#f2f2f2", height: "40px" }}>Candidate Name</th>
//                     <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", width: "200px", backgroundColor: "#f2f2f2", height: "40px" }}>Candidate Aadhar number</th>
//                     <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", width: "200px", backgroundColor: "#f2f2f2", height: "40px" }}>Candidate Email</th>
//                     <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", width: "200px", backgroundColor: "#f2f2f2", height: "40px" }}>View Profile</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {candidateDetails
//                     .filter((candidate) => {
//                       if (searchTerm === "") {
//                         return true;
//                       } else {
//                         return (
//                           candidate.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           candidate.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase())
//                         );
//                       }
//                     })
//                     .map((candidate) => (
//                       <tr key={candidate.userId}>
//                         <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", height: "30px" }}>
//                           <img style={{ width: "32px", height: "32px", borderRadius: "50%" }} src={Avatar} alt="Candidate Avatar" />
//                           <label style={{ fontSize: "15px", fontWeight: "600", lineHeight: "22px" }}>{candidate.candidateName}</label>
//                         </td>
//                         <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", height: "30px" }}>
//                           <label style={{ fontSize: "14px", fontWeight: "500", lineHeight: "20px" }}>{candidate.candidateAadhar}</label>
//                         </td>
//                         <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", height: "30px" }}>
//                           <label style={{ fontSize: "14px", fontWeight: "500", lineHeight: "20px" }}>{candidate.candidateEmail}</label>
//                         </td>
//                         <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", height: "30px" }}>
//                           {/* Add View Profile content here */}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HrSearchCandidate;
