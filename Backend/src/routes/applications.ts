import { Router } from "express";
import { createApplication, getApplications, getApplication,getApplicationsPerJob } from "../controllers/applications";
import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const ApplicationsRoutes = Router();



ApplicationsRoutes.post('/', authenticate, restrictTo('DEVELOPER'),createApplication);


ApplicationsRoutes.get('/', authenticate, getApplications );
ApplicationsRoutes.get('/:id', authenticate,restrictTo('COMPANY'), getApplicationsPerJob );


ApplicationsRoutes.put('/:id', authenticate, );


ApplicationsRoutes.delete('/:id', authenticate, );

export default ApplicationsRoutes;