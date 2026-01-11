export const convertTemperature = (celsius, targetUnit) => {
  switch (targetUnit) {
    case 'fahrenheit':
      return (celsius * 9/5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    case 'celsius':
    default:
      return celsius;
  }
};

export const formatTemperature = (celsius, unit) => {
  const converted = convertTemperature(celsius, unit);
  const symbol = unit === 'celsius' ? '°C' :
                 unit === 'fahrenheit' ? '°F' : 'K';
  return `${Math.round(converted)}${symbol}`;
};

export const getUnitSymbol = (unit) => {
  switch (unit) {
    case 'fahrenheit':
      return '°F';
    case 'kelvin':
      return 'K';
    case 'celsius':
    default:
      return '°C';
  }
};
