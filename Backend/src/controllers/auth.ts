import { NextFunction, Request, Response } from 'express';
import { prismaclient } from '..';
import {compareSync, hashSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequest } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';

export const signupDeveloper = async (req: Request, res: Response) => {
    const {email, password, name, number, city, zipcode, currentPosition, profilePicture, github, linkedin, fullAddress, Resume} = req.body;
    // Check if the email is already in use
    const existingDeveloper = await prismaclient.user.findUnique({
        where: {
            email
        }
    });
    if (existingDeveloper) {
        return res.status(400).json({error: 'Email already in use'});
    }
    const hashedPassword = hashSync(password, 10);
    try {
        const newDeveloper = await prismaclient.user.create({
          data: {
            email,
            password: hashedPassword,
            role: 'DEVELOPER',
            developer: {
              create: {
                name,
                number,
                city,
                zipcode,
                currentPosition,
                profilePicture,
                github,
                linkedin,
                fullAddress,
                Resume
              }
            }
          }
        });
        res.status(201).json({message: 'Developer created successfully', developer: newDeveloper});
    } catch (error) {
        console.error('Error creating developer:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
}

export const signupCompany = async (req: Request, res: Response) => {
    const {email, password, name, number, city, zipcode, fullAddress, description, logo, website, linkedin} = req.body;
    // Check if the email is already in use
    const existingCompany = await prismaclient.user.findUnique({
        where: {
            email
        }
    });
    if (existingCompany) {
        return res.status(400).json({error: 'Email already in use'});
    }
    const hashedPassword = hashSync(password, 10);
    try {
        const newCompany = await prismaclient.user.create({
          data: {
            email,
            password: hashedPassword,
            role: 'COMPANY',
            company: {
              create: {
                name,
                number,
                city,
                zipcode,
                fullAddress,
                description,
                logo,
                website,
                linkedin
              }
            }
          }
        });
        res.status(201).json({message: 'Company created successfully', company: newCompany});
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
}

export const loginDeveloper = async (req: Request, res: Response) => {
    
}
