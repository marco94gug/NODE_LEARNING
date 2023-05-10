import express from "express";

import { Drink } from "../Models/Drink.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { t } = req.query;
  const drinks = await Drink.find({
    strDrink: {
      $regex: t,
      $options: "i",
    },
  });
  try {
    if (drinks === null) {
      res.status(404).send({ message: "Drink not found" });
    } else {
      res.status(200).send(drinks);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
