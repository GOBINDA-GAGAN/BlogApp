import mongoose from "mongoose";
import User from "../models/user.model.js";
import { Status } from "../utils/statusCodes.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const {} = req.body;

    const createdUser = await mongoose.create();

    return res.status(Status.ACCEPTED).json({
      success: true,
      message: "",
      error: {},
      data: createdUser,
    });
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

//login a user
export const loginUser = async (req, res) => {
  try {
    const {} = req.body;

    const createdUser = await mongoose.create();

    return res.status(Status.ACCEPTED).json({
      success: true,
      message: "",
      error: {},
      data: createdUser,
    });
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
