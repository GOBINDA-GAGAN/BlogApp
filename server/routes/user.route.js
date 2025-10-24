// user.routes.js

import express from "express";
import { createUser, getMyProfile, getUserprofile, loginUser, logout } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// register a new user
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout",checkAuth,logout)
router.get("/profile",checkAuth,getMyProfile)
router.get("/:id",getUserprofile );

export default router;
