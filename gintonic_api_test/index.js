import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";

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

app.use(compression());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://the-gintonic-project.vercel.app",
  function (origin, callback) {
    if (origin.endsWith("marco94gug.vercel.app")) {
      callback(error, [origin]);
    }
  },
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

// handle preflight requests
app.options(
  "*",
  cors({
    origin: allowedOrigins,
  })
);

app.get("/", (_, res) => res.send("Hello from HomePage!"));

app.use("/drinks", drinkRoutes);

app.use("/category", categoryRoutes);

app.use("/search", searchRoutes);

app.get("/popular", getTopDrinks);

app.get("/latest", getLatestDrinks);

const PORT = process.env.PORT;

app.listen(PORT);
