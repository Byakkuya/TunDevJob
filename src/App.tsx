import React from 'react';
import './App.css';
import {Route, Routes} from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";




function App() {
  return (
      <>
          <div>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/contact" element={<Contact/>}/>
                  <Route path="/login" element={<Login/>}/>
              </Routes>
          </div>
          <Navbar/>



      </>
  );
}

export default App;
