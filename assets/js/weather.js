const WMO_WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export function describeWeatherCode(code) {
  return WMO_WEATHER_CODES[code] ?? null;
}

export function parseCurrentWeather(json) {
  const currentWeather = json?.current_weather;
  if (
    !currentWeather ||
    typeof currentWeather.temperature !== "number" ||
    typeof currentWeather.weathercode !== "number"
  ) {
    return null;
  }

  const description = describeWeatherCode(currentWeather.weathercode);
  if (description === null) {
    return null;
  }

  return { temperature: currentWeather.temperature, description };
}

const VANCOUVER_LATITUDE = 49.2827;
const VANCOUVER_LONGITUDE = -123.1207;

export function buildForecastUrl() {
  return `https://api.open-meteo.com/v1/forecast?latitude=${VANCOUVER_LATITUDE}&longitude=${VANCOUVER_LONGITUDE}&current_weather=true`;
}

export function renderWeather(container, data) {
  if (!container) {
    return;
  }

  if (!data) {
    container.textContent = "";
    return;
  }

  container.textContent = `${Math.round(data.temperature)}°C, ${data.description}`;
}

export async function loadWeather(container, fetchImpl = fetch) {
  try {
    const response = await fetchImpl(buildForecastUrl());
    if (!response.ok) {
      return;
    }

    const json = await response.json();
    const data = parseCurrentWeather(json);
    renderWeather(container, data);
  } catch {
    // Silent failure — see spec: widget renders nothing on error.
  }
}
