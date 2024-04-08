import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";

import CustomButton from "../components/CustomButton";
import { CiGlobe } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import '@smastrom/react-rating/style.css'
import ReviewsList from "../components/ReviewsList";
import {Box, Modal} from "@material-ui/core";
import AddingReview from "../components/AddingReview";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import  {CircularProgress} from '@mui/material';
import { useAppSelector } from "../shared/store/hook";



interface CompnayFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

interface CompanyProfileProps {
    // Define your props here if any
}


const CompanyProfile: React.FC<CompanyProfileProps> = () => {
    const queryClient = useQueryClient();



    //@ts-ignore
    const { user} = useAppSelector((state) => state.auth.auth);
    //@ts-ignore
    const Role = user?.role;
    const isDeveloper = Role === 'DEVELOPER';
    const isCompany = Role === 'COMPANY';

    
    const params = useParams<{ id?: string }>(); // Access URL parameters
    const companyId = parseInt(params.id || "0"); // Parse company ID from URL, default to 0 if not found


    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const [rating, setRating] = useState(0) // Initial value;
    const [info, setInfo] = useState<any>(null);
    
    
    const [openForm, setOpenForm] = useState(false);


    const { data: companyData, isLoading } = useQuery({
        queryKey: ["company", companyId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/companies/${companyId}`);
            return response.data;
        },
    });
    
    const reviewsData = companyData?.testimonials;
    console.log(reviewsData)
    
    

    

    useEffect(() => {
        if (companyData) {
            setInfo(companyData);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }, [companyData]);


    if (isLoading) {
        return (
            <div style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                <Box>
                    <CircularProgress />
                </Box>
            </div>
        )
    }
    

    return (
        
        <div className='container mx-auto p-5 mt-16'>
            <div className='bg-gradient-to-br from-indigo-100 via-violet-50 to-cyan-100 via-opacity-30 rounded-xl p-6 md:p-8'>
                <div className='w-full flex flex-col md:flex-row gap-3 justify-between items-center'>
                    <h2 className='text-gray-600 text-2xl md:text-3xl font-semibold'>
                        {info?.name}
                    </h2>
                    
                </div>

                <div className='mt-6 md:flex md:items-center md:justify-between'>
                    {info?.logo && (
                        <img
                            src={info?.logo}
                            alt={info?.name}
                            className='w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-4 md:mb-0'
                        />
                    )}
                    <div className='flex flex-col'>
                        <p className='text-xl font-semibold mb-2'>Company Information</p>
                        <p className='text-xl text-blue-600 font-semibold mb-2'>{info?.name}</p>
                        <span className='text-base mb-1'>{info?.city}</span>
                        <div className="flex flex-row items-center gap-1">
            <CiGlobe />
            <span className='text-sm'>{info?.website}</span>
            </div>

            <div className="flex flex-row items-center gap-1">
            <FaLinkedin />
            <span className='text-sm'>{info?.linkedin}</span>
            </div>
            <div className="flex flex-row items-center gap-1">
            <FaPhoneAlt />

                        <span className='text-sm'>{info?.number.slice(3)}</span>
                        </div>
                       </div>
                </div>

                <div className='mt-6'>
                    <p className='text-xl font-semibold mb-2'>About Company</p>
                    <p className='text-sm'>{info?.description}</p>
                </div>
            </div>


            {/* Reviews */}
            <div className='mt-10 flex flex-row  mb-5'>
                <h1 className='text-3xl font-semibold mb-5 flex-1'>Testimonials</h1>
                {/* add a review button */}
                {isDeveloper &&(
                    <CustomButton
                        title='Add a Review'
                        onClick={handleOpenModal}
                        containerStyles='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
                    />) }
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <AddingReview/>
                </Modal>



        </div>
            <ReviewsList reviews={reviewsData} />
        </div>
    );
}


export default CompanyProfile;