/* eslint-disable react-hooks/rules-of-hooks */
import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Job } from "../core/models/Job";
import { axiosInstance } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { FaBusinessTime } from "react-icons/fa";
import { Button as AntButton, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Modal as antdmodal } from 'antd';
import { useAppSelector } from "../shared/store/hook";

interface JobCardProps {
    job: Job;
    company : any
}

const JobCard: React.FC<JobCardProps> = ({ job, company }) => {

  const { user } = useAppSelector((state) => state.auth.auth);
  //@ts-ignore
  const id = user.id;


const {data: companyDetails} = useQuery({
    queryKey: ["company", company],
    queryFn: async () => {
        if (company !== undefined) {
            const response = await axiosInstance.get(`/companies/${company}`);
            return response.data;
        }
        return null;
    },
    
});


const {data : details } = useQuery({
  queryKey: ["UserCompany",id],
  queryFn: async () => {
      const response = await axiosInstance.get(`/users/company/${id}`)
      
      return response.data;
  },
});



const deleteable = details?.id === company;


const navigate = useNavigate();
const handleDelete = () => {
    antdmodal.confirm({
      title: 'Are you sure you want to delete the Job?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axiosInstance.delete(`/jobs/${job?.id}`);
          
          navigate('/Find-jobs');
        
          
          message.success({
            content: 'Your Job has been deleted successfully',
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
    return (
        <Link to={`/job-detail/${job?.id}`}>
<div className='w-full md:w-[20rem] 2xl:w-[24rem] h-[20rem] md:h-[22rem] bg-slate-100 flex flex-col justify-between shadow-lg rounded-md px-3 py-5 transition duration-300 transform hover:scale-105 '>
    <div className='flex gap-3'>
        <img
            //@ts-ignore
            src={companyDetails?.logo|| 'default-image-url'}
            alt={`Job title: ${
                //@ts-ignore
                job?.title || 'No job title available'}`}
            className='w-20 h-20 object-cover rounded-full'
        />

        <div className='flex flex-col'>
            <p className='text-xl font-semibold truncate' title={
                 //@ts-ignore
                job?.title || 'No job title available'}>
                {
                 //@ts-ignore
                job?.title || 'No job title available'}
            </p>
            <div className='flex gap-2 items-center text-gray-500'>
                <GoLocation className='text-slate-900 text-sm' />
                {job?.location || 'No location available'}
            </div>
        </div>
    </div>

    <div className='py-3'>
        <p className='text-sm text-gray-700'>
            {job?.description?.slice(0, 150) + "..." || 'No description available'}
        </p>
    </div>

    <div className='flex items-center justify-between'>
    <div >
   
        <p className='bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-2 rounded font-semibold text-sm flex flex-wrap '>
        
            {job?.jobType || 'No job type available'}
        </p>
    </div>
    {/* delete button */}
   {!deleteable ? null: (
    <AntButton size="small" type="primary" danger icon={<DeleteOutlined />}  onClick={handleDelete}>
  Delete
</AntButton> )} 
    
        <span className='text-gray-500 text-sm'>
            {
            //@ts-ignore
            job?.createdAt ? moment(job?.createdAt).fromNow() : 'No date available'}
        </span>
    </div>
</div>
        </Link>
    );
};

export default JobCard;
