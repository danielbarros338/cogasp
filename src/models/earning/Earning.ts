import { Model, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class Earning extends Model {
  declare earningId: number;
  declare name: string;
  declare value: number;
  declare date: Date;
  declare typeEarningId: number;
};

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
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize
});

// Earning.sync({ force: true });

export default Earning;