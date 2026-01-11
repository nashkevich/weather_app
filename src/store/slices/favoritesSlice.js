import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cityIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.cityIds.includes(action.payload)) {
        state.cityIds.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.cityIds = state.cityIds.filter(id => id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const index = state.cityIds.indexOf(action.payload);
      if (index >= 0) {
        state.cityIds.splice(index, 1);
      } else {
        state.cityIds.push(action.payload);
      }
    },
    loadFavorites: (state, action) => {
      state.cityIds = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, loadFavorites } = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.cityIds;
export const selectIsFavorite = (state, cityId) => state.favorites.cityIds.includes(cityId);
export default favoritesSlice.reducer;
