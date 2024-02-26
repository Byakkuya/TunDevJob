import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiSendPlaneFill } from "react-icons/ri";

const ApplyJob = () => {
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        resume: Yup.mixed().required('Resume is required'),
        coverLetter: Yup.string().required('Cover Letter is required'),
    });

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        resume: "",
        coverLetter: "",
    };

    const onSubmit = (values: any) => {
        console.log(values);
        // Add your form submission logic here
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Apply To Job</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                            First Name
                        </label>
                        <Field
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                            Last Name
                        </label>
                        <Field
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>
                    {/*upload resume */}
                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-600">
                            Resume
                        </label>
                        <Field
                            type="file"
                            id="resume"
                            name="resume"
                            className="mt-3 p-2  w-full border rounded-b"
                        />
                        <ErrorMessage name="resume" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-600">
                            Cover Letter
                        </label>
                        <Field
                            as="textarea"
                            id="coverLetter"
                            name="coverLetter"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="coverLetter" component="div" className="text-red-500 text-sm" />

                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            <RiSendPlaneFill className="inline-block mr-2" />
                            Apply Now
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default ApplyJob;
