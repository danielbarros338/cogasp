import { Request, Response } from "express";
import models from "@src/models";

export async function registerSpendingCreditCard(req: Request, res: Response): Promise<void> {
  const { CreditCardParcel } = models.creditCardModels;
  const processedParcels = CreditCardParcel.processParcels(req.body);

  try {
    const creditCard = await CreditCardParcel.create({

    })
  } catch (err) {
    res.status(500).json({ message: err, data: null });
  }
}