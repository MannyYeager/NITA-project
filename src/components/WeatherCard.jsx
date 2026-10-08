import { useEffect, useState } from 'react';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Droplets, RefreshCw, Sun, Wind } from 'lucide-react';
import { fetchAccraWeather } from '../services/weather.js';

function conditionIcon(code) {
  if (code === 0) return Sun;
  if ([1, 2].includes(code)) return CloudSun;
  if ([45, 48].includes(code)) return CloudFog;
  if (code >= 51 && code <= 57) return CloudDrizzle;
  if (code >= 61 && code <= 67 || code >= 80 && code <= 82) return CloudRain;
  if (code >= 71 && code <= 86) return CloudSnow;
  if (code >= 95) return CloudLightning;
  return Cloud;
}

export default function WeatherCard() {
  const [weather, setWeather] = useState({ state: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [clock, setClock] = useState('');
  const [unit, setUnit] = useState('C');
  const [selectedDay, setSelectedDay] = useState(0);
  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('en-GH', { timeZone: 'Africa/Accra', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date()));
    update(); const timer = setInterval(update, 60000); return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const controller = new AbortController(); let active = true;
    fetchAccraWeather(controller.signal).then((data) => { if (active) setWeather({ ...data, state: 'ready' }); }).catch((error) => { if (active && error.name !== 'AbortError') setWeather({ state: 'error' }); });
    const timer = setInterval(() => setAttempt((value) => value + 1), 15 * 60 * 1000);
    return () => { active = false; controller.abort(); clearInterval(timer); };
  }, [attempt]);
  const day = weather.state === 'ready' ? weather.days?.[selectedDay] : null;
  const conditionCode = day?.code ?? weather.code;
  const Icon = weather.state === 'ready' ? conditionIcon(conditionCode) : Cloud;
  const convertTemp = (value) => unit === 'C' ? value : Math.round((value * 9) / 5 + 32);
  const displayedTemp = weather.state === 'ready' ? convertTemp(selectedDay === 0 ? weather.temperature : day?.high ?? weather.temperature) : '—';
  const displayedCondition = selectedDay === 0 ? weather.condition : day?.condition || weather.condition;
  const displayedHigh = day?.high ?? weather.high;
  const displayedLow = day?.low ?? weather.low;
  function refreshWeather() {
    setWeather({ state: 'loading' });
    setSelectedDay(0);
    setAttempt((value) => value + 1);
  }
  return <section className="weather-card" aria-labelledby="weather-heading" aria-live="polite">
    <div className="weather-main"><div className="weather-heading-row"><div><span className="eyebrow light">Weather & environment</span><h2 id="weather-heading">Accra, Ghana</h2></div><div className="weather-controls"><span className="hq-chip"><i />Accra HQ</span><button className="weather-control" aria-label="Refresh weather" title="Refresh weather" onClick={refreshWeather} disabled={weather.state === 'loading'}><RefreshCw size={13} className={weather.state === 'loading' ? 'spin' : ''} /></button></div></div>
      <div className="temperature-row"><div><div className="temperature-line"><span className="temperature">{displayedTemp}<sup>°</sup></span><button className="unit-toggle" aria-label={`Switch to degrees ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`} onClick={() => setUnit((value) => value === 'C' ? 'F' : 'C')}>°{unit}<span> / °{unit === 'C' ? 'F' : 'C'}</span></button></div><p>{weather.state === 'ready' ? displayedCondition : weather.state === 'loading' ? 'Checking current conditions…' : 'Weather feed unavailable'}</p></div><div className="weather-icon"><Icon size={37} strokeWidth={1.6} /></div></div>
      <div className="weather-stats"><span>{weather.state === 'ready' ? <>{selectedDay === 0 ? 'Today' : day?.label} <b>H {convertTemp(displayedHigh)}°</b><span className="stat-sep">·</span><b>L {convertTemp(displayedLow)}°</b></> : weather.state === 'error' ? <button onClick={refreshWeather}><RefreshCw size={12} /> Retry weather</button> : 'Loading Accra forecast'}</span>{weather.state === 'ready' && selectedDay === 0 && <span className="weather-measures"><span><Droplets size={13} />{weather.humidity}%</span><span><Wind size={13} />{weather.wind} km/h</span></span>}</div>
    </div>
    <div className="forecast"><div className="forecast-heading"><strong>3-day outlook <span className="forecast-hint">· Select a day</span></strong><span>Africa/Accra · {clock}</span></div>{weather.state === 'ready' ? <div className="forecast-days">{weather.days.map((forecastDay, i) => { const DayIcon = conditionIcon(forecastDay.code); return <button type="button" aria-pressed={selectedDay === i} className={`forecast-day ${selectedDay === i ? 'active' : ''}`} key={forecastDay.date} onClick={() => setSelectedDay(i)}><span>{forecastDay.label}</span><DayIcon size={18} /><b>{convertTemp(forecastDay.high)}° <small>{convertTemp(forecastDay.low)}°</small></b></button>; })}</div> : <div className="forecast-placeholder">Forecast will appear when weather data loads.</div>}<div className="weather-source"><span>{weather.state === 'ready' && weather.updated ? `Updated ${weather.updated} · Tap °${unit} to change units` : 'Live weather for Accra'}</span><a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Weather data</a></div></div>
  </section>;
}
