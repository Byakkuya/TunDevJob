import React from 'react';
import {Carousel} from "flowbite-react";


import bestprofile from "../assets/img/bestprofile.png"
const Header = () => {
    return (
        <div className='bg-neutral-50'>
            <div className='px-4 lg:px-14 max-w-screen-2x1 mx-auto min-h-screen h-screen'>
                <Carousel className="w-full mx-auto">
                    <div
                        className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify content-between gap-12">
                        <div className="h-2/5 w-2/5">
                            <img src={bestprofile} alt=""/>
                        </div>
                        {/* hero text */}
                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-neutralDgrey md:w-3/4 leading-snug">Are you
                                a Developer or an Enterprise looking <span
                                    className="text-indigo-400">To connect?</span></h1>
                            <p className="text-neutral-500 text-base mb-8">
                                Whether you're an individual developer passionate about coding or a thriving enterprise
                                seeking meaningful connections, TunisianDevJobs is here for you !
                            </p>
                            <a href="/Find-jobs">
                            <button className="px-7 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-300">Get Started</button>
                            </a>
                        </div>
                    </div>
                    <div
                        className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify content-between gap-12">
                        <div className="h-2/5 w-2/5">
                            <img src={bestprofile} alt=""/>
                        </div>
                        {/* hero text */}
                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-semibold mb-4 text-neutralDgrey md:w-3/4 leading-snug">Are you
                                a Developer or an Enterprise looking <span
                                    className="text-indigo-400">To connect?</span></h1>
                            <p className="text-neutral-500 text-base mb-8">
                                Whether you're an individual developer passionate about coding or a thriving enterprise
                                seeking meaningful connections, TunisianDevJobs is here for you !
                            </p>
                            <a href="/Find-jobs">
                                <button className="px-7 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-300">Get
                                    Started
                                </button>
                            </a>

                        </div>
                    </div>


                </Carousel>

            </div>
        </div>
    );
};

export default Header;