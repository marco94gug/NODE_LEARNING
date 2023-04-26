const fs = require("fs");
/**
 * Reading directory
 */
// fs.readdir("./", function (err, files) {
//   if (err) {
//     throw err;
//   }
//   console.log(files);
// });

// console.log("reading files...");

/**
 * Reading a file
 */
fs.readFile("./readme.md", "UTF-8", (err, ipsum) => {
  console.log(ipsum);
});

console.log("reading file...");
