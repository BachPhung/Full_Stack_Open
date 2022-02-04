import React, { useState, useEffect } from 'react'
import axios from 'axios';
const { REACT_APP_KEY_API } = process.env
export const Details = ({ info }) => {
    console.log(info)
    const [weather, setWeather] = useState({})
    useEffect(() => {
        const getData = async () => {
            axios.defaults.baseURL = 'http://api.openweathermap.org';
            const res = await axios.get(`/data/2.5/weather?q=${info.capital}&appid=${REACT_APP_KEY_API}`)
            setWeather(res.data)
        }
        getData()
    }, [info])
    return (
        <div>
            <h2>{info.name}</h2>
            <div>capital {info.capital}</div>
            <div>population {info.population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {(info.languages).map(item => <li key={item.name}>{item.name}</li>)}
            </ul>
            <div>
                <img style={{ width: '100px', height: '100px' }} src={(info.flags).png} alt='flag'></img>
            </div>
            <h3>Weather in {info.capital}</h3>
            {Object.keys(weather).length !== 0 &&
                <div>
                    <div> <strong>temperature:</strong> {(weather.main.temp - 273.15).toFixed(2)} Celcius</div>
                    <div> <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} style={{height:'100px', width:'100px'}} /></div>
                    <div> <strong>wind: </strong>{weather.wind.speed} mph </div>
                </div>
            }
        </div>
    )
}
