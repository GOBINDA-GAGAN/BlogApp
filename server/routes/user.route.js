// user.routes.js

import express from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

// register a new user
router.post("/auth/register", createUser);
router.post("/auth/login", loginUser);

export default router;
