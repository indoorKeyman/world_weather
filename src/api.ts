const API_KEY = `f8477d735755303bca7cd3cc4055d2a5`;

export function fetchWeather(city: String) {
  const Weather_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  return fetch(`${Weather_URL}`).then((response) => response.json());
}
