import Category from "../models/category.model.js";
import { Status } from "../utils/statusCodes.js";

// CREATE
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(Status.BAD_REQUEST).json({
        success: false,
        message: "Category name is required",
      });
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(Status.BAD_REQUEST).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({ name:name,author:req.user.user_id });
    return res.status(Status.CREATED).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("name shares _id").sort({ createdAt: -1 });
    return res.status(Status.OK).json({
      success: true,
      message: "All categories fetched",
      data: categories,
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ONE
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(Status.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(Status.OK).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(Status.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(Status.OK).json({
      success: true,
      message: "Category updated",
      data: updated,
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(Status.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(Status.OK).json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
