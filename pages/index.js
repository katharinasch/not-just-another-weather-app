import { SearchBar } from '../components/SearchBar.js'
import { ForecastButtons } from '../components/ForecastButtons.js'
import React, { useState } from 'react'



export default function Form() {
  const [city, setCity] = useState('')

  return (
    <div className="bg-blue-200">
      <div className="container mx-auto py-36 bg-blue-200">
        <div className="mt-12 px-96">
          <form action="#" method="POST" className="sm:grid-cols-2 sm:gap-x-8">
            
            <SearchBar city={city} setCity={setCity} />
            <ForecastButtons city={city}/>

          </form>
      </div>
    </div>
  </div>
  )
}