import CityCard from './CityCard';

const CityList = ({ cityIds }) => {
  if (!cityIds || cityIds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No cities to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cityIds.map((cityId) => (
        <CityCard key={cityId} cityId={cityId} />
      ))}
    </div>
  );
};

export default CityList;
