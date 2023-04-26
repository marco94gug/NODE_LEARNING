const fs = require("fs");

let streams = fs.createReadStream("./chat-logs/ben-kenobi-chat.log", "utf8");

let data;

streams.once("data", (chunk) => {
  console.log("read stream started");
  console.log("==============");
  console.log(chunk);
});

streams.on("data", (chunk) => {
  console.log(`chunk: ${chunk.length}`);
  data += chunk;
});

streams.on("end", () => {
  console.log(`finished ${data.length}`);
});

console.log("Reading the file");
