import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from 'antd';
import { FiSearch } from 'react-icons/fi';
import CompanyCard from "../components/CompanyCard";
import Loading from "../components/Loading";
import { useAppSelector } from "../shared/store/hook";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from "@material-ui/lab/Pagination";

const Companies = () => {
    const { user } = useAppSelector((state) => state.auth.auth);
    //@ts-ignore
    const Role = user?.role;
    const isDeveloper = Role === 'DEVELOPER';
    const isCompany = Role === 'COMPANY';

    const { data: companies, isLoading } = useQuery({
        queryKey: ["companies"],
        queryFn: async () => {
            const response = await axiosInstance.get("/companies");
            return response.data;
        },
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState<any[]>([]);
useEffect(() => {
    let filtered = [...(companies || [])]; // Fallback to empty array if companies is undefined
    if (searchTerm) {
        filtered = filtered.filter((company) =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    setFilteredCompanies(filtered);
}, [searchTerm, companies]);

    const numberOfCompanies = filteredCompanies?.length;

    const [currentPage, setCurrentPage] = useState(1);
    const [companiesPerPage] = useState(10);

    // Get current companies
    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

    // Change page
    //@ts-ignore
    const paginate = (event, value) => {
        setCurrentPage(value);
    };





    return (
        <div className='mt-10 container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 md:px-0 py-6 w-full '>
            <div className='flex items-center justify-between mb-4'>
                <p className='text-sm md:text-base'>
                    Showing: <span className='font-semibold'> {numberOfCompanies}</span> Companies Available
                </p>

                <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center mr-6 mr-3'>
                    <p className='text-sm md:text-base '>Search:</p>
                    <Input
                        className="rounded-md border-2 border-gray-300  "
                        prefix={<FiSearch />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className='w-full flex flex-col gap-6'>
            {isLoading ? (
        <Loading />
    ) : (
        filteredCompanies && filteredCompanies.map((cmp: any, index: any) => (
            <Link to={`/Company-profile/${cmp.id}`} key={index}>
                <CompanyCard cmp={cmp} />
            </Link>
        ))
    )}
            </div>
            <div className="flex justify-center mt-4">
            <Pagination count={filteredCompanies ? Math.ceil(filteredCompanies.length / companiesPerPage) : 0} page={currentPage} onChange={paginate} />  
            </div>    
              </div>
    );
};

export default Companies;