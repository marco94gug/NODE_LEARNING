import mongoose from "mongoose";

const DrinkSchema = new mongoose.Schema({
  idDrink: {
    type: String,
    required: true,
  },
  strDrink: {
    type: String,
    required: true,
  },
  strDrinkAlternate: {
    type: String || null,
    required: false,
  },
  strTags: {
    type: String || null,
    required: false,
  },
  strVideo: {
    type: String || null,
    required: false,
  },
  strCategory: {
    type: String,
    required: true,
  },
  strIBA: {
    type: String || null,
    required: false,
  },
  strAlcoholic: {
    type: String,
    required: true,
  },
  strGlass: {
    type: String,
    required: true,
  },
  strInstructions: {
    type: String,
    required: true,
  },
  strInstructionsES: {
    type: String,
    required: false,
  },
  strInstructionsDE: {
    type: String,
    required: false,
  },
  strInstructionsFR: {
    type: String,
    required: false,
  },
  strInstructionsIT: {
    type: String,
    required: false,
  },
  "strInstructionsZH-HANS": {
    type: String,
    required: false,
  },
  "strInstructionsZH-HANT": {
    type: String,
    required: false,
  },
  strDrinkThumb: {
    type: String,
    required: true,
    default: "",
  },
  strImageSource: {
    type: String,
    required: false,
  },
  strImageAttribution: {
    type: String,
    required: false,
  },
  strCreativeCommonsConfirmed: {
    type: String,
    required: false,
  },
  dateModified: {
    type: String,
    required: false,
  },
  ingredients: {
    type: Array,
    required: true,
  },
});

const Drink = mongoose.model("drink", DrinkSchema);

const TopDrink = mongoose.model("topdrink", DrinkSchema);
const LatestDrink = mongoose.model("latest", DrinkSchema);

export { Drink, TopDrink, LatestDrink };
