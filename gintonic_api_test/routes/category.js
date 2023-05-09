import express from "express";
import Category from "../Models/Category.model.js";
import { getDrinkByCategory } from "../controllers/drink.controllers.js";

const router = express.Router();

router.get("/list", async (_, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", getDrinkByCategory);

export default router;
