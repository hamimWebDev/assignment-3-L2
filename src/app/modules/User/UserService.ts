import config from "../../config";
import TUser from "./UserInterface";
import { User } from "./UserSchemaModel";
import bcrypt from "bcrypt";

const postUserFromDb = async (userData: TUser) => {
  // Hash the user's password
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_routs),
  );

  // Update the userData with the hashed password
  userData.password = hashedPassword;

  // Create the user in the database
  const result = await User.create(userData);

  const { password, createdAt, updatedAt, ...rest } = result.toObject();

  // Return the user data without the password, createdAt, updatedAt
  return rest;
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

export const userServices = {
  postUserFromDb,
  getAllUsers,
};
