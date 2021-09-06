const url = (city) => `https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${city}`;

export default async function handler(req, res) {

const { query: { city } } = req
  return fetch(url(city))
    .then((response) => {
      if(response.ok){
        // without return the responce gets lost, return saves the result of the function
        return response.json()
      }
      throw new Error('Response not OK')
    })
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(400).json({message: 'Currently not avaliable'}))
}