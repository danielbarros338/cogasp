import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class SpendingClassification extends Model<InferAttributes<SpendingClassification>, InferCreationAttributes<SpendingClassification>> {};

SpendingClassification.init({
  spendingClassificationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  sequelize
});
