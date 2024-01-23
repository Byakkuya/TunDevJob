import React from 'react';
import {HiAdjustments, HiClipboardList} from "react-icons/hi";
import {Card, Tabs} from "flowbite-react";
import {HiUserCircle} from "react-icons/hi2";
import {MdDashboard} from "react-icons/md";
import { MdWork } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";


const Offers = () => {
    return (
        <div className="bg-gradient-to-r from-indigo-200 to-indigo-100">
            <h1 className="text-2xl font-bold mb-4">What We Offer</h1>
            <div className="overflow-x-auto">
                <Tabs aria-label="Full width tabs" style="fullWidth">
                    <Tabs.Item active title="Developer" icon={BsPersonWorkspace}>
                        <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </Card>
                    </Tabs.Item>
                    <Tabs.Item title="Enterprise" icon={MdWork}>
                        <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </Card>
                    </Tabs.Item>
                </Tabs>
            </div>
        </div>

    );
};

export default Offers;