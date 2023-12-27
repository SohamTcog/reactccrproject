import React, { useState } from 'react'
import RecruiterHeader from '../Recruiter/RecruiterHeader'
import CandidateSidebar from './CandidateSidebar'
import Cookies from 'js-cookie';
import axios from 'axios';

interface FormState {
    rating1: number | null;
    rating2: number | null;
    rating3: number | null;
    rating4: number | null;
    rating5: number | null;

}
function CompanyRating() {
    const [formState, setFormState] = useState<FormState>({

        rating1: null,
        rating2: null,
        rating3: null,
        rating4: null,
        rating5: null,

    });
    const accessToken = Cookies.get("accessToken");

    const handleStarClick1 = (selectedRating: number) => {
        setFormState((prevState) => ({
            ...prevState,
            rating1: selectedRating,
            
        }));
    };


    const handleStarClick2 = (selectedRating: number) => {
        setFormState((prevState) => ({
            ...prevState,
            rating2: selectedRating,
            
        }));
    };

    const handleStarClick3 = (selectedRating: number) => {
        setFormState((prevState) => ({
            ...prevState,
            rating3: selectedRating,
            
        }));
    };

    const handleStarClick4 = (selectedRating: number) => {
        setFormState((prevState) => ({
            ...prevState,
            rating4: selectedRating,
            
        }));
    };
    const handleStarClick5 = (selectedRating: number) => {
        setFormState((prevState) => ({
            ...prevState,
            rating5: selectedRating,
            
        }));
    };

   
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
       
        try {
            const response = await axios.post(
              `/rateCompany`,
              {
                companyId:21,
                rating1:  formState.rating1,
                rating2:  formState.rating2,
                rating3:  formState.rating3,
                rating4:  formState.rating4,
                rating5:  formState.rating5,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
      
          } catch (error) {
            console.error("Error updating rating:", error);
          }


        // Here, you can perform actions with the form data, such as sending it to an API or processing it.
        console.log('Form submitted:', formState.rating1);
        console.log('Form submitted:', formState.rating2);
        console.log('Form submitted:', formState.rating3);
        console.log('Form submitted:', formState.rating4);
        console.log('Form submitted:', formState.rating5);
        // Reset form after submission
        setFormState({
            rating1: null,
            rating2: null,
            rating3: null,
            rating4: null,
            rating5: null,

        });
    };

    return (
        <>
            <RecruiterHeader />
            <div className="candidateHomeFrame">
                <CandidateSidebar />
                <div className="candidateHomeComponent">
                    <div>
                        <h2>Company Rating</h2>
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label>Company location & Area:</label>
                                <div>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => handleStarClick1(star)}
                                            style={{
                                                cursor: 'pointer',
                                                color: star <= (formState.rating1 || 0) ? '#ffcc00' : '#ccc',
                                            }}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label>Communication with hiring team:</label>
                                <div>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => handleStarClick2(star)}
                                            style={{
                                                cursor: 'pointer',
                                                color: star <= (formState.rating2 || 0) ? '#ffcc00' : '#ccc',
                                            }}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                            </div>
                           
                            <div>
                                <label>Basic facilities of company:</label>
                                <div>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => handleStarClick3(star)}
                                            style={{
                                                cursor: 'pointer',
                                                color: star <= (formState.rating3 || 0) ? '#ffcc00' : '#ccc',
                                            }}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label>Hiring Process:</label>
                                <div>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => handleStarClick4(star)}
                                            style={{
                                                cursor: 'pointer',
                                                color: star <= (formState.rating4 || 0) ? '#ffcc00' : '#ccc',
                                            }}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label>Recommend to a Friend:</label>
                                <div>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => handleStarClick5(star)}
                                            style={{
                                                cursor: 'pointer',
                                                color: star <= (formState.rating5 || 0) ? '#ffcc00' : '#ccc',
                                            }}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyRating