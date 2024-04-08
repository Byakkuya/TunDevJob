import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiSendPlaneFill } from "react-icons/ri";
import { useAppSelector } from '../shared/store/hook';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { message } from 'antd';
import { Button } from 'antd';


const UploadJob = () => {
    const { user } = useAppSelector((state) => state.auth.auth);
    //@ts-ignore
    const id = user.id;
    const {data : details } = useQuery({
        queryKey: ["UserCompany",id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/company/${id}`)
            
            return response.data;
        },
    });

   




    const validationSchema = Yup.object({
        title: Yup.string().required('Job Title is required'),
        location: Yup.string().required('Location is required'),
        city: Yup.string().required('City is required'),
        jobType: Yup.string().required('Job Type is required'),
        contractType: Yup.string().required('Contract Type is required'),
        description: Yup.string().required('Job Description is required'),
        requirements: Yup.string().required('Job Requirement is required'),
        salary: Yup.number().typeError('Salary must be a number')
    });

    const initialValues = {
        title: '',
        location: '',
        city: details?.city ||'',
        jobType: '',
        contractType: '',
        description: '',
        requirements: '',
        salary: 0,
    };

    const locations = ['On Site','Remote']; // Replace with your actual locations
    const jobTypes = ['Full-Time', 'Part-Time', 'Internship']; // Replace with your actual job types
    const contractTypes = ['CDI', 'CDD', 'Freelance']; // Replace with your actual contract types

    const [formValues, setFormValues] = useState(initialValues);

    const {mutate, isPending  } = useMutation({
        mutationFn: async (data: any) => {
            const response = await axiosInstance.post(`/jobs/uploadjob`, data);
            return response.data;
        },
        onSuccess(data, variables, context) {
            message.success({
                content: 'Job posted successfully',
                duration: 6, // Display duration in seconds
                style: {
                  marginTop: '10vh', // Adjust vertical position
                },
              });
              //relaod the page
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
        },
        onError(error, variables, context) {
            message.error({
                //@ts-ignore
                content: error.response.data.error,
                duration: 3, // Display duration in seconds
                style: {
                  marginTop: '10vh', // Adjust vertical position
                },
              });
              
        },
    });

    const onSubmit = async (values:any ) => {
        values.salary = parseInt(values.salary);
        const data = {
            ...values,
            companyId: details?.id,
        }
        try {
            mutate(data);
        }
        catch (error) {
            message.error({
                content: 'Error posting job',
                duration: 3, // Display duration in seconds
                style: {
                  marginTop: '10vh', // Adjust vertical position
                },
              });
        }
    };

    return (
        <div className=" mt-12 p-6  mx-28 bg-white rounded-md shadow-md ">
            <h1 className="text-2xl font-bold mb-4 ">Upload Job</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className=" flex flex-col gap-3">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                            Job Title
                        </label>
                        <Field
                            type="text"
                            id="title"
                            name="title"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-600">
                            city
                        </label>
                        <Field
                            type="text"
                            id="city"
                            name="city"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="city" component="div" className="text-red-500 text-sm"/>
                        
                    </div>


                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-600">
                            Location
                        </label>
                        <Field
                            as="select"
                            id="location"
                            name="location"
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            <option value="" disabled>Select Location</option>
                            {locations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="location" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="jobType" className="block text-sm font-medium text-gray-600">
                            Job Type
                        </label>
                        <Field
                            as="select"
                            id="jobType"
                            name="jobType"
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            <option value="" disabled>Select Job Type</option>
                            {jobTypes.map((jobType) => (
                                <option key={jobType} value={jobType}>
                                    {jobType}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="jobType" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="contractType" className="block text-sm font-medium text-gray-600">
                            Contract Type
                        </label>
                        <Field
                            as="select"
                            id="contractType"
                            name="contractType"
                            className="mt-1 p-2 w-full border rounded-md"
                        >
                            <option value="" disabled>Select Contract Type</option>
                            {contractTypes.map((contractType) => (
                                <option key={contractType} value={contractType}>
                                    {contractType}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="contractType" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-600">
                            Job Description
                        </label>
                        <Field
                            as="textarea"
                            id="description"
                            name="description"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="jobRequirement" className="block text-sm font-medium text-gray-600">
                            Job Requirement
                        </label>
                        <Field
                            as="textarea"
                            id="requirements"
                            name="requirements"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="requirements" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-600">
                            Salary
                        </label>
                        <Field
                            type="text"
                            id="salary"
                            name="salary"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="salary" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div>
                    <Button 
    
    htmlType="submit" 
    className="inline-flex items-center"
    loading={isPending}
    icon={<RiSendPlaneFill  />}
>
    Upload Job
</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default UploadJob;
