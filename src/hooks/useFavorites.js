import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite as toggleFavoriteAction, selectIsFavorite } from '../store/slices/favoritesSlice';

export const useFavorites = (cityId) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => selectIsFavorite(state, cityId));

  const toggleFavorite = useCallback(() => {
    dispatch(toggleFavoriteAction(cityId));
  }, [dispatch, cityId]);

  return { isFavorite, toggleFavorite };
};
