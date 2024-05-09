import dotenv from "dotenv";
dotenv.config();
export const mongodbConnection: string = process.env.MONGODB_CONNECTION_LINK || "";
export const port: number = 3001;
export const authJwtSecret: string = process.env.AUTH_JWT_SECRET || "";
export const gatewayJwtSecret: string = process.env.GATEWAY_JWT_SECRET || "";
export const tableNames: { [key: string]: string } = {
  user: "User",
};
