var express = require("express");
var app = express(); // expressJS API REST
var bodyParser = require("body-parser");
var filesRoute = require("./routes/files");

//MIDDLEWARE PARA RECIBIR CONEXIONES DE DIFERENTES DOMINIOS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

// Routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/v1", filesRoute);

app.listen(3500, () => {
  console.log("Express ejecutado en el puerto 3500");
});

module.exports = app;
