import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Add user information to Request object
      session?: any;
    }
  }
}