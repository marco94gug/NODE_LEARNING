import Drink from "../Models/Drink.model.js";

export const getDrinks = async (_, res) => {
  try {
    const drinks = await Drink.find();
    res.status(200).send(drinks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDrink = async (req, res) => {
  const drink = new Drink(req.body);

  try {
    const newDrink = await drink.save();

    res.status(200).json(newDrink);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDrink = async (req, res) => {
  const { id } = req.params;
  const drink = await Drink.findOne({ idDrink: id });

  try {
    if (drink === null) {
      return res.status(404).json({ message: "Cannot find Drink" });
    } else {
      res.status(200).json(drink);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
