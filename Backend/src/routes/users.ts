import { Router } from "express";
import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';
import { getUsers, getUser, updateUser, deleteUser, getCompanyByUserId, getDeveloperByUserId, updateCompany, deleteCompany, updateDeveloper, deleteDeveloper } from "../controllers/users";
const UsersRoutes = Router();

UsersRoutes.get('/',authenticate,restrictTo('ADMIN'),getUsers );


UsersRoutes.get('/company/:id',authenticate,getCompanyByUserId);
UsersRoutes.put('/company/:id',authenticate,restrictTo(['ADMIN', 'COMPANY']),updateCompany );
UsersRoutes.delete('/company/:id',authenticate,restrictTo(['ADMIN', 'COMPANY']),deleteCompany );


UsersRoutes.get('/developer/:id',authenticate,getDeveloperByUserId );
UsersRoutes.put('/developer/:id',authenticate,restrictTo(['ADMIN', 'DEVELOPER']),updateDeveloper );
UsersRoutes.delete('/developer/:id',authenticate,restrictTo(['ADMIN', 'DEVELOPER']),deleteDeveloper );



UsersRoutes.get('/:id',authenticate,getUser );
UsersRoutes.put('/:id',authenticate,updateUser );
UsersRoutes.delete('/:id',authenticate, deleteUser);

export default UsersRoutes;