export const processForecastData = (forecastList) => {
  const dailyForecasts = forecastList.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return Object.entries(dailyForecasts)
    .slice(0, 5)
    .map(([date, forecasts]) => ({
      date,
      tempMin: Math.min(...forecasts.map(f => f.main.temp_min)),
      tempMax: Math.max(...forecasts.map(f => f.main.temp_max)),
      condition: forecasts[0].weather[0].main,
      description: forecasts[0].weather[0].description,
      icon: forecasts[0].weather[0].icon,
      precipitation: forecasts.reduce((sum, f) =>
        sum + (f.rain?.['3h'] || 0) + (f.snow?.['3h'] || 0), 0),
      precipProbability: Math.max(...forecasts.map(f => (f.pop || 0) * 100)),
      precipType: forecasts.some(f => f.rain) ? 'rain' :
                  forecasts.some(f => f.snow) ? 'snow' : 'none',
      windSpeed: forecasts.reduce((sum, f) => sum + f.wind.speed, 0) / forecasts.length,
      windDirection: forecasts[0].wind.deg,
      clouds: forecasts.reduce((sum, f) => sum + f.clouds.all, 0) / forecasts.length,
    }));
};

export const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const getWeatherIconUrl = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const isCacheStale = (lastUpdated, cacheDuration = 900000) => {
  if (!lastUpdated) return true;
  return Date.now() - lastUpdated > cacheDuration;
};
