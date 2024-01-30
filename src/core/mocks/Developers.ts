// Mocks for Developer type
import { Developer } from '../models/Developer';
import { mockJobs } from './Jobs';

export const mockDevelopers: Developer[] = [
    {
        name: 'John Doe',
        location: 'City ABC',
        email: 'john.doe@example.com',
        contact: '555-123-4567',
        about: 'Passionate software developer with a focus on web technologies.',
        profileUrl: 'https://www.linkedin.com/johndoe',
        jobPosts: [mockJobs[0]], // Associated with the first job post in mockJobs
        token: 'abc123token',
    },
    {
        name: 'Jane Smith',
        location: 'Tech Town',
        email: 'jane.smith@example.com',
        contact: '555-987-6543',
        about: 'Experienced UX/UI designer with a keen eye for detail.',
        profileUrl: 'https://www.behance.net/janesmith',
        jobPosts: [mockJobs[2]], // Associated with the third job post in mockJobs
        token: 'xyz456token',
    },
    // Add more developers as needed
];
