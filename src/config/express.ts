import Express from "express";
import Cors from "cors";
import dotenv from 'dotenv';
import routes from "@src/routes/routes";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
});

const app = Express();

app.use(Cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

routes(app)

export default app;
