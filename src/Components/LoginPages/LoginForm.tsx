import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";

import Container from "@mui/material/Container";
import { Alert, AlertTitle, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { ThemeProvider } from "@mui/private-theming";
import { createTheme } from "@mui/system";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright @"}
      <Link color="inherit" href="/">
        CandidateCredibilityRating
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<String | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("candidateEmail");
    const savedPassword = localStorage.getItem("candidatePassword");
   

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios
        .post("/api/v1/signin", {
          email: email,
          password: password,
        })
        .then(
          (response) => {
            const accessToken = response.data.token;
            const expirationTime = new Date(Date.now() + 86400000); //24 hrs
            // Set the 'accessToken' cookie with the calculated expiration time
            Cookies.set("accessToken", accessToken, {
              expires: expirationTime,
            });
            const role = response.data.role;
            if (rememberMe) {
              localStorage.setItem("candidateEmail", email);
              localStorage.setItem("candidatePassword", password);
            } else {
              localStorage.removeItem("candidateEmail");
              localStorage.removeItem("candidatePassword");
            }
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userName", response.data.userName);
            localStorage.setItem("role", role);
            if (role === "ROLE_SUPERADMIN") {
              navigate("/superAdminDashboard");
            }
            if (role === "ROLE_CANDIDATE") {
              navigate("/candidateDashboard");
            }
            if (role === "ROLE_HRADMIN") {
              navigate("/hradminDashboard");
            }
            if (role === "ROLE_RECRUITER") {
              navigate("/recruiterDashboard");
            }
            if (role === "ROLE_CCRADMIN") {
              navigate("/ccrAdminDashboard");
              localStorage.setItem("ccrUserId", response.data.userId); 
            }
          },
          (error) => {
            console.log(error)
            alert("Enter correct credentials");
          }
        );
    } catch (err) {
      console.log(err)
      alert("Enter correct credentials");
      setError("An error occured during login");
    }
  };
  const handleNotificationClick = () => {
    
  };
  return (
    <>
   
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              border: "2px solid #ccc", // Border style and color
              borderRadius: "8px", // Border radius for rounded corners
              padding: "20px", // Padding inside the box
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "border-color 0.3s ease", // Add a transition for interactivity
              "&:hover": {
                borderColor: "primary.main", // Change border color on hover
              },
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <LoginIcon />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
              }
              noValidate
              sx={{
                mt: 1,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="enterEmail" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LoginForm;
