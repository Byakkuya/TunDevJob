import { Request, Response, NextFunction } from 'express';
import { prismaclient } from '..';

export const uploadJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract data from the request body
        const { title, description, companyId, location, requirements, salary,city,jobType,contractType } = req.body;

        // Create a new job in the database
        const newJob = await prismaclient.job.create({
            data: {
                title,
                city,
                jobType,
                contractType, 
                description,
                companyId, 
                location,
                requirements, 
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
        const { title, description, location, requirements, salary, city, jobType, contractType, companyId } = req.body;

        // check if the job exists
        const job = await prismaclient.job.findUnique({ where: { id: jobId } });
        if (!job) {
            // Return an error message to the client
            res.status(404).json({ error: 'Job not found' });
            return;
          }
        const updatedJob = await prismaclient.job.update({
            where: {
                id: jobId,
            },
            data: {
                title,
                description,
                location,
                requirements,
                salary,
                city,
                jobType,
                contractType,
                companyId,
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
