import { Express, Request, Response } from "express";
import * as UserController from "@src/controllers/UserController";
import * as EarningController from "@src/controllers/EarningController";

export default (app: Express) => {
  app.post("/signup", UserController.signUp);
  app.post("/signin", UserController.signIn);

  app.post("/signup-earning", EarningController.signUpEarning);
  app.get("/get-earnings/:userId", EarningController.getEarnings);
}