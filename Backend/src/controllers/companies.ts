import { Request, Response} from 'express';
import { prismaclient } from '..'

//get all the companies
export const getCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await prismaclient.company.findMany();
        res.json(companies);
    } catch (error) {
        console.log('Error getting companies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get a company by id with its jobs and testimonials
export const getCompany = async (req: Request, res: Response) => {
    try {
        const companyId = parseInt(req.params.id);
        const company = await prismaclient.company.findUnique({
            where: {
                id: companyId,
            },
            include: {
                jobs: true,
                testimonials: true
            }
        });

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.json(company);
    } catch (error) {
        console.log('Error getting company:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
};

//update a company by id
export const updateCompany = async (req: Request, res: Response) => {
    try {
        const companyId = parseInt(req.params.id, 10);
        const company = await prismaclient.company.update({
            where: {
                id: companyId,
            },
            data: req.body,
        });

        res.json(company);
    } catch (error) {
        console.log('Error updating company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//delete a company by id
export const deleteCompany = async (req: Request, res: Response) => {
    try {
        const companyId = parseInt(req.params.id, 10);
        const user = await prismaclient.company.delete({
            where: {
                id: companyId,
            },
        });
        const userId = user.userId;
        // delete the user 
        await prismaclient.user.delete({
            where: {
                id: userId,
            },
        });

        res.json({ message: 'Company deleted' });
    } catch (error) {
        console.log('Error deleting company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
