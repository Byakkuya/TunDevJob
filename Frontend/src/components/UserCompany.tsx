import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios';
import { deleteImageFromSupabase, getImageFromSupabase, uploadimageToSupabase } from '../lib/supabase';
import { useAppDispatch, useAppSelector } from '../shared/store/hook';
import { Typography, message } from 'antd';
import { FaUser, FaPhone, FaMapMarkerAlt, FaFileImage, FaBuilding, FaAlignJustify, FaLinkedin, FaGlobe } from 'react-icons/fa';
import Avatar from '@mui/material/Avatar';
import PhoneInput from "antd-phone-input";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../shared/store/reducers/auth';
import { compareSync } from "bcrypt-ts";
import { IoSaveOutline } from "react-icons/io5";
import LoadingButton from '@mui/lab/LoadingButton';
import { IoCloudUploadOutline } from "react-icons/io5";
import { styled } from '@mui/material/styles';
import { MdDeleteOutline } from 'react-icons/md';
import { MdWork } from "react-icons/md";
import ReviewsList from './ReviewsList';
import { Modal } from '@material-ui/core';
import UploadJob from '../pages/UploadJob';



function UserCompany({ userId }: { userId: string }) {
    // get user informations
   const { user } = useAppSelector((state) => state.auth.auth);
   //@ts-ignore
   const id = user.id;
   //@ts-ignore
   const role = user.role;
   const dispatch = useAppDispatch();
    const navigate = useNavigate();
   
   const {data : details } = useQuery({
       queryKey: ["UserCompany",id],
       queryFn: async () => {
           const response = await axiosInstance.get(`/users/company/${id}`)
           
           return response.data;
       },
   });
   const { data: companyData, } = useQuery({
    queryKey: ["company", details?.id],
    queryFn: async () => {
        const response = await axiosInstance.get(`/companies/${details?.id}`);
        return response.data;
    },
});

const reviewsData = companyData?.testimonials ?? [];
const jobs = companyData?.jobs ?? [];
  
   const {data : general } = useQuery({
    queryKey: ["general",id],
    queryFn: async () => {
        const response = await axiosInstance.get(`/users/${id}`)
        
        return response.data;
    },
    
});


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




   const [selectedFile, setSelectedFile] = useState<String>();
   const name = userId + '.jpg';
   const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    setSelectedFile(
      file ? URL.createObjectURL(file) : undefined
    );
     
    if (typeof file === 'object' && file !== null) {
      uploadimageToSupabase(file, name);
    } else {
      // Handle the case where file is not an object or is null
      message.error({
        content: 'Please try again with jpg extension',
        duration: 3, // Display duration in seconds
        style: {
          marginTop: '10vh', // Adjust vertical position
        },
      });
    }
  };

const ImgUrl = "https://lfuugdxzrvljgtkzairs.supabase.co/storage/v1/object/public/pic/" + name;


const [generaldata, setGeneraldata] = useState({
  email: '',
  password: '',
  newpassword: '',
});
const [formData, setFormData] = useState({
    name: '',
    number: '',
    city: '',
    fullAddress: '',
    zipcode: '',
    website: '',
    linkedin: '',
    description: '',
    logo: ImgUrl,
  });
  
  useEffect(() => {
    if (details) {
      setFormData({
        name: details.name || '',
        number: details.number || '',
        city: details.city || '',
        fullAddress: details.fullAddress || '',
        zipcode: details.zipcode || '',
        website: details.website || '',
        linkedin: details.linkedin || '',
        description: details.description || '',
        logo: ImgUrl,
      });
      
    }
    if (general) {
        setGeneraldata({
            email: general.email ||'',
            password: '',
            newpassword: '',
        });
      }
  }, [ImgUrl, details, general]);

const all = {
    ...formData,
    ...generaldata,
}


const {mutate: mutate1, isPending: isPending1  } = useMutation({
    mutationFn: async (data: any) => {
        const response = await axiosInstance.put(`/users/company/${id}`, data);
        return response.data;
    },
    onSuccess(data, variables, context) {
        message.success({
            content: 'Company updated successfully',
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
const {mutate: mutate2, isPending: isPending2  } = useMutation({
    mutationFn: async (data: any) => {
        const response = await axiosInstance.put(`/users/${id}`, data);
        return response.data;
    },
    onSuccess(data, variables, context) {
      dispatch(logout());
        navigate('/login');
        message.success({
            content: 'User updated successfully please login again',
            duration: 6, // Display duration in seconds
            style: {
              marginTop: '10vh', // Adjust vertical position
            },
          });
          
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


const handleSubmit1 = async (e: any) => {
    try {
    mutate1(formData);
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
const handleSubmit2 = async (e: any) => {
  

  const { email, password, newpassword } = generaldata;

  const data = {
    email,
    password: newpassword,
  };
  

  const matched = compareSync(password, general.password);

  if (!password.trim() || !newpassword.trim()) {
    message.warning({
      content: "Current and new passwords are required",
      duration: 3,
      style: {
        marginTop: '10vh',
      },
    });
  } else if (!matched) {
    message.warning({
      content: "Current password is incorrect",
      duration: 3,
      style: {
        marginTop: '10vh',
      },
    });
  } else {
    try {
      await mutate2(data);
    } catch (error) {
      message.error({
        content: "Something went wrong please try again",
        duration: 3,
        style: {
          marginTop: '10vh',
        },
      });
    }
  }
}
 const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    }
    const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
  
      if (name === 'password' && value.trim() === '') {
          alert('Password is required');
          return;
      }
  
      setGeneraldata({
        ...generaldata,
        [name]: value,
      });
  }


  {/*upload button*/}
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
      setOpenModal(true);
  };
  const handleCloseModal = () => {
      setOpenModal(false);
  }

  //deleter account
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      dispatch(logout());
      navigate('/login');
      deleteImageFromSupabase(name);
      message.success({
        content: 'Your account has been deleted successfully',
        duration: 6,
        style: {
          marginTop: '10vh',
        },
      });
    } catch (error) {
      message.error({
        content: 'Something went wrong please try again',
        duration: 3,
        style: {
          marginTop: '10vh',
        },
      });
    }
  };
 return (

<div>
  <div className="flex flex-col gap-8 mt-20 justify-center items-start min-h-screen ">

  {/* Details*/ }
  <div className="bg-white py-8 px-6 ">
  <Typography.Title  level={1} style={{ margin: 0 }}>
        Company Details
      </Typography.Title>
      <p className="text-gray-500 mb-4" style={{ fontSize: '1.2em', color: '#757575' }}>
    Update your company details
</p>
    <form  className="space-y-4 mt-6">
      <div className="flex justify-center items-center space-x-8 gap-2">
      <div className="flex flex-col items-center p-4 gap">
  
  <label htmlFor="fileInput" className="font-semibold text-lg mb-2 hover:text-blue-500 cursor-pointer">
    <FaFileImage className="mr-2 inline" />
    Change Logo:
  </label>
  <Avatar
    alt={details?.name || 'Company Logo'}
    src={selectedFile || details?.logo}
    sx={{ width: 200, height: 200, marginBottom: '1rem' }}
  />

<Button
      style={{ color: 'white', backgroundColor: '#161c24' }}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<IoCloudUploadOutline  />}
      onChange={handleFileChange}
    >
      Upload logo
      <VisuallyHiddenInput type="file"  accept=".jpg"/>
    </Button>

</div>
        <div className=" flex flex-wrap gap-3 ">
          <div className="flex flex-col">
            <label className="font-bold mb-2">Company Name:</label>
            <input
              type="text"
              name="name"
              defaultValue={formData.name}
              onChange={handleInputChange1}  
              
              className="py-2 px-3 border rounded-md"
            />
          </div>
          
          {/* <div className="flex flex-col">
            <label className="font-bold mb-2">Phone Number:</label>
            <PhoneInput
                  enableSearch
                  value={formData.number}
                 
                />
          </div> */}
           <div className="flex flex-col">
            <label className="font-bold mb-2">Phone Number:</label>
            <input
              type="text"
              name="number"
              defaultValue={formData.number}
              onChange={handleInputChange1}  
              
              className="py-2 px-3 border rounded-md"
            />
          </div>        

          <div className="flex flex-col">
            <label className="font-bold mb-2">City:</label>
            <input
              type="text"
              name="city"
              defaultValue={formData.city}
              onChange={handleInputChange1}
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">fullAddress:</label>
            <input
              type="text"
              name="fullAddress"
              defaultValue={formData.fullAddress}
              onChange={handleInputChange1}
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">zipcode:</label>
            <input
              type="text"
              name="zipcode"
              defaultValue={formData.zipcode}
              onChange={handleInputChange1}
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Website:</label>
            <input
              type="text"
              name="website"
              defaultValue={formData.website}
              onChange={handleInputChange1}
              className="py-2 px-3 border rounded-md"
            />
          </div><div className="flex flex-col">
            <label className="font-bold mb-2">LinkedIn:</label>
            <input
              type="text"
              name="linkedin"
              defaultValue={formData.linkedin}
              onChange={handleInputChange1}
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col w-full">
          <label className="font-bold mb-2">Description:</label>
          <textarea
            name="description"
            defaultValue={formData.description}
            onChange={handleInputChange1}
            className="py-2 px-3 border rounded-md"
          ></textarea>
          </div>          
        </div>
        
      </div>
      
         <LoadingButton
        style={{ marginLeft: '40px', marginTop: '40px'}}
        size="large"
        onClick={handleSubmit1}
        loading={isPending1}
        loadingPosition="start"
        startIcon={<IoSaveOutline  />}
        variant="contained"
        >
        Save
        </LoadingButton>  

        
      
    </form>
  </div>
  {/* General*/}
 <div className="bg-white py-8 px-6 flex flex-wrap space gap-96	">
  <div className='shrink'><Typography.Title  level={1} style={{ margin: 0 }}>
        General
      </Typography.Title>
      <p className="text-gray-500 mb-4" style={{ fontSize: '1.2em', color: '#757575' }}>
    Update your password
</p>
    <form  className="space-y-4 mt-6">
      <div className="flex justify-center items-center space-x-8">
        <div className=" flex flex-wrap gap-3 ">
          <div className="flex flex-col">
            <label className="font-bold mb-2">Email:</label>
            <input
              type="text"
              name="email"
              defaultValue={generaldata.email}
              readOnly
              
              className="py-2 px-3 border rounded-md"
            />
          </div>
          
         
           <div className="flex flex-col">
            <label className="font-bold mb-2">Current Password:</label>
            <input
              type="text"
              name="password"
                
                onChange={handleInputChange2}
                required
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">New Password:</label>
            <input
              type="text"
              name="newpassword"
                
                onChange={handleInputChange2}
                required
              className="py-2 px-3 border rounded-md"
            />
          </div>        

                
        </div>
        
      </div>

      <LoadingButton
        style={{ marginLeft: '40px', marginTop: '40px'}}
        size="large"
        onClick={handleSubmit2}
        loading={isPending2}
        loadingPosition="start"
        startIcon={<IoSaveOutline  />}
        variant="contained"
        >
        Save
        </LoadingButton>  
    </form>
    </div>
    <div className="flex justify-center items-center space-x-8">
    <Button className="mr-2"  variant="outlined" color="primary" startIcon={<MdWork  />} onClick={handleOpenModal}>Post A Job</Button>
    <Modal
                                open={openModal}
                                onClose={handleCloseModal}
                                aria-labelledby="modal-title"
                                aria-describedby="modal-description"
                                className="overflow-scroll"
                            >
                                <UploadJob />
                            </Modal>

      </div>
    <div className="flex justify-center items-center space-x-8">
    <Button className="mr-2"  variant="contained" color="error" startIcon={<MdDeleteOutline />} onClick={handleDelete}>delete your Acount </Button>
   
    </div>


  </div>
 
  
  </div>



<div className="bg-white py-8 px-6">
    <Typography.Title  level={1} style={{ margin: 0 }}>
        Reviews
      </Typography.Title>
      <p className="text-gray-500 mb-4" style={{ fontSize: '1.2em', color: '#757575' }}>
    Reviews from developers
</p>
<div >
  <div>
  {
  reviewsData && reviewsData.length > 0 ? (
    <ReviewsList reviews={reviewsData} />
    ) : (
      <Typography.Title style={{ textAlign: 'center', marginTop: '10vh' }}>There is no testimonials yet</Typography.Title>
      )
}
  </div>
</div>

</div>


<div className="bg-white py-8 px-6">
    <Typography.Title  level={1} style={{ margin: 0 }}>
        Your Jobs
      </Typography.Title>
      <p className="text-gray-500 mb-4" style={{ fontSize: '1.2em', color: '#757575' }}>
    Here are the jobs you posted
</p>
<div >
  <div>
{/*   {
  jobs && jobs.length > 0 ? (
    // lis of jobs
    ) : (
      <Typography.Title style={{ textAlign: 'center', marginTop: '10vh' }}>There is no Jobs yet</Typography.Title>
      )
} */}
  </div>
</div>

</div>


</div>



 )
}

export default UserCompany;


