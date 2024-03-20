import { Router } from "express";

import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const ReportsRoutes = Router();

export default ReportsRoutes;