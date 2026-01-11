import { getWeatherIconUrl } from '../../utils/weatherHelpers';

const WeatherIcon = ({ icon, description, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
  };

  return (
    <img
      src={getWeatherIconUrl(icon)}
      alt={description}
      className={sizeClasses[size]}
    />
  );
};

export default WeatherIcon;
