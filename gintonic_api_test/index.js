import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

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

// const setHeadersMiddleware = (req, res, next) => {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader("Access-Control-Allow-Methods", "*");

//   // Request headers you wish to allow
//   res.setHeader("Access-Control-Allow-Headers", "*");

//   // Pass to next layer of middleware
//   next();
// };

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://the-gintonic-project.vercel.app",
      new RegExp(`^https:\/\/(.+)marco94gug.vercel.app\/$`),
    ],
  })
);

// app.options("*", cors());

app.get("/", (_, res) => res.send("Hello from HomePage!"));

app.use("/drinks", drinkRoutes);

app.use("/category", categoryRoutes);

app.use("/search", searchRoutes);

app.get("/popular", getTopDrinks);

app.get("/latest", getLatestDrinks);

const PORT = process.env.PORT;

app.listen(PORT);
