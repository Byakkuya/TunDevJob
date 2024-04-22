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
import UploadJob from "./components/UploadJob";
import JobDetail from "./pages/JobDetail";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./components/signup";
import SignupCompany from "./components/SignupCompany";
import SignupDeveloper from "./components/SignupDeveloper";
import ApplyJob from "./components/ApplyJob";
import NotFound from './components/NotFound';
import PrivateRoute from "./components/PrivateRoute";
import { useAppSelector } from './shared/store/hook';
import Admin from './pages/Admin';
import { JustAdmin } from './components/JustAdmin';







function App() {
    const {user} = useAppSelector((state) => state.auth.auth);
    
    //@ts-ignore
    const role = user?.role;


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
                        <Route path="/find-jobs" element={<PrivateRoute> <FindJobs/> </PrivateRoute>}/>
                        <Route path="/Companies" element={<PrivateRoute> <Companies/> </PrivateRoute>}/>
                        
                        <Route
                            path={
                                role === "DEVELOPER" || "COMPANY"
                                    ? "/profile"
                                    : "/profile/:id"
                            }
                            element={<Profile/>}
                        />

<Route
                            path="/Dashboard"
                            element={
                                <PrivateRoute>
                            <JustAdmin>  <Admin/> </JustAdmin>
                            </PrivateRoute>
                              }
                        />
                        
                        <Route path="/Company-profile" element={<CompanyProfile/>}/>
                        <Route path="/Company-profile/:id" element={<CompanyProfile/>} />
                        <Route path="/upload-job" element={<UploadJob/>}/>
                        <Route path="/job-detail/:id" element={<JobDetail/>}/>
                        <Route path="apply/:id" element={<ApplyJob/>}/>

                    </Route>

                    <Route path="/home" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/signup/developer" element={<SignupDeveloper/>}/>
                    <Route path="/signup/company" element={<SignupCompany/>}/>
                    <Route path="*" element={<NotFound/>}/>



                </Routes>
                {user && <Footer/>}
            </div>




        </>
    );
}

export default App;