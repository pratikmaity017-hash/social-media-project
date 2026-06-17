// env file theka secret gulo import korlam ar check korlam ja exists kore kina data

import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defiend");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET isnot defiend");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 3000,
};

export default config;
