import React from 'react';
import { useFormik } from 'formik';
import { Rating } from '@smastrom/react-rating';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

import { IoAddOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../shared/store/hook';
import { message } from 'antd';

const AddingReview = () => {

    const queryClient = useQueryClient();
    //@ts-ignore
    const {user} = useAppSelector((state) => state.auth.auth);

    const initialValues = {
        text: '',
        rating: 0,
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    

    // get the id of the company from the URL
    const params = useParams<{ id?: string }>();
    const companyId = parseInt(params.id || '0');
    const token = localStorage.getItem('accessToken');
    

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ data }: { data: any }) => {
            const response = await axiosInstance.post('/testimonials', data);
            return response.data;
        },
        onSuccess(data, variables, context) {
            message.success({
                content: 'Review Added Successfully',
                duration: 3,
                style: {
                    marginTop: '10vh',
                },
            });
            // reload the page
            window.location.reload();
            queryClient.invalidateQueries({ queryKey: ['testimonials'] });
        },
        onError(error, variables, context) {
            message.error({
                //@ts-ignore
                content: error.response.data.error || 'Something went wrong. Please try again.',
                duration: 3,
                style: {
                    marginTop: '10vh',
                },
            });
        },
    });

    const onSubmit = async (values: any) => {
        const requestData = {
            companyId,
            text: values.text,
            rating: values.rating,
        };
        mutate({ data: requestData });
    };

    const validate = (values: any) => {
        const errors: any = {};
        if (!values.text) {
            errors.text = 'Required';
        }
        if (!values.rating) {
            errors.rating = 'Rating is required';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate, // Add validate function here
    });

    const {data : any, isLoading} = useQuery({
        queryKey: ["testimonials"],
        queryFn: async () => {
            const response = await axiosInstance.post('/testimonials');
            return response.data;
        },
    
    })
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
                        id="text"
                        name="text"
                        onChange={formik.handleChange}
                        value={formik.values.text}
                        aria-label="comment"
                        rowsMin={3}
                        placeholder="Write your review here..."
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                    {formik.errors.text ? <div className="text-red-500">{formik.errors.text}</div> : null}
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
                    {formik.errors.rating ? <div className="text-red-500">{formik.errors.rating}</div> : null}
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
