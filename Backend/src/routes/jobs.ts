import { Router } from "express";
import { uploadJob, deleteJob, getJobs, updateJob, getJob, } from "../controllers/jobs";
import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const jobRoutes = Router();

jobRoutes.post('/uploadjob',authenticate, restrictTo('COMPANY'),uploadJob);
jobRoutes.get('/' , getJobs);
jobRoutes.get('/:jobId', getJob);
jobRoutes.put('/:jobId', authenticate, restrictTo('COMPANY'), updateJob);
jobRoutes.delete('/:jobId', authenticate,restrictTo(['ADMIN', 'COMPANY']), deleteJob);


export default jobRoutes;