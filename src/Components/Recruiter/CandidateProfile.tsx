import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../Candidate/CandidateHomeCss.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReactSpeedometer from "react-d3-speedometer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HorizontalNavBar from "../Common/HorizontalNavBar";
import HrAdminSidebar from "./HrAdminSidebar";
import RecruiterSidebar from "./RecruiterSidebar";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./HistoryOfCandidate.css";
interface Category {
  categoryId: number;
  categoryName: string;
  averageScore: number;
}
interface CalculatedScore {
  interviewScore: number;
  interviewId: number;
  interviewDate: String;
  jobRole: String;
  candidate: Candidate;
  recruiter: Recruiter;
}

interface Recruiter {
  recruiterId: number;
  company: Company;
}

interface Candidate {
  candidateId: number;
}

interface Company {
  companyName: String;
}
const CandidateProfile = () => {
  const navigate = useNavigate();
  // const { userId } = useParams<{ userId: string }>();
  const [category, setCategory] = useState<Category[]>([]);
  const [averageScore, setAverageScore] = useState(0);
  const [history, setHistory] = useState<CalculatedScore[]>([]);
  // const  userId = localStorage.getItem("currentSelectedCandidate");

  let storedUserId = localStorage.getItem("currentSelectedCandidate");
  
  const accessToken = Cookies.get("accessToken");
  let Role = localStorage.getItem("role");
  useEffect(() => {
    axios
      .post(
        `/getCandidateAverageScore`,
        {
          userId: storedUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (response) => {
          setAverageScore(response.data);
        },
        (error) => {
          alert("error");
        }
      );

    axios
      .post(
        `/getCandidateAverageScoreCategory`,
        {
          userId: storedUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(
        (response) => {
          setCategory(response.data);
        },
        (error) => {
          alert("error");
        }
      );
      axios
      .post(`/getHistoryCandidate`, {
        userId: storedUserId,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function returnToTable() {
    localStorage.removeItem("currentSelectedCandidate");
    navigate("/searchCandidate");
  }
  function navigateToRatingForm(storedUserId: string | null){
    navigate("/ratingForm");
  }

  return (
    <>
    <HorizontalNavBar />
    <div className="hrAdminCandidateScreen">
      <div className="hrSearchCandidateFrame">
      {Role == "ROLE_HRADMIN" ? <HrAdminSidebar /> : <RecruiterSidebar />}
      <div className="candidateHomeComponent">
        <div style={{ width: "300px", height: "200px" }}>
          <ReactSpeedometer
            value={averageScore}
            currentValueText="CCR Score: ${value}"
            valueTextFontSize="20px"
            minValue={0}
            segments={10}
            segmentColors={[
              "#CCCCCF",
              "#99DDFE",
              "#66BBFF",
              "#3399FF",
              "#0077FF",
              "#0055CC",
              "#003399",
              "#001166",
              "#000333",
            ]}
            maxValue={100}
            ringWidth={30}
            needleColor="red"
            needleTransitionDuration={800}
          />
        </div>
        {/* <h2>Your CategoryWise scores are: </h2>
        <div className="viewScoreGraphs">
          {category.map((cat) => (
            <div key={cat.categoryId} className="circularprogressbar">
              <div className="circularbox">
                <CircularProgressbar
                  value={cat.averageScore}
                  text={`${cat.averageScore}%`}
                />
              </div>
              <div className="circularboxCategoryName">{cat.categoryName}</div>
              
            </div>
            
          ))}
        </div> */}
       <TableContainer component={Paper} className="historyTableContainer">
        <Table
          // sx={{ maxWidth: 500 }}
          aria-label="simple table"
          className="historyTableTable"
        >
          <TableHead className="historyTableHead">
            <TableRow>
              <TableCell align="center">
                <b>
                  <h4>Company Name</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Job Role</h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Interview Score </h4>
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <h4>Interview Date</h4>
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow
                key={index}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                
                <TableCell scope="row">
                  <b>{item.recruiter.company.companyName}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{item.jobRole}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{item.interviewScore}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{item.interviewDate}</b>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        {/* <button onClick={() => returnToTable()}>Back</button> */}
        <button onClick={() => navigateToRatingForm(storedUserId)}>Rating Form</button>
      </div>
      
      </div>

      </div>
      
    </>
  );
};

export default CandidateProfile;
