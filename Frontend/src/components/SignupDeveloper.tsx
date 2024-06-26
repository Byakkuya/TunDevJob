import React from "react";
import {Formik, useFormikContext} from "formik";
import { Button, TextField} from "@material-ui/core";
import * as Yup from "yup";
import InputField from "./InputField";
import MultiStepForm, {FormStep} from "./MultiStepForm";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import PhoneInputField from "./PhoneInputField";
import FileInputField from "./FileInputField";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SignUpDev } from "../core/models/SignUp";
import { axiosInstance } from "../lib/axios";
import { message } from "antd";



const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const validationSchema1 = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required")
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),

        password: Yup
            .string()
            .matches(passwordRules, { message: "5 min ,1lower ,1Upper, 1 num" })
            .required("Required"),

        confirmPassword: Yup
            .string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Required"),



});

const validationSchema2 = Yup.object({
    number: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string().required("Zipcode is required"),
    fullAddress: Yup.string().required("Address is required"),
});
const validationSchema3 = Yup.object({
    
    currentPosition: Yup.string().required("Current Position is required"),
    linkedin: Yup.string().required("Linkedin is required")
    .matches(/^(www.linkedin.com\/)/, "Invalid linkedin link it must be like www.linkedin.com/yourprofile"),
    github: Yup.string().required("Github is required")
    .matches(/^(www.github.com\/)/, "Invalid github link it must be like www.github.com/yourprofile")
});


  
    




const SignupDeveloper = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation(
        {
          mutationFn: async ({ data }: { data: SignUpDev | any }) => {
            const response = await axiosInstance.post('auth/singupdeveloper', data);
            return response.data;
          },
          onSuccess(data, variables, context) {
            navigate('/login');
            


            message.success({
              content: 'signup Successful please login and complete your profile', 
              duration: 6, // Display duration in seconds
              style: {
                marginTop: '10vh', // Adjust vertical position
              },
            });
          },
          onError(error, variables, context) {
            //@ts-ignore
            if (error.response && error.response.status === 401) {
              // Handle unauthorized access error
              message.error({
                //@ts-ignore
                content: `erro : ${error.response.data.error} please try again`,
                duration: 6,
                style: {
                  marginTop: '10vh',
                },
              });
            } else {
              // Handle other server errors
              message.error({
                //@ts-ignore
                content: error.response ? error.response.data.error : 'Something went wrong. Please try again.',
                duration: 6,
                style: {
                  marginTop: '10vh',
                },
              });
            }
          },
        }
      );

    return (
        <div
            className=" text-white h-[100vh] flex justify-center items-center bg-cover bg-gradient-to-b from-indigo-400 to-[#e9f8ff]">

<div className="bg-white rounded-lg shadow p-6 w-[500px] h-[450px]">
                <MultiStepForm
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        
                        city: "",
                        zipcode: "",
                        fullAddress: "",
                        currentPosition: "",
                        linkedin: "",
                        github: "",
                        number: "", 
                    }}
                    
                    onSubmit={ async (values) => {
                        console.log(values);
                        try {
                            mutate({data: values});
                        }
                        catch (error) {
                            message.error({
                                content: "Something went wrong please try again",
                                duration: 3, // Display duration in seconds
                                style: {
                                    marginTop: '10vh', // Adjust vertical position
                                },
                            });
                        
                    }}
                    }

                >
                    <FormStep
                        stepName="Authentification"
                        onSubmit={() => console.log("step 1 submit ")}
                        validationSchema={validationSchema1}
                    >
                        <InputField name="name" label="name"/>
                        <InputField label="email" name="email"/>
                        <InputField label="password" name="password"/>
                        <InputField label="confirmPassword" name="confirmPassword"/>
                    </FormStep>

                    <FormStep
                        stepName="Location"
                        onSubmit={() => console.log("step 2 submit ")}
                        validationSchema={validationSchema2}
                    >
                        <PhoneInputField label="Phone" name="number" country="tn"/>
                        <InputField label="city" name="city"/>
                        <InputField label="zipcode" name="zipcode"/>
                        <InputField label="fullAddress" name="fullAddress"/>

                    </FormStep>
                    <FormStep
                        stepName="Profile"
                        onSubmit={() => console.log("step 3 submit ")}
                        validationSchema={validationSchema3}
                    >

                        <InputField label="Current Position" name="currentPosition"/>
                        <InputField label="Github Link" name="github"/>
                        <InputField label="LinkedIn Link" name="linkedin"/>


                    </FormStep>
                    



                </MultiStepForm>

            </div>

        </div>
    );
};

export default SignupDeveloper;