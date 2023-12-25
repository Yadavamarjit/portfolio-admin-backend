import express from "express";
import { authenticateUser } from "../middleware/userMiddleware.js";
import { getAdminData } from "../controller/user/getAdminData.js";

export const userRouter = express.Router();

userRouter.get("/admin", authenticateUser, getAdminData);
