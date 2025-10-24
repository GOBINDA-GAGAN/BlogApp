import { Status } from "../utils/statusCodes.js";
import CategorySchema from "../models/category.model.js"

export const createCategory = async (req, res) => {
  try {
    
    const {name}=req.body

    
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    // logic here
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    // logic here
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    // logic here
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // logic here
  } catch (error) {
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
