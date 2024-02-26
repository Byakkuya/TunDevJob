import React from 'react';
import { useFormik } from 'formik';
import { Rating } from '@smastrom/react-rating';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

import { IoAddOutline } from 'react-icons/io5';

const AddingReview = () => {
    const initialValues = {
        comment: '',
        rating: 0,
    };

    const onSubmit = (values: any) => {
        // Handle form submission logic here
        console.log(values);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
            <Typography variant="h5" className="text-2xl font-bold mb-4">
                Add a Review
            </Typography>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-600">
                        Comment
                    </label>
                    <TextareaAutosize
                        id="comment"
                        name="comment"
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                        aria-label="comment"
                        rowsMin={3}
                        placeholder="Write your review here..."
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-600">
                        Rating
                    </label>
                    <Rating
                        value={formik.values.rating}
                        onChange={(value: any) => formik.setFieldValue('rating', value)}
                        style={{ maxWidth: 100 }}
                    />
                </div>

                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<IoAddOutline />}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Add Review
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddingReview;
