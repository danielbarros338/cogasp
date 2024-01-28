import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class Spending extends Model<InferAttributes<Spending>, InferCreationAttributes<Spending>> {};

Spending.init({
  spendignId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  value: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  date: {
    type:DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize
});