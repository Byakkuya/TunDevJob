import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiSendPlaneFill } from "react-icons/ri";


const UploadJob = () => {
    const validationSchema = Yup.object({
        title: Yup.string().required('Job Title is required'),
        location: Yup.string().required('Location is required'),
        jobType: Yup.string().required('Job Type is required'),
        contractType: Yup.string().required('Contract Type is required'),
        jobDescription: Yup.string().required('Job Description is required'),
        jobRequirement: Yup.string().required('Job Requirement is required'),
        salary: Yup.number().typeError('Salary must be a number')
    });

    const initialValues = {
        title: '',
        location: '',
        jobType: '',
        contractType: '',
        jobDescription: '',
        jobRequirement: '',
        salary: '',
    };

    const locations = ['On Site','Remote']; // Replace with your actual locations
    const jobTypes = ['Full-Time', 'Part-Time', 'Internship']; // Replace with your actual job types
    const contractTypes = ['CDI', 'CDD', 'Freelance']; // Replace with your actual contract types


    const onSubmit = (values:any ) => {
        console.log(values);
        // Add your form submission logic here
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
                            id="jobDescription"
                            name="jobDescription"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="jobDescription" component="div" className="text-red-500 text-sm"/>
                    </div>

                    <div>
                        <label htmlFor="jobRequirement" className="block text-sm font-medium text-gray-600">
                            Job Requirement
                        </label>
                        <Field
                            as="textarea"
                            id="jobRequirement"
                            name="jobRequirement"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="jobRequirement" component="div" className="text-red-500 text-sm"/>
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
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            <RiSendPlaneFill className="inline-block mr-2" />
                            Upload Job
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default UploadJob;
