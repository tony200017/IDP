import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authJwtSecret } from '../configs/config';
import { HTTPError } from '../errors/HTTPError';

export interface AuthRequest extends Request {
  userId?: string; // Define the userId property
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new HTTPError('Not authenticated.',401);
    return res.status(error.statusCode).send(error.message);
  }

  const token = authHeader.split(' ')[1];
  let decodedToken: any;

  try {
    decodedToken = jwt.verify(token, authJwtSecret);
  } catch (err:any) {
   
    return res.status(500).send(err.message);
  }

  if (!decodedToken) {
    const error = new HTTPError('Not authenticated.',401);
    return res.status(error.statusCode).send(error.message);
  }

  req.userId = decodedToken.userId;
  next();
};

export default authMiddleware;