import { useSelector } from 'react-redux';
import { selectFavorites } from '../store/slices/favoritesSlice';
import CityList from '../components/city/CityList';

const FavoritesPage = () => {
  const favoriteCityIds = useSelector(selectFavorites);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Favorite Cities</h2>
      {favoriteCityIds.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No favorite cities yet</p>
          <p className="text-gray-500 mt-2">Click the star icon on any city to add it to favorites</p>
        </div>
      ) : (
        <CityList cityIds={favoriteCityIds} />
      )}
    </div>
  );
};

export default FavoritesPage;
