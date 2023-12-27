import React, { useEffect, useState } from "react";
import RecruiterHeader from "../Recruiter/RecruiterHeader";
import RecruiterSidebar from "../Recruiter/RecruiterSidebar";
import "../Candidate/CandidateHomeCss.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";
import Cookies from "js-cookie";
import "react-circular-progressbar/dist/styles.css";
import ReactSpeedometer from "react-d3-speedometer";
import CandidateSidebar from "./CandidateSidebar";

interface Category {
  categoryId: number;
  categoryName: string;
  averageScore: number;
}

const CandidateHome = () => {
 let userId= localStorage.getItem("userId")
  const accessToken = Cookies.get("accessToken");

  const [averageScore, setAverageScore] = useState(0);
  // const [score, setScore] = useState(0);
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .post(
        "/getCandidateAverageScore",
        {
          userId: userId,
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
        "/getCandidateAverageScoreCategory",
        {
          userId: userId,
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
  }, []);

  return (
    <>
      <RecruiterHeader />
      <div className="candidateHomeFrame">
        <CandidateSidebar />
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
          <h2>Your CategoryWise scores are: </h2>

          <div className="viewScoreGraphs">
            {category.map((cat) => (
              <div key={cat.categoryId} className="circularprogressbar">
                <div className="circularbox">
                  <CircularProgressbar
                    value={cat.averageScore}
                    text={`${cat.averageScore}%`}
                    
                  />
                </div>
                <div className="circularboxCategoryName">
                  {cat.categoryName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateHome;
