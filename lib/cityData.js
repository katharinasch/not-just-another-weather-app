
const fetch = require('cross-fetch');
const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';

const fetchCityData = (city) => {  
  const options = {
    method: `POST`,
  };
  return fetch(`${server}/api/weather?city=${city}`, options)
  .then((response) => {
    if(response.ok){
      return response.json()
    }
      throw new Error('Api is not available') 
    })
  .catch(error => {
    console.error('Error fetching data in city data: ', error)
  })
}

/*   try {
  let response = await fetch(`${server}/api/weather?city=${city}`, options)
  if (response.ok) {
    let data = await response.json()
    console.log(data)
    return data
  } else {
    throw new Error('Api is not available')
  }
} catch {
  error => {
    console.error('Error fetching data in city data: ', error)
  }
}
} */


//fetchCityData('London')
module.exports.fetchCityData = fetchCityData;