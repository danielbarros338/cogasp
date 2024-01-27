import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
});

const sequelize: Sequelize = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT as Dialect,
  }
);

export default sequelize;
