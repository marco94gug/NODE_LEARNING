import express from "express";
import { getDrink, getDrinks } from "../controllers/drink.controllers.js";

const router = express.Router();

router.get("/", getDrinks);

router.get("/:id", getDrink);

export default router;
