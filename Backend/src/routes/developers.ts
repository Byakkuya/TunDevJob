import { Router } from "express";
import { getDevelopers, getDeveloper, updateDeveloper, deleteDeveloper } from "../controllers/developers";
import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const DevelopersRoutes = Router();

DevelopersRoutes.get('/',getDevelopers );
DevelopersRoutes.get('/:id',getDeveloper );
DevelopersRoutes.put('/:id', authenticate, restrictTo(['ADMIN', 'COMPANY']), updateDeveloper);
DevelopersRoutes.delete('/:id', authenticate, restrictTo(['ADMIN', 'COMPANY']), deleteDeveloper);






export default DevelopersRoutes;