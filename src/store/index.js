import { configureStore } from '@reduxjs/toolkit';
import settingsReducer, { loadSettings } from './slices/settingsSlice';
import favoritesReducer, { loadFavorites } from './slices/favoritesSlice';
import weatherReducer from './slices/weatherSlice';
import localStorageMiddleware from './middleware/localStorageMiddleware';
import { STORAGE_KEYS } from '../utils/constants';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    favorites: favoritesReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
if (savedSettings) {
  store.dispatch(loadSettings(JSON.parse(savedSettings)));
}

const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
if (savedFavorites) {
  store.dispatch(loadFavorites(JSON.parse(savedFavorites)));
}

export default store;
