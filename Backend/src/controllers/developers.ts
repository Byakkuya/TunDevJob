import { Request, Response} from 'express';
import { prismaclient } from '..'

//get developers
export const getDevelopers = async (req: Request, res: Response) => {
    try {
        const developers = await prismaclient.developer.findMany();
        res.json(developers);
    } catch (error) {
        console.log('Error getting developers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get a developer by id
export const getDeveloper = async (req: Request, res: Response) => {
    try {
        const developerId = parseInt(req.params.id, 10);
        const developer = await prismaclient.developer.findUnique({
            where: {
                id: developerId,
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

//update a developer by id
export const updateDeveloper = async (req: Request, res: Response) => {
    try {
        const developerId = parseInt(req.params.id, 10);
        const developer = await prismaclient.developer.update({
            where: {
                id: developerId,
            },
            data: req.body,
        });

        res.json(developer);
    } catch (error) {
        console.log('Error updating developer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// delete a developer by id
export const deleteDeveloper = async (req: Request, res: Response) => {
    try {
      const developerId = parseInt(req.params.id);
  
      // Find the developer
      const developer = await prismaclient.developer.findUnique({
        where: { id: developerId }
      });
  
      if (!developer) {
        return res.status(404).json({ error: 'Developer not found' });
      }
  
      // Get the user ID associated with the developer
      const userId = developer.userId;
  
      // Delete the corresponding user
      await prismaclient.user.delete({
        where: { id: userId }
      });
  
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting developer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };