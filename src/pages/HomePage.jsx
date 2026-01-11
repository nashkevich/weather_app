import { DEFAULT_CITIES } from '../utils/constants';
import CityList from '../components/city/CityList';
import CitySearch from '../components/city/CitySearch';

const HomePage = () => {
  const cityIds = DEFAULT_CITIES.map(city => city.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Weather Forecast</h2>
      <CitySearch />
      <CityList cityIds={cityIds} />
    </div>
  );
};

export default HomePage;
