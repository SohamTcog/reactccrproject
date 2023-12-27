

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./TodayJoiningDate.css";
import HorizontalNavBar from "../Common/HorizontalNavBar";

interface Candidate {
  candidateId: number;
  user: {
    userName: string;
    email: string;
    phoneNumber: number;
  };
}

interface InReviewCandidate {
  interviewScore: number;
  joiningDate: string;
  interviewId: number;
  hiringStatus: string;
  joiningStatus: string;
  notJoinedReason: string;
  candidate: Candidate;
  jobRole: string;
}

const TodayJoiningCandidate = () => {
  const userId = localStorage.getItem("userId");
  const accessToken = Cookies.get("accessToken");
  const [candidates, setCandidates] = useState<InReviewCandidate[]>([]);
  const [status, setStatus] = useState<string>("");
  const [interviewId, setInterviewId] = useState<number>(0);

  const [notJoinedReason, setNotJoinedReason] = useState<string>("");

  const handleButtonClick = (status: string, interviewId: number) => {
    setStatus(status);
    setInterviewId(interviewId)
    if (status === "JOINED") {
      handleSubmit(interviewId, status, "");
    } 
  };
  
  const handleButtonClick2 = (
    
    notJoinedReason: string
  ) => {
    
   
    setNotJoinedReason(notJoinedReason);
  

      console.log(status)
      console.log(interviewId)
      console.log(notJoinedReason)

       handleSubmit(interviewId, status, notJoinedReason);
    
  };
  
  const handleSubmit = async (
    interviewId: number,
    joiningStatus: string,
    notJoinedReason: string
  ) => {
    try {
      // Make the API call to update the status
      const response1 = await axios.post<InReviewCandidate[]>(
        `/joinedNotJoinedStatus`,
        {
          interviewId: interviewId,
          joiningStatus: joiningStatus,
          notJoinedReason: notJoinedReason,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      // Update the local state to remove the joined candidate
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate.interviewId !== interviewId)
      );
  
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post<InReviewCandidate[]>(
          `/todaysJoiningList`,
          {
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setCandidates(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, accessToken]);


  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotJoinedReason(e.target.value);
  };

  return (
    
    <div className="container1">
       <HorizontalNavBar />
      <h2>Today's Joining Candidate</h2>
      <table className="candidate-table1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Interview Score</th>
            <th>Interview ID</th>


            <th>Joining Date</th>
            <th>Job Role</th>

            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.candidate.candidateId}>
              <td>{candidate.candidate.user.userName}</td>
              
              <td>{candidate.candidate.user.email}</td>
              <td>{candidate.candidate.user.phoneNumber}</td>

              <td>{candidate.interviewScore}</td>
              <td>{candidate.interviewId}</td>

              <td>{candidate.joiningDate}</td>
              <td>{candidate.jobRole}</td>

              <td>{candidate.hiringStatus}</td>
              <td className="candidate-actions1">
                <button
                  className="accept-button1"
                  onClick={() =>
                    handleButtonClick("JOINED", candidate.interviewId)
                  }
                >
                  Joined
                </button>
                <button
                  className="reject-button1"
                  onClick={() =>
                    handleButtonClick("NOT JOINED", candidate.interviewId)
                  }
                >
                  Not Joined
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {status === "NOT JOINED" && (
  <div>
    <form>
      <label>
        <b>Reason For Not Joining</b>
        <br />
        <textarea
          id="message"
          name="message"
          rows={8}
          cols={107}
          value={notJoinedReason}
          onChange={handleTextareaChange}
        ></textarea>
      </label>

      <button
        type="submit"
        onClick={() =>
          handleButtonClick2(notJoinedReason)
        }
      >
        Submit
      </button>
    </form>
  </div>
)}
    </div>
  );
};

export default TodayJoiningCandidate;