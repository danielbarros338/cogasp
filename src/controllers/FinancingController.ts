import { Request, Response } from "express";
import models from "@src/models";


export async function registerFinancingParcels(spendingId: number, reqBody: Record<string, string|number|Date>) {
  const { FinancingParcels } = models.financingModels;
  const processedParcels = FinancingParcels.processParcels(reqBody);
  const FinancingParcelsArr = []

  for (const processedParcel of processedParcels) {
    try {
      const parcel = await FinancingParcels.create({
        parcel: processedParcel.parcel,
        totalParcels: processedParcel.totalParcels,
        parcelValue: processedParcel.parcelValue,
        dueDate: processedParcel.dueDate,
        spendingId
      });

      FinancingParcelsArr.push(parcel);
    } catch (err) {
      if (err instanceof Error) {
        err = err.message;
      }

      throw new Error(`Error on process FinancingController.registerFinancingParcels: ${err}`);
    }
  }

  return FinancingParcelsArr;
}
