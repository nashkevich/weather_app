import { useFavorites } from '../../hooks/useFavorites';

const FavoriteButton = ({ cityId }) => {
  const { isFavorite, toggleFavorite } = useFavorites(cityId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite();
      }}
      className={`text-2xl transition-colors ${
        isFavorite ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
};

export default FavoriteButton;
