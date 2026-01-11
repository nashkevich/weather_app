import { useParams, useNavigate } from 'react-router-dom';
import { useWeatherData } from '../hooks/useWeatherData';
import CurrentWeather from '../components/weather/CurrentWeather';
import WeatherDetails from '../components/weather/WeatherDetails';
import ForecastList from '../components/weather/ForecastList';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const CityDetailPage = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const { weather, loading, error } = useWeatherData(Number(cityId), true);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!weather?.current) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-700 font-semibold"
      >
        ← Back
      </button>

      <CurrentWeather weather={weather} />
      <WeatherDetails weather={weather} />

      {weather.forecast && weather.forecast.length > 0 && (
        <ForecastList forecasts={weather.forecast} />
      )}
    </div>
  );
};

export default CityDetailPage;
