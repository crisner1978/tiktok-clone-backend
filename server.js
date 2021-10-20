import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Data from "./data.js";
import Videos from "./dbModel.js";

// app Config

const app = express();
const port = process.env.PORT || 9000;
dotenv.config();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  next();
});

// DB Config
const db_url = process.env.DB_URI;
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Endpoints

app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/v1/posts", (req, res) => res.status(200).send(Data));

app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listener

app.listen(port, () => console.log(`listening on localhost: ${port}`));
