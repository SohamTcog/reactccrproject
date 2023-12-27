import React, { useState, useEffect } from "react";
import "./RecruiterRatingForm.css";
import axios from "axios";
import Cookies from "js-cookie";

interface Question {
  questionId: number;
  questionContent: string;
  category: {
    categoryId: number;
    categoryName: string;
  };
}

const RecruiterRating = () => {
  const accessToken = Cookies.get("accessToken");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [comment, setComment] = useState<string>("");

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
    let responseValue: boolean | null = null;

    if (answer === "Yes") {
      responseValue = true;
    } else if (answer === "No") {
      responseValue = false;
    }

    setResponses({ ...responses, [questionId]: answer });
    console.log(responseValue);
  };

  // Function to save responses to the backend
  const saveResponses = () => {
    const formattedAnswers = Object.keys(responses).map((questionId) => ({
      answerValue: responses[parseInt(questionId)] === "Yes" ? true : false,
      question: {
        questionId: parseInt(questionId),
      },
    }));

    console.log(formattedAnswers);
    axios
      .post(
        `http://localhost:8080/submitAnswers?candidateId=1&recruiterId=1`,
        formattedAnswers,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (comment) {
          axios
            .post(
              `http://localhost:8080/submitComment`,
              { commentContent: comment },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((commentResponse) => {
              console.log("Comment saved successfully", commentResponse.data);
            })
            .catch((commentError) => {
              console.error("Error saving comment", commentError);
            });
        }

        setResponses({});
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

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
                    <th
                      style={{
                        padding: "10px",
                        background: "#007bff",
                        color: "#fff",
                        border: "1px solid #ccc",
                      }}
                    >
                      Questions
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        background: "#007bff",
                        color: "#fff",
                        border: "1px solid #ccc",
                      }}
                    >
                      Answer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoryQuestions.map((question, index) => (
                    <tr key={question.questionId}>
                      <td
                        style={{ padding: "10px", border: "1px solid #ccc" }}
                      >{`${index + 1}. ${question.questionContent}`}</td>
                      <td style={{ padding: "10px", border: "1px solid #ccc" }}>
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
                                handleAnswerSelection(question.questionId, "No")
                              }
                            />
                            No
                          </label>
                        </div>
                        {/* <div>
                    <label>
                      <input
                        type="radio"
                        name={`answer_${question.questionId}`}
                        value="NA"
                        onClick={() => handleAnswerSelection(question.questionId, 'NA')}
                      />
                      NA
                    </label>
                  </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <div className="comment-box">
        <h3>Add a Comment</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
        />
      </div>
      <div className="buttonSaveResponse">
        <button
          onClick={saveResponses}
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
          }}
        >
          Save Responses
        </button>
      </div>
    </>
  );
};

export default RecruiterRating;
