import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RecruiterSidebar from "./Components/Recruiter/RecruiterSidebar";
import RecruiterDashboard from "./Components/Recruiter/RecruiterDashboard";
import CandidateSidebar from "./Components/Candidate/CandidateSidebar";
import ViewRecruiter from "./Components/Recruiter/ViewRecruiter";
import OrganizationsHomePage from "./Components/Organizations/OrganizationsHomePage";
import CandidateHome from "./Components/Candidate/CandidateHome";
import LoginForm from "./Components/LoginPages/LoginForm";
import HrAdminDashboard from "./Components/Recruiter/HrAdminDashboard";
import HrSearchCandidate from "./Components/Recruiter/HrSearchCandidate";
import HorizontalNavBar from "./Components/Common/HorizontalNavBar";
import CcrAdminDashboard from "./Components/CCRAdmin/CcrAdminDashboard";
import CcrAdminSidebar from "./Components/CCRAdmin/CcrAdminSidebar";
import CandidateRegistration from "./Components/RegistrationPages/CandidateRegistration";
import CompanyRecruiterRegistration from "./Components/RegistrationPages/CompanyRecruiterRegistration";
import SavedCompany from "./Components/RegistrationPages/SavedCompany";
import Home from "./Components/Home";
import CandidateProfile from "./Components/Recruiter/CandidateProfile";
import RecruiterRatingForm from "./Components/RatingForm/RecruiterRatingForm";
import JoiningDetailsForm from "./Components/HiredNotHiredForm/JoiningDetailsForm";
import InReviewCandidates from "./Components/Recruiter/InReviewCandidates";
import TodayJoiningCandidate from "./Components/Recruiter/TodayJoiningCandidate";
import CompanyRating from "./Components/Candidate/CompanyRating";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
   {/* Registration Screens */}
   <Route
            path="/candidateRegistration"
            element={<CandidateRegistration />}
          />
          <Route
            path="/companyrecruiterRegistration"
            element={<CompanyRecruiterRegistration />}
          ></Route>
          <Route path="savedCompany" element={<SavedCompany />} />

        {/* Recruiter Screens */}
      
        <Route path="/recruiterDashboard" element={<RecruiterDashboard />} />
        <Route path="/hradminDashboard" element={<HrAdminDashboard />} />
        {/* <Route path="/recruiterSidebar" element={<RecruiterSidebar/>}/> */}
        <Route path="/viewRecruiter" element={<ViewRecruiter />} />

        {/* Recruiter Screens */}
        <Route path="/recruiterSidebar" element={<RecruiterSidebar />} />
        <Route path="/viewRecruiter" element={<ViewRecruiter/>}/>
        <Route path="/searchCandidate" element={<HrSearchCandidate />}/>
        <Route path="candidateProfile" element={<CandidateProfile/>}/>
        
        {/* Organization Screens */}
        <Route
          path="organizationsHomePage"
          element={<OrganizationsHomePage />}
        />
        <Route path="ratingForm" element={<RecruiterRatingForm />} />
        <Route path="hiredNothiredForm" element={<JoiningDetailsForm />} />
          <Route path="inReviewCandidates" element={<InReviewCandidates />} />
          <Route path="todayJoiningCandidate" element={<TodayJoiningCandidate />} />


        {/* Candidate Screens */}
        <Route path="candidateSidebar" element={<CandidateSidebar />} />
        <Route path="candidateDashboard" element={<CandidateHome />} />
        <Route path="companyRating" element={<CompanyRating />} />

        {/* Common Pages */}
        <Route path="horizontalNavBar" element={<HorizontalNavBar />} />

        {/* CCR Admin Screen */}
        <Route path="ccrAdminDashboard" element={<CcrAdminDashboard />} />
        <Route path="ccrAdminSidebar" element={<CcrAdminSidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
