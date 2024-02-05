import { Request, Response } from "express";
import models from "@src/models";

export async function registerSpending(req: Request, res: Response): Promise<void> {
  const { Spending } = models.spendingModels;

  try {
    const spending = await Spending.create({
      name: req.body.spendingName,
      value: req.body.spendingValue,
      date: req.body.spendingDate,
      typeSpending: req.body.typeSpending,
      dueDate: req.body.spendingDueDate,
      payday: req.body.spendingPayday,
      classification: req.body.classification,
      userId: req.body.userId
    });

    res.status(203).json({
      message: "Despesa cadastrada com sucesso.",
      data: { 
        spending: { 
          spendingId: spending.spendingId,
          spendingName: spending.name
        }
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err, data: null });
  }
};

export async function registerSpendingClassification(req: Request, res: Response): Promise<void> {
  const { SpendingClassification } = models.spendingModels;

  try {
    const spendingClassification = await SpendingClassification.create({
      name: req.body.name,
      userId: req.body.userId
    });

    res.status(203).json({
      message: "Classificação de despesa cadastrada com sucesso.",
      data: { 
        spendingClassification: { 
          spendingClassificationId: spendingClassification.spendingClassificationId,
          spendingClassificationName: spendingClassification.name
        }
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err, data: null });
  }
};

export async function registerTypeSpending(req: Request, res: Response): Promise<void> {
  const { TypeSpending } = models.spendingModels;

  try {
    const typeSpending = await TypeSpending.create({
      name: req.body.name,
      userId: req.body.userId
    });

    res.status(203).json({
      message: "Tipo de despesa cadastrada com sucesso.",
      data: { 
        typeSpending: { 
          typeSpendingId: typeSpending.typeSpendingId,
          typeSpendingName: typeSpending.name
        }
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err, data: null });
  }
};

export async function getSpendings(req: Request, res: Response): Promise<void> {
  const { Spending } = models.spendingModels;

  try {
    const spendings = await Spending.findAll({
      where: { userId: req.params.userId }
    });

    res.status(200).json({ message: "", data: spendings });
  } catch (err) {
    res.status(500).json({ message: err, data: null });
  }
}

export async function getSpendingsClassification(req: Request, res: Response): Promise<void> {
  const { SpendingClassification } = models.spendingModels;

  try {
    const spendingClassificatrion = await SpendingClassification.findAll({
      where: { userId: req.params.userId }
    });

    res.status(200).json({ message: "", data: spendingClassificatrion });
  } catch (err) {
    res.status(500).json({ message: err, data: null });
  }
}

export async function getTypeSpendings(req: Request, res: Response): Promise<void> {
  const { TypeSpending } = models.spendingModels;

  try {
    const typeSpendings = await TypeSpending.findAll();

    res.status(200).json({ message: "", data: typeSpendings });
  } catch(err) {
    res.status(500).json({ message: err, data: null });
  }
}