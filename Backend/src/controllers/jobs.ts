import { Request, Response, NextFunction } from 'express';
import { prismaclient } from '..';

export const uploadJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract data from the request body
        const { title, description, companyId, location, requirements, salary } = req.body;

        // Create a new job in the database
        const newJob = await prismaclient.job.create({
            data: {
                title,
                description,
                companyId, // Assuming companyId is provided in the request body
                location,
                requirements: { set: requirements }, // Assuming requirements is an array of strings
                salary,
            },
        });

        res.status(201).json({ message: 'Job uploaded successfully', job: newJob });
    } catch (error) {
        console.error('Error uploading job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getJobs = async (req: Request, res: Response) => {
      //get all jobs
      try {
        const jobs = await prismaclient.job.findMany();
        
        res.status(200).json(jobs);
        } catch (error) {
        console.error('Error getting jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
}

export const getJob = async (req: Request, res: Response) => {
    //get a job by id
    try {
        const jobId = parseInt(req.params.jobId, 10);
        const job = await prismaclient.job.findUnique({
            where: {
                id: jobId,
            },
            include: {
                company: true, // Include company details associated with the job
                
            }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Error getting job:', error);
        res.status(500).json({ error: 'Internal server error' });
      
    }
}

export const updateJob = async (req: Request, res: Response) => {
    //update a job by id
    try {
        const jobId = parseInt(req.params.jobId, 10);
        const { title, description, location, requirements, salary } = req.body;

        const updatedJob = await prismaclient.job.update({
            where: {
                id: jobId,
            },
            data: {
                title,
                description,
                location,
                requirements: { set: requirements },
                salary,
            },
        });

        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Internal server error' });
      
    }
}

export const deleteJob = async (req: Request, res: Response) => {
    //delete a job by id
    try {
        const jobId = parseInt(req.params.jobId, 10);
        await prismaclient.job.delete({
            where: {
                id: jobId,
            },
        });

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Internal server error' });
      
    }
}
export const applyJob = async (req: Request, res: Response) => {
    try {
        // Extract data from the request body
        const { jobId, developerId, coverLetter } = req.body;

        // Check if the job exists
        const job = await prismaclient.job.findUnique({
            where: {
                id: jobId
            }
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Check if the developer exists
        const developer = await prismaclient.developer.findUnique({
            where: {
                id: developerId
            }
        });

        if (!developer) {
            return res.status(404).json({ error: 'Developer not found' });
        }
        //check if the developer has already applied for the job
        const applicationExists = await prismaclient.application.findFirst({
            where: {
                jobId,
                developerId
            }
        });
        if (applicationExists) {
            return res.status(400).json({ error: 'You have already applied for this job' });
        }

        // Create an application for the job
        const application = await prismaclient.application.create({
            data: {
                jobId,
                developerId,
                coverLetter,
                status: 'applied' // Assuming initial status is 'applied'
            }
        });

        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        console.error('Error applying to job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};