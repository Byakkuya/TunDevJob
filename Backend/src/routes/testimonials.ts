import { Router } from "express";
import { createTestimonial , getAllTestimonials,getTestimonialByUserId,updateTestimonial,deleteTestimonial} from "../controllers/testimonials";
import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const TestimonialsRoutes = Router();


TestimonialsRoutes.post('/', authenticate,restrictTo('DEVELOPER'),createTestimonial );

TestimonialsRoutes.get('/', getAllTestimonials);
TestimonialsRoutes.get('/:id', getTestimonialByUserId);


TestimonialsRoutes.put('/:id', authenticate,restrictTo(['ADMIN','DEVELOPER']),updateTestimonial );


TestimonialsRoutes.delete('/:id', authenticate,restrictTo(['ADMIN','DEVELOPER']),deleteTestimonial );

export default TestimonialsRoutes;