import React from "react";
import { Link } from "react-router-dom";
import { Company } from "../core/models/Company";

interface CompanyCardProps {
    cmp: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ cmp }) => {
    const { _id, profileUrl, name, email, location, jobPosts } = cmp || {};

    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded">
            <div className="flex items-center gap-4 w-3/4 md:w-2/4">
                <Link to={`/company-profile/${_id}`}>
                    <img
                        src={profileUrl}
                        alt={name}
                        className="w-12 h-12 rounded"
                    />
                </Link>
                <div className="flex flex-col">
                    <Link
                        to={`/company-profile/${_id}`}
                        className="text-lg font-semibold text-gray-600 truncate"
                    >
                        {name}
                    </Link>
                    <span className="text-sm text-blue-600">{email}</span>
                </div>
            </div>

            <div className="hidden w-1/4 md:flex items-center">
                <p className="text-base text-start">{location}</p>
            </div>

            <div className="flex flex-col items-center w-1/4">
                <p className="text-blue-600 font-semibold">{jobPosts?.length || 0}</p>
                <span className="text-xs font-normal text-gray-600">Jobs Posted</span>
            </div>
        </div>

    );
};

export default CompanyCard;
