import bcrypt from "bcryptjs";

export const hashPasswordGenerate = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log("error in password hash", error.message);
  }
};
