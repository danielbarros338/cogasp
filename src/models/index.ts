import * as userModels from "./user";
import * as creditCardModels from "./creditCard";
import * as earningModels from "./earning";
import * as spendingModels from "./spending";

userModels.default.User.hasMany(spendingModels.default.Spending, {
  foreignKey: "userId"
});

userModels.default.User.hasMany(spendingModels.default.SpendingClassification, {
  foreignKey: "userId"
});

userModels.default.User.hasMany(creditCardModels.default.CreditCard, {
  foreignKey: "userId"
});

userModels.default.User.hasMany(earningModels.default.Earning, {
  foreignKey: "userId"
});

creditCardModels.default.CreditCardParcel.belongsTo(spendingModels.default.Spending, {
  foreignKey: "spendingId"
});

export default {
  creditCardModels: creditCardModels.default,
  earningModels: earningModels.default,
  spendingModels: spendingModels.default,
  userModels: userModels.default
}
