// const fs = require("fs");
import fs from "fs";
import dotenv from "dotenv";
// const dotenv = require("dotenv");

dotenv.config();

const path = "/search.php?s=";
const filterCategory = "/list.php?c=list";

async function getInfo() {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list",
    {
      headers: {
        "Content-type": "application/json",
        // "X-RapidAPI-Key": process.env.API_SECRET,
        // "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    }
  );

  const response = await res.json();

  console.log(response);
  fs.writeFile("categories.json", JSON.stringify(response), (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Category List Printed!");
    }
  });
  // let responseEdited = [];

  // for (const drink of response.drinks) {
  //   let ingredients = [];
  //   for (let i = 0; i < Object.keys(drink).length; i++) {
  //     if (
  //       drink[`strIngredient${i + 1}`] !== null ||
  //       drink[`strMeasure${i + 1}`] !== null
  //     ) {
  //       ingredients.push({
  //         ingredient: drink[`strIngredient${i + 1}`],
  //         measure: drink[`strMeasure${i + 1}`],
  //       });
  //     } else {
  //       break;
  //     }
  //   }
  //   for (let i = 0; i < Object.keys(drink).length; i++) {
  //     delete drink[`strIngredient${i + 1}`];
  //     delete drink[`strMeasure${i + 1}`];
  //   }

  //   responseEdited.push({ ...drink, ingredients });
  // }

  // fs.writeFile("gintonic_list.json", JSON.stringify(responseEdited), (err) => {
  //   if (err) throw err;
  //   else {
  //     console.log("file Donwloaded!");
  //   }
  // });
}

getInfo();
