import React from 'react';

const How = () => {
    return (
        <div className="">
            <div className="md:w-3/5 mx-auto">
                <h2 className="ssm:mx-2 text-4xl text-neutral-700 font-semibold mb-4 md:w-4/5">How To start </h2>
                <p className="ssm:mx-2 text-sm text-neutral-600 mb-8">
                Using our platform is incredibly easy. All you need to do is follow a few simple steps. Start by creating your profile, then browse through our extensive list of job opportunities. Once you find a job that matches your skills and interests, apply with just a click. Our user-friendly interface and streamlined application process make job hunting a breeze.
                </p>
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-9 px-2">

                <div className="col-span-4 w-full h-full ">
                    <div className="w-full h-full bg-[rgba(255,,255,0.04)] shadow-3xl rounded-md p-2 md:pl-4">
                        <h1 className="text-black text-xl font-medium py-2">Make an Account</h1>
                        <p className="text-gray-600 sm:text-sm text-xs">create an account  or just login if your are aldready have an account </p>
                    </div>
                </div>
                <div className="relative col-span-1 w-full h-full flex justify-center items-center">
                    <div className="h-full w-1 bg-indigo-300"></div>
                    <div className="absolute w-6 h-6 rounded-full bg-indigo-400 z-10 text-white text-center">1</div>
                </div>
                <div className="col-span-4 w-full h-full"></div>



                <div className="col-span-4 w-full h-full"></div>
                <div className="relative col-span-1 w-full h-full flex justify-center items-center">
                    <div className="h-full w-1 bg-indigo-300"></div>
                    <div className="absolute w-6 h-6 rounded-full bg-indigo-400 z-10 text-white text-center">2</div>
                </div>
                <div className="col-span-4 w-full h-full ">
                    <div className="w-full h-full bg-[rgba(255,,255,0.04)] shadow-3xl rounded-md p-2 md:pl-4">
                        <h1 className="text-black text-xl font-medium py-2">Fill your information</h1>
                        <p className="text-gray-600 sm:text-sm text-xs">depends on your Account there is a form to fill including your details </p>
                    </div>
                </div>


                <div className="col-span-4 w-full h-full ">
                    <div className="w-full h-full bg-[rgba(255,,255,0.04)] shadow-3xl rounded-md p-2 md:pl-4">
                        <h1 className="text-black text-xl font-medium py-2">Start Your Journey</h1>
                        <p className="text-gray-600 sm:text-sm text-xs">Depends on your Account you can now search an apply to jobs as A Developer or post Offers for Developers as an Entreprise </p>
                    </div>
                </div>
                <div className="relative col-span-1 w-full h-full flex justify-center items-center">
                    <div className="h-full w-1 bg-indigo-300"></div>
                    <div className="absolute w-6 h-6 rounded-full bg-indigo-400 z-10 text-white text-center">3</div>
                </div>
                <div className="col-span-4 w-full h-full"></div>
            </div>
        </div>
    );
};

export default How;