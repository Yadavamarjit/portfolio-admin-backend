import express from "express";
import { addVisitor } from "../controller/Visitors.js";

const visitorsRoute = express.Router();

visitorsRoute.post("/", addVisitor);

export { visitorsRoute };
