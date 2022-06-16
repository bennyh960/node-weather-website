import express from "express";
import chalk from "chalk";
import cors from "cors";
import axios from "axios";

// const express = require("express");
// const chalk = require("chalk");
// const cors = require("cors");
// const axios = require("axios");

// ******************
// npm run dev
// ******************

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
// app.use(
//   cors(
//     cors({
//       origin: "*",
//     })
//   )
// );

const getWeather = async (city) => {
  const { data } = await axios.get(`https://goweather.herokuapp.com/weather/${city}`);
  // console.log(data);
  return data.wind;
};

app.get("/:city", async (req, res) => {
  const { city } = req.params;
  const weatherData = await getWeather(city);
  res.status(200).send(`${city}: wind ${weatherData}`);
  // res.status(200).send(`${city}`);
  // res.status(200).send(weatherData);
  console.log(chalk.green(`${city}: wind ${weatherData}`));
  // console.log(`${city}: wind ${weatherData}`);
});

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  // console.log(chalk.green.inverse(`Server On Air on port ${PORT}!`));
  console.log(`Server On Air on port ${PORT}!`);
});
