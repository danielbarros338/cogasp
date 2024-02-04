import { Request, Response } from "express";
import models from "@src/models";

export async function signUpEarning(req: Request, res: Response): Promise<void> {
  const { Earning } = models.earningModels;

  try {
    const earning = await Earning.create({
      name: req.body.earningName,
      value: req.body.earningValue,
      date: req.body.earningDate,
      typeEarningId: req.body.typeEarningId,
      userId: req.body.userId
    });

    res.status(203).json({
      message: "Ganho cadastrado com sucesso.",
      data: { 
        earning: { 
          earningId: earning.earningId,
          earningName: earning.name
        }
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err, data: null });
  }
}