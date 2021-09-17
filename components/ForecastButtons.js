import React, { useState } from 'react';


export const ForecastButtons = ({city}) => {
  const [payload, setPayload] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const fetchCityData = () => {
    console.log(city)
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
  
  const location = payload?.location?.name;
  const currentTemp = payload?.current?.temp_c;

  return(
    <div className="sm:col-span-2">
      <p className="block text-sm font-medium text-gray-700">Select forecast</p>
        <button onClick={fetchCityData} className="mt-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Today
        </button>
        <p key={city?.location?.id} className='my-5'>
          { location ? `Current weather in ${location} is ${currentTemp} degrees ` : 'Please search for city to see current weather'}
        </p>
    </div>
  )
}

