import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTemperatureUnit } from '../../store/slices/settingsSlice';
import { formatTemperature } from '../../utils/temperatureConverter';
import WeatherIcon from './WeatherIcon';
import FavoriteButton from '../favorites/FavoriteButton';

const CurrentWeather = ({ weather }) => {
  const unit = useSelector(selectTemperatureUnit);

  const temperature = useMemo(() => {
    return formatTemperature(weather.current.main.temp, unit);
  }, [weather.current.main.temp, unit]);

  const feelsLike = useMemo(() => {
    return formatTemperature(weather.current.main.feels_like, unit);
  }, [weather.current.main.feels_like, unit]);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">{weather.current.name}</h2>
          <p className="text-lg opacity-90">{weather.current.sys.country}</p>
        </div>
        <FavoriteButton cityId={weather.current.id} />
      </div>

      <div className="flex items-center justify-center my-8">
        <WeatherIcon
          icon={weather.current.weather[0].icon}
          description={weather.current.weather[0].description}
          size="large"
        />
        <div className="ml-8">
          <div className="text-6xl font-bold">{temperature}</div>
          <p className="text-xl mt-2 capitalize">{weather.current.weather[0].description}</p>
          <p className="text-lg mt-1 opacity-90">Feels like {feelsLike}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
