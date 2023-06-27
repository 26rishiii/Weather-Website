import React,{useState} from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const[data,setData] = useState({})
  var[location,setLocation] = useState('')
  
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=344897150b7865108ffa449147430459&units=metric`

  const searchLocation = (button) => {
    if(button.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const date = (d) => {
    let months = ["January","February","March","April","May","June","July","August","September",
    "October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednrsday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof data.main != "undefined") 
                    ? ((data.main.temp<22) 
                        ? 'app cold' 
                        : 'app') 
                    : 'app'}>
      <div className="search">
        <input
        value={location}
        onChange={button => setLocation(button.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text"/>
      </div>
      <div className="main">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div classname="date">{date(new Date())}</div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
{data.name !== undefined &&      
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
            <p>Winds</p>
          </div>
        </div>
}
      </div>
    </div>
  );
}

export default App;
