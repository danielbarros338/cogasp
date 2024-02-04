import { Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class User extends Model {
  declare userId: number;
  declare username: string;
  declare password: string;
};

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
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  sequelize
});

// User.sync({ force: true });

export default User;