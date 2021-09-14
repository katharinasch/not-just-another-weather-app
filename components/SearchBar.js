import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export const SearchBar = () => {
  const [city, setCity] = useState('')
  const [payload, setPayload] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cityList, setCityList] = useState(null)


  const handleOnSearch = (string, cityList) => {
    if(string.length >= 3) {
      const options = {
        method: `GET`,
      };
      fetch(`/api/cityList?city=${string}`, options)
      .then((response) => {
        if(response.ok){
          return response.json().then(setCityList)
        }
          throw new Error('Api is not available') 
        })
      .catch(error => {
        console.error('Error fetching data: ', error)
        setError(error)
      })
      .finally(setLoading(false))
    }
  }

  const allCities = cityList ? cityList : []
  console.log('all cities: ', allCities)

  const handleOnSelect = (item) => {
    const city = item?.name
    setCity(city)   
  }

  const fetchCityData = () => {
    const options = {
      method: `POST`,
    };
    fetch(`/api/weather?city=${city}`, options)
    .then((response) => {
      if(response.ok){
        return response.json().then(setPayload)
      }
        throw new Error('Api is not available') 
      })
    .catch(error => {
      console.error('Error fetching data: ', error)
      setError(error)
    })
    .finally(setLoading(false))
  }

  console.log(payload)

  const location = payload?.location?.name;
  const currentTemp = payload?.current?.temp_c;


  return(
    <div >
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Search city
      </label>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="mt-1">
            <ReactSearchAutocomplete
              id="city"
              name="city"
              type="text"
              items={allCities}
              fuseOptions={{ keys: ["name"] }}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              autoFocus
              autoComplete="off"
              className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="col-span-2 mt-1">
          <button className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='button' onClick={fetchCityData}>
            Check weather
          </button>
        </div>
      </div>
      <p key={city?.location?.id} className='my-5'>
        { location ? `Current weather in ${location} is ${currentTemp} degrees ` : 'Please search for city to see current weather'}
      </p>
    </div>
  )
}
