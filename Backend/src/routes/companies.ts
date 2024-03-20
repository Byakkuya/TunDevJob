import { Router } from "express";
import { getCompanies, getCompany,updateCompany,deleteCompany} from "../controllers/companies";
import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const CompaniesRoutes = Router();

CompaniesRoutes.get('/',getCompanies);
CompaniesRoutes.get('/:id', getCompany);
CompaniesRoutes.put('/:id', authenticate, restrictTo(['ADMIN', 'COMPANY']), updateCompany);
CompaniesRoutes.delete('/:id', authenticate, restrictTo(['ADMIN', 'COMPANY']), deleteCompany);






export default CompaniesRoutes;