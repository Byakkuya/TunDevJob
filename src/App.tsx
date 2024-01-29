import React from 'react';
import './App.css';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";


import {Outlet, Navigate, Route, Routes, useLocation} from "react-router-dom";
import FindJobs from "./pages/FindJobs";
import Companies from "./pages/Companies";
import Profile from "./pages/Profile";
import CompanyProfile from "./pages/CompanyProfile";
import UploadJob from "./pages/UploadJob";
import JobDetail from "./pages/JobDetail";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/signup";

const user = {
    user: {
        accountType: "Developer"
    }
};

function App() {
    function Layout () {
        const location = useLocation();
        return user? (<Outlet/>) : (<Navigate to='/login' state={{from: location}} replace={true} />);
    }
    return (
        <>
            <div>
                <Navbar/>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='/' element={<Navigate to='/home' replace={true}/>}/>
                        <Route path="/find-jobs" element={<FindJobs/>}/>
                        <Route path="/Companies" element={<Companies/>}/>
                        <Route
                            path={
                                user?.user?.accountType === "Developer"
                                    ? "/profile"
                                    : "/profile/:id"
                            }
                            element={<Profile/>}
                        />
                        <Route path="/Company-profile" element={<CompanyProfile/>}/>
                        <Route path="/Company-profile/:id" element={<CompanyProfile/>} />
                        <Route path="/upload-job" element={<UploadJob/>}/>
                        <Route path="/job-detail/:id" element={<JobDetail/>}/>

                    </Route>

                    <Route path="/home" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>


                </Routes>
                {user && <Footer/>}
            </div>




        </>
    );
}

export default App;