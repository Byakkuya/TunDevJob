// Mocks for Job type
import { Job } from '../models/Job';

import { mockCompanies } from './Companies';

export const mockJobs: Job[] = [
    {
        id: 1,
        Company: mockCompanies[0],
        jobTitle: 'Software Engineer',
        location: 'City XYZ',
        jobType: 'Full-time',
        salary: '$80,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.' },
            { requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 10,
        created_at: new Date('2024-01-30'),
    },
    // Add more jobs as needed
    {
        id: 2,
        Company: mockCompanies[1],
        jobTitle: 'Data Scientist',
        location: 'Tech City',
        jobType: 'Contract',
        salary: '$90,000 per year',
        detail: [
            { description: 'Analyze and interpret complex data sets.' },
            { requirement: 'Master\'s degree in Data Science or related field.' },
        ],
        applicants: 5,
        created_at: new Date('2024-02-01'),
    },
    {
        id: 3,
        Company: mockCompanies[2],
        jobTitle: 'UX/UI Designer',
        location: 'Innovation Hub',
        jobType: 'Full-time',
        salary: '$75,000 per year',
        detail: [
            { description: 'Create intuitive and visually appealing user interfaces.' },
            { requirement: 'Experience in UX/UI design and prototyping tools.' },
        ],
        applicants: 8,
        created_at: new Date('2024-02-05'),
    },
];

export const experience = [
    { title: "Under 1 Year", value: "0-1" },
    { title: "1 -2 Year", value: "1-2" },
    { title: "2 -6 Year", value: "2-6" },
    { title: "Over 6 Years", value: "6" },
];
export const jobTypes = ["Full-Time", "Part-Time", "ContracT", "Intern"];