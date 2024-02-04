import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class TypeEarning extends Model<InferAttributes<TypeEarning>, InferCreationAttributes<TypeEarning>> {};

TypeEarning.init({
  typeEarningId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false
});

export default TypeEarning;