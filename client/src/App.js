import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    console.log(city);
    const getApi = async (city) => {
      // * in local env
      // const { data } = await axios.get(`http://localhost:5000/${city}`);
      // * with heroku
      const { data } = await axios.get(`/${city}`);
      setWeather(data);
      console.log("data", data);
    };
    if (city) {
      getApi(city);
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(temp);
  };

  return (
    <div>
      <div>hello from port 3000</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>City</label>
        <input value={temp} onChange={(e) => setTemp(e.target.value)} />
        <button>submit</button>
      </form>
      <div>Weather is {weather}</div>
    </div>
  );
}

export default App;
