import {  Request, Response } from 'express';
import { prismaclient } from '..';


// create a testimonial provided by developer a for company
export const createTestimonial = async (req: Request, res: Response) => {
    const { text, rating, companyId } = req.body; // Destructuring request body
    // get the user object from the request object
    const user = req.user;

    try {
    // find the developer with the user id
    const developer = await prismaclient.developer.findUnique({
        where: {
            userId: (user as { id: number }).id
        }
    });
    if (!developer) {
        return res.status(400).json({error: 'Developer not found'});
    }
    // create the testimonial
    const testimonial = await prismaclient.testimonial.create({
        data: {
            text,
            rating,
            developerId: developer.id,
            companyId
        }
    });
    res.status(201).json({message: 'Testimonial created successfully', testimonial});
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
    



    

     
}


// get all testimonials
export const getAllTestimonials = async (req: Request, res: Response) => {
    try {
        const testimonials = await prismaclient.testimonial.findMany();
        res.status(200).json({testimonials});
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
}

// get a testimonial by id
export const getTestimonialById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const testimonial = await prismaclient.testimonial.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!testimonial) {
            return res.status(404).json({error: 'Testimonial not found'});
        }
        res.status(200).json({testimonial});
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
}

// update a testimonial by id
export const updateTestimonial = async (req: Request, res: Response) => {
    const { text, rating } = req.body;
    const { id } = req.params;
    const user = req.user;
    try {

        const developer = await prismaclient.developer.findUnique({
            where: {
                userId: (user as { id: number }).id
            }
        });
        if (!developer) {
            return res.status(400).json({error: 'Developer not found'});
        }

        const testimonials = await prismaclient.testimonial.findMany({
            where: {
                developerId: developer.id
            }
        });
        // check if the testimonial belongs to the developer
        const testimonial = testimonials.find(testimonial => testimonial.id === Number(req.params.id));
        if (!testimonial) {
            return res.status(400).json({error: 'Testimonial not found'});
        }
        const { id } = req.params;
        const updatedTestimonial = await prismaclient.testimonial.update({
            where: {
                id: Number(id)
            },
            data: {
                text,
                rating
            }
        });
        res.status(200).json({message: 'Testimonial updated successfully', testimonial: updatedTestimonial});
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
}

// delete a testimonial by id
export const deleteTestimonial = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prismaclient.testimonial.delete({
            where: {
                id: Number(id)
            }
            
        });
        res.status(200).json({message: 'Testimonial deleted successfully'});
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
}

