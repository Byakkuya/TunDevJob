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


interface CompnayFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

interface CompanyProfileProps {
    // Define your props here if any
}

const CompnayForm: React.FC<CompnayFormProps> = ({ open, setOpen }) => {
    const { user } = useSelector((state: any) => state.user);
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: { ...user?.user },
    });

    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState<string | null>("");
    const [uploadCv, setUploadCv] = useState<string | null>("");

    const onSubmit = () => {};

    const closeModal = () => setOpen(false);

    return (
        <>

            <Transition appear show={open} as={Fragment}>
                <Dialog as='div' className='relative z-50' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-lg font-semibold leading-6 text-gray-900'
                                    >
                                        Edit Company Profile
                                    </Dialog.Title>

                                    <form
                                        className='w-full mt-2 flex flex-col gap-5'
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <TextInput
                                            name='name'
                                            label='Company Name'
                                            type='text'
                                            register={register("name", {
                                                required: "Compnay Name is required",
                                            } as RegisterOptions)}
                                            error={typeof errors.name?.message === 'string' ? errors.name?.message : ""}                                        />

                                        <TextInput
                                            name='location'
                                            label='Location/Address'
                                            placeholder='eg. Califonia'
                                            type='text'
                                            register={register("location", {
                                                required: "Address is required",
                                            } as RegisterOptions)}
                                            error={typeof errors.location?.message === 'string' ? errors.location?.message : ""}
                                        />

                                        <div className='w-full flex gap-2'>
                                            <div className='w-1/2'>
                                                <TextInput
                                                    name='contact'
                                                    label='Contact'
                                                    placeholder='Phone Number'
                                                    type='text'
                                                    register={register("contact", {
                                                        required: "Contact is required!",
                                                    } as RegisterOptions)}
                                                    error={typeof errors.contact?.message === 'string' ? errors.contact?.message : ""}
                                                />
                                            </div>

                                            <div className='w-1/2 mt-2'>
                                                <label className='text-gray-600 text-sm mb-1'>
                                                    Company Logo
                                                </label>
                                                <input
                                                    type='file'
                                                    onChange={(e) => setProfileImage(e.target.files ? e.target.files[0].name : null)}
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col'>
                                            <label className='text-gray-600 text-sm mb-1'>
                                                About Company
                                            </label>
                                            <textarea
                                                className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                                                rows={4}
                                                cols={6}
                                                {...register("about", {
                                                    required: "Write a little bit about your company.",
                                                } as RegisterOptions)}
                                                aria-invalid={errors.about ? "true" : "false"}
                                            ></textarea>
                                            {errors.about && (
                                                <span
                                                    role='alert'
                                                    className='text-xs text-red-500 mt-0.5'
                                                >
{typeof errors.about?.message === 'string' ? errors.about?.message : null}
                        </span>
                                            )}
                                        </div>

                                        <div className='mt-4'>
                                            <CustomButton
                                                type='submit'
                                                containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                                                title={"Submit"}
                                            />
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

const CompanyProfile: React.FC<CompanyProfileProps> = () => {


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
            <div className='mt-10'>
                <h1 className='text-3xl font-semibold mb-5'>Testimonials</h1>


        </div>
            <ReviewsList reviews={reviewsData} />
        </div>
    );
}


export default CompanyProfile;