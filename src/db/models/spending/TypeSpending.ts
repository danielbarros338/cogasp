import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class TypeSpending extends Model<InferAttributes<TypeSpending>, InferCreationAttributes<TypeSpending>> {};

TypeSpending.init({
  typeSpendingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false
})

export default TypeSpending;