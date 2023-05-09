import express from "express";
import {
  createDrink,
  getDrink,
  getDrinks,
} from "../controllers/drink.controllers.js";

import Drink from "../Models/Drink.model.js";

const router = express.Router();

router.get("/", getDrinks);

router.post("/", createDrink);

router.get("/:id", getDrink);

export default router;
