export const DEFAULT_CITIES = [
  { id: 2643743, name: 'London', country: 'GB' },
  { id: 5128581, name: 'New York', country: 'US' },
  { id: 1850144, name: 'Tokyo', country: 'JP' },
  { id: 2988507, name: 'Paris', country: 'FR' },
  { id: 3451190, name: 'Rio de Janeiro', country: 'BR' },
];

export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  GEO_URL: 'https://api.openweathermap.org/geo/1.0',
  ICON_URL: 'https://openweathermap.org/img/wn',
  CACHE_DURATION: 900000,
};

export const TEMPERATURE_UNITS = {
  CELSIUS: 'celsius',
  FAHRENHEIT: 'fahrenheit',
  KELVIN: 'kelvin',
};

export const STORAGE_KEYS = {
  SETTINGS: 'weather_app_settings',
  FAVORITES: 'weather_app_favorites',
};
