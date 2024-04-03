import { prismaclient } from "..";
import { Request, Response} from 'express';

//get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prismaclient.user.findMany();

        res.json(users);
    } catch (error) {
        console.log('Error getting users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get a user by id
export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await prismaclient.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.log('Error getting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get company by user id
export const getCompanyByUserId = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const company = await prismaclient.company.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const {name,number,city, zipcode,fullAddress,description,logo,website,linkedin} = company;
        res.json({name,number,city, zipcode,fullAddress,description,logo,website,linkedin});
    } catch (error) {
        console.log('Error getting company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//update company by user id
export const updateCompany = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const company = await prismaclient.company.update({
            where: {
                userId: userId,
            },
            data: req.body,
        });

        res.json(company);
    } catch (error) {
        console.log('Error updating company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//delete company by user id
export const deleteCompany = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const company = await prismaclient.company.delete({
            where: {
                userId: userId,
            },
        });

        res.json(company);
    } catch (error) {
        console.log('Error deleting company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get developer by user id
export const getDeveloperByUserId = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const developer = await prismaclient.developer.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!developer) {
            return res.status(404).json({ error: 'Developer not found' });
        }
        res.json(developer);
    } catch (error) {
        console.log('Error getting developer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//update developer by user id
export const updateDeveloper = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const developer = await prismaclient.developer.update({
            where: {
                userId: userId,
            },
            data: req.body,
        });

        res.json(developer);
    } catch (error) {
        console.log('Error updating developer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//delete developer by user id
export const deleteDeveloper = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const developer = await prismaclient.developer.delete({
            where: {
                userId: userId,
            },
        });

        res.json(developer);
    } catch (error) {
        console.log('Error deleting developer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//update a user by id
export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await prismaclient.user.update({
            where: {
                id: userId,
            },
            data: req.body,
        });

        res.json(user);
    } catch (error) {
        console.log('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete a user by id
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
  
      // Find the user
      const user = await prismaclient.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user
      await prismaclient.user.delete({
        where: {
          id: userId,
        },
      });
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.log('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };