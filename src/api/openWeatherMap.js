import axios from 'axios';
import { API_CONFIG } from '../utils/constants';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weatherApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});

export const geoApi = axios.create({
  baseURL: API_CONFIG.GEO_URL,
});

weatherApi.interceptors.request.use(
  config => {
    config.params = {
      ...config.params,
      appid: apiKey,
      units: 'metric',
    };
    return config;
  }
);

geoApi.interceptors.request.use(
  config => {
    config.params = {
      ...config.params,
      appid: apiKey,
    };
    return config;
  }
);

weatherApi.interceptors.response.use(
  response => response,
  error => {
    console.error('Weather API error:', error);
    return Promise.reject(error);
  }
);

geoApi.interceptors.response.use(
  response => response,
  error => {
    console.error('Geo API error:', error);
    return Promise.reject(error);
  }
);
