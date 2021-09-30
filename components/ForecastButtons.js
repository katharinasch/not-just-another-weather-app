import React, { useState, useEffect } from 'react';
import { fetchCityData } from '../lib/cityData'

export const ForecastButtons = ({ city }) => {
  const [payload, setPayload] = useState(null)
  //const [error, setError] = useState(null)
  //const [loading, setLoading] = useState(true)

  const getData = () => {
    fetchCityData(city).then((payload) => setPayload(payload));
  }
  const location = payload?.location?.name;
  const currentTemp = payload?.current?.temp_c;

  return(
    <div className="sm:col-span-2">
      <p className="block text-sm font-medium text-gray-700">Select forecast</p>
        <button onClick={getData} className="mt-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type='button'>
          Today
        </button>
        <p key={city?.location?.id} className='my-5'>
          { location ? `Current weather in ${location} is ${currentTemp} degrees` : 'Please search for city to see current weather' }
        </p>
    </div>
  )
}
