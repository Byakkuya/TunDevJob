import { Router } from "express";
import { loginUser, signupAdmin, signupCompany, signupDeveloper } from "../controllers/auth";


const authRoutes = Router();
authRoutes.post('/singupAdmin', signupAdmin);
authRoutes.post('/singupdeveloper', signupDeveloper);
authRoutes.post('/singupcompany', signupCompany);
authRoutes.post('/login', loginUser);
export default authRoutes;