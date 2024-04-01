import { Router } from "express";

import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const ReportsRoutes = Router();

ReportsRoutes.get('/', authenticate, restrictTo('ADMIN'));
ReportsRoutes.get('/:id', authenticate, restrictTo('ADMIN'));
ReportsRoutes.post('/', authenticate, restrictTo('COMPANY'), );


ReportsRoutes.delete('/:id', authenticate, restrictTo('ADMIN'), );
export default ReportsRoutes;