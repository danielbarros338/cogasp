import { Model, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class TypeSpending extends Model {
  declare typeSpendingId: number;
  declare name: string;
};

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
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false
})

export default TypeSpending;