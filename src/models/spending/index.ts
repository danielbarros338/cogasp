import TypeSpending from "./TypeSpending";
import Spending from "./Spending";
import SpendingClassification from "./SpendingClassification";

Spending.sync();
SpendingClassification.sync();
TypeSpending.sync();

export default {
  TypeSpending,
  Spending,
  SpendingClassification
}