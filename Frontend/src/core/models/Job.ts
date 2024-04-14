import {Company} from "./Company";
export type Job = {
    id:number | string ;
    companyId: number;
    title: string;
    city: string;
    location: string;
    jobType: string;
    contractType: string;
    salary: string;
    description: string;
    requirement: string; 
    created_at:Date;
};

