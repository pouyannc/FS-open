import axios from 'axios'
import { useEffect, useState } from 'react'

const Search = ({ input, handleChange }) => {
  return (
    <div>Find countries <input value={input} onChange={handleChange} /></div>
  )
}

const Country = ({ country, weather }) => {
  

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Population: {country.population}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((l, i) => <li key={i}>{l}</li>)}
      </ul>
      <img style={{width: 200, borderStyle: 'solid'}} src={country.flags.svg} alt={country.flags.alt} />
      {weather && <Weather country={country} weather={weather} />}
    </div>
  )
}

const Countries = ({ countries, handleClick, weather }) => {
  if (countries && countries.length === 0) return <div>Too many matches, specify another filter</div>
  else if (countries && countries.length === 1) {
    return <Country country={countries[0]} weather={weather} />
  }

  return (
    countries &&
    countries.map((country, i) => {
      return (
        <div key={i}>
          <span>{country.name.common} </span>
          <button onClick={handleClick}>show</button>
        </div>
      )
    })
  )
}

const Weather = ({ country, weather }) => {
  return (
    <div>
      <h2>{`Weather in ${country.capital[0]}`}</h2>
      <div>Temperature: {weather.main.temp} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' />
      <div>{weather.weather[0].description}</div>
      <div>Wind: {weather.wind.speed} m/s</div>
    </div>
  )
}

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleShowClick = (e) => {
    const countryName = e.target.previousSibling.innerHTML;
    setCountries(countries.filter((country) => {
      return country.name.common === countryName.trim()
    }));
  }

  useEffect(() => {
    if (searchInput) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((res) => {
          const query = res.data.filter((country) => country.name.common.toLowerCase().includes(searchInput.toLowerCase()))
          if (query.length <= 10) {
            if (query.length === 0) setCountries(null);
            else setCountries(query);
          } else setCountries([]);
        })
    } else setCountries(null);
  }, [searchInput])

  useEffect(() => {
    if(countries && countries.length === 1) {
      const api_key = import.meta.env.VITE_SOME_KEY
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${countries[0].capital[0]}&units=metric&appid=${api_key}`)
        .then(res => {setWeather(res.data.list[0])})
    }
  }, [countries])

  return (
    <div>
      <Search input={searchInput} handleChange={handleSearchChange} />
      <Countries countries={countries} handleClick={handleShowClick} weather={weather} />
    </div>
  )
}

export default App
