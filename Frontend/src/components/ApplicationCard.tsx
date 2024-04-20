import React, { useState }  from 'react';
import { AiOutlineMail, AiOutlineGithub, AiOutlineLinkedin, AiOutlineFilePdf } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { Avatar } from 'antd';
import { Modal } from 'antd';
import { AiOutlineFileText } from 'react-icons/ai';

interface Developer {
  id: number;
  userId: number;
  name: string;
  number: string;
  city: string;
  // Add more fields as needed
}

interface Application {
  name: string;
  appliedAt: string;
  coverLetter: string;
  currentPostition: string;
  developer: Developer;
  developerId: number;
  email: string;
  github: string;
  id: number;
  jobId: number;
  linkedin: string;
  profile: string;
  resume: string;
}

interface Props {
  application: Application;
}


const ApplicationCard: React.FC<Props> = ({ application }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};
  return (
<div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl m-3">
     <div className="md:flex">
      <div className="md:flex-shrink-0">
      <Avatar className="object-cover md:w-48" src={application.profile} alt="Profile" size={192} />      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{application.name}</div>
        <p className="mt-2 text-gray-500">Applied at: {new Date(application.appliedAt).toLocaleDateString()}</p>
        
        <p className="mt-2 text-gray-500">Current Position: {application.currentPostition}</p>
        <div className="mt-2 text-gray-500 flex items-center">
          <AiOutlineMail className="h-5 w-5 text-gray-500 mr-2" />
          <a href={`mailto:${application.email}`}>{application.email}</a>
        </div>
        <div className="mt-2 text-gray-500 flex items-center">
          <AiOutlineGithub className="h-5 w-5 text-gray-500 mr-2" />
          <a href={application.github.startsWith('http://') || application.github.startsWith('https://') ? application.github : `https://${application.github}`} target="_blank" rel="noopener noreferrer">{application.github}</a>               </div>
        <div className="mt-2 text-gray-500 flex items-center">
          <AiOutlineLinkedin className="h-5 w-5 text-gray-500 mr-2" />
          <a href={application.linkedin.startsWith('http://') || application.linkedin.startsWith('https://') ? application.linkedin : `https://${application.linkedin}`} target="_blank" rel="noopener noreferrer">{application.linkedin}</a>        </div>
        <div className="mt-2 text-gray-500 flex items-center">
          <AiOutlineFilePdf className="h-5 w-5 text-gray-500 mr-2" />
          <a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
        </div>

        <div className="mt-2 text-gray-500 flex items-center">
  <AiOutlineFileText className="h-5 w-5 text-gray-500 mr-2" />
  <p className="cursor-pointer" onClick={showModal}>Cover Letter: Click to view</p>
</div>
        <Modal title="Cover Letter" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
  <p>{application.coverLetter}</p>
</Modal>
      </div>
    </div>
  </div>
  );
};

export default ApplicationCard;