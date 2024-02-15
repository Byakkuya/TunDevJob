import {Company} from "./Company";
export type Job = {
    id:number | string ;
    company: Company;
    jobTitle: string;
    location: string;
    jobType: string;
    salary: string;
    detail: {
        description: string;
        requirement?: string; 
    }[];
    applicants:number;
    created_at:Date;
};

