import React, { useState, useEffect } from 'react';
import './RecruiterDashboard.css';
import RecruiterHeader from './RecruiterHeader';
import Label from '../Icon/box fill dark.png';
import Label2 from '../Icon/box fill light.png';
import axios from 'axios';
import Cookies from "js-cookie";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import HrAdminSidebar from './HrAdminSidebar';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import RecruiterSidebar from './RecruiterSidebar';
import { CircularProgressbar } from 'react-circular-progressbar';
// import { CircularProgressbar } from 'react-circular-progressbar';

interface Interview {
    interviewId: number;
    interviewDate: string;
    recruiter: Recruiter;
    jobRole: string;
}

interface Recruiter {
    recruiterId: number;
    user: User;
}

interface User {
    userId: number;
    userName: String;
}

const RecruiterDashboard = () => {
    const [data, setData] = useState<Interview[]>([]);
    const [recruiterId, setRecruiterId] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("all");
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
    const [years, setYears] = useState<string[]>([]);

    const accessToken = Cookies.get("accessToken");
    let userId = localStorage.getItem("userId");
    let userName = localStorage.getItem("userName");
    const [jobRoles, setJobRoles] = useState<{ jobRole: string }[]>([]);

    const [selectedJobRole, setSelectedJobRole] = useState('');
    const [jobRolesCount, setJobRolesCount] = useState<number>(0);
    const [jobRolesCountMap, setJobRolesCountMap] = useState<{ [key: string]: number }>({});

    const [progressValue, setProgressValue] = useState<number>(0);

    const uniqueJobRoles = new Set();


    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "/getRecruiterInterviews",
                    { userId: userId },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setData(response.data);
                const initialRecruiterId = "all";
                const initialSelectedTime = "monthly";

                // Call getFilteredData with initial values
                getFilteredData(response.data);
                // setRecruiterData(filteredData);

                // Set the initial values in state
                setRecruiterId(initialRecruiterId);
                setSelectedTime(initialSelectedTime);

                const years = Array.from({ length: 30 }, (_, index) => (new Date().getFullYear() - index).toString());
                setYears(years);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchJobRoles = async () => {
            try {
                const response = await axios.post("/getJobRolesByRecruiter", { userId: userId }, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setJobRolesCount(response.data.jobRolesCount);
                setJobRolesCountMap(response.data.jobRolesCountMap);
                setJobRoles(response.data.jobRoles);

            } catch (error) {
                console.error('Error fetching job roles:', error);
            }
        };

        fetchData();
        fetchJobRoles();


    }, []);
    useEffect(() => {
        const calculatedProgressValue = calculateProgressValue();
        setProgressValue(calculatedProgressValue);
    }, [selectedJobRole]);

    const handleJobRoleChange = (event: SelectChangeEvent<string>) => {
        setSelectedJobRole(event.target.value);

    };
    const uniqueData = data.filter(role => {
        if (!uniqueJobRoles.has(role.jobRole)) {
          uniqueJobRoles.add(role.jobRole);
          return true;
        }
        return false;
      });

      const calculateProgressValue = () => {
        if (jobRolesCount === 0) {
            return 0; // Avoid division by zero
        }

        const selectedJobRoleCount = jobRolesCountMap[selectedJobRole] || 0;
        const progress = (selectedJobRoleCount / jobRolesCount) * 100;
        return progress;
    };


    const handleTimeChange = (e: SelectChangeEvent) => {
        const selectedValue = e.target.value as string;

        setSelectedTime(selectedValue);
    };

    const handleYearChange = (e: SelectChangeEvent) => {
        const selectedValue = e.target.value as string;

        // Set the selected year
        setSelectedYear(selectedValue);
    };

    // Add a function to get the week number from a date
    const getWeekNumberFromDate = (dateString: string) => {
        const date = new Date(dateString);
        const oneJan = new Date(date.getFullYear(), 0, 1);
        const dayNumber = Math.ceil(((date.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7);
        return dayNumber.toString();  // Convert the week number to a string
    };
    const getDayFromDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.toLocaleString('default', { weekday: 'short' });
        return day;
    };

    const getMonthFromDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
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
        const todayIndex = days.findIndex(day => day === getDayFromDate(new Date().toISOString()));

        // Rotate the array so that today's day is at the end
        const rotatedDays = [...days.slice(todayIndex + 1), ...days.slice(0, todayIndex + 1)];

        return rotatedDays;
    };




    const getFilteredData = (recData: Interview[]): { name: string; value: number }[] => {

        let filteredData: { name: string; value: number }[] = [];
        // Filter by recruiter
        let recruiterFilteredData = recData;

        // Filter by time
        if (selectedTime === 'weekly') {
            const currentWeekNumber = getWeekNumberFromDate(new Date().toISOString());
            const weeklyCounts: { [day: string]: number } = {};

            recruiterFilteredData.forEach((interview) => {
                const weekNumber = getWeekNumberFromDate(interview.interviewDate);

                // Check if the interview is in the current week
                if (weekNumber === currentWeekNumber) {
                    const day = getDayFromDate(interview.interviewDate);
                    weeklyCounts[day] = (weeklyCounts[day] || 0) + 1;
                }
            });
            filteredData = getWeekDays(currentWeekNumber).map((day) => ({
                name: day,
                value: weeklyCounts[day] || 0,
            }));
        }
        else if (selectedTime === 'monthly') {
            const allMonths = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];

            const monthlyCounts: { [month: string]: number } = {};
            const currentYear = new Date().getFullYear().toString();
            const settedYear = years
            // Initialize counts for all months to 0
            allMonths.forEach(month => monthlyCounts[month] = 0);

            recruiterFilteredData.forEach((interview) => {
                const year = new Date(interview.interviewDate).getFullYear().toString();

                // Check if the interview is in the current year
                if (year === selectedYear) {
                    const month = getMonthFromDate(interview.interviewDate);
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


        else if (selectedTime === 'yearly') {
            const lastFiveYears = Array.from({ length: 5 }, (_, index) => (new Date().getFullYear() - index).toString());
            const yearlyCounts: { [year: string]: number } = {};

            recruiterFilteredData.forEach((interview) => {
                const year = new Date(interview.interviewDate).getFullYear().toString();
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


    const filteredData = getFilteredData(data);
    return (
        <>
            <RecruiterHeader />
            <div className='frame'>
                <RecruiterSidebar />

                <div className='component '>
                    <label className=' typographyWelcome'>Welcome {userName} !</label>
                    <div className='cardHeader1 '>
                        <div className='title'>
                            <label className='typographyChart'>Ratings Details</label>
                        </div>
                    </div>
                    <div className='chart1'>
                        <div className='chartBase1'>

                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <InputLabel id="demo-simple-select-label1">Select Time</InputLabel>
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
                                <InputLabel id="demo-simple-select-label-year">Select Year</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-year"
                                    id="demo-simple-select-year"
                                    label="Select Year"
                                    onChange={handleYearChange}
                                    value={selectedYear}
                                    disabled={selectedTime !== 'monthly'} // Disable if not Monthly
                                >
                                    {/* Populate the year dropdown with available years */}
                                    {years.map((year) => (
                                        <MenuItem value={year} key={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <ResponsiveContainer width='100%' height={300}>
                                <BarChart className="barchart" data={filteredData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#1750B1" barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>

                        </div>
                        </div>

                        <div className='chart2'>
                            <div className='chartBase2'>
                                <FormControl sx={{ m: 2, minWidth: 300 }}>



                                    <InputLabel id="demo-simple-select-label">
                                        Select job Role
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedJobRole}
                                        label="Select Job Role"
                                        onChange={handleJobRoleChange}
                                    >
                                        {uniqueData.map((role, index) => (
                                            <MenuItem key={index} value={role.jobRole}>
                                                {role.jobRole}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>


                            </div>
                                <ul>
                                    <li>  <label className='typographyChart'>Total Job Roles Count: {jobRolesCount}</label></li>

                                </ul>
                           
                            <div className='circularpb'>
                            <CircularProgressbar
                                value={progressValue}
                                text={`${jobRolesCountMap[selectedJobRole] || 0}/${jobRolesCount}`}
                                strokeWidth={6}

                                styles={{

                                    root: {
                                        width: '200px', // Adjust the width
                                        height: '200px', // Adjust the height
                                      },
                        
                                    path: {
                                      
                                        stroke: `rgba(23, 80, 177, ${progressValue / 100})`,
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 2s ease 0s',
                                    },
                                  
                                    trail: {
                                     stroke: '#d6d6d6',
                                    },
                                    text: {
                                        fill: '#1750B1',
                                        fontSize: '16px',
                                        display: 'block',
                                    },
                                }}
                            />
                            </div>


                            
                        </div>



                    </div>
                </div>
            
        </>
    );
};

// Add a function to get the week number from a date


export default RecruiterDashboard;
