import React, { useState } from 'react';
import {  TextField } from '@material-ui/core';
import { Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { MdOutlineReportOff } from "react-icons/md";
import { Button } from 'antd';

const { Title } = Typography;

type ReportModalProps = {
    id: number;
    companyId: number;
};

const ReportModal: React.FC<ReportModalProps> = ({ id, companyId }) => {
    const [report, setReport] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReport(event.target.value);
    };

 
    const data = {
        testimonialId: id,
        companyId,
        reason: report, // Corrected from 'reson' to 'reason'
    };
    const {mutate, isPending  } = useMutation({
        mutationFn: async (data: any) => {
            const response = await axiosInstance.post(`/reports`, data);
            return response.data;
        },
        onSuccess(data, variables, context) {
            message.success({
                content: 'Report submitted successfully',
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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        try {
            mutate(data);
        }
        catch (error) {
            console.error('Error submitting report:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
            <Title level={2} className="text-center mb-4">Report Form</Title>
            <form className="space-y-4" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField 
                    id="outlined-basic" 
                    label="report" 
                    variant="outlined" 
                    className="w-full"
                    value={report}
                    onChange={handleChange}
                />
<Button 
    type="primary" 
    className="w-full py-2 text-white bg-blue-500 hover:bg-blue-700 rounded"
    icon={<MdOutlineReportOff />}
    htmlType="submit"
    danger
    
    loading={isPending}
>
    Report
</Button>
            </form>
        </div>
    );
};

export default ReportModal;