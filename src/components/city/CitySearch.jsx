import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchCity } from '../../store/slices/weatherSlice';

const CitySearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setSearchError('Please enter a city name');
      return;
    }

    setIsSearching(true);
    setSearchError('');

    try {
      const result = await dispatch(searchCity(query.trim())).unwrap();
      navigate(`/city/${result.cityId}`);
      setQuery('');
    } catch (error) {
      setSearchError(error.message || 'City not found');
    } finally {
      setIsSearching(false);
    }
  }, [query, dispatch, navigate]);

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSearching}
        />
        <button
          type="submit"
          disabled={isSearching}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:bg-gray-400"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>
      {searchError && (
        <p className="text-red-600 mt-2 text-sm">{searchError}</p>
      )}
    </div>
  );
};

export default CitySearch;
