import { weatherApi, geoApi } from './openWeatherMap';

export const getCurrentWeather = async (cityName) => {
  const response = await weatherApi.get('/weather', {
    params: { q: cityName },
  });
  return response.data;
};

export const getCurrentWeatherById = async (cityId) => {
  const response = await weatherApi.get('/weather', {
    params: { id: cityId },
  });
  return response.data;
};

export const getForecast = async (cityName) => {
  const response = await weatherApi.get('/forecast', {
    params: { q: cityName },
  });
  return response.data;
};

export const getForecastById = async (cityId) => {
  const response = await weatherApi.get('/forecast', {
    params: { id: cityId },
  });
  return response.data;
};

export const searchCities = async (query) => {
  const response = await geoApi.get('/direct', {
    params: { q: query, limit: 5 },
  });
  return response.data;
};
