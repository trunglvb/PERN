import express from "express";
import { config as configEnv } from "dotenv";
import cors from "cors";
const app = express();
const port = 3000;

configEnv();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "DELETE", "GET"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log(process.env.CLIENT_URL);
