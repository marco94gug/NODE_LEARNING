import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  dbName: "Users_test",
  user: process.env.USER_NAME,
  pass: process.env.PASS,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Server Started"));

console.log(process.env.DATABASE_URL);

const PORT = 5002;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => res.send("Hello from Homepage"));

app.get("/test", (req, res) => res.send(process.env.DATABASE_URL));

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
