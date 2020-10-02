// const { config } = require("dotenv");
const express = require("express");
require("express-async-errors");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const router = require("./routes");
const { errorHandler, notFoundHandler } = require("./middleware");

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(helmet());
app.use("/", cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'api de ce reseau social" });
});
app.use("/api", router);

app.use("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

module.exports = app;
