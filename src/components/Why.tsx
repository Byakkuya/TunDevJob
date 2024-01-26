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
                    <p className="text-base text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel rhoncus nisl. Nullam condimentum arcu in purus pharetra, ac congue lectus rhoncus.</p>
                </div>

                {/* Move this div to the right */}
                <div className="w-full lg:w-3/4">
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 md:gap-12 items-start">
                        {/* Featured Card 1 */}
                        <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8
          items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer">
                            <div>
                                <img src={amico} alt=""/>
                                <h5 className="text-2xl font-semibold text-black px-5 text-center mt-5">Reason 1 </h5>

                            </div>
                        </div>

                        {/* Featured Card 2 */}
                        <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8
          items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16">
                            <div>
                                <img src={amico} alt=""/>
                                <h5 className="text-2xl font-semibold text-black px-5 text-center mt-5">Reason 2</h5>
                            </div>
                        </div>

                        {/* Featured Card 3 */}
                        <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8
          items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer">
                            <div>
                                <img src={amico} alt=""/>
                                <h5 className="text-2xl font-semibold text-black px-5 text-center mt-5">Reason 3</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Why;