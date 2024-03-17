import { Router } from "express";
import authRoutes from "./auth";
import jobRoutes from "./jobs";

const rootRouter = Router();

rootRouter.use('/auth',authRoutes);
rootRouter.use('/jobs',jobRoutes);



export default rootRouter;