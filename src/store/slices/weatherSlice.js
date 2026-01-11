import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as weatherService from '../../api/weatherService';
import { processForecastData } from '../../utils/weatherHelpers';

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (cityId) => {
    const data = await weatherService.getCurrentWeatherById(cityId);
    return { cityId, data };
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (cityId) => {
    const data = await weatherService.getForecastById(cityId);
    return { cityId, data };
  }
);

export const searchCity = createAsyncThunk(
  'weather/searchCity',
  async (query) => {
    const cities = await weatherService.searchCities(query);
    if (cities.length > 0) {
      const cityId = cities[0].lat + ',' + cities[0].lon;
      const currentWeather = await weatherService.getCurrentWeather(cities[0].name);
      return { cityId: currentWeather.id, data: currentWeather, cityInfo: cities[0] };
    }
    throw new Error('City not found');
  }
);

const initialState = {
  cache: {},
  loading: {},
  errors: {},
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: (state, action) => {
      delete state.errors[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state, action) => {
        state.loading[action.meta.arg] = true;
        delete state.errors[action.meta.arg];
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        const { cityId, data } = action.payload;
        state.loading[cityId] = false;
        state.cache[cityId] = {
          ...state.cache[cityId],
          current: data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading[action.meta.arg] = false;
        state.errors[action.meta.arg] = action.error.message;
      })
      .addCase(fetchForecast.pending, (state, action) => {
        state.loading[action.meta.arg] = true;
        delete state.errors[action.meta.arg];
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        const { cityId, data } = action.payload;
        state.loading[cityId] = false;
        state.cache[cityId] = {
          ...state.cache[cityId],
          forecast: processForecastData(data.list),
          rawForecast: data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading[action.meta.arg] = false;
        state.errors[action.meta.arg] = action.error.message;
      })
      .addCase(searchCity.pending, (state) => {
        state.loading.search = true;
        delete state.errors.search;
      })
      .addCase(searchCity.fulfilled, (state, action) => {
        const { cityId, data } = action.payload;
        state.loading.search = false;
        state.cache[cityId] = {
          current: data,
          lastUpdated: Date.now(),
        };
      })
      .addCase(searchCity.rejected, (state, action) => {
        state.loading.search = false;
        state.errors.search = action.error.message;
      });
  },
});

export const { clearError } = weatherSlice.actions;
export const selectCityWeather = (state, cityId) => state.weather.cache[cityId];
export const selectCityLoading = (state, cityId) => state.weather.loading[cityId] || false;
export const selectCityError = (state, cityId) => state.weather.errors[cityId];
export default weatherSlice.reducer;
