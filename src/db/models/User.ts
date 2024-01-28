import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {};

User.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  sequelize
});

User.sync();

export default User;