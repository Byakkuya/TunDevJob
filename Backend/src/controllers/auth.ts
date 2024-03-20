import { NextFunction, Request, Response } from 'express';
import { prismaclient } from '..';
import {compareSync, hashSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequest } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import bcrypt from 'bcrypt';

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

//sign up an admin
export const signupAdmin = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    // Check if the email is already in use
    const existingAdmin = await prismaclient.user.findUnique({
        where: {
            email
        }
    });
    if (existingAdmin) {
        return res.status(400).json({error: 'Email already in use'});
    }
    const hashedPassword = hashSync(password, 10);
    try {
        const newAdmin = await prismaclient.user.create({
          data: {
            email,
            password: hashedPassword,
            role: 'ADMIN',
            admin: {
              create: {}
            }
          }
        });
        res.status(201).json({message: 'Admin created successfully', admin: newAdmin});
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({error: 'Internal server error'});
    
    }
}


//login a user
export const loginUser = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;

      // Check if the email exists
      const user = await prismaclient.user.findUnique({
          where: { email },
          include: {
            developer: true,
            company: true,
            admin: true
        }
      });
      if (!user) {
          return res.status(400).json({error: 'Invalid email or password'});

      }
      // Check if the password is correct
      const passwordMatch = await compareSync(password, user.password);
      if (!passwordMatch) {
          return res.status(400).json({error: 'Invalid email or password'});
      }
      const payload = {
          id: user.id,
          email: user.email,
          role: user.role
      };
      const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
      
      res.status(200).json({message: 'Login successful', token});

    
  }
  catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({error: 'Internal server error'});
  }
};


// updating user 
export const updateUser = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const { email, password, name, number, city, zipcode, currentPosition, profilePicture, github, linkedin, fullAddress, Resume, description, logo, website, role } = req.body;
      const hashedPassword = hashSync(password, 10);
      const user = await prismaclient.user.update({
        where: { id: parseInt(id) },
        data: {
          email,
          password: hashedPassword,
          role,
          developer: {
            update: {
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
          },
          company: {
            update: {
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
      res.status(200).json({message: 'User updated successfully', user});
  }
  catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({error: 'Internal server error'});
  }
};

//delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      await prismaclient.user.delete({
          where: { id: parseInt(id) }
      });
      res.status(200).json({message: 'User deleted successfully'});
  }
  catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({error: 'Internal server error'});
  }
};