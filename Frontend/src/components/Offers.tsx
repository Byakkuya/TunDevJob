import React from 'react';
import {HiAdjustments, HiClipboardList} from "react-icons/hi";
import {Card, Tabs} from "flowbite-react";
import {HiUserCircle} from "react-icons/hi2";
import {MdDashboard} from "react-icons/md";
import { MdWork } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import mob from "../assets/img/mob.png"
import work from "../assets/svg/work-space.svg"

const Offers = () => {
    return (
        <div className="">
            <div className="overflow-x-auto">
                <Tabs aria-label="Full width tabs" style="fullWidth" className="bg-transparent">
                    <Tabs.Item active title="Developer" icon={BsPersonWorkspace}>
                        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
                            <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                                <div className="w-52 h-52">
                                    <img src={mob} alt=""/>
                                </div>
                                <div className="md:w-3/5 mx-auto">
                                    <h2 className="text-4xl text-neutral-700 font-semibold mb-4 md:w-4/5">As a Developer you can</h2>
                                    <p className="md:w-3/4 text-sm text-neutral-600 mb-8">
                                    On this platform, as a developer, you can explore and apply for numerous job opportunities that match your skills and interests. You can browse through a wide range of job listings, apply with a single click, track your application status, and connect directly with potential employers. This platform is designed to make your job search easier and more efficient.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </Tabs.Item>
                    <Tabs.Item title="Enterprise" icon={MdWork}>
                        <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
                            <div
                                className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-12">

                                <div className="md:w-3/5 mx-auto">
                                    <h2 className="text-4xl text-neutral-700 font-semibold mb-4 md:w-4/5">As a Company
                                        you can</h2>
                                    <p className="md:w-3/4 text-sm text-neutral-600 mb-8">
                                    Post your job offers with comprehensive details on our platform. This allows you to find the best fit for your company. By providing a detailed description of the job role, responsibilities, required skills, and qualifications, you can attract the right candidates. This not only streamlines your hiring process but also ensures that you find a candidate who aligns with your company's mission and values.

                                    </p>

                                </div>
                                <div className="w-72 h-72">
                                    <img src={work} alt=""/>
                                </div>

                            </div>

                        </div>
                    </Tabs.Item>
                </Tabs>
            </div>
        </div>

    );
};

export default Offers;