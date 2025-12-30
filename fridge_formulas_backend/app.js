const express = require("express");
const router = require("./routes/index");
const mongoose = require("mongoose")
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/Fridge_Formulas_db");

const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(router);
app.use(errorLogger); // enabling the error logger
// Handling all undefined routes (404)
app.use((req, res) => {
  res
    .status(404)
    .send({ message: "Requested resource not found" });
});

// celebrate error handler
app.use(errors());

// we handle all errors here, by logging the error to the console
// and sending a response with an appropriate status code and message
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
