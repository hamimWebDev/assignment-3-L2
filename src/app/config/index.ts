import dotenv from "dotenv";
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_routs: process.env.BCRYPT_SALT_ROUTS,
  jwt_secret: process.env.JWT_SECRET,
};
