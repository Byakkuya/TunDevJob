import { Router } from "express";

import { authenticate } from '../middlewares/auth';
import { restrictTo } from '../middlewares/roles';

const TestimonialsRoutes = Router();


TestimonialsRoutes.post('/', authenticate, );

TestimonialsRoutes.get('/', authenticate, );


TestimonialsRoutes.put('/:id', authenticate, );


TestimonialsRoutes.delete('/:id', authenticate, );

export default TestimonialsRoutes;