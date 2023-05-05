import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";
import User from "../Models/User.model.js";

const router = express.Router();

// all routes in here start with /users
router.get("/", getUsers);

router.post("/", createUser);

router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

router.delete("/:id", getUser, deleteUser);

router.patch("/:id", getUser, updateUser);

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

export default router;
