import React, { useState, useEffect, ReactNode } from "react";
import "../CCRAdmin/CcrAdminDashboardCss.css";
import HorizontalNavBar from "../Common/HorizontalNavBar";
import CcrAdminSidebar from "./CcrAdminSidebar";
import Dotmenu from "../Icon/dotmenu.png";
import OrganizationsIcon from "../Icon/organizationsIcon.png";
import RecruitersIcon from "../Icon/recruitersIcon.png";
import CandidatesIcon from "../Icon/candidatesIcon.png";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface RegisteredCompanies {
  [x: string]: ReactNode;
  companyId: number;
  companyName: string;
  approvalStatus: boolean;
}

interface Company {
  companyId: number;
  companyName: string;
  companyAddress: string;
  companyPhoneNumber: number;
  companyTan: number;
  registrationApproval: boolean;
  registrationRejection: boolean | null;
}

interface Authority {
  authority: string;
}

interface User {
  userId: number;
  userName: string;
  email: string;
  password: string;
  phoneNumber: number;
  userOtp: number | null;
  otpExpiration: Date | null;
  role: string;
  createdAt: string; // Change this to the desired type for createdAt, e.g., Date
  updatedAt: string;
  enabled: boolean;
  authorities: Authority[];
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  username: string;
  candidate: Candidate
}

interface Candidate {
  candidateId: number
}

interface Recruiter {
  recruiterId: number;
  addedBy: number;
  approver: number;
  addedPower: boolean;
  approvePower: boolean;
  company: Company;
  user: User;
}


const CcrAdminDashboard = () => {
  const [registeredCompanies, setRegisteredCompanies] =
    useState<RegisteredCompanies>();
  const [numberOfRecruiters, setNumberOfRecruiters] = useState(0);
  const [numberOfCandidates, setNumberOfCandidates] = useState(0);
  const [hrAdminDetails, setHrAdminDetails] = useState<Recruiter[]>([]);
  const [candidateDetails, setCandidateDetails] = useState<User[]>([]);
   const [recruiterDetails, setRecruiterDetails] = useState<User[]>([]);
  const [totalApprovedCompanies, setTotalApprovedCompanies] = useState<number>(0);

  const [totalRejectedCompanies, setTotalRejectedCompanies] = useState(0);
  const [totalPendingCompanies, setTotalPendingCompanies] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString());
  const [selectedTime2, setSelectedTime2] = useState<string>("all");
  const [selectedYear2, setSelectedYear2] = useState<string>(
    new Date().getFullYear().toString());
  const [selectedTime3, setSelectedTime3] = useState<string>("all");
  const [selectedYear3, setSelectedYear3] = useState<string>(
    new Date().getFullYear().toString());
  const [years, setYears] = useState<string[]>([]);


  const accessToken = Cookies.get("accessToken");
  let userId = localStorage.getItem("userId");
  let userName = localStorage.getItem("userName");

  const [isPopupOpen, setIsPopupOpen] = useState(false);



  useEffect(() => {
    axios
      .get("/getNumberOfRecruiters", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (response) => {
          setNumberOfRecruiters(response.data);

           setRecruiterDetails(response.data);
          totalRecruiters(response.data)
          const initialSelectedTime = "monthly";
          setSelectedTime2(initialSelectedTime);
          const years = Array.from({ length: 30 }, (_, index) =>
            (new Date().getFullYear() - index).toString()
          );
          setYears(years);
        },
        (error: any) => {
          alert("error");
        }
      );

    axios
      .get("/getNumberOfCandidates", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (response) => {
          setCandidateDetails(response.data);
          totalCandidates(response.data)
          const initialSelectedTime = "monthly";
          //   getFilteredData2(response.data);
          setSelectedTime3(initialSelectedTime);
          const years = Array.from({ length: 30 }, (_, index) =>
            (new Date().getFullYear() - index).toString()
          );
          setYears(years);
        },
        (error: any) => {
          alert("error");
        }
      );

    axios
      .get("/getHrAdminDetails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        (response) => {
          setHrAdminDetails(response.data);
          const initialSelectedTime = "monthly";
          // getFilteredData(response.data);
          setSelectedTime(initialSelectedTime);
          const years = Array.from({ length: 30 }, (_, index) =>
            (new Date().getFullYear() - index).toString()
          );
          setYears(years);
          calculateTotalApproved(response.data)
        },
        (error: any) => {
          alert("error");
        }
      );
  }, []);

  const handleTimeChange = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value as string;

    setSelectedTime(selectedValue);
  };

  const handleYearChange = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value as string;

    // Set the selected year
    setSelectedYear(selectedValue);
  };

  const handleTimeChange2 = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value as string;

    setSelectedTime2(selectedValue);
  };

  const handleYearChange2 = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value as string;

    // Set the selected year
    setSelectedYear2(selectedValue);
  };

  const handleTimeChange3 = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value as string;

    setSelectedTime3(selectedValue);
  };

  const handleYearChange3 = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value as string;

    // Set the selected year
    setSelectedYear3(selectedValue);
  };

  // Add a function to get the week number from a date
  const getWeekNumberFromDate = (dateString: string) => {
    const date = new Date(dateString);
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const dayNumber = Math.ceil(
      ((date.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7
    );
    return dayNumber.toString(); // Convert the week number to a string
  };
  const getDayFromDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleString("default", { weekday: "short" });
    return day;
  };

  const getMonthFromDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    return month;
  };

  // Add a function to get the names of the days in the current week
  const getWeekDays = (weekNumber: string) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i - currentDate.getDay());
      days.push(getDayFromDate(currentDate.toISOString()));
    }

    // Find the index of today's day
    const todayIndex = days.findIndex(
      (day) => day === getDayFromDate(new Date().toISOString())
    );

    // Rotate the array so that today's day is at the end
    const rotatedDays = [
      ...days.slice(todayIndex + 1),
      ...days.slice(0, todayIndex + 1),
    ];

    return rotatedDays;
  };

  const getFilteredData = (
    recData: Recruiter[]
  ): { name: string; approved: number; rejected: number; pending: number }[] => {
    // Your filtering logic here
    //let filteredData: { name: string; value: number }[] = [];
    let filteredData: { name: string; approved: number; rejected: number; pending: number }[] = [];

    // Filter by recruiter
    let recruiterFilteredData = recData;

    // Filter by time
    if (selectedTime === "weekly") {
      const currentWeekNumber = getWeekNumberFromDate(new Date().toISOString());
      const weeklyCounts: { [day: string]: { approved: number; rejected: number; pending: number } } = {};

      recruiterFilteredData.forEach((recruiter) => {
        const weekNumber = getWeekNumberFromDate(recruiter.user.createdAt);

        if (weekNumber === currentWeekNumber) {
          const day = getDayFromDate(recruiter.user.createdAt);
          if (!weeklyCounts[day]) {
            weeklyCounts[day] = { approved: 0, rejected: 0, pending: 0 };
          }

          if (recruiter.company.registrationApproval === true) {
            weeklyCounts[day].approved += 1;
          } else if (recruiter.company.registrationApproval === false) {
            weeklyCounts[day].rejected += 1;
          }
          else if (recruiter.company.registrationApproval === null || "") {
            weeklyCounts[day].pending += 1;
          }
        }
      });
      filteredData = getWeekDays(currentWeekNumber).map((day) => ({
        name: day,
        approved: weeklyCounts[day]?.approved || 0,
        rejected: weeklyCounts[day]?.rejected || 0,
        pending: weeklyCounts[day]?.pending || 0,
      }));
    }

    // Inside the getFilteredData function
    // ...

    else if (selectedTime === "monthly") {
      const allMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];

      const monthlyCounts: { [month: string]: { approved: number; rejected: number; pending: number } } = {};
      allMonths.forEach((month) => {
        monthlyCounts[month] = { approved: 0, rejected: 0, pending: 0 };
      });

      recruiterFilteredData.forEach((recruiter) => {
        const year = new Date(recruiter.user.createdAt).getFullYear().toString();
        const month = getMonthFromDate(recruiter.user.createdAt);

        if (year === selectedYear) {
          if (recruiter.company.registrationApproval === true) {
            monthlyCounts[month].approved += 1;
          } else if (recruiter.company.registrationApproval === false) {
            monthlyCounts[month].rejected += 1;
          }
          else if (recruiter.company.registrationApproval === null || "") {
            monthlyCounts[month].pending += 1;
          }
        }
      });

      // Map the counts to the sorted months
      filteredData = allMonths.map((month) => ({
        name: month,
        approved: monthlyCounts[month].approved || 0,
        rejected: monthlyCounts[month].rejected || 0,
        pending: monthlyCounts[month].pending || 0,
      }));
    }
    // ...
    // Inside the getFilteredData function
    // ...

    else if (selectedTime === "yearly") {
      const lastFiveYears = Array.from({ length: 5 }, (_, index) =>
        (new Date().getFullYear() - index).toString()
      );
      const yearlyCounts: { [year: string]: { approved: number; rejected: number; pending: number } } = {};

      lastFiveYears.forEach((year) => {
        yearlyCounts[year] = { approved: 0, rejected: 0, pending: 0 };
      });

      recruiterFilteredData.forEach((recruiter) => {
        const year = new Date(recruiter.user.createdAt).getFullYear().toString();

        if (lastFiveYears.includes(year)) {
          if (recruiter.company.registrationApproval === true) {
            yearlyCounts[year].approved += 1;
          } else if (recruiter.company.registrationApproval === false) {
            yearlyCounts[year].rejected += 1;
          }
          else if (recruiter.company.registrationApproval === null || "") {
            yearlyCounts[year].pending += 1;
          }
        }
      });

      // Map the counts to the sorted years (in descending order)
      const sortedYears = lastFiveYears.sort((a, b) => parseInt(a) - parseInt(b));
      filteredData = sortedYears.map((year) => ({
        name: year,
        approved: yearlyCounts[year].approved || 0,
        rejected: yearlyCounts[year].rejected || 0,
        pending: yearlyCounts[year].pending || 0,
      }));
    }
    // ...

    return filteredData;
  };


  const calculateTotalApproved = (data: Recruiter[]) => {
    let totalApproved = 0;
    let totalRejected = 0;
    let totalPending = 0;

    data.forEach((recruiter) => {
      if (recruiter.company.registrationApproval === true) {
        totalApproved += 1;
      } else if (recruiter.company.registrationApproval === false) {
        totalRejected += 1;
      } else if (recruiter.company.registrationApproval === null || recruiter.company.registrationApproval === "") {
        totalPending += 1;
      }
    });

    setTotalApprovedCompanies(totalApproved);
    setTotalRejectedCompanies(totalRejected);
    setTotalPendingCompanies(totalPending)
  };


  const getFilteredData2 = (recData: User[]): { name: string; value: number }[] => {

    let filteredData: { name: string; value: number }[] = [];
    // Filter by recruiter
    let recruiterFilteredData = recData;

    // Filter by time
    if (selectedTime2 === 'weekly') {
      const currentWeekNumber = getWeekNumberFromDate(new Date().toISOString());
      const weeklyCounts: { [day: string]: number } = {};

      recruiterFilteredData.forEach((interview) => {
        const weekNumber = getWeekNumberFromDate(interview.createdAt);

        // Check if the interview is in the current week
        if (weekNumber === currentWeekNumber) {
          const day = getDayFromDate(interview.createdAt);
          weeklyCounts[day] = (weeklyCounts[day] || 0) + 1;
        }
      });
      filteredData = getWeekDays(currentWeekNumber).map((day) => ({
        name: day,
        value: weeklyCounts[day] || 0,
      }));
    }
    else if (selectedTime2 === 'monthly') {
      const allMonths = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      const monthlyCounts: { [month: string]: number } = {};
      const currentYear = new Date().getFullYear().toString();
      const settedYear = years
      // Initialize counts for all months to 0
      allMonths.forEach(month => monthlyCounts[month] = 0);

      recruiterFilteredData.forEach((interview) => {
        const year = new Date(interview.createdAt).getFullYear().toString();

        // Check if the interview is in the current year
        if (year === selectedYear) {
          const month = getMonthFromDate(interview.createdAt);
          monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
        }
      });

      const sortedMonths = allMonths
        .sort((a, b) => allMonths.indexOf(a) - allMonths.indexOf(b));

      // Map the counts to the sorted months
      filteredData = sortedMonths.map((month) => ({
        name: month,
        value: monthlyCounts[month] || 0,
      }));
    }


    else if (selectedTime2 === 'yearly') {
      const lastFiveYears = Array.from({ length: 5 }, (_, index) => (new Date().getFullYear() - index).toString());
      const yearlyCounts: { [year: string]: number } = {};

      recruiterFilteredData.forEach((interview) => {
        const year = new Date(interview.createdAt).getFullYear().toString();
        if (lastFiveYears.includes(year)) {
          yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
        }
      });

      // Map the counts to the sorted years (in descending order)
      const sortedYears = lastFiveYears.sort((a, b) => parseInt(a) - parseInt(b));

      filteredData = sortedYears.map((year) => ({
        name: year,
        value: yearlyCounts[year] || 0,
      }));
    }


    return filteredData;
  };

  const totalRecruiters = (data: User[]) => {
    let totalRecruiter = 0;


    data.forEach((c) => {
      totalRecruiter += 1;
    });

    setNumberOfRecruiters(totalRecruiter);
  }
  const getFilteredData3 = (recData: User[]): { name: string; value: number }[] => {

    let filteredData: { name: string; value: number }[] = [];
    // Filter by recruiter
    let recruiterFilteredData = recData;

    // Filter by time
    if (selectedTime3 === 'weekly') {
      const currentWeekNumber = getWeekNumberFromDate(new Date().toISOString());
      const weeklyCounts: { [day: string]: number } = {};

      recruiterFilteredData.forEach((interview) => {
        const weekNumber = getWeekNumberFromDate(interview.createdAt);

        // Check if the interview is in the current week
        if (weekNumber === currentWeekNumber) {
          const day = getDayFromDate(interview.createdAt);
          weeklyCounts[day] = (weeklyCounts[day] || 0) + 1;
        }
      });
      filteredData = getWeekDays(currentWeekNumber).map((day) => ({
        name: day,
        value: weeklyCounts[day] || 0,
      }));
    }
    else if (selectedTime3 === 'monthly') {
      const allMonths = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      const monthlyCounts: { [month: string]: number } = {};
      const currentYear = new Date().getFullYear().toString();
      const settedYear = years
      // Initialize counts for all months to 0
      allMonths.forEach(month => monthlyCounts[month] = 0);

      recruiterFilteredData.forEach((interview) => {
        const year = new Date(interview.createdAt).getFullYear().toString();

        // Check if the interview is in the current year
        if (year === selectedYear) {
          const month = getMonthFromDate(interview.createdAt);
          monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
        }
      });

      const sortedMonths = allMonths
        .sort((a, b) => allMonths.indexOf(a) - allMonths.indexOf(b));

      // Map the counts to the sorted months
      filteredData = sortedMonths.map((month) => ({
        name: month,
        value: monthlyCounts[month] || 0,
      }));
    }


    else if (selectedTime3 === 'yearly') {
      const lastFiveYears = Array.from({ length: 5 }, (_, index) => (new Date().getFullYear() - index).toString());
      const yearlyCounts: { [year: string]: number } = {};

      recruiterFilteredData.forEach((interview) => {
        const year = new Date(interview.createdAt).getFullYear().toString();
        if (lastFiveYears.includes(year)) {
          yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
        }
      });

      // Map the counts to the sorted years (in descending order)
      const sortedYears = lastFiveYears.sort((a, b) => parseInt(a) - parseInt(b));

      filteredData = sortedYears.map((year) => ({
        name: year,
        value: yearlyCounts[year] || 0,
      }));
    }


    return filteredData;
  };

  const totalCandidates = (data: User[]) => {
    let totalCandidate = 0;


    data.forEach((c) => {
      totalCandidate += 1;
    });

    setNumberOfCandidates(totalCandidate);
  }



  
  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  const handleOrganizationClick = () => {
    // Open the popup
    setIsPopupOpen(true);
  };
  const handleOrganizationClick2 = () => {
    // Open the popup
    setIsPopupOpen(false);
  };

  const filteredData = getFilteredData(hrAdminDetails);
  const filteredData2 = getFilteredData2(recruiterDetails);
  const filteredData3 = getFilteredData3(candidateDetails);
  return (
    <>
      <div className="ccrAdminDashboard ">
        <HorizontalNavBar />
        <div className="ccrAdminContainer">
          <CcrAdminSidebar />
          <div className="ccrAdminMainContainer">
            {/* First Header  */}

            <div className="ccrAdminMainContainerHeader">
              <div className="ccrAdminContainerHeaderUpcontent">
                <div className="ccrAdminContainerHeaderUpcontentLeft">
                  <label className="ccrAdminContainerHeaderUpcontentLeftTextUpper">
                    Hey There! {userName}
                  </label>
                  <label className="ccrAdminContainerHeaderUpcontentLeftTextDown">
                    Welcome back, we're happy to have you here!
                  </label>
                </div>
                <div className="ccrAdminContainerHeaderUpcontentRight">
                  <div className="ccrAdminContainerHeaderUpcontentRightExport">
                    <label className="ccrAdminContainerHeaderUpcontentRightExportText">
                      Export
                    </label>
                  </div>
                  <img
                    className="ccrAdminContainerHeaderUpcontentRightExportTextImg"
                    src={Dotmenu}
                  />
                </div>
              </div>
            </div>

            {/* Second Bar - WidgetConiater */}

            <div className="widgetContainer">
              <div className="widgetContainerViewCard" onClick={handleOrganizationClick} onMouseLeave={handleOrganizationClick2}>
                <img
                  className="widgetContainerViewCardImage"
                  src={OrganizationsIcon}
                />
                <div className="widgetContainerViewCardContainer"  >
                  <label className="widgetContainerViewCardContainerUpperText">
                    {hrAdminDetails ? hrAdminDetails.length : 0}
                  </label>
                  <label className="widgetContainerViewCardContainerLowerText">
                    Organizations
                  </label>
                </div>
                {isPopupOpen && (
                  <div className="widgetContainerViewCardContainerLowerText">
                    {/* Your popup content goes here */}

                    <p>Approved: {totalApprovedCompanies}</p>
                    <p>Rejected: {totalRejectedCompanies}</p>
                    <p>Pending: {totalPendingCompanies}</p>
                    {/* <button onClick={() => setIsPopupOpen(false)}>Close</button> */}

                  </div>
                )}
              </div>
              <div className="widgetContainerViewCard">
                <img
                  className="widgetContainerViewCardImage"
                  src={RecruitersIcon}
                />
                <div className="widgetContainerViewCardContainer">
                  <label className="widgetContainerViewCardContainerUpperText">
                    {numberOfRecruiters ? numberOfRecruiters : 0}
                  </label>
                  <label className="widgetContainerViewCardContainerLowerText">
                    Recruiters
                  </label>
                </div>
              </div>
              <div className="widgetContainerViewCard">
                <img
                  className="widgetContainerViewCardImage"
                  src={CandidatesIcon}
                />
                <div className="widgetContainerViewCardContainer">
                  <label className="widgetContainerViewCardContainerUpperText">
                    {numberOfCandidates ? numberOfCandidates : 0}
                  </label>
                  <label className="widgetContainerViewCardContainerLowerText">
                    Candidates
                  </label>
                </div>
              </div>
            </div>

            {/* Chart Card */}
            <div className="chartCard chartCardStyle">
              {/* Chart Card Header */}
              <div className="chartCardHeader chartCardHeaderStyle">
                <div className="chartCardHeaderText">
                  <label className="chartCardHeaderTextTypography">
                    Company Details
                  </label>
                </div>

                {/* <div className="chartCardHeaderTextDropdownLayout ">
                  <button className="chartCardHeaderTextDropdownButton">
                    <img
                      className="chartCardHeaderTextDropdownIcon"
                      src={DropdownIcon}
                    />
                  </button>
                </div> */}
              </div>

              {/* Charts */}
              {/* <div className="chartLabel chartLabelText1">
              <label>Label1</label>
                <label>Label2</label>
                <label>Label</label>
                </div> */}
              <div className="chart1">

                <div className="chartBase1">
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label1">
                      Select Time
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label1"
                      id="demo-simple-select1"
                      label="Select Time"
                      onChange={handleTimeChange}
                      value={selectedTime}
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label-year">
                      Select Year
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-year"
                      id="demo-simple-select-year"
                      label="Select Year"
                      onChange={handleYearChange}
                      value={selectedYear}
                      disabled={selectedTime !== "monthly"} // Disable if not Monthly
                    >
                      {/* Populate the year dropdown with available years */}
                      {years.map((year) => (
                        <MenuItem value={year} key={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="approved" stackId="a" fill={getRandomColor()} barSize={40} />
                      <Bar dataKey="rejected" stackId="a" fill={getRandomColor()} barSize={40} />
                      <Bar dataKey="pending" stackId="a" fill={getRandomColor()} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            
            <div className="chartCard chartCardStyle">
              {/* Chart Card Header */}
              <div className="chartCardHeader chartCardHeaderStyle">
                <div className="chartCardHeaderText">
                  <label className="chartCardHeaderTextTypography">
                    Recruiter Details
                  </label>
                </div>

              </div>
              <div className="chart1">

                <div className="chartBase1">
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label1">
                      Select Time
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label1"
                      id="demo-simple-select1"
                      label="Select Time"
                      onChange={handleTimeChange2}
                      value={selectedTime2}
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label-year">
                      Select Year
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-year"
                      id="demo-simple-select-year"
                      label="Select Year"
                      onChange={handleYearChange2}
                      value={selectedYear2}
                      disabled={selectedTime2 !== "monthly"} // Disable if not Monthly
                    >
                      {/* Populate the year dropdown with available years */}
                      {years.map((year) => (
                        <MenuItem value={year} key={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredData2}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" stackId="a" fill={getRandomColor()} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="chartCard chartCardStyle">
              {/* Chart Card Header */}
              <div className="chartCardHeader chartCardHeaderStyle">
                <div className="chartCardHeaderText">
                  <label className="chartCardHeaderTextTypography">
                    Candidate Details
                  </label>
                </div>

              </div>
              <div className="chart1">

                <div className="chartBase1">
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label1">
                      Select Time
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label1"
                      id="demo-simple-select1"
                      label="Select Time"
                      onChange={handleTimeChange3}
                      value={selectedTime3}
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label-year">
                      Select Year
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-year"
                      id="demo-simple-select-year"
                      label="Select Year"
                      onChange={handleYearChange3}
                      value={selectedYear3}
                      disabled={selectedTime3 !== "monthly"} // Disable if not Monthly
                    >
                      {/* Populate the year dropdown with available years */}
                      {years.map((year) => (
                        <MenuItem value={year} key={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredData3}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" stackId="a" fill={getRandomColor()} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>





          </div>
        </div>
      </div>

    </>
  );
};

export default CcrAdminDashboard;
