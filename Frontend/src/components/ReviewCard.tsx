import React, { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useAppSelector } from '../shared/store/hook';
import { Button, Modal } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import AddingReview from './AddingReview';
import AdjustingReview from './AdjustingReview';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { message } from 'antd';
import Loading from './Loading';


import { Avatar, Card, CardContent, Typography, Box } from '@material-ui/core';
import ReportModal from './ReportModal';



interface ReviewCardProps {
    id: number;
    developerName: string;
    photo: string;
    rating: number;
    comment: string;
    userId: number;
    companyId: number; 


}

const ReviewCard: React.FC<ReviewCardProps> = ({ id, developerName, photo, rating, comment,userId,companyId }) => {
    const [localRating, setLocalRating] = useState(rating);
    const {user} = useAppSelector((state) => state.auth.auth);

    const IdComingFromTheUser = (user as { id?: number })?.id;
    const adjustable = IdComingFromTheUser === userId;


    
    
    const {data : comp } = useQuery({
        queryKey: ["UserCompany",IdComingFromTheUser],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/company/${IdComingFromTheUser}`)
            
            return response.data;
        },
    });
    const reportable = comp?.id === companyId;
    


    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpenModal2 = () => {
        setOpenModal(true);
        console.log("reporting");
    };

    const handleCloseModal2 = () => {
        setOpenModal(false);
    };

    // request to delete the review
    const {mutate, isPending} = useMutation({
        mutationFn: async () => {
            // request to delete the review
            const response = await axiosInstance.delete(`/testimonials/${id}`,);
            return response.data;
        },
        onSuccess(data, variables, context) {
            message.success('Review deleted successfully');
            // refresh the page
            window.location.reload();
        },
        onError(error, variables, context) {
            message.error('Error deleting review');
        }
        
    });
    
// get user form the userId
  
    const {data : details, isLoading: load1 } = useQuery({
        queryKey: ["UserCompany",userId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/developer/${userId}`);
            
            return response.data;
        },
    });

    if (load1) {
        return <Loading />;
    } 

 
      

    return (
        <div >
            <Box display="flex" alignItems="center" mb={2}>

                <Avatar alt={details?.name} src={details?.profilePicture} className="mr-4" />
                <Box>
                    <Typography variant="h6" component="h3">{details?.name}</Typography>
                    <Typography color="textSecondary">{comment}</Typography>
                </Box>
            </Box>
            <Rating style={{maxWidth: 100}} value={localRating} readOnly={true}/>
            {adjustable && (
        <div className="flex justify-end mt-2 gap-2">
            <Button className="mr-2"  variant="outlined" color="success" startIcon={<HiMiniAdjustmentsHorizontal /> } onClick={handleOpenModal}>Modify</Button>
            <Button className="mr-2"  variant="outlined" color="error" startIcon={<MdDeleteOutline />}
            
            
            onClick={() => {
                if (window.confirm('Are you sure you want to delete this review?')) {
                    mutate();
                }
            }
            }
            >Delete</Button>
            <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <AdjustingReview
                    id={id}
                    developerName={developerName}
                    photo={photo}
                    rating={rating}
                    comment={comment}
                    userId={userId}
                    onCloseModal={handleCloseModal}/>
                </Modal>
        </div>
        
    )}
    {reportable && (
    <div className="flex justify-end mt-2 gap-2">
        <Button 
            className="mr-2"  
            variant="outlined" 
            color="error" 
            startIcon={<MdDeleteOutline />}
            onClick={() => {
                handleOpenModal2();
    
            }}
        >
            Report
        </Button>
        <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <ReportModal id={id} companyId={companyId} />
                </Modal>
    </div>
)}
        </div>
    );
};

export default ReviewCard;
