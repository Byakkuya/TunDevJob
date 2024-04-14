import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { axiosInstance } from '../lib/axios';
import { message , Button } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { LogIn } from '../core/models/LogIn';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '../shared/store/hook';
import { login } from '../shared/store/reducers/auth';




const Login = () => {
   
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { mutate, isPending } = useMutation(
        {
          mutationFn: async ({ data }: { data: LogIn | any }) => {
            const response = await axiosInstance.post('auth/login', data);
            return response.data;
          },
          onSuccess(data, variables, context) {
            navigate('/Find-jobs');
            const decodedToken = jwtDecode(data.token);
            dispatch(login({user: decodedToken, token: data.token }));


            message.success({
              content: 'Login Successful',
              duration: 3, // Display duration in seconds
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
                content: error.response.data.error,
                duration: 3,
                style: {
                  marginTop: '10vh',
                },
              });
            } else {
              // Handle other server errors
              message.error({
                //@ts-ignore
                content: error.response ? error.response.data.error : 'Something went wrong. Please try again.',
                duration: 3,
                style: {
                  marginTop: '10vh',
                },
              });
            }
          },
        }
      );
      
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        try {
        mutate({data:formData});
    }
    catch (error) {
        message.error({
            content: "Something went wrong please try again",
            duration: 3, // Display duration in seconds
            style: {
                marginTop: '10vh', // Adjust vertical position
            },
        });
    };
    }

    return (
        <div className=" text-white h-[100vh] flex justify-center items-center bg-cover bg-gradient-to-t from-indigo-400 to-[#e9f8ff]">
            <div className="bg-slate-800 border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
                <h1 className="text-4xl text-white font-bold text-center">Login</h1>
                <form  >
                    <div className=" relative my-4">
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-indigo-50 focus:outline-none focus:ring-0 focus-text-white focus:border-indigo-100 peer" 
                            placeholder=""
                        />
                        <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-0">Your Email</label>
                        <BiUser className="absolute top-4 right-4"/>
                    </div>
                    <div className=" relative my-4">
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-indigo-50 focus:outline-none focus:ring-0 focus-text-white focus:border-indigo-100 peer" 
                            placeholder=""
                        />
                        <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-0">Password</label>
                        <AiOutlineUnlock className="absolute top-4 right-4"/>
                    </div>
                    <style>{`
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: #fff !important;
        border-radius: 0.25rem !important;
    }
`}</style>
                    <Button
  className="w-full mb-4 mt-6 text-white bg-indigo-400 hover:bg-indigo-500"
  type="primary"
  onClick={handleSubmit}
  style={{ borderRadius: '999px', fontSize: '18px' }}
    loading={isPending}
  
>
  Login
</Button>
                    <div>
                        <span>New Here? <Link to='/signup' className="text-indigo-400">Create an Account</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
