import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack trace for debugging purposes

  // Check if the error has a status code, otherwise default to 500 (Internal Server Error)
  const statusCode = err instanceof Error && (err as any).status ? (err as any).status : 500;

  // Respond with an appropriate error message
  res.status(statusCode).json({ error: err.message });
}
