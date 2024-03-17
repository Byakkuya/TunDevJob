import { Router } from "express";
import { uploadJob, deleteJob, getJobs, updateJob, getJob, applyJob } from "../controllers/jobs";

const jobRoutes = Router();

jobRoutes.post('/uploadjob', uploadJob);
jobRoutes.get('/', getJobs);
jobRoutes.get('/:jobId', getJob);
jobRoutes.put('/:jobId', updateJob);
jobRoutes.delete('/:jobId', deleteJob);
jobRoutes.post('/applyjob/:jobId', applyJob);

export default jobRoutes;