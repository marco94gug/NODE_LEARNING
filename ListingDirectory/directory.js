const fs = require("fs");

// fs.renameSync("./assets/logs", "./accounts/logs");

// console.log("logs folder moved to accounts folder");

// fs.rmdir("./assets", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("./assets folder removed");
//   }
// });

fs.readdirSync("./accounts").forEach((file) => {
  fs.renameSync(`./accounts/${file}`, `./library/${file}`);
});

console.log("Files Remved");
