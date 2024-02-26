import React from 'react';


import {Link} from "react-router-dom";

const Signup = () => {



    return (
        <div
            className=" text-white h-[100vh] flex justify-center items-center bg-cover bg-gradient-to-b from-indigo-400 to-[#e9f8ff]">
            <div
                className="bg-slate-800 border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
                <h1 className="text-4xl text-whitefont-bold text-center">Signup</h1>


                    <a href="/signup/developer">
                        <button
                            className="w-full mb-4 text-[18] mt-6 rounded-full bg-white text-indigo-950 hover:text-indigo-300 py-2"
                            >Signup As Developer
                        </button>
                    </a>
                    <a href="/signup/company">
                        <button
                            className="w-full mb-4 text-[18] mt-6 rounded-full bg-white text-indigo-950 hover:text-indigo-300 py-2"
                            >Signup As Company
                        </button>
                    </a>
                        <div>
                            <span>Already have an Account? <Link to='/login'
                                                                 className="text-indigo-400">Login</Link></span>
                        </div>

            </div>
        </div>

    );
};

export default Signup;