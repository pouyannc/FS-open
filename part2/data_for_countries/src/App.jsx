import axios from 'axios'
import { useEffect, useState } from 'react'

const Search = ({ input, handleChange }) => {
  return (
    <div>find countries <input value={input} onChange={handleChange} /></div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Population: {country.population}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((l, i) => <li key={i}>{l}</li>)}
      </ul>
      <img style={{width: 200}} src={country.flags.svg} alt={country.flags.alt} />
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries && countries.length === 0) return <div>Too many matches, specify another filter</div>
  else if (countries && countries.length === 1) return <Country country={countries[0]} />

  return (
    countries &&
    countries.map((country, i) => {
      return <div key={i}>{country.name.common}</div>
    })
  )
}

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState(null);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    if (searchInput) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((res) => {
          const query = res.data.filter((country) => country.name.common.toLowerCase().includes(searchInput.toLowerCase()))
          if (query.length <= 10) setCountries(query);
          else setCountries([]);
        })
    } else setCountries(null);
  }, [searchInput])

  return (
    <div>
      <Search input={searchInput} handleChange={handleSearchChange} />
      {<Countries countries={countries} />}
    </div>
  )
}

export default App
