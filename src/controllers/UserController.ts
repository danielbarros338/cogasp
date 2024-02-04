import { Request, Response } from "express";
import * as crypt from "@src/utils/crypto";
import User from "@src/db/models/user/User";

export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.create({
      username: req.body.username,
      password: crypt.cryptPass(req.body.password)
    });

    res.status(201).json({ user: { id: user.userId, username: user.username }})
  } catch(err) {
    res.status(400).json({ err })
  }
}

export async function signIn(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    });

    if (!user || !crypt.verifyPass(req.body.password, user.password)) {
      res.json({ user: null });
      return;
    }    

    res.json({ user: { id: user.userId, username: user.username }})
  } catch (err) {
    res.status(400).json({ err })
  }
}