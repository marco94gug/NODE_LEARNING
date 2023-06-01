const { createServer } = require("http");
const data = require("./data");
// const fs = require("fs");

// const dataByFS =

const PORT = 8000;

createServer((req, res) => {
  const userRequest = req.url.slice(1, req.url.length).toLocaleLowerCase();

  res.writeHead(200, { "Content-Type": "application/json" });

  if (
    data.find((user) => user.name.toLocaleLowerCase().includes(userRequest))
  ) {
    let foundUser = data.filter((user) =>
      user.name.toLocaleLowerCase().includes(userRequest)
    );
    res.end(JSON.stringify(foundUser));
    return;
  } else if (req.url === "/") {
    res.end(JSON.stringify(data));
  } else {
    res.end(JSON.stringify({ message: "User not found!" }));
  }
}).listen(PORT);

console.log(`Server running on port ${PORT}`);
