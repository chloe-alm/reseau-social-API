const { config } = require("dotenv");
config(); // dotenv.config()
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const { router } = require("./routes");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev")); // logger middleware
app.use(helmet()); // secure http header

app.get("/", (req, res) => {
  res.send("Bienvenue sur ce reseau social");
});

app.use("/api/", router);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));