import { Request, Response, NextFunction } from 'express';
import { prismaclient } from '..';

// get all applications
export const getApplications = async (req: Request, res: Response) => {
  
    try {
        const applications = await prismaclient.application.findMany();
        
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error getting applications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// get all applications per job
export const getApplicationsPerJob = async (req: Request, res: Response) => {
    try {
        const jobId = parseInt(req.params.id, 10);
        const applications = await prismaclient.application.findMany({
            where: {
                jobId,
            },
            include: {
                developer: true,
            },
        });

        res.status(200).json(applications);
    } catch (error) {
        console.error('Error getting applications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get an application by id
export const getApplication = async (req: Request, res: Response) => {
    try {
        const applicationId = parseInt(req.params.applicationId, 10);
        const application = await prismaclient.application.findUnique({
            where: {
                id: applicationId,
            },
            include: {
                job: true,
                developer: true,
            },
        });

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (error) {
        console.error('Error getting application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// create an application
export const createApplication = async (req: Request, res: Response) => {
    try {
        const { jobId, developerId, Name, currentPostition, email, github, linkedin, profile, resume, coverLetter } = req.body;
        
        //Check if developer has already applied for the job
        const applicationExists = await prismaclient.application.findFirst({
            where: {
                jobId,
                developerId,
            },
        });

        if (applicationExists) {
            return res.status(400).json({ error: 'You have already applied for this job' });
        }
        
        
        const newApplication = await prismaclient.application.create({
            data: {
                jobId,
                developerId,
                Name,
                currentPostition, // Add this line
                email,
                github,
                linkedin,
                profile,
                resume,
                coverLetter,
                appliedAt: new Date(),
            },
        });

        res.status(201).json({ message: 'Application created successfully' });
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};