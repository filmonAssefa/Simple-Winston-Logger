const express = require("express");
const mongoose = require("mongoose");
const port = 1010;
const logger = require("./logger");
require('dotenv').config();



mongoose
  .connect(process.env.MONGOURL)
  .then(console.log("Connect to database"))
  .catch((err) => console.log(err.message));

  const app = express();

  app.use(express.json())

  app.listen(port, () => {
    logger.info(`Server running on Port ${port}...`)
  })