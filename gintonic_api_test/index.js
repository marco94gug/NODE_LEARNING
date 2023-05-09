import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import drinkRoutes from "./routes/drinks.js";

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

app.use(express.json());

app.get("/", (req, res) => res.send("Hello from HomePage!"));

app.use("/drinks", drinkRoutes);

const PORT = process.env.PORT;

app.listen(PORT);
