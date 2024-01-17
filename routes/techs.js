import express from "express";
import { getTechsByName } from "../controller/techs/getTechsByNames.js";

export const techRoute = express.Router();

techRoute.get("/:techs", getTechsByName);
