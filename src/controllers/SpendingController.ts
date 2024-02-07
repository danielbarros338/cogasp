import { Request, Response } from "express";
import * as CreditCardController from "./CreditCardController";
import models from "@src/models";

export async function registerSpending(req: Request, res: Response): Promise<void> {
  const { Spending } = models.spendingModels;

  // TODO: Realizar uma busca em TypeSpending e retornar seus Códigos para filtragem posterior

  try {
    const spending = await Spending.create({
      name: req.body.name,
      value: req.body.value,
      date: req.body.date,
      typeSpending: req.body.typeSpending,
      dueDate: req.body.dueDate,
      payday: req.body.payday,
      classification: req.body.classification,
      userId: req.body.userId
    });

    if (req.body.typeSpending === 1) {
      await CreditCardController.registerSpendingCreditCard(spending.spendingId, req.body);
    }

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
    // TODO: criar tabela para registrar erros
    console.error('spendingController.registerSpending ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar registrar uma despesa.", data: null }
    );
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
      code: req.body.code,
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
    console.error('spendingController.registerTypeSpending ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar cadastrar um tipo de despesa.", data: null
    });
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