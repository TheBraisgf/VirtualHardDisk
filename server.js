require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

//MW Morgan
app.use(morgan("dev"));

//MW ERROR
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send({
    status: "Error",
    message: err.message,
  });
});
//MW 404
app.use((req, res) => {
  res.status(404);
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at ${process.env.PORT}`);
});
