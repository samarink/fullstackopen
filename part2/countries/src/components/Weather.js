import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [report, setReport] = useState({});

  const apikey = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  const isEmptyObj = (empty) =>
    Object.keys(empty).length === 0 && empty.constructor === Object;

  const kelvinToCelc = (fahr) => Math.round(Number(fahr) - 273.15);

  useEffect(() => {
    axios.get(url).then(({ data }) => setReport(data));
  }, [url]);

  return (
    <>
      {!isEmptyObj(report) && (
        <div>
          <p>temperature {kelvinToCelc(report.main.temp)} C</p>
          <p>wind {report.wind.speed} km/h</p>
        </div>
      )}
    </>
  );
};

export default Weather;
