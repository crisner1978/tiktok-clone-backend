require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')

// app Config


const app = express();
const port = process.env.PORT || 9000;


// Middlewares
const corsOptions = {
  origin: 'https://tiktok-clone-rise.web.app',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"),
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//   next();
// });

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

const tiktokSchema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  messages: String,
  description: String,
  shares: String,
});

let Videos = mongoose.model('tiktokvideos', tiktokSchema);

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
