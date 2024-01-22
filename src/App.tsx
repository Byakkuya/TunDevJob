import React from 'react';
import './App.css';
import {Route, Routes} from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";


function App() {
  return (
      <>
          <Navbar/>
          <div className="flex mx-auto justify-between w-5/6">
              <Routes>
                  <Route path="/"  element={<Home />}/>
                  <Route path="/about"  element={<About />}/>
                  <Route path="/contact"  element={<Contact />}/>
                  <Route path="/login" element={<Login />}/>
              </Routes>
          </div>
      </>
  );
}

export default App;
