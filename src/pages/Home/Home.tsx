import React from 'react';
import Header from "../../components/Header";

import Offers from "../../components/Offers";
import Why from "../../components/Why";
import Footer from "../../components/Footer";
// @ts-ignore
import How from "../../components/How";
const Home = () => {
    return (
        <>
        <Header/>
        <Offers/>
        <Why/>
        <How/>
        <Footer/>
        </>

    );
};

export default Home;