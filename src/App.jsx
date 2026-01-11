import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import CityDetailPage from './pages/CityDetailPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city/:cityId" element={<CityDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
