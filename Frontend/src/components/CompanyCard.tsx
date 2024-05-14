import React from "react";
import { Link } from "react-router-dom";
import { Company } from "../core/models/Company";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Avatar from '@material-ui/core/Avatar';

interface CompanyCardProps {
    cmp: {
        city: string;
        createdAt: string;
        description: string;
        fullAddress: string;
        id: number;
        linkedin: string;
        logo: string;
        name: string;
        number: string;
        userId: number;
        website: string;
        zipcode: string;
    };
}

const CompanyCard: React.FC<CompanyCardProps> = ({ cmp }) => {
    const { id, logo, name, city, description, website } = cmp || {};

    const {data} = useQuery({
        queryKey: ["company",id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/companies/${cmp.id}`)
            return response.data;
        },
    });
    //number of jobs posted by the company
    const jobs = data?.jobs;
    const numberOfJobs = jobs?.length;

    return (
<div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-white shadow-md rounded">
    <div className="flex items-center gap-4 w-full sm:w-3/4 md:w-2/4 ">
        <Link to={`/company-profile/${id}`}>
            <Avatar
                alt={name}
                src={logo}
                style={{ width: '100px', height: '100px' }} // Adjust the size here
            />
        </Link>
        <div className="flex flex-col">
            <Link
                to={`/company-profile/${id}`}
                className="text-lg font-semibold text-gray-600 truncate"
            >
                {name}
            </Link>
            <span className="text-sm text-blue-600">{website}</span>
        </div>
    </div>

    <div className="flex items-center w-full ssm:hidden md:flex md:w-1/4">
        <p className="text-sm text-blue-600">{city}</p>
    </div>

    <div className="flex flex-col items-center w-full sm:w-1/4">
        <p className="text-blue-600 font-semibold">{numberOfJobs || 0}</p>
        <span className="text-xs font-normal text-gray-600">Jobs Posted</span>
    </div>
</div>

    );
};

export default CompanyCard;
