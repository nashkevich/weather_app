import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTemperatureUnit } from '../../store/slices/settingsSlice';
import { formatTemperature } from '../../utils/temperatureConverter';
import { getDayName } from '../../utils/weatherHelpers';
import WeatherIcon from './WeatherIcon';

const ForecastCard = ({ forecast }) => {
  const unit = useSelector(selectTemperatureUnit);

  const tempMin = useMemo(() => {
    return formatTemperature(forecast.tempMin, unit);
  }, [forecast.tempMin, unit]);

  const tempMax = useMemo(() => {
    return formatTemperature(forecast.tempMax, unit);
  }, [forecast.tempMax, unit]);

  const dayName = getDayName(forecast.date);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <h3 className="font-semibold text-gray-700 mb-2">{dayName}</h3>
      <WeatherIcon
        icon={forecast.icon}
        description={forecast.description}
        size="medium"
      />
      <p className="text-sm text-gray-600 capitalize mt-2">{forecast.description}</p>
      <div className="mt-3">
        <p className="text-lg font-bold text-gray-800">{tempMax}</p>
        <p className="text-sm text-gray-600">{tempMin}</p>
      </div>
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>💧 {Math.round(forecast.precipProbability)}%</p>
        {forecast.precipitation > 0 && (
          <p>{forecast.precipitation.toFixed(1)} mm</p>
        )}
      </div>
    </div>
  );
};

export default ForecastCard;
