import { STORAGE_KEYS } from '../../utils/constants';

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith('settings/')) {
    const state = store.getState();
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
  }

  if (action.type.startsWith('favorites/')) {
    const state = store.getState();
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites.cityIds));
  }

  return result;
};

export default localStorageMiddleware;
