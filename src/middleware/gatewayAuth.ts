import {Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { gatewayJwtSecret } from "../configs/config";
import { HTTPError } from "../errors/HTTPError";
import { AuthRequest } from "./isAuth";

const gatewayAuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new HTTPError("Unauthorized: Access denied", 401);
    return res.status(error.statusCode).send(error.message);
  }

  const token = authHeader.split(" ")[1];
  
  let decodedToken: any;

  try {
    decodedToken = jwt.verify(token, gatewayJwtSecret);
    req.userId = decodedToken._id;
    next();
  } catch (err: any) {
    return res.status(500).send(err.message);
  }

  if (!decodedToken) {
    const error = new HTTPError("Unauthorized: Access denied", 401);
    return res.send(error.message);
  }
};

export default gatewayAuthMiddleware;
