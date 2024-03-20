import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';

export const restrictTo = (roles: string | string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Access user object from request
  const user = req.user as User;

  // Check if the user's role matches any of the specified roles
  if (!roles.includes(user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // If the user's role matches, proceed to the next middleware
  next();
};