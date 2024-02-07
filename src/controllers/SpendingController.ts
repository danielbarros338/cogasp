import { Request, Response } from "express";
import * as CreditCardController from "./CreditCardController";
import models from "@src/models";

export async function registerSpending(req: Request, res: Response): Promise<void> {
  const { Spending, TypeSpending } = models.spendingModels;

  let typeSpendingCode;
  try {
    const typeSpending = await TypeSpending.findOne({
      where: { typeSpendingId: req.body.typeSpendingId }
    });

    if (!typeSpending) {
      res.status(404).json({ message: "Tipo de desepesa informado não cadastrado.", data: null });
      return;
    }

    typeSpendingCode = typeSpending.code
  } catch(err) {
    console.error('spendingController.registerSpending ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar resgatar o tipo de despesa informado.", data: null }
    );

    return;
  }

  try {
    const spending = await Spending.create({
      name: req.body.name,
      value: req.body.value,
      date: req.body.date,
      typeSpendingId: req.body.typeSpendingId,
      dueDate: req.body.dueDate,
      payday: req.body.payday,
      classification: req.body.classification,
      userId: req.body.userId
    });

    if (typeSpendingCode === "CDC") {
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
    console.error('spendingController.registerSpendingClassification ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar registrar uma classificação de despesa.", data: null }
    );
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
  const { Spending, TypeSpending } = models.spendingModels;
  const { CreditCardParcel } = models.creditCardModels;

  // TODO: Adicionar lógica para resgatar os dados de tipo de despesa. Se cartão de crédito, retornar as parcelas.
  let typeSpendings;
  try {
    typeSpendings = await TypeSpending.findAll();
  } catch (err) {
    console.error('spendingController.getSpendings ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar resgatar os tipos de despesas.", data: null
    });

    return;
  }

  try {
    const spendingsPreProcessed = await Spending.findAll({
      where: { userId: req.params.userId }
    });

    const spendings= [];
    const cdc = typeSpendings.filter(typeSpending => typeSpending.code === "CDC");

    for (const spending of spendingsPreProcessed) {
      if (spending.typeSpendingId === cdc[0].typeSpendingId) {
        let creditCardParcels
        try {
          creditCardParcels = await CreditCardParcel.findAll({ 
            where: { spendingId: spending.spendingId }
          });

          // The shorthand property is not being used because it returns Sequelize metadata.
          spendings.push({ spending: spending, creditCardParcels })
        } catch (err) {
          console.error('spendingController.getSpendings ERROR: ',err);

          if (err instanceof Error) {
            err = err.message;
          }

          throw new Error(`Error on get CreditCardParcels in spendingController.getSpendings: ${err}`)
        }
      } else {
        spendings.push({ ...spending, CreditCardParcels: [] });
      }
    }

    res.status(200).json({ message: "", data: spendings });
  } catch (err) {
    console.error('spendingController.getSpendings ERROR: ',err);

    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar resgatar as despesas.", data: null
    });
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
    console.error('spendingController.getSpendingsClassification ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar resgatar as classificações de despesas.", data: null
    });
  }
}

export async function getTypeSpendings(req: Request, res: Response): Promise<void> {
  const { TypeSpending } = models.spendingModels;

  try {
    const typeSpendings = await TypeSpending.findAll();

    res.status(200).json({ message: "", data: typeSpendings });
  } catch(err) {
    console.error('spendingController.getTypeSpendings ERROR: ',err);
    res.status(500).json(
      { message: "Ocorreu um erro no processamento de dados ao tentar resgatar os tipos de despesas.", data: null
    });
  }
}