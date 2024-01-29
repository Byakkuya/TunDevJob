import React from 'react';
import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";

import {Link} from "react-router-dom";

const Signup = () => {
    return (
        <div
            className=" text-white h-[100vh] flex justify-center items-center bg-cover bg-gradient-to-b from-indigo-400 to-[#e9f8ff]">
            <div
                className="bg-slate-800 border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
                <h1 className="text-4xl text-whitefont-bold text-center">Signup</h1>
                <form action="">
                    <div className=" relative my-4">
                        <input type="text"
                               className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-indigo-50 focus:outline-none focus:ring-0 focus-text-white focus:border-indigo-100 peer"
                               placeholder=""/>
                        <label htmlFor=""
                               className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-0">Username</label>
                        <FaAddressCard className="absolute top-4 right-4"/>
                    </div>
                    <div className=" relative my-4">
                        <input type="email"
                               className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-indigo-50 focus:outline-none focus:ring-0 focus-text-white focus:border-indigo-100 peer"
                               placeholder=""/>
                        <label htmlFor=""
                               className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-0">Your
                            Email</label>
                        <BiUser className="absolute top-4 right-4"/>
                    </div>

                    <div className=" relative my-4">
                        <input type="password"
                               className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-indigo-50 focus:outline-none focus:ring-0 focus-text-white focus:border-indigo-100 peer"
                               placeholder=""/>
                        <label htmlFor=""
                               className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-0">Password</label>
                        <AiOutlineUnlock className="absolute top-4 right-4"/>
                    </div>
                    {/*<div className="flex justify-between items-center">
                        <span className="text-indigo-200">Forget your password ?</span>
                    </div> */}
                    <button
                        className="w-full mb-4 text-[18] mt-6 rounded-full bg-white text-indigo-950 hover:text-indigo-300 py-2"
                        type="submit">Signup
                    </button>
                    <div>
                        <span>Already have an Account? <Link to='/login' className="text-indigo-400">Login</Link></span>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Signup;