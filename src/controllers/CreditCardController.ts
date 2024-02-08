import { Request, Response } from "express";
import models from "@src/models";

export async function registerSpendingCreditCard(spendingId: number, reqBody: Record<string, string|number|Date>) {
  const { CreditCardParcel } = models.creditCardModels;
  const processedParcels = CreditCardParcel.processParcels(reqBody);
  const creditCardParcels = []

  for (const processedParcel of processedParcels) {
    try {
      const parcel = await CreditCardParcel.create({
        parcel: processedParcel.parcel,
        totalParcels: processedParcel.totalParcels,
        parcelValue: processedParcel.parcelValue,
        dueDate: processedParcel.dueDate,
        creditCardId: reqBody.creditCardId,
        spendingId
      });

      creditCardParcels.push(parcel);
    } catch (err) {
      if (err instanceof Error) {
        err = err.message;
      }

      throw new Error(`Error on process CreditCardController.registerSpendingCreditCard: ${err}`);
    }
  }

  return creditCardParcels;
}

export async function registerCreditCard(req: Request, res: Response): Promise<void> {
  const { CreditCard } = models.creditCardModels;

  try {
    const creditCard = await CreditCard.create({
      cardName: req.body.cardName,
      flag: req.body.flag,
      endNumber: req.body.cardEndNumber,
      dueDate: req.body.cardDueDate,
      userId: req.body.userId
    });

    res.send(203).json({
      message: "Cartão cadastrado com sucesso.",
      data: {
        creditCardId: creditCard.creditCardId,
        endNumber: creditCard.endNumber
      }
    });
  } catch (err) {
    console.error('CreditCardController.registerCreditCard ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar cadastrar o cartão.", data: null }
    );

    return;
  }
}

export async function getCreditCard(req: Request, res: Response): Promise<void> {
  const { CreditCard } = models.creditCardModels;

  try {
    const creditCard = CreditCard.findOne({
      where: { creditCardId: req.params.creditCardId }
    });

    res.send(203).json({
      message: "",
      data: creditCard
    });
  } catch (err) {
    console.error('CreditCardController.getCreditCard ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar resgatar o cartão.", data: null }
    );

    return;
  }
}

export async function getCreditCards(req: Request, res: Response): Promise<void> {
  const { CreditCard } = models.creditCardModels;

  try {
    const creditCard = CreditCard.findOne({
      where: { userId: req.params.userId }
    });

    res.send(203).json({
      message: "",
      data: creditCard
    });
  } catch (err) {
    console.error('CreditCardController.registerCreditCard ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar resgatar os cartões.", data: null }
    );

    return;
  }
}