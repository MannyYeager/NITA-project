const CONDITIONS = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Rime fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 80: 'Rain showers', 81: 'Moderate showers', 82: 'Heavy showers', 95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail',
};

export async function fetchAccraWeather(signal) {
  const query = new URLSearchParams({ latitude: '5.6037', longitude: '-0.1870', current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m', daily: 'temperature_2m_max,temperature_2m_min,weather_code', timezone: 'Africa/Accra', forecast_days: '3' });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${query}`, { signal });
  if (!response.ok) throw new Error(`Weather service returned ${response.status}`);
  const data = await response.json();
  if (!data.current || !data.daily?.time) throw new Error('Weather service returned incomplete data');
  return {
    temperature: Math.round(data.current.temperature_2m),
    condition: CONDITIONS[data.current.weather_code] || 'Current conditions',
    code: data.current.weather_code,
    humidity: data.current.relative_humidity_2m,
    wind: Math.round(data.current.wind_speed_10m),
    high: Math.round(data.daily.temperature_2m_max[0]),
    low: Math.round(data.daily.temperature_2m_min[0]),
    days: data.daily.time.map((date, i) => ({
      date,
      label: i === 0 ? 'Today' : new Intl.DateTimeFormat('en-GH', { timeZone: 'Africa/Accra', weekday: 'short' }).format(new Date(`${date}T12:00:00Z`)),
      high: Math.round(data.daily.temperature_2m_max[i]),
      low: Math.round(data.daily.temperature_2m_min[i]),
      code: data.daily.weather_code[i],
      condition: CONDITIONS[data.daily.weather_code[i]] || 'Forecast conditions',
    })),
    updated: data.current.time?.slice(11, 16) || '',
  };
}
