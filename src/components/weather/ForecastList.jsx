import ForecastCard from './ForecastCard';

const ForecastList = ({ forecasts }) => {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecasts.map((forecast, index) => (
          <ForecastCard key={index} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
