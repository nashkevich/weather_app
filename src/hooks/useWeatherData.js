import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather, fetchForecast, selectCityWeather, selectCityLoading, selectCityError } from '../store/slices/weatherSlice';
import { isCacheStale } from '../utils/weatherHelpers';

export const useWeatherData = (cityId, includeForecast = false) => {
  const dispatch = useDispatch();
  const weather = useSelector(state => selectCityWeather(state, cityId));
  const loading = useSelector(state => selectCityLoading(state, cityId));
  const error = useSelector(state => selectCityError(state, cityId));

  useEffect(() => {
    if (!weather || isCacheStale(weather.lastUpdated)) {
      dispatch(fetchCurrentWeather(cityId));
      if (includeForecast) {
        dispatch(fetchForecast(cityId));
      }
    } else if (includeForecast && !weather.forecast) {
      dispatch(fetchForecast(cityId));
    }
  }, [cityId, dispatch, includeForecast, weather]);

  return { weather, loading, error };
};
