import { Request, Response } from "express";
import * as crypt from "@src/utils/crypto";
import models from "@src/models";

export async function signUp(req: Request, res: Response): Promise<void> {
  const User = models.userModels.User;

  try {
    const verifyUser = await User.findOne({
      where: { email: req.body.email }
    });

    if (verifyUser) {
      res.status(403).json({ message: "Email já cadastrado.", data: null });
      
      return;
    }    
  } catch (err) {
    res.status(500).json({ message: err, data: null })
  }

  try {
    const user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: crypt.cryptPass(req.body.password)
    });

    res.status(201).json({ 
      message: "Usuário cadastrado com sucesso.",
      data: { user: { id: user.userId, email: user.email }
    }})
  } catch(err) {
    res.status(500).json({ err })
  }
}

export async function signIn(req: Request, res: Response): Promise<void> {
  const User = models.userModels.User;

  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user || !crypt.verifyPass(req.body.password, user.password)) {
      res.status(404).json({ message: "Usuário ou senha inválidos.", data: null });

      return;
    }    

    res.json({ user: { id: user.userId, email: user.email }})
  } catch (err) {
    res.status(500).json({ err })
  }
}