import React from "react";
import "./modal.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

interface PopupModalProps {
    message: string;
    onClose: () => void;

    goToRecruiterDashboard: (commentId:number,newComment:String) => void
}

const SuggestionModal1: React.FC<PopupModalProps> = ({ message, onClose, goToRecruiterDashboard }) => {
    const [newComment, setNewComment] = useState("");

  /*  const handleSubmit = () =>{
        let commentId = localStorage.getItem("commentId");
        axios
        .post(`http://localhost:8080/newComment?commentId=${commentId}&comment=${newComment}`)
        .then((response) => {
            goToRecruiterDashboard()
       alert("New comment saved")
        })
        .catch((error) => console.error("Error fetching questions:", error));
    }*/

    const handleSubmit = () =>{
        let a = localStorage.getItem("commentId");
       let commentId= Number(a);
            goToRecruiterDashboard(commentId,newComment)
      
    }


    return (
        <div className="modal">

            <div className="modal-content5">

                <span className="close" onClick={onClose}>
                    &times;
                </span>

                <TextField
                    margin="normal"
                    required
                  style={{width:"500px"}} 
                    id="newComment"
                    label="New Comment"
                    name="newComment"
                    autoComplete="newComment"
                    autoFocus
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
                <h4>{message}</h4>




            </div>
        </div>
    );
};

export default SuggestionModal1;
