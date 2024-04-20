/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import Avatar from '@material-ui/core/Avatar';
import { Typography } from 'antd';
import moment from "moment";
import { useParams, Link } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import {RiVerifiedBadgeFill} from "react-icons/ri";
import {Modal} from "@material-ui/core";

import ApplyJob from "../components/ApplyJob";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Loading from "../components/Loading";
import { useAppSelector } from "../shared/store/hook";
import UploadJob from "../components/UploadJob";
import EditJob from "../components/EditJob";
import ApplicationCard from "../components/ApplicationCard";

const JobDetail: React.FC = ( ) => {

    interface Application {
        name: string;
        appliedAt: string;
        coverLetter: string;
        currentPostition: string;
        developer: any;
        developerId: number;
        email: string;
        github: string;
        id: number;
        jobId: number;
        linkedin: string;
        profile: string;
        resume: string;
      }
      interface Props {
        applications: Application[];
      }
      
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    }
    const [openModal2, setOpenModal2] = useState(false);

    const handleOpenModal2 = () => {
        setOpenModal2(true);
        document.body.classList.add('allow-scrolling');

    };

    const handleCloseModal2 = () => {
        setOpenModal2(false);
    }
    //@ts-ignore
    const { user} = useAppSelector((state) => state.auth.auth);
        //@ts-ignore
    const applieable = user?.role === 'DEVELOPER'
    
    
    const {data : details ,  isLoading: load1 } = useQuery({
        queryKey: ["UserCompany"],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/company/${
                //@ts-ignore
                user?.id}`)
            
            return response.data;
        },
    });

  


     
    

    const params = useParams<{ id?: string }>();
    //@ts-ignore
    const id = parseInt(params.id);


    const {data : jobdetails, isLoading, error } = useQuery({
        queryKey: ["job"],
        queryFn: async () => {
            if (id !== undefined) {
                try {
                    const response = await axiosInstance.get(`/jobs/${id}`)
                    
                    return response.data;
                } catch (err) {
                    console.error(err); 
                }
            }
            return null;
        },
    });

    const {data : applications, isLoading: load2 } = useQuery({
        queryKey: ["applications",id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/applications/${id}`)
            
            return response.data;
        },
    });
  
    

    
    if (error) {
        console.error(error); // Log any errors that occur when fetching the data
    }
    if (isLoading) {
        return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
    </div>
    }
    
    const job = jobdetails;
    const adjustable = job?.companyId === details?.id

    const BackButton = () => (
        <Link to="/find-jobs">
            <button className="bg-black -500 text-white py-2 px-4 mb-5 rounded">Back to Find Jobs</button>
        </Link>
    );




    return (
       <div>
        {isLoading ? (
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
             <CircularProgress />
         </div>
        ) : (
            <div className='w-full md:w-full px-5 py-10 md:px-10 shadow-xl bg-white rounded-xl'>

<div className=" -100 min-h-screen p-8">
    <BackButton />


    <div className='flex justify-between relative mx-auto  flex-col items-center justify- gap-4 md:flex-row md:items-start'>
    <div className='w-full md:w-2/3 px-5 py-10 md:px-10 shadow-xl bg-gradient-to-br from-indigo-100 via-violet-50 to-cyan-100 rounded-xl'>
    <div className='flex items-center justify-between'>
        <div className='w-3/4 flex gap-4'>
            <img
                src={jobdetails?.company?.logo || 'default-image-url'}
                alt={jobdetails?.company?.name || 'No name available'}
                className='w-20 h-20 md:w-24 md:h-24 rounded-full object-cover'
            />

            <div className='flex flex-col'>
                <p className='text-xl font-semibold text-gray-600'>{jobdetails?.title}</p>
                
                
                <span className='text-gray-500 text-sm'>
                    {moment(jobdetails?.createdAt || new Date()).fromNow()}
                </span>
            </div>
        </div>

        <RiVerifiedBadgeFill className='text-3xl text-blue-500'/>
    </div>

    <div className='flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
        <div className='bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
            <span className='text-sm'>Salary</span>
            <p className='text-lg font-semibold text-gray-700'>{jobdetails?.salary}</p>
        </div>

        <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
            <span className='text-sm'>Job Type</span>
            <p className='text-lg font-semibold text-gray-700'>{jobdetails?.jobType}</p>
        </div>

        <div
            className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
            <span className='text-sm'>Contract Type</span>
            <p className='text-lg font-semibold text-gray-700'>{jobdetails?.contractType}</p>
        </div>
    </div>

    <div className='my-6'>
        <p className='text-xl font-semibold'>Job Description</p>
        <span className='text-base'>{jobdetails?.description}</span>

        {jobdetails?.requirements && (
            <>
                <p className='text-xl font-semibold mt-8'>Requirement</p>
                <span className='text-base'>{jobdetails?.requirements}</span>
            </>
        )}
    </div>
    {!applieable ? null : (
    <div>
        <CustomButton
            onClick={handleOpenModal}
            title='Apply Now'
            containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
        />
    </div>
   
    
)}
 {!adjustable ? null : (
        <div>
            <CustomButton
                onClick={handleOpenModal2}
                title='Edit Job'
                containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
            />
        </div>
    )}

    <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="overflow-scroll"
    >
        <ApplyJob jobId={id} />
    </Modal>
    <Modal
        open={openModal2}
        onClose={handleCloseModal2}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="overflow-scroll"
    >
        <EditJob jobId={id} />
    </Modal>
</div>

<div className='w-full md:w-1/3 bg-gradient-to-br from-indigo-100 via-violet-50 to-cyan-100 p-4 md:p-6 lg:p-8 xl:p-10 shadow-md rounded-xl'>    <Link to={`/company-profile/${jobdetails?.companyId}`}>
        <div className='mb-6 flex flex-col gap-2'>
            <div className="flex flex-row items-center gap-10">
            
            {jobdetails?.company.logo && (
               <Avatar
               src={jobdetails?.company.logo}
               alt={jobdetails?.company?.name}
               style={{ width: 100, height: 100 }}
           />
            )}
            
            <div className="flex flex-col">
            <p className='text-xs sm:text-sm md:text-lg lg:text-xl xl:text-4xl text-blue-600 font-semibold'>{jobdetails?.company?.name}</p>
            

            <div className="flex flex-row items-center gap-1">
            <CiLocationOn />
            <span className='text-base'>{jobdetails?.company?.city}</span>
            </div>
            </div>
            </div>
            
            <p className='text-xl font-semibold'>About Company</p>
        <span>{jobdetails?.company.description}</span>


            <p className='text-xl font-semibold'>Socials</p>

            <div className="flex flex-row items-center gap-1">
            <CiGlobe />
            <span className='text-sm'>{jobdetails?.company.website}</span>
            </div>

            <div className="flex flex-row items-center gap-1">
            <FaLinkedin />
            <span className='text-sm'>{jobdetails?.company?.linkedin}</span>
            </div>
        </div>

        
    </Link>
</div>
</div>
</div>
                
        
<div>
{!adjustable ? null : (
   <div>
   <Typography.Title level={1} style={{ margin: 0 }}>
     Applicants
   </Typography.Title>
   {/* map all applications*/ }
   {applications && applications.length > 0 ? (
     <div className="flex flex-wrap mt-6">
       {applications.map((application: Application) => (
         <ApplicationCard key={application.id} application={application} />
       ))}
     </div>
   ) : (
<Typography.Title level={1} style={{ margin: "0 auto", textAlign: "center" }}>   
 There are no applications yet.
  </Typography.Title>
   )}
 </div>
)}
</div>
            </div>

            

            )}
       </div>
    );
};

export default JobDetail;
