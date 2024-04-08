import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../lib/axios';
import { deleteImageFromSupabase, deleteResumeFromSupabase, getImageFromSupabase, uploadResumeToSupabase, uploadimageToSupabase } from '../lib/supabase';
import { useAppDispatch, useAppSelector } from '../shared/store/hook';
import { Typography, message } from 'antd';
import { FaUser, FaPhone, FaMapMarkerAlt, FaFileImage, FaBuilding, FaAlignJustify, FaLinkedin, FaGlobe } from 'react-icons/fa';
import Avatar from '@mui/material/Avatar';
import PhoneInput from "antd-phone-input";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../shared/store/reducers/auth';
import { compareSync } from "bcrypt-ts";
import { IoDocumentTextOutline, IoSaveOutline } from "react-icons/io5";
import LoadingButton from '@mui/lab/LoadingButton';
import { IoCloudUploadOutline } from "react-icons/io5";
import { styled } from '@mui/material/styles';
import { MdDeleteOutline } from 'react-icons/md';
import Loading from './Loading';
import { Modal } from 'antd';
import { Button as AntButton } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import { hashSync } from 'bcrypt-ts';




function UserDeveloper({ userId }: { userId: string }) {

 


    // get user informations
   const { user } = useAppSelector((state) => state.auth.auth);
   //@ts-ignore
   const id = user.id;
   //@ts-ignore
   const role = user.role;
   const dispatch = useAppDispatch();
    const navigate = useNavigate();
   
   const {data : details, isLoading: load1 } = useQuery({
       queryKey: ["UserCompany",id],
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


const namePDF = userId + '.pdf';
const nameJPG = userId + '.jpg';
   
   const [selectedProfilePic, setSelectedProfilePic] = useState<String>();
const [selectedResume, setSelectedResume] = useState<String>();

const handleProfilePicChange = (event:any) => {
  const file = event.target.files[0];
  const name = userId + '.jpg';

  setSelectedProfilePic(
    file ? URL.createObjectURL(file) : undefined
  );

  if (typeof file === 'object' && file !== null) {
    uploadimageToSupabase(file, name);
  } else {
    message.error({
      content: 'Please try again with jpg extension',
    });
  }
};

const handleResumeChange = (event:any) => {
  const file = event.target.files[0];
  const name = userId + '.pdf';

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
const ImgUrl = "https://lfuugdxzrvljgtkzairs.supabase.co/storage/v1/object/public/pic/" + nameJPG;
const Resume = "https://lfuugdxzrvljgtkzairs.supabase.co/storage/v1/object/public/resume/" + namePDF;

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
    github: '',
    linkedin: '',
    currentPosition: '',
    profilePicture: ImgUrl,
    Resume: Resume,
  });
 
  
  useEffect(() => {
    if (details) {
      setFormData({
        name: details.name || '',
        number: details.number || '',
        city: details.city || '',
        fullAddress: details.fullAddress || '',
        zipcode: details.zipcode || '',
        github: details.github || '',
        linkedin: details.linkedin || '',
        currentPosition: details.currentPosition || '',
        profilePicture: ImgUrl,
        Resume: Resume,

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
        const response = await axiosInstance.put(`/users/developer/${id}`, data);
        return response.data;
    },
    onSuccess(data, variables, context) {
        message.success({
            content: 'developer updated successfully',
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
  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete your account?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axiosInstance.delete(`/users/${id}`);
          dispatch(logout());
          navigate('/login');
          deleteImageFromSupabase(nameJPG);
          deleteResumeFromSupabase(namePDF);
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
      },
    });
  };
  if (load1 || load2) {
    return <Loading />;
}

 return (
<div className="flex flex-col gap-8 mt-20 justify-center items-start min-h-screen ">


  {/* Details*/ }
  <div className="bg-white py-8 px-6 ">
  <Typography.Title  level={1} style={{ margin: 0 }}>
        Developer Details
      </Typography.Title>
      <p className="text-gray-500 mb-4" style={{ fontSize: '1.2em', color: '#757575' }}>
    Update your profile details
</p>
    <form  className="space-y-4">
      <div className="flex justify-center items-center space-x-8 gap-2">
      <div className="flex flex-col items-center p-4 gap">
  
  <label htmlFor="fileInput" className="font-semibold text-lg mb-2 hover:text-blue-500 cursor-pointer">
    <FaFileImage className="mr-2 inline" />
    Profile Picture
  </label>
  <Avatar
    alt={details?.name || 'Company Logo'}
    src={selectedProfilePic || details?.profilePicture }
    sx={{ width: 200, height: 200, marginBottom: '1rem' }}
  />

<Button
      style={{ color: 'white', backgroundColor: '#161c24' }}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<IoCloudUploadOutline  />}
      onChange={handleProfilePicChange}
    >
      Upload logo
      <VisuallyHiddenInput type="file"  accept=".jpg"/>
    </Button>

</div>
        <div className=" flex flex-wrap gap-3 ">
          <div className="flex flex-col">
            <label className="font-bold mb-2">your Name:</label>
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
            <label className="font-bold mb-2">Github:</label>
            <input
              type="text"
              name="github"
              defaultValue={formData.github}
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
          <label className="font-bold mb-2">Current Position:</label>
          <textarea
            name="currentPosition"
            defaultValue={formData.currentPosition}
            onChange={handleInputChange1}
            className="py-2 px-3 border rounded-md"
          ></textarea>
          </div>
          <label htmlFor="fileInput" className="font-semibold text-lg mb-2 hover:text-blue-500 cursor-pointer">
    <IoDocumentTextOutline  className="mr-2 inline" />
    Resume
  </label>
  <AntButton
  style={{ color: 'black', backgroundColor: 'white', marginLeft: '10px' }}
  icon={<DownloadOutlined />}
  href={Resume} target="_blank" download
  
>
  Download Resume
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
 <div className="bg-white py-8 px-6 ">
<Typography.Title  level={1} style={{ margin: 0 }}>
        General
      </Typography.Title>
      <p className="text-gray-500 mb-4" style={{ fontSize: '1.2em', color: '#757575' }}>
    Update your password
</p>
    <form  className="space-y-4">
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
  <div className="bg-white py-8 px-6 ">
  <AntButton className="mr-2" type="primary" danger icon={<DeleteOutlined />} onClick={handleDelete}>
  Delete Your Account
</AntButton>
  
  </div>
  
</div>



 )
}

export default UserDeveloper;


