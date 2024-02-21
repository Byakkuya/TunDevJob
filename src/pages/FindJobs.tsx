import {useMemo, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineNotListedLocation} from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";



import {mockJobs, jobTypes, experience, jobLocations, contractTypes} from "../core/mocks/Jobs";
import CustomButton from "../components/CustomButton";
import JobCard from "../components/JobCard";
import ListBox from "../components/ListBox";
import {Modal} from "@material-ui/core";
import UploadJob from "./UploadJob";
interface FindJobsProps {}





const FindJobs: React.FC<FindJobsProps> = () => {



    const [isJobTypesHidden, setIsJobTypesHidden] = useState(false);
    const [isExperienceHidden, setIsExperienceHidden] = useState(false);
    const [isLocationHidden, setIsLocationHidden] = useState(false);
    const [isContractTypeHidden, setIsContractTypeHidden] = useState(false);

    const toggleVisibility = (section:string) => {
        switch (section) {
            case 'jobTypes':
                setIsJobTypesHidden(!isJobTypesHidden);
                break;
            case 'experience':
                setIsExperienceHidden(!isExperienceHidden);
                break;
            case 'location':
                setIsLocationHidden(!isLocationHidden);
                break;
            case 'contractType':
                setIsContractTypeHidden(!isContractTypeHidden);
                break;
            default:
                break;
        }
    };





    const [sort, setSort] = useState<string>("Newest");
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 9;

    const [filterJobTypes, setFilterJobTypes] = useState<string[]>([]);
    const [filterExp, setFilterExp] = useState<string[]>([]);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    // Function to handle sorting option change
    const handleSortChange = (value: string) => {
        setSort(value);
    };

    // useMemo hook to sort jobs based on the selected option
    const sortedJobs = useMemo(() => {
        const currentDate = new Date();

        return mockJobs.slice().sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();

            if (isNaN(dateA) || isNaN(dateB)) {
                // Handle invalid dates (you may want to adjust this according to your needs)
                return 0;
            }

            if (sort === "Newest") {
                return dateA - currentDate.getTime();
            } else if (sort === "Oldest") {
                return currentDate.getTime() - dateA;
            } else if (sort === "A-Z") {
                return a.jobTitle.localeCompare(b.jobTitle);
            } else if (sort === "Z-A") {
                return b.jobTitle.localeCompare(a.jobTitle);
            }

            return 0;
        });
    }, [mockJobs, sort]);




    const filteredJobs = useMemo(() => {
        // Apply your filtering logic here based on filterJobTypes and filterExp
        // This is just a placeholder, you should replace it with your actual filtering logic
        return sortedJobs.filter((job) => {
            // Example: Check if job type is in filterJobTypes
            return filterJobTypes.length === 0 || filterJobTypes.includes(job.jobType);
        });
    }, [sortedJobs, filterJobTypes, filterExp]);

    // Calculate total number of pages based on filtered jobs
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    // Slice jobs based on the current page and items per page
    const visibleJobs = filteredJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const filterJobs = (val: string) => {
        if (filterJobTypes.includes(val)) {
            setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
        } else {
            setFilterJobTypes([...filterJobTypes, val]);
        }
    };


    const handleLoadMore = () => {
        setIsFetching(true);
        setTimeout(() => {
            setPage(page + 1);
            setIsFetching(false);
        }, 1000); // Simulating an asynchronous API call
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };





    {/*upload button*/}
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    }
    return (

        <div className="mt-16 bg-gradient-to-t from-stone-100 via-purple-300 to-blue-200">


            <div className='container sm:mt-2 mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 '>
                <div className='hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm p-4 rounded-xl bg-slate-50'>
                    <p className='text-lg font-semibold text-slate-600 mb-4'>Filter Search</p>

                    {/* Job Type Filter */}
                    <div className='py-2'>
                        <div className='flex justify-between mb-3'>
                            <p className='flex items-center gap-2 font-semibold'>
                                <BiBriefcaseAlt2/>
                                Job Type
                            </p>

                            <button onClick={() => toggleVisibility('jobTypes')}
                                    className='text-slate-600 hover:text-slate-800'>
                                {isJobTypesHidden ? <MdOutlineKeyboardArrowDown/> : <MdOutlineKeyboardArrowUp/>}
                            </button>
                        </div>

                        <div className={`flex flex-col gap-2 ${isJobTypesHidden ? 'hidden' : ''}`}>
                            {jobTypes.map((jtype, index) => (
                                <div key={index} className='flex items-center gap-2 text-sm md:text-base '>
                                    <input
                                        type='checkbox'
                                        value={jtype}
                                        className='w-4 h-4 text-indigo-600 focus:ring-indigo-500'
                                        onChange={(e) => filterJobs(e.target.value)}
                                    />
                                    <span>{jtype}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    

                    {/* Job Location */}
                    <div className='py-2 mt-4'>
                        <div className='flex justify-between mb-3'>
                            <p className='flex items-center gap-2 font-semibold'>
                                <MdOutlineNotListedLocation/>
                                Location
                            </p>

                            <button onClick={() => toggleVisibility('location')}
                                    className='text-slate-600 hover:text-slate-800'>
                                {isLocationHidden ? <MdOutlineKeyboardArrowDown/> : <MdOutlineKeyboardArrowUp/>}
                            </button>
                        </div>

                        <div className={`flex flex-col gap-2 ${isLocationHidden ? 'hidden' : ''}`}>
                            {jobLocations.map((jtype, index) => (
                                <div key={index} className='flex items-center gap-2 text-sm md:text-base '>
                                    <input
                                        type='checkbox'
                                        value={jtype}
                                        className='w-4 h-4 text-indigo-600 focus:ring-indigo-500'
                                        onChange={(e) => filterJobs(e.target.value)}
                                    />
                                    <span>{jtype}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contract Type */}
                    <div className='py-2 mt-4'>
                        <div className='flex justify-between mb-3'>
                            <p className='flex items-center gap-2 font-semibold'>
                                <IoNewspaperOutline />
                                Contract Type
                            </p>

                            <button onClick={() => toggleVisibility('contractType')} className='text-slate-600 hover:text-slate-800'>
                                {isContractTypeHidden ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
                            </button>
                        </div>

                        <div className={`flex flex-col gap-2 ${isContractTypeHidden ? 'hidden' : ''}`}>
                            {contractTypes.map((jtype, index) => (
                                <div key={index} className='flex items-center gap-2 text-sm md:text-base '>
                                    <input
                                        type='checkbox'
                                        value={jtype}
                                        className='w-4 h-4 text-indigo-600 focus:ring-indigo-500'
                                        onChange={(e) => filterJobs(e.target.value)}
                                    />
                                    <span>{jtype}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-full md:w-5/6 px-5 md:px-0'>
                    <div className='flex items-center justify-between mb-4'>
                        <p className='text-sm md:text-base'>
                            Showing: <span className='font-semibold'>{sortedJobs.length}</span> Jobs
                            Available
                        </p>

                        <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
                            <p className='text-sm md:text-base'>Sort By:</p>

                            <ListBox sort={sort} setSort={handleSortChange}/>

                        </div>

                    </div>
                    <div className="my-6">
                        <CustomButton
                            onClick={handleOpenModal}
                            title='Upload Job'
                            containerStyles={` flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
                        />

                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                            className="overflow-scroll"
                        >
                            <UploadJob />
                        </Modal>
                    </div>

                    <div className="w-full flex flex-wrap gap-4">
                        {visibleJobs.map((job, index) => (
                            <JobCard job={job} key={index}/>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="w-full flex items-center justify-center pt-8">
                            <div className="flex items-center">
                                {page > 1 && (
                                    <span
                                        className="cursor-pointer pr-4 text-blue-600 hover:underline"
                                        onClick={() => handlePageChange(page - 1)}
                                    >
                    Previous
                  </span>
                                )}
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <span
                                        key={index}
                                        className={`cursor-pointer pr-4 ${
                                            page === index + 1 ? 'font-bold text-blue-600' : 'text-gray-500 hover:underline'
                                        }`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                    {index + 1}
                  </span>
                                ))}
                                {page < totalPages && (
                                    <span
                                        className="cursor-pointer text-blue-600 hover:underline"
                                        onClick={() => handlePageChange(page + 1)}
                                    >
                    Next
                  </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindJobs;
