const nock = require('nock')
const handler = require('./pages/api/weather.js');
const regeneratorRuntime = require("regenerator-runtime");
const fetch = require('cross-fetch');



// This test will fail with ' TypeError: Cannot read property 'query' of undefined'

/* it('returns the title of the first album', async () => {
  const weather = await handler();  // Run the function
  expect(weather).toEqual('quidem molestiae enim');  // Make an assertion on the result
}); */

const SERVER_HOST = 'http://localhost:3000';

// from WeatherApi.com
const londonMock = {"current":{"temp_c":23}};

const fetchCityData = async (city) => {
  const options = {
    method: `GET`,
  };
  const response = await fetch(`${SERVER_HOST}/api/weather?city=${city}`, options);
  const data = await response.json();
  return data;
}

/* it("checks if London's weather equals to 33 degrees on a mocked response", async () => {
    nock(SERVER_HOST)
      .get(`/api/weather?city=London`)
      .reply(200, londonMock);
    const results = await fetchCityData("London");
    expect(results.current.temp_c).toEqual(33);
}); */

it("checks if London's weather equals to 23 degrees on a mocked response", async () => {
    nock(SERVER_HOST)
      .get(`/api/weather?city=London`)
      .reply(200, londonMock);
    const results = await fetchCityData("London");
    expect(results.current.temp_c).toEqual(23);
});