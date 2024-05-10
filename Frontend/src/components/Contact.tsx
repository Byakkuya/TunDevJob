import React, { useState } from 'react';
import { MdAddIcCall } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuMailCheck } from "react-icons/lu";
import { FaFacebook,FaInstagram,FaLinkedinIn   } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { message } from 'antd';



const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userMessage, setUserMessage] = useState('');

    const {mutate: mutate1, isPending: isPending1  } = useMutation({
        mutationFn: async (data: any) => {
            const response = await axiosInstance.post(`/messages`, data);
            return response.data;
        },
        onSuccess(data, variables, context) {
            message.success({
                content: 'Message created successfully',
                duration: 6, // Display duration in seconds
                style: {
                  marginTop: '10vh', // Adjust vertical position
                },
              });
              
        },
        onError(error, variables, context) {
            message.error({
                //@ts-ignore
                content: error.response.data.error,
                duration: 3, // Display duration in seconds
                style: {
                  marginTop: '10vh', // Adjust vertical position
                },
              });
              
        },
    });

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const message = userMessage;
        mutate1({ name, email, message });
    };

    return (
        <>
        <div className="flex w-full min-h-screen justify-center items-center ">
            <div className="flex flex-col md:flex-row span-x-6 span-y-6 bg-gradient-to-r from-indigo-400 to-[#ECFDFF] w-full max-w-4xl p-8 rounded-xl shadow-lg text-white">
                <div className="flex flex-col space-y-8 justify-between">
                    <div>
                    <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
                        <p className="pt-2 text-white text-sm ">
                        You can easily reach out to us directly from this platform. We're committed to providing you with the support you need. If you have any questions, concerns, or feedback, don't hesitate to contact us. You can also find more information about our services on our FAQ page. We're here to help you navigate your job search journey.
                                                   </p>
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
                    <div className=" flex space-x-4 text-lg">
                        <a href="#"><FaFacebook/></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedinIn /></a>
                        <a href="#"><FaXTwitter /></a>

                    </div>
                </div>
                <div className="sm:mt-5 ssm:mt-5">
                    <div className=" bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-80">
                    <form action="" className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="" className="text-sm">Your name</label>
                <input type="text" placeholder="Your name"
                    className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"
                    value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
                <label htmlFor="" className="text-sm">Email Adresse</label>
                <input type="email" placeholder="Your Email"
                    className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
                <label htmlFor="" className="text-sm">Message</label>
                <textarea placeholder="Your message" rows={5}
                    className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"
                    value={userMessage} onChange={(e) => setUserMessage(e.target.value)}></textarea>
            </div>

            <button className=" sm:self-center ssm:self-center  bg-indigo-950 text-white font-bold rounded-lg px-6 py-2 hover:bg-indigo-500"
                type="submit">
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