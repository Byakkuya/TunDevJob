import { Router } from "express";
import { createTestimonial , getAllTestimonials,getTestimonialByUserId,updateTestimonial,deleteTestimonial, getTestimonialRow} from "../controllers/testimonials";
import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';
import test from "node:test";
import { get } from "node:http";

const TestimonialsRoutes = Router();


TestimonialsRoutes.post('/', authenticate,restrictTo('DEVELOPER'),createTestimonial );

TestimonialsRoutes.get('/', getAllTestimonials);
TestimonialsRoutes.get('/:id', getTestimonialByUserId);
TestimonialsRoutes.get('/row/:id', getTestimonialRow);



TestimonialsRoutes.put('/:id', authenticate,restrictTo(['ADMIN','DEVELOPER']),updateTestimonial );


TestimonialsRoutes.delete('/:id', authenticate,restrictTo(['ADMIN','DEVELOPER']),deleteTestimonial );

export default TestimonialsRoutes;