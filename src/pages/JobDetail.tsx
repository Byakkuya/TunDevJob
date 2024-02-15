import { useEffect, useState } from "react";

import moment from "moment";
import { useParams, Link } from "react-router-dom";
import { mockJobs } from "../core/mocks/Jobs";
import JobCard from "../components/JobCard";
import CustomButton from "../components/CustomButton";
import {RiVerifiedBadgeFill} from "react-icons/ri";

const JobDetail: React.FC = () => {
    const params = useParams<{ id?: string }>();
    const id = parseInt(params.id || "0") - 1;
    const [job, setJob] = useState(mockJobs[0]);
    const [selected, setSelected] = useState("0");

    useEffect(() => {
        setJob(mockJobs[id ?? 0]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [id]);

    const BackButton = () => (
        <Link to="/find-jobs">
            <button className="bg-black -500 text-white py-2 px-4 mb-5 rounded">Back to Find Jobs</button>
        </Link>
    );





    return (
        <div className=' container mx-auto my-16 bg-gradient-to-t from-stone-100 via-purple-300 to-blue-200'>

        <div className=" -100 min-h-screen p-8">
             <BackButton />
            <div className='flex justify-between relative mx-auto  flex-col items-center justify- gap-4 md:flex-row md:items-start'>

                {/* Left Card for Job Description */}
                <div className='w-full md:w-2/3 px-5 py-10 md:px-10 shadow-xl bg-blue-100 rounded-xl'>
                    <div className='flex items-center justify-between'>
                        <div className='w-3/4 flex gap-4'>
                            <img
                                src={job?.company?.profileUrl}
                                alt={job?.company?.name}
                                className='w-20 h-20 md:w-24 md:h-24 rounded-full object-cover'
                            />

                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold text-gray-600'>{job?.jobTitle}</p>
                                <span className='text-base'>{job?.location}</span>
                                <span className='text-base text-blue-600'>{job?.company?.name}</span>
                                <span className='text-gray-500 text-sm'>
            {moment(job?.created_at || new Date()).fromNow()}
          </span>
                            </div>
                        </div>

                        <RiVerifiedBadgeFill className='text-3xl text-blue-500'/>
                    </div>

                    <div className='flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
                        <div className='bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                            <span className='text-sm'>Salary</span>
                            <p className='text-lg font-semibold text-gray-700'>{job?.salary}</p>
                        </div>

                        <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
                            <span className='text-sm'>Job Type</span>
                            <p className='text-lg font-semibold text-gray-700'>{job?.jobType}</p>
                        </div>

                        <div
                            className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
                            <span className='text-sm'>No. of Applicants</span>
                            <p className='text-lg font-semibold text-gray-700'>{job?.applicants}K</p>
                        </div>
                    </div>

                    <div className='my-6'>
                        <p className='text-xl font-semibold'>Job Description</p>
                        <span className='text-base'>{job?.detail[0]?.description}</span>

                        {job?.detail[0]?.requirement && (
                            <>
                                <p className='text-xl font-semibold mt-8'>Requirement</p>
                                <span className='text-base'>{job?.detail[0]?.requirement}</span>
                            </>
                        )}
                    </div>

                    <Link to={`/apply/${job?.id}`}>
                        <div className='w-full'>
                            <CustomButton
                                onClick={() => setSelected("0")}
                                title='Apply Now'
                                containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
                            />
                        </div>
                    </Link>
                </div>

                {/* Right Card for Company Information */}
                <div className='w-full md:w-1/3 bg-blue-100 via-opacity-30  p-4 md:rounded-xl md:p-6 px-5 py- md:px-10 shadow-md'
                >
                    <div className='mb-6 flex flex-col'>
                        {job?.company?.profileUrl && (
                            <img
                                src={job?.company?.profileUrl}
                                alt={job?.company?.name}
                                className='w-20 h-20 md:w-24 md:h-24 rounded-full object-cover'
                            />
                        )}
                        <p className='text-xl font-semibold'>Company Information</p>

                        <p className='text-xl text-blue-600 font-semibold'>{job?.company?.name}</p>
                        <span className='text-base'>{job?.company?.location}</span>
                        <span className='text-sm'>{job?.company?.email}</span>
                        <span className='text-sm'>{job?.company?.contact}</span>
                    </div>

                    <p className='text-xl font-semibold'>About Company</p>
                    <span>{job?.company?.about}</span>
                </div>

            </div>
        </div>


            <div className='w-full mx-6' >
<h1 className='text-3xl font-semibold mb-5'>Related Jobs</h1>

                <div className='w-full flex flex-auto gap-5 mt-8'>
                    {mockJobs?.slice(0, 4).map((job, index) => (
                        <JobCard job={job} key={index}/>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default JobDetail;
