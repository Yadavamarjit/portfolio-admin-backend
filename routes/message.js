import express from "express";
import { addMessage } from "../controller/messages/addMessages.js";

export const messageRoute = express.Router();

messageRoute.post("/message", addMessage);
