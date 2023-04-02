import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
