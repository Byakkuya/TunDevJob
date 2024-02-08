import {Company} from "./Company";
export type Job = {
    id:number;
    company: Company;
    jobTitle: string;
    location: string;
    jobType: string;
    salary: string;
    detail: {
        description: string;
        requirement?: string; // Make 'requirement' optional if it's not always present
    }[];
    applicants:number;
    created_at:Date;
};

