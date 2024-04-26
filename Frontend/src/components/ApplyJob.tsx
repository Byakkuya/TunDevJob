import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiSendPlaneFill } from "react-icons/ri";
import { useAppSelector } from '../shared/store/hook';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { uploadResumeToSupabase } from '../lib/supabase';
import { message } from 'antd';
import { Button as AntButton } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from '@mui/material';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { styled } from '@mui/material/styles';
import Loading from './Loading';

const ApplyJob = (jobId: any) => {
    const { user } = useAppSelector((state) => state.auth.auth);
   //@ts-ignore
   const id = user.id;



   
   const {data : details ,isLoading: load1 } = useQuery({
    queryKey: ["developer",id],
    queryFn: async () => {
        const response = await axiosInstance.get(`/users/developer/${id}`)
        
        return response.data;
    },
});



const {data : general ,isLoading: load2} = useQuery({
    queryKey: ["general",id],
    queryFn: async () => {
        const response = await axiosInstance.get(`/users/${id}`)
        
        return response.data;
    },
    
});
const [selectedResume, setSelectedResume] = useState<String>();
const namePDF = id + '.pdf';
const Resume = "https://lfuugdxzrvljgtkzairs.supabase.co/storage/v1/object/public/resume/" + namePDF;
const handleResumeChange = (event:any) => {
    const file = event.target.files[0];
    const name = id + '.pdf';
  
    setSelectedResume(
      file ? URL.createObjectURL(file) : undefined
    );
  
    if (typeof file === 'object' && file !== null) {
      uploadResumeToSupabase(file, name);
    } else {
      message.error({
        content: 'Please try again with pdf extension',
      });
    }
  };

    const validationSchema = Yup.object({
        Name: Yup.string().required('Name is required'),
        currentPosition : Yup.string().required('Current position is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        github: Yup.string().required('github is required'),
        linkedin: Yup.string().required('linkedin is required'),
      
        coverLetter: Yup.string().required('Cover Letter is required'),
    });

    const initialValues = {
        Name: details?.name ||"",
        currentPosition:details?.currentPosition || "",
        email: general?.email ||"",
        github:details?.github ||"",
        linkedin: details?.linkedin ||"",
        resume: Resume,
        coverLetter:  "",
        
    };
    const {mutate: mutate1, isPending: isPending1  } = useMutation({
        mutationFn: async (data: any) => {
            const response = await axiosInstance.post(`/applications`, data);
            return response.data;
        },
        onSuccess(data, variables, context) {
            message.success({
                content: 'application created successfully',
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

    const onSubmit = (values: any) => {
        
        
        const data = {
            Name: values.Name,
currentPostition: values.currentPosition, // Change this line
email: values.email,
github: values.github,
linkedin: values.linkedin,
resume: Resume,
coverLetter: values.coverLetter,
profile : details?.profilePicture,
jobId: jobId.jobId,
developerId: details.id
        };
       
        try {
            mutate1(data);
        }
        catch (error) {
           message.error({
                content: 'Error creating application',
                duration: 3, // Display duration in seconds
                style: {
                  marginTop: '10vh', // Adjust vertical position
                },
                 });
        }
        
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
      
    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Apply To Job</h1>
            { load1 || load2 ? (
                <Loading/>
            ):(
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                             Name
                        </label>
                        <Field
                            type="text"
                            id="Name"
                            name="Name"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="Name" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                            Current Position
                        </label>
                        <Field
                            type="text"
                            id="currentPosition"
                            name="currentPosition"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="currentPosition" component="div" className="text-red-500 text-sm" />
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

                    <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-600">
                        linkedin
                        </label>
                        <Field
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="linkedin" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="github" className="block text-sm font-medium text-gray-600">
                        github
                        </label>
                        <Field
                            type="text"
                            id="github"
                            name="github"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                        <ErrorMessage name="github" component="div" className="text-red-500 text-sm" />
                    </div>
                    {/*upload resume */}
                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-600">
                            Resume
                        </label>
                        <div className='flex flex-warp items-center gap-4'>
                        <AntButton
  style={{ color: 'black', backgroundColor: 'white', marginLeft: '10px' }}
  icon={<DownloadOutlined />}
  href={Resume} target="_blank" download
  
>
  Current Resume
</AntButton>
<Button
      style={{ color: 'white', backgroundColor: '#161c24' }}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<IoCloudUploadOutline  />}
      onChange={handleResumeChange}
    >
      Upload Resume
      <VisuallyHiddenInput type="file"  accept=".pdf"/>
    </Button>
    </div>                  </div>
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
                       

                        <AntButton
 className="bg-blue-500 text-white  rounded-md hover:bg-blue-600"
  icon={<RiSendPlaneFill className="inline-block mr-2" />}
  htmlType="submit"
  size="large"
loading={isPending1}    
  
>
  Apply Now
</AntButton>
                    </div>
                </Form>
            </Formik>
            )}
        </div>
    );
};


export default ApplyJob;
