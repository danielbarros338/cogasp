import { Model, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class Spending extends Model {
  declare spendingId: number;
  declare name: string;
  declare typeSpendingId: number;
};

Spending.init({
  spendingId: {
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
  typeSpendingId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  payday: {
    type: DataTypes.DATE,
    allowNull: true
  },
  classification: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize
});

// Spending.sync({ force: true });

export default Spending;