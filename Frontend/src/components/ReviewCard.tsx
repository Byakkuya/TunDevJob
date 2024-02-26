import React, { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

interface ReviewCardProps {
    id: number;
    name: string;
    photo: string;
    rating: number;
    comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ id, name, photo, rating, comment }) => {
    const [localRating, setLocalRating] = useState(rating);

    return (
        <div >
            <div className="flex items-center mb-2">
                <img src={photo} alt={name} className="w-12 h-12 rounded-full mr-4"/>
                <div>
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <p className="text-gray-600">{comment}</p>
                </div>
            </div>
            <Rating style={{maxWidth: 100}} value={localRating} readOnly={true}/>
        </div>
    );
};

export default ReviewCard;
