import { getWindDirection } from '../../utils/weatherHelpers';

const WeatherDetails = ({ weather }) => {
  const current = weather.current;
  const windDirection = getWindDirection(current.wind.deg);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Wind</h3>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-blue-600">{current.wind.speed} m/s</p>
          <p className="text-gray-600">Direction: {windDirection} ({current.wind.deg}°)</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Clouds</h3>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-blue-600">{current.clouds.all}%</p>
          <p className="text-gray-600">Cloud coverage</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Humidity</h3>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-blue-600">{current.main.humidity}%</p>
          <p className="text-gray-600">Relative humidity</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
