const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(require("./routes/index"));

mongoose
  .connect(
    "mongodb+srv://into:code@cluster0.ophke.mongodb.net/pharmacy_db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    app.listen(3000);
    console.log("Соединение установлено");
  })
  .catch(() => {
    console.log("Произошла ошибка");
  });
