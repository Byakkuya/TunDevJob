import React from 'react';
import {HiAdjustments, HiClipboardList} from "react-icons/hi";
import {Card, Tabs} from "flowbite-react";
import {HiUserCircle} from "react-icons/hi2";
import {MdDashboard} from "react-icons/md";
import { MdWork } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import mob from "../assets/img/mob.png"

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
                                    <h2 className="text-4xl text-neutral-700 font-semibold mb-4 md:w-4/5">As a Developer you can ....</h2>
                                    <p className="md:w-3/4 text-sm text-neutral-600 mb-8">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis metus rhoncus, dapibus nibh sagittis, posuere magna. In hac habitasse platea dictumst. Aliquam sodales eu eros non maximus. Nulla tincidunt eu risus eu pellentesque. Duis a leo nec nisl molestie sollicitudin
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
                                    <h2 className="text-4xl text-neutral-700 font-semibold mb-4 md:w-4/5">As An Enterprise
                                        you can ....</h2>
                                    <p className="md:w-3/4 text-sm text-neutral-600 mb-8">
                                        Post Offers with details so you can find the best fit for
                                        your company

                                    </p>

                                </div>
                                <div className="w-52 h-52">
                                    <img src={mob} alt=""/>
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