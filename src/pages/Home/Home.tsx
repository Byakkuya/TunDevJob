import React from 'react';
import Header from "../../components/Header";

import Offers from "../../components/Offers";
import Why from "../../components/Why";
import Footer from "../../components/Footer";
// @ts-ignore
import How from "../../components/How";
import Contact from "../contact/Contact";
const Home = () => {
    return (
        <>
        <Header/>
        <Offers/>
        <Why/>
        <How/>
            <Contact/>
        <Footer/>
        </>

    );
};

export default Home;