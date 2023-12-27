import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './InReviewCandidates.css'; 


interface Candidate {
  candidateId: number;
  user: {
    userName: string;
    email: string;
  };
}

interface InReviewCandidate {
  interviewScore: number;
  interviewId:number;
  hiringStatus:string;
  candidate: Candidate;
}

const InReviewCandidates = () => {
  const userId = localStorage.getItem('userId');
  const accessToken = Cookies.get('accessToken');
  const [candidates, setCandidates] = useState<InReviewCandidate[]>([]);





  const [status, setStatus] = useState<string>("");
  const [joiningDate, setJoiningDate] = useState<Date | null>(null); // Adjust the type


  const handleButtonClick = (status: string, interviewId: number) => {
    setStatus(status);

    if (status === "HIRED") {
      const parsedDate = new Date();
      setJoiningDate(parsedDate);

      // Use the callback function to ensure state is up-to-date
     // handleSubmit(interviewId, status, parsedDate);

    } else {
      setJoiningDate(null); // Reset joiningDate to null
    handleSubmit(interviewId, status, null);
  }
  };

  const handleJoiningDate = (e: string, interviewId: number) => {
    const parsedDate = new Date(e);
    setJoiningDate(parsedDate);

    // Use the callback function to ensure state is up-to-date
  //handleSubmit(interviewId, status, parsedDate);
  };


  const handleSubmit = async (interviewId: number, hiringStatus: string, date: Date | null) => {
    try {
      const response = await axios.post(
        `/hiredNotHiredForm`,
        {
          interviewId: interviewId,
          hiringStatus: hiringStatus,
          joiningDate: hiringStatus === "HIRED" ? date : null,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      setCandidates((prevCandidates) =>
      prevCandidates.filter((candidate) => candidate.interviewId !== interviewId)
    );
    } 
    
    catch (error) {
      console.error("Error updating status:", error);
    }
  };







  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post<InReviewCandidate[]>(
          `/getInReviewCandidates`,
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, accessToken]);

  return (
    <div className='container'>
      
      <h2>In Review Candidates</h2>
      <table className="candidate-table">
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Interview Score</th>
            <th>Status</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.candidate.candidateId}>
              {/* <td>{candidate.interviewId}</td> */}
              <td>{candidate.candidate.user.userName}</td>
              <td>{candidate.candidate.user.email}</td>
              <td>{candidate.interviewScore}</td>
              <td>{candidate.hiringStatus}</td>
              <td className="candidate-actions">
                <button className="accept-button" onClick={() => handleButtonClick("HIRED", candidate.interviewId)}>
                  Accept
                </button>
                <button className="reject-button" onClick={() => handleButtonClick("NOT HIRED", candidate.interviewId)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {status === "HIRED" && (
        <div>
          <form>
            <label>
              Expected Joining Date?
              <input
                type="date"
                onChange={(e) => handleJoiningDate(e.target.value, candidates[0].interviewId)} 
                required
              />
            </label>
          
<button type="submit" onClick={() => handleSubmit(candidates[0].interviewId, status, joiningDate)}>
  Submit
</button>

          </form>
        </div>
      )}
    </div>
  );
};

export default InReviewCandidates;
