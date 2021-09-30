const nock = require('nock')
const regeneratorRuntime = require("regenerator-runtime");
const fetch = require('cross-fetch');
const fetchCityData = require('./lib/cityData.js').fetchCityData;
const { act } = require('react-dom/test-utils');
const { render, fireEvent, screen, waitFor } = require('@testing-library/react');
const shallow = require('enzyme');
const React = require('react');
const { ForecastButtons } = require('./components/ForecastButtons.js')

/* test('Get weather from API', () => {
  return fetchCityData('London').then((data) => {
    //console.log('Data from API:', data)
    expect(data).toBeDefined()
  })
}) */

const weatherResponce = {
  location: {
    name: 'London',
    region: 'City of London, Greater London',
    country: 'United Kingdom',
    lat: 51.52,
    lon: -0.11 },
  current: {
    last_updated_epoch: 1632817800,
    last_updated: '2021-09-28 09:30',
    temp_c: 14,
    temp_f: 57.2,
    is_day: 1
  }
}

describe('GET mocked weather for city', () => {
  beforeEach(() => {
    // Mock the TMDB configuration request response
    nock('http://localhost:3000')
      .post('/api/weather?city=London')
      .reply(200, weatherResponce);
  });

  test('returns mocked weather', () => {
    let city = 'London';
    return fetchCityData(city).then((data) => {
      // console.log('Data from mock:', data)
      expect(data).toBeDefined()
      expect(data).toMatchObject(data)
      // expect(data).toBeFalsy()
    })
  });

  test('renders responce into paragraph', async () => {
    
    render(<ForecastButtons weatherResponce={weatherResponce} city='London' />);
    
    const button = screen.getByRole('button');
    const label = screen.getByText('Please search for city to see current weather');
    
    fireEvent.click(button)

    await waitFor(() => {
      expect(label.textContent).toBe(`Current weather in ${weatherResponce.location.name} is ${weatherResponce.current.temp_c} degrees`);
    });
  })  
});