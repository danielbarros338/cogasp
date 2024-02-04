import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class CreditCardParcel extends Model<InferAttributes<CreditCardParcel>, InferCreationAttributes<CreditCardParcel>> {};

CreditCardParcel.init({
  creditCardParcelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  parcel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  parcelValue: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false
});

export default CreditCardParcel;
