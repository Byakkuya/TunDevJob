/* eslint-disable react-hooks/rules-of-hooks */
import {useMemo, useState} from "react";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, MdOutlineNotListedLocation} from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import CustomButton from "../components/CustomButton";
import JobCard from "../components/JobCard";
import ListBox from "../components/ListBox";
import {Modal} from "@material-ui/core";
import UploadJob from "../components/UploadJob";
import { useAppSelector } from "../shared/store/hook";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Loading from "../components/Loading";
import { FiSearch } from 'react-icons/fi'; 
import { Input,} from 'antd'; 
import { CircularProgress } from "@material-ui/core";



interface FindJobsProps {}



const FindJobs: React.FC<FindJobsProps> = () => {
     
     const jobTypes = ["Full-Time", "Part-Time", "Internship"];
     const jobLocations = ["Remote", "On Site"];
     const contractTypes = ["CDI", "CDD", "Freelance"];

 /* -----------------------------------------------------------------------------------*/
    const [isJobTypesHidden, setIsJobTypesHidden] = useState(false);
    const [isExperienceHidden, setIsExperienceHidden] = useState(false);
    const [isLocationHidden, setIsLocationHidden] = useState(false);
    const [isContractTypeHidden, setIsContractTypeHidden] = useState(false);
    const [sort, setSort] = useState<string>("Newest");
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 9;
    const [filterJobTypes, setFilterJobTypes] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');


    const { user} = useAppSelector((state) => state.auth.auth);
    //@ts-ignore
    const Role = user?.role;
    const isDeveloper = Role === 'DEVELOPER';
    const isCompany = Role === 'COMPANY';
    interface jobs {
        id: number;
        jobTitle: string;
        jobType: string;
        location: string;
        experience: string;
        contractType: string;
        created_at: string;
        company: {
            name: string;
            profileUrl: string;
        };
    }
    const {data: jobs, isLoading} = useQuery({
        queryKey: ["jobs"],
        queryFn: async () => {
            const response = await axiosInstance.get("/jobs");
            return response.data as jobs[];
            
        },
        
        
    });
    
    
console.log(jobs);







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


    

    

    // Function to handle sorting option change
    

    const handleSortChangeFromListBox = (value: string) => {
        setSort(value);
    };


    // useMemo hook to sort jobs based on the selected option
    const sortedJobs = useMemo(() => {
        if (!Array.isArray(jobs)) {
            return [];
        }
    
        return jobs?.slice().sort((a:any, b:any) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
    
            if (isNaN(dateA) || isNaN(dateB)) {
                // Handle invalid dates (you may want to adjust this according to your needs)
                return 0;
            }
    
            if (sort === "Newest") {
                return dateB - dateA; // sort by descending order of dates
            } else if (sort === "Oldest") {
                return dateA - dateB; // sort by ascending order of dates
            } else if (sort === "A-Z") {
                return a.title.localeCompare(b.title);
            } else if (sort === "Z-A") {
                return b.title.localeCompare(a.title);
            }
    
            return 0;
        });
    }, [jobs, sort]);
     
    const [filterLocation, setFilterLocation] = useState<string[]>([]);
    const [filterContractType, setFilterContractType] = useState<string[]>([]);

    const filterJobs = (val: string, filterType: string) => {
        let currentFilters;
        let setFilters;
    
        switch (filterType) {
            case 'jobType':
                currentFilters = filterJobTypes;
                setFilters = setFilterJobTypes;
                break;
            case 'location':
                currentFilters = filterLocation;
                setFilters = setFilterLocation;
                break;
            case 'contractType':
                currentFilters = filterContractType;
                setFilters = setFilterContractType;
                break;
            default:
                return;
        }
    
        if (currentFilters.includes(val)) {
            setFilters(currentFilters.filter((el) => el !== val));
        } else {
            setFilters([...currentFilters, val]);
        }
    };

    const filteredJobs = useMemo(() => {
        return sortedJobs?.filter((job:any) => {
            const jobTypeMatch = filterJobTypes.length === 0 || filterJobTypes.includes(job.jobType);
            const locationMatch = filterLocation.length === 0 || filterLocation.includes(job.location);
            const contractTypeMatch = filterContractType.length === 0 || filterContractType.includes(job.contractType);
            const searchTermMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    
            return jobTypeMatch && locationMatch && contractTypeMatch && searchTermMatch;
        });
    }, [sortedJobs, filterJobTypes, filterLocation, filterContractType, searchTerm]);

    // Calculate total number of pages based on filtered jobs
    const totalPages = filteredJobs ? Math.ceil(filteredJobs.length / itemsPerPage) : 0;
    // Slice jobs based on the current page and items per page
    const visibleJobs = filteredJobs?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

   


   
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
/*------------------------------------------------------------------- */
    


    

    return (
        
        <div className="mt-16 bg-gradient-to-br from-indigo-100 via-violet-50 to-cyan-100">
{isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CircularProgress />
        </div>
        ) : (

            <div className='container sm:mt-2 mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 '>
                <div className='hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm p-4 rounded-xl bg-slate-50'>
                    <p className='text-lg font-semibold text-slate-600 mb-4'>Filter Search</p>
                    
                    <Input
                        className="rounded-md border-2 border-gray-300  "
                        prefix={<FiSearch />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />


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
    onChange={(e) => filterJobs(e.target.value, 'jobType')}
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
    onChange={(e) => filterJobs(e.target.value, 'location')} // changed 'jobType' to 'location'
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
    onChange={(e) => filterJobs(e.target.value, 'contractType')}
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
                            Showing: <span className='font-semibold'>{filteredJobs?.length}</span> Jobs
                            Available
                        </p>

                        <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center' style={{zIndex: 1}}>
    <p className='text-sm md:text-base'>Sort By:</p>
    <ListBox sort={sort} setSort={handleSortChangeFromListBox}/>
</div>

                    </div>
                    {isCompany? (
                    <>
                        <div className="my-6">
                            <CustomButton
                                onClick={handleOpenModal}
                                title='Upload Job'
                                containerStyles={` flex items-center justify-center text-black bg-white  py-3 px-5 outline-none rounded-full text-base hover:bg-blue-100`}
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
                        </>
                        ) : null}


                        <div className="w-full flex flex-wrap gap-4">
                            
                        {
                            // @ts-ignore
                            visibleJobs.map((job:any, index:any) => (
                                // @ts-ignore
                                 <JobCard job={job} company={job.companyId} userID={user?.id} key={index}/>
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
            )}
        </div>
   
        
    );
};

export default FindJobs;
