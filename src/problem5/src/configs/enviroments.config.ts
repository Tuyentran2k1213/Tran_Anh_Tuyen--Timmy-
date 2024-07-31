import dotenv from "dotenv";
dotenv.config();

export const enviroments = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost/mongo",
  SECRET_KEY: process.env.SECRET_KEY,
};
