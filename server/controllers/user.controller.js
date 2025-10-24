import User from "../models/user.model.js";
import { Status } from "../utils/statusCodes.js";
import {
  comparePassword,
  hashPasswordGenerate,
} from "../utils/hashPassword.js";
import { generatedToken } from "../utils/generatedToken.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const {
      fistName,
      middleName,
      lastName,
      username,
      email,
      phoneNumber,
      role,
      password,
      notification,
      profileImage,
      profileBanner,
      bio,
      location,
      gender,
      socialMedia,
    } = req.body;

    const existIngUser = await User.findOne({ email });
    if (existIngUser) {
      return res.status(Status.UNAUTHORIZED).json({
        success: false,
        message: "User already exist,please login with this email id",
        error: null,
        data: {},
      });
    }
    const hashPassword = await hashPasswordGenerate(password);
    // Create a new user
    const createdUser = await User.create({
      fistName,
      middleName,
      lastName,
      username,
      email,
      phoneNumber,
      role,
      password: hashPassword,
      notification,
      profileImage,
      profileBanner,
      bio,
      location,
      gender,
      socialMedia,
    });

    // Return success response
    return res.status(Status.CREATED).json({
      success: true,
      message: "User created successfully",
      error: null,
      data: createdUser,
    });
  } catch (error) {
    // Return error response
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      error: error,
      data: null,
    });
  }
};

//login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(Status.NOT_FOUND).json({
        success: false,
        message: "User not found || Invalid credential",
        error: null,
        data: {},
      });
    }

    const isMatchedPassword = await comparePassword(password, user.password);
    if (!isMatchedPassword) {
      return res.status(Status.NOT_FOUND).json({
        success: false,
        message: "Password not match || Invalid credential",
        error: null,
        data: {},
      });
    }

    const token = generatedToken(user);

    // update last login
    user.lastLogin = new Date();
    user.isLogin = true;
    const savedUser = await user.save();

    const finalUser = {
      _id: savedUser._id,
      email: savedUser.email,
      username: savedUser.username,
      role: savedUser.role,
      token: token,
      isLogin: savedUser.isLogin,
    };

    // ---- ✅ Set token in cookie ----
    res.cookie("auth_token", token, {
      httpOnly: true, // cannot be accessed by JS
      secure: false, // set true in production (https)
      sameSite: "lax", // reduce CSRF risk
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(Status.ACCEPTED).json({
      success: true,
      message: "User login successfully",
      error: {},
      data: finalUser,
    });
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

//@dec myProfile
//@route GET /api/v1/users/profile
export const getMyProfile = async (req, res) => {
  try {
    const  user_id  = req.user.user_id;
    if (!user_id) {
      return res.status(Status.NOT_FOUND).json({
        success: false,
        message: "Fail to fetched User profile",
        error: {},
        data: {},
      });
    }
    const profile = await User.findById(user_id);
    if (!profile) {
      return res.status(Status.OK).json({
        success: false,
        message: " Fail to fetched User profile",
        error: {},
        data: {},
      });
    }
    return res.status(Status.OK).json({
      success: true,
      message: "User profile fetched successfully",
      error: {},
      data: profile,
    });
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

//user profile
export const getUserprofile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await User.findById(id);
    if (!profile) {
      return res.status(Status.OK).json({
        success: false,
        message: " Fail to fetched User profile",
        error: {},
        data: {},
      });
    }
    return res.status(Status.OK).json({
      success: true,
      message: "User profile fetched successfully",
      error: {},
      data: profile,
    });
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    return res
      .clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(Status.OK)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

//
