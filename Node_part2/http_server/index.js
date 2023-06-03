import express from "express";
import fs, { readFileSync } from "fs";
import bodyParser from "body-parser";

const mockData = JSON.parse(readFileSync("./data.json"));
let definitions = mockData;

const PORT = 3000;
const app = express();

app.use("/", express.static("./client"));
app.get("/data", (req, res) => {
  res.json(definitions);
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log(req.body);
  }
  next();
});

app.post("/data", bodyParser.json(), (req, res) => {
  definitions.push(req.body);
  save();
  res.json({
    status: "success",
    data: req.body,
  });
});

app.delete("/data/:file", (req, res) => {
  definitions = definitions.filter((item) => item.file !== req.params.file);
  save();
  res.json({
    status: "success",
    removed: req.params.file,
    newLength: definitions.length,
  });
});

const save = () => {
  fs.writeFile("./data.json", JSON.stringify(definitions, null, 2), (err) => {
    if (err) {
      throw err;
    }
  });
};

app.listen(PORT, () => {
  console.log(`Web server listening on port: ${PORT}`);
});
