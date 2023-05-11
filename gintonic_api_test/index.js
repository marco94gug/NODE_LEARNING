import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import drinkRoutes from "./routes/drinks.js";
import categoryRoutes from "./routes/category.js";
import searchRoutes from "./routes/search.js";
import {
  getLatestDrinks,
  getTopDrinks,
} from "./controllers/drink.controllers.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  dbName: "gintonicApi",
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PSW,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Server Started!"));

const setHeadersMiddleware = (req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "*");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Pass to next layer of middleware
  next();
};

app.use(express.json());

app.get("/", (_, res) => res.send("Hello from HomePage!"));

app.use("/drinks", setHeadersMiddleware, drinkRoutes);

app.use("/category", setHeadersMiddleware, categoryRoutes);

app.use("/search", setHeadersMiddleware, searchRoutes);

app.get("/popular", setHeadersMiddleware, getTopDrinks);

app.get("/latest", setHeadersMiddleware, getLatestDrinks);

const PORT = process.env.PORT;

app.listen(PORT);
