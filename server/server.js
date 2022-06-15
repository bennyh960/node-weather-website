import express from "express";
import chalk from "chalk";
import cors from "cors";
import axios from "axios";

// ******************
// npm run dev
// ******************

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const getWeather = async (city) => {
  const { data } = await axios.get(`https://goweather.herokuapp.com/weather/${city}`);
  // console.log(data);
  return data.wind;
};

app.get("/:city", async (req, res) => {
  const { city } = req.params;
  const weatherData = await getWeather(city);
  res.status(200).send(`${city}: wind ${weatherData}`);
  // res.status(200).send(weatherData);
  console.log(chalk.green(`${city}: wind ${weatherData}`));
});

app.listen(PORT, () => {
  console.log(chalk.green.inverse(`Server On Air on port ${PORT}!`));
});
