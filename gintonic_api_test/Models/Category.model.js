import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  strCategory: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("category", CategorySchema);

export default Category;
