import { Router } from "express";
import { getAllReports, getReportById, createReport, deleteReport } from '../controllers/reports';
import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const ReportsRoutes = Router();

ReportsRoutes.get('/', authenticate, restrictTo('ADMIN') ,getAllReports);
ReportsRoutes.get('/:id', authenticate, restrictTo('ADMIN'), getReportById);
ReportsRoutes.post('/', authenticate, restrictTo('COMPANY'),createReport );


ReportsRoutes.delete('/:id', authenticate, restrictTo('ADMIN'), deleteReport );
export default ReportsRoutes;