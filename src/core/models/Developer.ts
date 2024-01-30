import {Job} from "./Job";

export type Developer = {
    name: string;
    location: string;
    email: string;
    contact: string;
    about: string;
    profileUrl: String;
    jobPosts: Job[];
    token: string;
}