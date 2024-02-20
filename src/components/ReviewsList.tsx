import React, { useState } from 'react';
import ReviewCard from './ReviewCard';

interface ReviewsListProps {
    reviews: {
        id: number;
        name: string;
        photo: string;
        rating: number;
        comment: string;
    }[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
    const reviewsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    const handleAddReview = (newReview: { name: string; photo: string; rating: number; comment: string }) => {
        // Add the new review to the existing list
        // (You may want to use a state management library like Redux for better state management)
        reviews.push({
            id: reviews.length + 1,
            ...newReview,
        });
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            {currentReviews.map((review) => (
                <div key={review.id} className="bg-slate-50 p-4 rounded-lg shadow-md ">
                    <ReviewCard
                        id={review.id}
                        name={review.name}
                        photo={review.photo}
                        rating={review.rating}
                        comment={review.comment}
                    />
                </div>
            ))}
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded-full ${
                            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReviewsList;
