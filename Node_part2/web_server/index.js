const { createServer } = require("http");

const PORT = 8000;

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  console.log("Request =>", req);
  res.end(JSON.stringify(req));
  //   res.end(`
  //     <!DOCTYPE html>
  //     <html>
  //         <body>
  //             <h1>Serving HTML Text</h1>
  //             <p>${req.method} request made for ${req.url}</p>
  //         </body>
  //     </html>
  //   `);
}).listen(PORT);

console.log(`Web server listening on port ${PORT}`);
