import { Request, Response, NextFunction } from 'express';
import { prismaclient } from '..';


export const getMessages = async (req: Request, res: Response) => {
    //get all messages
    try {
        const messages = await prismaclient.messages.findMany();        
        res.status(200).json(messages);
        } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    //send a message
    try {
        const { name, email, message } = req.body;
        const newMessage = await prismaclient.messages.create({
            data: {
                name,
                email,
                message,
            },
        });

        res.status(201).json({message: 'Message sent successfully', newMessage: newMessage});
        } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    //delete a message
    try {
        const messageId = parseInt(req.params.id);
        const message = await prismaclient.messages.findUnique({
            where: {
                id: messageId,
            },
        });

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        await prismaclient.messages.delete({
            where: {
                id: messageId,
            },
        });

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}