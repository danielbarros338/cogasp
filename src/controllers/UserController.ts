import { Request, Response } from "express";
import User from "@src/db/models/User";

export async function signUp(req: Request, res: Response) {
  try {
    const response = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    res.json({ response });
  } catch(err) {
    res.json({ err })
  }
}