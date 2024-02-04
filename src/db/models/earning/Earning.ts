import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class Earning extends Model<InferAttributes<Earning>, InferCreationAttributes<Earning>> {};

Earning.init({
  earningId: {
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
  },
  typeEarningId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize
});

export default Earning;