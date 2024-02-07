import { Model, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class SpendingClassification extends Model {
  declare spendingClassificationId: number;
  declare name: string;
};

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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false
});

// SpendingClassification.sync();

export default SpendingClassification;
