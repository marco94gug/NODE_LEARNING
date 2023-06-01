const { createServer } = require("http");
const { createReadStream } = require("fs");

const PORT = 8000;

const sendFile = (res, status, type, file) => {
  res.writeHead(status, { "Content-Type": type });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  switch (req.url) {
    case "/":
      return sendFile(res, 200, "text/html", "./home-page.html");
    case "/styles.css":
      return sendFile(res, 200, "text/css", "./styles.css");
    default:
      return sendFile(res, 404, "text/html", "./404.html");
  }
}).listen(PORT);

console.log(`Server is listening on port ${PORT}`);
