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
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string().required("Zipcode is required"),
    fullAddress: Yup.string().required("Address is required"),
});
const validationSchema3 = Yup.object({
    profilePicture: Yup.mixed()
        .required("Profile Picture is required")

    ,
    about: Yup.string().required("Current Position is required"),


});
const validationSchema4 = Yup.object({

    linkedin: Yup.string().required("Linkedin is required"),
    website: Yup.string().required("Website is required"),
});




const SignupCompany = () => {

    return (
        <div
            className=" text-white h-[100vh] flex justify-center items-center bg-cover bg-gradient-to-b from-indigo-400 to-[#e9f8ff]">

            <div className="bg-white rounded-lg shadow p-6 ">
                <MultiStepForm

                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        phone: "",
                        city: "",
                        zipcode: "",
                        fullAddress: "",
                        about: "",
                        profilePicture: null,
                        website: "",
                        linkedin: "",
                        github: "",


                    }}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2))
                    }}

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
                        <PhoneInputField label="Phone" name="phone" country="tn"/>
                        <InputField label="city" name="city"/>
                        <InputField label="zipcode" name="zipcode"/>
                        <InputField label="fullAddress" name="fullAddress"/>

                    </FormStep>
                    <FormStep
                        stepName="Profile"
                        onSubmit={() => console.log("step 3 submit ")}
                        validationSchema={validationSchema3}
                    >

                        <InputField label="About" name="about"/>
                        <div className="flex my-8">
                            <h3 className="text-black">Your Logo</h3>
                            <FileInputField label="logo" name="profilePicture"/>
                        </div>


                    </FormStep>
                    <FormStep
                        stepName="socials"
                        onSubmit={() => console.log("step 4 submit ")}
                        validationSchema={validationSchema4}
                    >

                        <InputField label="Website Link" name="website"/>
                        <InputField label="LinkedIn Link" name="linkedin"/>


                    </FormStep>



                </MultiStepForm>

            </div>

        </div>
    );
};

export default SignupCompany;