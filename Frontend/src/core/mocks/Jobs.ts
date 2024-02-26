// Mocks for Job type
import { Job } from '../models/Job';

import { mockCompanies } from './Companies';

export const mockJobs: Job[] = [
    {
        id: 1,
        company: mockCompanies[0],
        jobTitle: 'Software Engineer',
        location: 'City XYZ',
        jobType: 'Full-time',
        salary: '$80,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 10,
        created_at: new Date('2024-01-30'),
    },
    // Add more jobs as needed
    {
        id: 2,
        company: mockCompanies[1],
        jobTitle: 'Data Scientist',
        location: 'Tech City',
        jobType: 'Contract',
        salary: '$90,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 5,
        created_at: new Date('2024-02-01'),
    },
    {
        id: 3,
        company: mockCompanies[2],
        jobTitle: 'UX/UI Designer',
        location: 'Innovation Hub',
        jobType: 'Full-time',
        salary: '$75,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 8,
        created_at: new Date('2024-02-05'),
    },
    {
        id: 4,
        company: mockCompanies[3],
        jobTitle: 'Product Manager',
        location: 'City ABC',
        jobType: 'Part-time',
        salary: '$60,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 15,
        created_at: new Date('2024-02-10'),
    },
    {
        id: 5,
        company: mockCompanies[4],
        jobTitle: 'Frontend Developer',
        location: 'City XYZ',
        jobType: 'Full-time',
        salary: '$80,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 10,
        created_at: new Date('2024-02-15'),
    },
    {
        id: 6,
        company: mockCompanies[5],
        jobTitle: 'Backend Developer',
        location: 'Tech City',
        jobType: 'Contract',
        salary: '$90,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 5,
        created_at: new Date('2024-02-20'),
    },
    {
        id: 7,
        company: mockCompanies[6],
        jobTitle: 'DevOps Engineer',
        location: 'Innovation Hub',
        jobType: 'Full-time',
        salary: '$75,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 8,
        created_at: new Date('2024-02-25'),
    },
    {
        id: 8,
        company: mockCompanies[7],
        jobTitle: 'Cloud Engineer',
        location: 'City ABC',
        jobType: 'Part-time',
        salary: '$60,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants:
            15,
        created_at: new Date('2024-03-01'),
    },
    {
        id: 9,
        company: mockCompanies[8],
        jobTitle: 'Machine Learning Engineer',
        location: 'City XYZ',
        jobType: 'Full-time',
        salary: '$80,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 10,
        created_at: new Date('2024-03-05'),
    },
    {
        id: 10,
        company: mockCompanies[9],
        jobTitle: 'Data Engineer',
        location: 'Tech City',
        jobType: 'Contract',
        salary: '$90,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 5,
        created_at: new Date('2024-03-10'),
    },
    {
        id: 11,
        company: mockCompanies[10],
        jobTitle: 'Product Designer',
        location: 'Innovation Hub',
        jobType: 'Full-time',
        salary: '$75,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 8,
        created_at: new Date('2024-03-15'),
    },
    {
        id: 12,
        company: mockCompanies[11],
        jobTitle: 'Product Manager',
        location: 'City ABC',
        jobType: 'Part-time',
        salary: '$60,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 15,
        created_at: new Date('2024-03-20'),
    },
    {
        id: 13,
        company: mockCompanies[12],
        jobTitle: 'Frontend Developer',
        location: 'City XYZ',
        jobType: 'Full-time',
        salary: '$80,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants:
            10,
        created_at: new Date('2024-03-25'),
    },
    {
        id: 14,
        company: mockCompanies[13],
        jobTitle: 'Backend Developer',
        location: 'Tech City',
        jobType: 'Contract',
        salary: '$90,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 5,
        created_at: new Date('2024-03-30'),
    },
    {
        id: 15,
        company: mockCompanies[14],
        jobTitle: 'DevOps Engineer',
        location: 'Innovation Hub',
        jobType: 'Full-time',
        salary: '$75,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 8,
        created_at: new Date('2024-04-01'),
    },
    {
        id: 16,
        company: mockCompanies[15],
        jobTitle: 'Cloud Engineer',
        location: 'City ABC',
        jobType: 'Part-time',
        salary: '$60,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 15,
        created_at: new Date('2024-04-05'),
    },
    {
        id: 17,
        company: mockCompanies[16],
        jobTitle: 'Machine Learning Engineer',
        location: 'City XYZ',
        jobType: 'Full-time',
        salary: '$80,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 10,
        created_at: new Date('2024-04-10'),
    },
    {
        id: 18,
        company: mockCompanies[17],
        jobTitle: 'Data Engineer',
        location: 'Tech City',
        jobType: 'Contract',
        salary: '$90,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 5
        ,
        created_at: new Date('2024-04-15'),
    },
    {
        id: 19,
        company: mockCompanies[18],
        jobTitle: 'Product Designer',
        location: 'Innovation Hub',
        jobType: 'Full-time',
        salary: '$75,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 8,
        created_at: new Date('2024-04-20'),
    },
    {
        id: 20,
        company: mockCompanies[19],
        jobTitle: 'Product Manager',
        location: 'City ABC',
        jobType: 'Part-time',
        salary: '$60,000 per year',
        detail: [
            { description: 'Develop and maintain software applications.', requirement: 'Bachelor\'s degree in Computer Science or related field.' },
        ],
        applicants: 15,
        created_at: new Date('2024-04-25'),
    },
];

export const experience = [
    { title: "Under 1 Year", value: "0-1" },
    { title: "1 -2 Year", value: "1-2" },
    { title: "2 -6 Year", value: "2-6" },
    { title: "Over 6 Years", value: "6" },
];
export const jobTypes = ["Full-time", "Part-time", "Intern"];
export const jobLocations = ["Remote", "Onsite"];
export const contractTypes = ["CDI", "CDD", "Freelance"];