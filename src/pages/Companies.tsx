import React, { useEffect, useState } from "react";

import CompanyCard from "../components/CompanyCard";

import Loading from "../components/Loading";
import ListBox from "../components/ListBox";
import { mockCompanies } from "../core/mocks/Companies";

const Companies = () => {

    const [recordsCount, setRecordsCount] = useState(0);
    const [data, setData] = useState(mockCompanies ?? []);
    const [sort, setSort] = useState("Newest");
    const [isFetching, setIsFetching] = useState(false);


    return (
        <div className='mt-10 container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 md:px-0 py-6 w-full '>
            <div className='flex items-center justify-between mb-4'>
                <p className='text-sm md:text-base'>
                        Showing: <span className='font-semibold'>500</span> Companies
                        Available
                    </p>

                    <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
                        <p className='text-sm md:text-base'>Sort By:</p>

                        <ListBox sort={sort} setSort={setSort} />
                    </div>
                </div>

                <div className='w-full flex flex-col gap-6'>
                    {data?.map((cmp, index) => (
                        <CompanyCard cmp={cmp} key={index} />
                    ))}

                    {isFetching && (
                        <div className='mt-10'>
                            <Loading />
                        </div>
                    )}
                    {/*}
                    <p className='text-sm text-right'>
                        {data?.length} records out of {recordsCount}
                    </p>
                    */}
                </div>


            </div>

    );
};

export default Companies;
