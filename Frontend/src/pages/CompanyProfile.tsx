import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, RegisterOptions } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {mockCompanies} from "../core/mocks/Companies";
import {mockJobs} from "../core/mocks/Jobs";
import CustomButton from "../components/CustomButton";
import TextInput from "../components/TextInput";
import JobCard from "../components/JobCard";
import Loading from "../components/Loading";

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import {reviewsData} from "../core/mocks/Reviews";
import ReviewsList from "../components/ReviewsList";
import {Modal} from "@material-ui/core";
import AddingReview from "../components/AddingReview";


interface CompnayFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

interface CompanyProfileProps {
    // Define your props here if any
}


const CompanyProfile: React.FC<CompanyProfileProps> = () => {

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const [rating, setRating] = useState(0) // Initial value
    const params = useParams<{ id?: string }>();
    const { user } = useSelector((state: any) => state.user);
    const [info, setInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        setInfo(mockCompanies[parseInt(params?.id ?? "0") - 1]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    if (isLoading) {
        return <Loading />;
    }


    return (
        <div className='container mx-auto p-5 mt-16'>
            <div className='bg-blue-100 via-opacity-30 rounded-xl p-6 md:p-8'>
                <div className='w-full flex flex-col md:flex-row gap-3 justify-between items-center'>
                    <h2 className='text-gray-600 text-2xl md:text-3xl font-semibold'>
                        {info?.name}
                    </h2>
                    {/* Uncomment the code below if needed */}
                    {/* {user?.user?.accountType === undefined &&
            info?._id === user?.user?._id &&        (
                <div className='flex items-center justify-center gap-4'>
                    <CustomButton
                        title={"Edit Profile"}
                        onClick={() => setOpenForm(true)}
                        iconRight={<FiEdit3/>}
                        containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600 hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600`}
                    />

                    <Link to='/upload-job'>
                        <CustomButton
                            title='Upload Job'
                            iconRight={<FiUpload/>}
                            containerStyles={`text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none rounded text-sm md:text-base border border-blue-600`}
                        />
                    </Link>
                </div>
            )}
        */}
                </div>

                <div className='mt-6 md:flex md:items-center md:justify-between'>
                    {info?.profileUrl && (
                        <img
                            src={info?.profileUrl}
                            alt={info?.name}
                            className='w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-4 md:mb-0'
                        />
                    )}
                    <div className='flex flex-col'>
                        <p className='text-xl font-semibold mb-2'>Company Information</p>
                        <p className='text-xl text-blue-600 font-semibold mb-2'>{info?.name}</p>
                        <span className='text-base mb-1'>{info?.location}</span>
                        <span className='text-sm mb-1'>{info?.email}</span>
                        <span className='text-sm'>{info?.contact}</span>
                    </div>
                </div>

                <div className='mt-6'>
                    <p className='text-xl font-semibold mb-2'>About Company</p>
                    <p className='text-sm'>{info?.about}</p>
                </div>
            </div>


            {/* Reviews */}
            <div className='mt-10 flex flex-row  mb-5'>
                <h1 className='text-3xl font-semibold mb-5 flex-1'>Testimonials</h1>
                {/* add a review button */}
                    <CustomButton
                        title='Add a Review'
                        onClick={handleOpenModal}
                        containerStyles='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
                    />
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