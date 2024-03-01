import express from "express";
import { getTechsByName } from "../controller/techs/getTechsByNames.js";
import { getTechs } from "../controller/techs/getTechs.js";

export const techRoute = express.Router();

techRoute.get("/get/:techs", getTechsByName);
techRoute.get("/all", getTechs);
