import jwt from "jsonwebtoken";
export const generatedToken = (user) => {
  try {
    const payLoad = { user: { id: user._id } };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    return token;
  } catch (error) {
    console.log("error in token creation");
  }
};
