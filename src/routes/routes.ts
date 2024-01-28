import { Express, Request, Response } from "express";
import * as UserController from "@src/controllers/UserController";

export default (app: Express) => {
  app.post("/signup", UserController.signUp);
}