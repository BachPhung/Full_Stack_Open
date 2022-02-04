import { useEffect, useState } from 'react'
import axios from 'axios';
import { Details } from './components/Details';
function App() {
  const [countries, setCountries] = useState([])
  const [input, setInput] = useState('')
  const [show, setShow] = useState(0)
  useEffect(() => {
    const getCountries = async () => {
      let url = input.length !== 0 && `https://restcountries.com/v2/name/${input}`
      if (input.length !== 0) {
        const res = await axios.get(url)
        setCountries(res.data)
      }
    }
    getCountries()
    setShow(0)
  }, [input])

  return (
    <div>
      <div>
        find countries <input value={input} onChange={(e) => {
          setInput(e.target.value)
        }}></input>
      </div>
      {
        (countries.length > 10 && input.length !== 0) && <div>Too many matches, specify another filter</div>
      }
      {
        (countries.length <= 10 && countries.length > 1)
        && <div>
          {countries.map((country, index) =>
            <div key={country.name}>
              {country.name}
              <button onClick={() => setShow(index+1)}>show</button>
            </div>)}
            {show > 0 && <div>
                <Details info={countries[show-1]}/>
              </div>}
        </div>
      }
      {
        countries.length === 1 &&
        <div>
          <Details info={countries[0]} />
        </div>
      }
    </div>
  )
}
export default App;
