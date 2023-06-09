import { nanoid } from "nanoid";
import User from "../Models/User.model.js";

export const createUser = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    id: nanoid(12),
  });

  try {
    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
};

export const deleteUser = async (_, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Delete User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { firstName, lastName, age } = req.body;

  if (firstName) res.user.firstName = firstName;
  if (lastName) res.user.lastName = lastName;
  if (age) res.user.age = age;

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
