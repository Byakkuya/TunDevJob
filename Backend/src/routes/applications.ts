import { Router } from "express";

import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const ApplicationsRoutes = Router();



ApplicationsRoutes.post('/', authenticate, );


ApplicationsRoutes.get('/', authenticate, );


ApplicationsRoutes.put('/:id', authenticate, );


ApplicationsRoutes.delete('/:id', authenticate, );

export default ApplicationsRoutes;