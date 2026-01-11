import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTemperatureUnit, selectTemperatureUnit } from '../../store/slices/settingsSlice';
import { TEMPERATURE_UNITS } from '../../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const currentUnit = useSelector(selectTemperatureUnit);

  const handleUnitChange = (e) => {
    dispatch(setTemperatureUnit(e.target.value));
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Weather Forecast</h1>

          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link to="/favorites" className="hover:text-blue-200 transition-colors">
              Favorites
            </Link>

            <div className="flex items-center gap-2">
              <label htmlFor="unit-select" className="text-sm">Unit:</label>
              <select
                id="unit-select"
                value={currentUnit}
                onChange={handleUnitChange}
                className="bg-blue-700 text-white px-3 py-1 rounded border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value={TEMPERATURE_UNITS.CELSIUS}>°C</option>
                <option value={TEMPERATURE_UNITS.FAHRENHEIT}>°F</option>
                <option value={TEMPERATURE_UNITS.KELVIN}>K</option>
              </select>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
