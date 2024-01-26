import React from 'react';
import { MdAddIcCall } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuMailCheck } from "react-icons/lu";
import { FaFacebook,FaInstagram,FaLinkedinIn   } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



const Contact = () => {

    return (
        <>
        <div className="flex w-full min-h-screen justify-center items-center bg-gradient-to-r from-indigo-50 to-indigo-500">
            <div className="flex flex-col md:flex-row span-x-6 span-y-6 bg-gradient-to-r from-indigo-500 to-indigo-50 w-full max-w-4xl p-8 rounded-xl shadow-lg text-white">
                <div className="flex flex-col space-y-8 justify-between">
                    <div>
                    <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
                        <p className="pt-2 text-cyan-100 text-sm ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel rhoncus nisl. Nullam condimentum arcu in purus pharetra, ac congue lectus rhoncus.                        </p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="inline-flex space-x-2 items-center ">
                            <MdAddIcCall/>
                            <span className="ml-2">+216 00 000 000</span>

                        </div>

                        <div className="inline-flex space-x-2 items-center ">
                            <LuMailCheck />

                            <span className="ml-2">Contact@TunDevJob.com</span>

                        </div>

                        <div className="inline-flex space-x-2 items-center ">
                            <FaMapLocationDot/>
                            <span className="ml-2">Rue 13 ibn cina Monastir</span>

                        </div>
                    </div>
                    <div className="flex space-x-4 text-lg">
                        <a href="#"><FaFacebook/></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedinIn /></a>
                        <a href="#"><FaXTwitter /></a>

                    </div>
                </div>
                <div>
                    <div className="bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-80">
                        <form action="" className="flex flex-col space-y-4">
                            <div>
                                <label htmlFor="" className="text-sm">Your name</label>

                                <input type="text" placeholder="Your name"
                                       className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"/>
                            </div>

                            <div>
                                <label htmlFor="" className="text-sm">Email Adresse</label>

                                <input type="email" placeholder="Your Email"
                                       className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"/>
                            </div>

                            <div>
                                <label htmlFor="" className="text-sm">Message</label>

                                <textarea placeholder="Your message" rows={5}
                                       className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"></textarea>
                            </div>
                            <button className="inline-block self-end bg-indigo-950 text-white font-bold rounded-lg px-6 py-2 hover:bg-indigo-500">
                                Send Message
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Contact;