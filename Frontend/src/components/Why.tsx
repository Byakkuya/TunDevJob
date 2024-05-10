import React from 'react';

import looking from '../assets/img/looking.jpg'
import amico from '../assets/img/amico.png'
const Why = () => {
    return (
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
                {/* Move this div to the left */}
                <div className="lg:w-1/4">
                    <h3 className="text-3xl">Why we are better than others</h3>
                    <p className="text-base text-gray-500">Our platform stands out for its user-friendly interface, comprehensive job listings, and efficient application process. We prioritize transparency and communication, ensuring that job seekers can easily connect with potential employers. Moreover, our advanced search features allow users to find jobs that perfectly match their skills and interests.</p>
                </div>

                {/* Move this div to the right */}
                <div className="w-full lg:w-3/4">
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 md:gap-12 items-start">
                        {/* Featured Card 1 */}
                        <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8
          items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer">
                            <div>
                                <img src={amico} alt=""/>
                                <h5 className="text-2xl font-semibold text-black px-5 text-center mt-5">Fast</h5>

                            </div>
                        </div>

                        {/* Featured Card 2 */}
                        <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8
          items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16">
                            <div>
                                <img src={amico} alt=""/>
                                <h5 className="text-2xl font-semibold text-black px-5 text-center mt-5">Minimalist</h5>
                            </div>
                        </div>

                        {/* Featured Card 3 */}
                        <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8
          items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer">
                            <div>
                                <img src={amico} alt=""/>
                                <h5 className="text-2xl font-semibold text-black px-5 text-center mt-5">Secure</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Why;