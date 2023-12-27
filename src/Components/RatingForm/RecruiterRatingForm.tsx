import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopupModal from "../Modals/PopupModal ";
import Cookies from "js-cookie";
import HorizontalNavBar from "../Common/HorizontalNavBar";
import PopupModalWithJoiningDetails from "../Modals/PopupModalWithJoiningDetails";

interface Question {
  questionId: number;
  questionContent: string;
  category: {
    categoryId: number;
    categoryName: string;
  };
}
interface Interview
  {
    interviewId:number;

}

interface Answer {
  answerValue: string;
  question: {
    questionId: number;
  };
}

const RecruiterRatingForm = () => {
  const accessToken = Cookies.get("accessToken");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [comment, setComment] = useState<string>("");
  const [formDisabled, setFormDisabled] = useState(false);
  const [responsesSaved, setResponsesSaved] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);

  const [popupMessage, setPopupMessage] = useState<string>(""); // Specify the type as string

  // Function to show the popup with a message
  let role =localStorage.getItem("role");
  
  


  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {

    navigate("/searchCandidate");
    /*if(role=="ROLE_HRADMIN")
    {
      navigate("/searchCandidate");
    }
    else{
      navigate("/recruiterDashboard");
    }
    setShowPopup(false);*/
  };

  const goToRecruiterDashboard = () => {
    navigate("/searchCandidate");
    /*if(role=="ROLE_HRADMIN")
    {
      navigate("/hradminDashboard");
    }
    else{
      navigate("/recruiterDashboard");
    }*/
  };

  const navigate = useNavigate();

  // get questions from the database.
  useEffect(() => {
    axios
      .get("/getAllQuestion", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Function to handle answer selection
  const handleAnswerSelection = (
    questionId: number,
    answer: "Yes" | "No" | "NA"
  ) => {
    setResponses({ ...responses, [questionId]: answer });
  };

  // // Function to save responses to the backend
  const saveResponses = () => {
   // setShowPopup(true);
    setShowPopup1(true)
    let userId = localStorage.getItem("userId");
   // let candidateId = localStorage.getItem("currentCandidateId");
    let jobRole = localStorage.getItem("selectedRole");
    let storedUserId = localStorage.getItem("currentSelectedCandidate");
    let candidateId = localStorage.getItem("candidateId");
    
    const formattedAnswers = Object.keys(responses).map((questionId) => ({
      answerResponse: responses[parseInt(questionId)],
      question: {
        questionId: parseInt(questionId),
      },
    }));

    // console.log(formattedAnswers);
    axios
      .post(
        `/submitAnswers?candidateId=${candidateId}&userId=52&jobRole=${jobRole}&comment=${comment}`,
        formattedAnswers,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
  
      .then((response) => {
        // console.log("helllllllllllllllll",response.data.interviewId);
       localStorage.setItem("interviewId",response.data.interviewId)

      //  navigate("/hiredNothiredForm")
      /*  if (comment) {
          axios
            .post(
              `/submitComment?candidateId=${candidateId}&recruiterId=${recruiterId}`,
              { commentContent: comment },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((commentResponse) => {
              console.log("Comment saved successfully", commentResponse.data);
            })
            .catch((commentError) => {
              console.log("Error saving comment", commentError);
            });
        }
        axios
          .post(
            `/getCandidateScoreRecruiter`,
            {
              candidateId: candidateId,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(
            (response) => {
              // console.log(response.data);
            },
            (error) => {
              console.log(error);
              alert("error");
            }
          );*/

       
        // navigate("/savedResponse");
      })
      .catch((error) => console.error("Error saving responses:", error));
  };

  // Organize questions by category
  const questionsByCategory: { [key: string]: Question[] } = {};

  questions.forEach((question) => {
    const { categoryId, categoryName } = question.category;
    const categoryKey = `${categoryId}_${categoryName}`;

    if (!questionsByCategory[categoryKey]) {
      questionsByCategory[categoryKey] = [];
    }

    questionsByCategory[categoryKey].push(question);
  });
  const handleNotificationClick = () => {
    
  };
  return (
    <>
   <HorizontalNavBar/>
      {showPopup && (
        <PopupModal
          message={popupMessage}
          onClose={closePopup}
          goToRecruiterDashboard={goToRecruiterDashboard}
        />
      )}
       {showPopup1 && (
       <PopupModalWithJoiningDetails />
       )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h3>Recruiter Rating Form</h3>
      </div>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {Object.keys(questionsByCategory).map((categoryKey) => {
          const [categoryId, categoryName] = categoryKey.split("_");
          const categoryQuestions = questionsByCategory[categoryKey];

          return (
            <div
              key={categoryKey}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h2
                style={{
                  background: "#007bff",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  margin: "0",
                }}
              >
                {categoryName}
              </h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th className="recRatingFormTableHead">Questions</th>
                    <th className="recRatingFormTableHead">Responses</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryQuestions.map((question, index) => (
                    <tr key={question.questionId}>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #ccc",
                          width: "75%",
                          wordWrap: "break-word",
                        }}
                      >{`${index + 1}. ${question.questionContent}`}</td>
                      <td
                        className="recRatingFormQuestionColumn"
                        style={{
                          padding: "10px",
                          border: "1px solid #ccc",
                          width: "25%",
                          wordWrap: "break-word",
                        }}
                      >
                        <div className="yesNoNaResponses">
                          <div>
                            <label>
                              <input
                                type="radio"
                                name={`answer_${question.questionId}`}
                                value="Yes"
                                onClick={() =>
                                  handleAnswerSelection(
                                    question.questionId,
                                    "Yes"
                                  )
                                }
                              />
                              Yes
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name={`answer_${question.questionId}`}
                                value="No"
                                onClick={() =>
                                  handleAnswerSelection(
                                    question.questionId,
                                    "No"
                                  )
                                }
                              />
                              No
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name={`answer_${question.questionId}`}
                                value="NA"
                                onClick={() =>
                                  handleAnswerSelection(
                                    question.questionId,
                                    "NA"
                                  )
                                }
                              />
                              NA
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
        <div
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h2
            style={{
              background: "#007bff",
              color: "#fff",
              padding: "10px",
              borderRadius: "5px",
              margin: "0",
              marginBottom: "20px",
            }}
          >
            Add a Comment
          </h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=" Write your comment here..."
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "0px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "1em",
              margin: "auto",
            }}
          />
        </div>
        <div className="buttonSaveResponse">
          <button
            onClick={saveResponses}
            disabled={formDisabled}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              marginBottom: "20px",
              fontSize: "1em",
            }}
          >
            Save Responses
          </button>
        </div>
      </div>
    </>
  );
};

export default RecruiterRatingForm;