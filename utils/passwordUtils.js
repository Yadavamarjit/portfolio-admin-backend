import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};
