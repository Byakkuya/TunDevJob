import React, { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useAppSelector } from '../shared/store/hook';
import { Button, Modal } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import AddingReview from './AddingReview';
import AdjustingReview from './AdjustingReview';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { message } from 'antd';


interface ReviewCardProps {
    id: number;
    developerName: string;
    photo: string;
    rating: number;
    comment: string;
    userId: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ id, developerName, photo, rating, comment,userId }) => {
    const [localRating, setLocalRating] = useState(rating);
    const {user} = useAppSelector((state) => state.auth.auth);
    const IdComingFromTheUser = (user as { id?: number })?.id;
    const adjustable = IdComingFromTheUser === userId;
 


    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
console.log(id)
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
    

        



    return (
        <div >
            <div className="flex items-center mb-2">
                <img src={photo} alt={developerName} className="w-12 h-12 rounded-full mr-4"/>
                <div>
                    <h3 className="text-xl font-semibold">{developerName}</h3>
                    <p className="text-gray-600">{comment}</p>
                </div>
            </div>
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
        </div>
    );
};

export default ReviewCard;
