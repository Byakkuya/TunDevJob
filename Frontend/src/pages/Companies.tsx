import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import CompanyCard from "../components/CompanyCard";
import Loading from "../components/Loading";
import ListBox from "../components/ListBox";
import { useAppSelector } from "../shared/store/hook";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import CircularProgress from '@mui/material/CircularProgress';

const Companies = () => {
    const { user } = useAppSelector((state) => state.auth.auth);
    //@ts-ignore
    const Role = user?.role;
    const isDeveloper = Role === 'DEVELOPER';
    const isCompany = Role === 'COMPANY';

    const [sort, setSort] = useState("Newest");
    const { data: companies, isLoading } = useQuery({
        queryKey: ["companies"],
        queryFn: async () => {
            const response = await axiosInstance.get("/companies");
            return response.data;
        },

    });
    
    //number of companies available
    const numberOfCompanies = companies?.length;

    return (
        <div className='mt-10 container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 md:px-0 py-6 w-full '>
            <div className='flex items-center justify-between mb-4'>
                <p className='text-sm md:text-base'>
                    Showing: <span className='font-semibold'> {numberOfCompanies}</span> Companies Available
                </p>

                <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
                    <p className='text-sm md:text-base'>Sort By:</p>
                    <ListBox sort={sort} setSort={setSort} />
                </div>
            </div>

            <div className='w-full flex flex-col gap-6'>
                {isLoading ? (
                    <Loading />
                ) : (
                    companies.map((cmp: any, index: any) => (
                        <Link to={`/Company-profile/${cmp.id}`} key={index}> {/* Wrap CompanyCard with Link */}
                            <CompanyCard cmp={cmp} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Companies;
