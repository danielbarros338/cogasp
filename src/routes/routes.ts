import { Express, Request, Response } from "express";
import * as UserController from "@src/controllers/UserController";
import * as EarningController from "@src/controllers/EarningController";
import * as SpendingController from "@src/controllers/SpendingController";

export default (app: Express) => {
  app.post("/signup", UserController.signUp);
  app.post("/signin", UserController.signIn);

  app.post("/register-earning", EarningController.registerEarning);
  app.get("/get-earnings/:userId", EarningController.getEarnings);

  app.post("/register-spending", SpendingController.registerSpending);
  app.post("/register-type-spending", SpendingController.registerTypeSpending);
  app.post("/register-spending-classification", SpendingController.registerSpendingClassification);
  app.get("/get-spendings/:userId", SpendingController.getSpendings);
  app.get("/get-type-spendings", SpendingController.getTypeSpendings);
  app.get("/get-spendings-classification/:userId", SpendingController.getSpendingsClassification);
}