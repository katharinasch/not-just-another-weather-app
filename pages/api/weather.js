// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Imagine requesting some data from an API.
// Depending upon the situation the server might
// take some time to process the request while
// blocking the main thread making the web page unresponsive.

// If an API call is synchronous, it means that code execution
// will block (or wait) for the API call to return
// before continuing. This means that until a
// response is returned by the API,
// your application will not execute any further.

// The async keyword can be used only in a function declaration.
// It tells the JavaScript runtime environment (V8, Node.js, or Deno)
// that it should wrap a function body in a Promise object. 

// The function returns a promise

const url = (city) => `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`;

export default async function handler(req, res) {
// Destructuring, immer Leerzeichen in geschw. Klammern
// The req object represents the HTTP request and has properties
// for the request query string, parameters, body, HTTP headers, and so on.
// req.query = > An object containing a property for each query string parameter in the route.
// Деструктуризация объекта в круглых скобках свойства кот. я хочу вытащить из объекта
// = req та структура из которой я хочу вытащить свойства
// dай мне своиства city из query из обекта req
// const city = req.query.city;
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

// Often we make a request to an API route with some data.
// This is like posting your mail into the letterbox.
// When the person receives and replies to the letter,
// eventually the original sender will open the reply (response).
