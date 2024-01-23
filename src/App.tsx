import React from 'react';
import './App.css';
import {Route, Routes} from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Footer from "./pages/footer/Footer";
import Offers from "./components/Offers";
import Why from "./components/Why";
import How from "./components/how";



function App() {
  return (
      <>
          <Navbar/>
          <div>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/contact" element={<Contact/>}/>
                  <Route path="/login" element={<Login/>}/>
              </Routes>
          </div>
          <Offers/>
          <Why/>
          <How/>
          <Footer/>




      </>
  );
}

export default App;
