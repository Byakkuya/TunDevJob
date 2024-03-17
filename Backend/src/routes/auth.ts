import { Router } from "express";
import { loginDeveloper, signupCompany, signupDeveloper } from "../controllers/auth";

const authRoutes = Router();

authRoutes.post('/singupdeveloper', signupDeveloper);
authRoutes.post('/singupcompany', signupCompany);
authRoutes.post('/logindeveloper', loginDeveloper);
export default authRoutes;