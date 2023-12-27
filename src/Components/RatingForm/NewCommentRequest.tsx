import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SuggestionModal from "../Modals/SuggestionModal";
import React from "react";
import Cookies from "js-cookie";
import HorizontalNavBar from "../Common/HorizontalNavBar";


const NewCommentRequest = () => {
  interface Comments {
    commentId: number;
    commentContent: String;
    suggestionContent: String;
    candidate: {
      candidateName: String;
      user:User
    };
    recruiter: {
      recruiterName: String;
      user:User
    };
  }

  interface User{
    userName:String
  }

  const [comments, setComments] = useState<Comments[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [triggerEffect, setTriggerEffect] = useState(false);
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");


  // Function to show the popup with a message
  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleSuggestion = (commentId1: number) => {
    let a = String(commentId1);
    localStorage.setItem("commentId", a);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const goToRecruiterDashboard = (commentId: number, suggestion: String) => {
    axios
      .post(
        `/commentsuggestion?commentId=${commentId}&suggestion=${suggestion}`
     ,  {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    } )
      .then((response) => {
        setTriggerEffect((prevTrigger) => !prevTrigger);
        alert("Suggestion saved");
      })
      .catch((error) => console.error("Error fetching questions:", error));
    setShowPopup(false);
  };

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    axios
      .get(`/Newcommentrequest?recruiterId=${userId}`,  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setComments(response.data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [triggerEffect]);

  const handleSubmit = (commentId: number) => {
    axios
      .post(`/commentaccept?commentId=${commentId}`,  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setTriggerEffect((prevTrigger) => !prevTrigger);
        alert("Commet Approved");
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };
  const handleNotificationClick = () => {
    
  };
  return (
    <>
    <HorizontalNavBar/>
      <h4 style={{ textAlign: "center" }}>New Requests</h4>

      {showPopup && (
        <SuggestionModal
          message={popupMessage}
          onClose={closePopup}
          goToRecruiterDashboard={goToRecruiterDashboard}
        />
      )}
      <Table
        sx={{ maxWidth: 500 }}
        aria-label="simple table"
        className="historyTableTable"
      >
        <TableHead className="historyTableHead">
          <TableRow>
            <TableCell align="center">
              <b>
                <h4>Recruiter Name</h4>
              </b>
            </TableCell>
            <TableCell align="center">
              <b>
                <h4>Candidate Name</h4>
              </b>
            </TableCell>
            <TableCell align="center">
              <b>
                <h4>Comment</h4>
              </b>
            </TableCell>
            <TableCell align="center">
              <b>
                <h4>Old Suggestion</h4>
              </b>
            </TableCell>
            <TableCell align="center">
              <b>
                <h4>Approve </h4>
              </b>
            </TableCell>
            <TableCell align="center">
              <b>
                <h4>Suggestion</h4>
              </b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((item, index) => (
            <TableRow>
              <TableCell>
                <b>{item.recruiter.user.userName}</b>
              </TableCell>
              <TableCell>
                <b>{item.candidate.user.userName}</b>
              </TableCell>
              <TableCell>
                <b>{item.commentContent}</b>
              </TableCell>
              <TableCell>
                <b>{item.suggestionContent}</b>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleSubmit(item.commentId)}
                  style={{ color: "green" }}
                >
                  Approve
                </button>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleSuggestion(item.commentId)}
                  style={{ color: "red" }}
                >
                  Suggestion
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default NewCommentRequest;
