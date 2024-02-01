import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


import { mockJobs,jobTypes, experience } from "../core/mocks/Jobs";
import CustomButton from "../components/CustomButton";
import JobCard from "../components/JobCard";
import ListBox from "../components/ListBox";
interface FindJobsProps {}

const FindJobs: React.FC<FindJobsProps> = () => {
    const [sort, setSort] = useState<string>("Newest");
    const [page, setPage] = useState<number>(1);
    const [numPage, setNumPage] = useState<number>(1);

    const [filterJobTypes, setFilterJobTypes] = useState<string[]>([]);
    const [filterExp, setFilterExp] = useState<string[]>([]);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    const filterJobs = (val: string) => {
        if (filterJobTypes?.includes(val)) {
            setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
        } else {
            setFilterJobTypes([...filterJobTypes, val]);
        }
    };

    const filterExperience = async (e: string[]) => {
        setFilterExp(e);
    };

    return (
        <div className="mt-16">


            <div className='container sm:mt-2 mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]'>
                <div className='hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm'>
                    <p className='text-lg font-semibold text-slate-600'>Filter Search</p>

                    <div className='py-2'>
                        <div className='flex justify-between mb-3'>
                            <p className='flex items-center gap-2 font-semibold'>
                                <BiBriefcaseAlt2 />
                                Job Type
                            </p>

                            <button>
                                <MdOutlineKeyboardArrowDown />
                            </button>
                        </div>

                        <div className='flex flex-col gap-2'>
                            {jobTypes.map((jtype, index) => (
                                <div key={index} className='flex gap-2 text-sm md:text-base '>
                                    <input
                                        type='checkbox'
                                        value={jtype}
                                        className='w-4 h-4'
                                        onChange={(e) => filterJobs(e.target.value)}
                                    />
                                    <span>{jtype}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='py-2 mt-4'>
                        <div className='flex justify-between mb-3'>
                            <p className='flex items-center gap-2 font-semibold'>
                                <BsStars />
                                Experience
                            </p>

                            <button>
                                <MdOutlineKeyboardArrowDown />
                            </button>
                        </div>

                        <div className='flex flex-col gap-2'>
                            {experience.map((exp) => (
                                <div key={exp.title} className='flex gap-3'>
                                    <input
                                        type='checkbox'
                                        value={exp?.value}
                                        className='w-4 h-4'
                                        onChange={(e) => filterExperience([e.target.value])}
                                    />
                                    <span>{exp.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-full md:w-5/6 px-5 md:px-0'>
                    <div className='flex items-center justify-between mb-4'>
                        <p className='text-sm md:text-base'>
                            Showing: <span className='font-semibold'>1,902</span> Jobs
                            Available
                        </p>

                        <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
                            <p className='text-sm md:text-base'>Sort By:</p>

                            <ListBox sort={sort} setSort={setSort} />
                        </div>
                    </div>

                    <div className='w-full flex flex-wrap gap-4'>
                        {mockJobs.map((job, index) => (
                            <JobCard job={job} key={index} />
                        ))}
                    </div>

                    {numPage > page && !isFetching && (
                        <div className='w-full flex items-center justify-center pt-16'>
                            <CustomButton
                                title='Load More'
                                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindJobs;
