import { Router } from "express";
import authRoutes from "./auth";
import jobRoutes from "./jobs";
import CompaniesRoutes from "./companies";
import ApplicationsRoutes from "./applications";
import TestimonialsRoutes from "./testimonials";
import DevelopersRoutes from "./developers";
import ReportsRoutes from "./reports";
import UsersRoutes from "./users";

const rootRouter = Router();

rootRouter.use('/auth',authRoutes);
rootRouter.use('/jobs',jobRoutes);
rootRouter.use('/companies',CompaniesRoutes);
rootRouter.use('/developers',DevelopersRoutes);
rootRouter.use('/applications',ApplicationsRoutes);
rootRouter.use('/testimonials',TestimonialsRoutes);
rootRouter.use('/reports',ReportsRoutes);
rootRouter.use('/users',UsersRoutes);





export default rootRouter;