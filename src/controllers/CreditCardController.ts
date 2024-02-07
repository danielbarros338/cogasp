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