import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { gatewayJwtSecret } from '../configs/config';
import { HTTPError } from '../errors/HTTPError';



const sourceAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new HTTPError('Unauthorized: Access denied.',401);
    return res.send(error.message);
  }

  const token = authHeader.split(' ')[1];
  let decodedToken: JwtPayload | string ;

  try {
    decodedToken = jwt.verify(token, gatewayJwtSecret);
  } catch (err:any) {
   
    return res.status(500).send(err.message);
  }

  if (!decodedToken) {
    const error = new HTTPError('Unauthorized: Access denied.',401) ;
    return res.send(error.message);
  } 
  next();
};

export default sourceAuthenticationMiddleware;