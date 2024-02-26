import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";
import { Job } from "../core/models/Job";

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <Link to={`/job-detail/${job?.id}`}>
            <div className='w-full md:w-[16rem] 2xl:w-[20rem] h-[16rem]  md:h-[18rem] bg-slate-100 flex flex-col justify-between shadow-lg rounded-md px-3 py-5 transition duration-300 transform hover:scale-105 '>
                <div className='flex gap-3'>
                    <img
                        src={job?.company?.profileUrl}
                        alt={job?.company?.name}
                        className='w-14 h-14 object-cover rounded-full'
                    />

                    <div className='flex flex-col'>
                        <p className='text-lg font-semibold truncate'>{job?.jobTitle}</p>
                        <div className='flex gap-2 items-center text-gray-500'>
                            <GoLocation className='text-slate-900 text-sm' />
                            {job?.location}
                        </div>
                    </div>
                </div>

                <div className='py-3'>
                    <p className='text-sm text-gray-700'>
                        {job?.detail[0]?.description?.slice(0, 150) + "..."}
                    </p>
                </div>

                <div className='flex items-center justify-between'>
                    <p className='bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-2 rounded font-semibold text-sm'>
                        {job?.jobType}
                    </p>
                    <span className='text-gray-500 text-sm'>
            {moment(job?.created_at).fromNow()}
          </span>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;
