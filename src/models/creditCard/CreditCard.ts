import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class CreditCard extends Model<InferAttributes<CreditCard>, InferCreationAttributes<CreditCard>> {};

CreditCard.init({
  creditCardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  cardName: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  flag: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  endNumber: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  dueDate: {
    type: DataTypes.CHAR(5),
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize
});

export default CreditCard;
