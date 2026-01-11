import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTemperatureUnit } from '../../store/slices/settingsSlice';
import { formatTemperature } from '../../utils/temperatureConverter';
import { useWeatherData } from '../../hooks/useWeatherData';
import Card from '../common/Card';
import WeatherIcon from '../weather/WeatherIcon';
import FavoriteButton from '../favorites/FavoriteButton';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const CityCard = ({ cityId }) => {
  const navigate = useNavigate();
  const unit = useSelector(selectTemperatureUnit);
  const { weather, loading, error } = useWeatherData(cityId);

  const temperature = useMemo(() => {
    if (!weather?.current) return '';
    return formatTemperature(weather.current.main.temp, unit);
  }, [weather, unit]);

  const handleClick = () => {
    navigate(`/city/${cityId}`);
  };

  if (loading) {
    return (
      <Card>
        <Loader />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <ErrorMessage message={error} />
      </Card>
    );
  }

  if (!weather?.current) {
    return null;
  }

  return (
    <Card onClick={handleClick} className="hover:scale-105 transition-transform">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{weather.current.name}</h3>
          <p className="text-sm text-gray-600">{weather.current.sys.country}</p>
        </div>
        <FavoriteButton cityId={cityId} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-blue-600">{temperature}</p>
          <p className="text-sm text-gray-600 capitalize mt-1">
            {weather.current.weather[0].description}
          </p>
        </div>
        <WeatherIcon
          icon={weather.current.weather[0].icon}
          description={weather.current.weather[0].description}
          size="medium"
        />
      </div>
    </Card>
  );
};

export default CityCard;
