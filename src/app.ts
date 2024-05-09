import express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import { mongodbConnection,port } from "./configs/config";
import userRoutes from "./users/user.routes";
import errorMiddleware from "./middleware/errorMiddleware";

async function connectToDatabase() {
  try {
    await connect(mongodbConnection);
    console.log("Connected Successfully");
  } catch (err) {
    console.error(err);
  }
}
connectToDatabase();
const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use(errorMiddleware);
const server = app.listen(port, () => {
  console.log("server started",port);
});
