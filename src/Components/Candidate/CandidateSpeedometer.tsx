import React, { useEffect, useState } from "react";
import RecruiterHeader from "../Recruiter/RecruiterHeader";
import RecruiterSidebar from "../Recruiter/RecruiterSidebar";
import "../Candidate/CandidateHomeCss.css";
import ReactSpeedometer from "react-d3-speedometer";
import Cookies from "js-cookie";

import {
  CircularProgressbar,
} from "react-circular-progressbar"
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";

interface Category {
  categoryId: number;
  categoryName: string;
  averageScore: number;
}

const CandidateHome = () => {
  const accessToken = Cookies.get("accessToken");
  let userId = 4;

  const [score, setScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  const [category, setCategory] = useState<Category[]>([]);
  useEffect(() => {
    // Fetch categories separately
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
          //   console.log(response.data);
          setScore(response.data);
        },
        (error) => {
          // console.log(error);
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
          //   console.log(response.data);
          setCategory(response.data);
        },
        (error) => {
          console.log(error);
          alert("error");
        }
      );
  }, []);

  return (
    <>
      <RecruiterHeader />
      <div className="candidateHomeFrame">
        <RecruiterSidebar />
        <div style={{ width: "300px", height: "300px" }}>
      <ReactSpeedometer
        value={averageScore}
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
          "#000033",
        ]}

        maxValue={100}
        needleColor="dark"
        needleTransitionDuration={1500}

      />
    </div>
        <div className="candidateHomeComponent">
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