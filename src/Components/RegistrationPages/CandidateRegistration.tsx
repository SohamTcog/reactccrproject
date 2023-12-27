import React, { useState } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; 
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import '../RegistrationPages/RegistrationPagesCss.css'
import HorizontalNavBar from '../Common/HorizontalNavBar';

const CandidateRegistration = () => {

    const [candidateName, setCandidateName] = useState('');
    const [candidateAadhar, setCandidateAadhar] = useState('');
    const [candidateDob, setCandidateDob] = useState('');
    const [candidateEmail, setCandidateEmail] = useState('');
    const [candidatePassword, setCandidatePassword] = useState('');
    const [candidatePhone, setCandidatePhone] = useState('');
    const [error, setError] = useState<String|null>(null);
    const navigate = useNavigate();

    const handleLogin = async () =>{
        try{
            const response = await axios.post(`http://localhost:8080/candidateRegistration`,{
                candidateName : candidateName,
                candidateAadhar : candidateAadhar,
                candidateDob : candidateDob,
                candidatePhone : candidatePhone,
                candidateEmail : candidateEmail,
                candidatePassword : candidatePassword,
            }).then((response)=>{
                alert("candidate Registration successful");
                console.log(response);
                navigate('/candidateLogin');
                
            },
            (error)=>{
                alert('Enter Proper Details');
            });
        }catch(err){
            setError("An error occured during the registration");
        }
    };

  return (
    <>
    <HorizontalNavBar/>
        <div>
        <Container className='container' maxWidth="sm">
            <Typography variant='h4' gutterBottom>
                Candidate Registration Form
            </Typography>
            {
                error && <Typography variant='body1'>{error}</Typography>
            }
            <form className='loginForm'>
                <TextField
                    label="Candidate Full Name"
                    type='text'
                    value={candidateName}
                    onChange={(e)=> setCandidateName(e.target.value)}
                    style={{marginBottom:'20px'}}
                />
                <TextField
                    label="Candidate Aadhar Card Number"
                    type='text'
                    value={candidateAadhar}
                    onChange={(e)=> setCandidateAadhar(e.target.value)}
                    style={{marginBottom:'20px'}}
                />
                <TextField
                    label="Candidate Date of Birth"
                    type='text'
                    value={candidateDob}
                    onChange={(e)=> setCandidateDob(e.target.value)}
                    style={{marginBottom:'20px'}}
                />
                <TextField
                    label="Candidate Phone Number"
                    type='text'
                    value={candidatePhone}
                    onChange={(e)=> setCandidatePhone(e.target.value)}
                    style={{marginBottom:'20px'}}
                />
                <TextField
                    label="Candidate Email"
                    type='text'
                    value={candidateEmail}
                    onChange={(e)=> setCandidateEmail(e.target.value)}
                    style={{marginBottom:'20px'}}
                />
                <TextField
                    label="Password"
                    type='password'
                    value={candidatePassword}
                    onChange={(e)=> setCandidatePassword(e.target.value)}
                    style={{marginBottom:'20px'}}
                />
                <Button variant='contained' color='primary' onClick={handleLogin}>
                    Register
                </Button>
            </form>
            </Container>
        </div>
    </>
  )
}

export default CandidateRegistration;
