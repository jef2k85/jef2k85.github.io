import { describe, expect, test } from "vitest";
import {
  buildForecastUrl,
  describeWeatherCode,
  loadWeather,
  parseCurrentWeather,
  renderWeather,
} from "./weather.js";

describe("describeWeatherCode", () => {
  test("maps a known WMO code to its text description", () => {
    expect(describeWeatherCode(0)).toBe("Clear sky");
  });

  test("returns null for an unmapped code", () => {
    expect(describeWeatherCode(9999)).toBe(null);
  });
});

describe("parseCurrentWeather", () => {
  test("extracts temperature and description from a well-formed response", () => {
    const json = { current_weather: { temperature: 23.5, weathercode: 0 } };
    expect(parseCurrentWeather(json)).toEqual({
      temperature: 23.5,
      description: "Clear sky",
    });
  });

  test("returns null when current_weather is missing", () => {
    expect(parseCurrentWeather({})).toBe(null);
  });

  test("returns null when temperature is not a number", () => {
    const json = { current_weather: { temperature: "23.5", weathercode: 0 } };
    expect(parseCurrentWeather(json)).toBe(null);
  });

  test("returns null when weathercode is not a number", () => {
    const json = { current_weather: { temperature: 23.5, weathercode: "0" } };
    expect(parseCurrentWeather(json)).toBe(null);
  });

  test("returns null when weathercode is unmapped", () => {
    const json = { current_weather: { temperature: 23.5, weathercode: 9999 } };
    expect(parseCurrentWeather(json)).toBe(null);
  });
});

describe("buildForecastUrl", () => {
  test("targets Open-Meteo with hardcoded Vancouver, BC coordinates and current_weather=true", () => {
    const url = buildForecastUrl();
    expect(url).toBe(
      "https://api.open-meteo.com/v1/forecast?latitude=49.2827&longitude=-123.1207&current_weather=true"
    );
  });

  test("contains no API key or token parameter", () => {
    const url = buildForecastUrl();
    expect(url.toLowerCase()).not.toMatch(/key|token|secret/);
  });
});

describe("renderWeather", () => {
  test("renders temperature and description into the container", () => {
    const container = document.createElement("div");
    renderWeather(container, { temperature: 23.5, description: "Clear sky" });
    expect(container.textContent).toBe("24°C, Clear sky");
  });

  test("does not include forecast data, only current conditions", () => {
    const container = document.createElement("div");
    renderWeather(container, { temperature: 23.5, description: "Clear sky" });
    expect(container.textContent.toLowerCase()).not.toMatch(
      /forecast|tomorrow|tonight/
    );
  });

  test("clears the container when data is null", () => {
    const container = document.createElement("div");
    container.textContent = "stale";
    renderWeather(container, null);
    expect(container.textContent).toBe("");
  });

  test("does nothing when container is null", () => {
    expect(() => renderWeather(null, { temperature: 1, description: "x" })).not.toThrow();
  });
});

describe("loadWeather", () => {
  function jsonResponse(body) {
    return { ok: true, json: async () => body };
  }

  test("fetches, parses, and renders on success", async () => {
    const container = document.createElement("div");
    const fetchImpl = async () =>
      jsonResponse({ current_weather: { temperature: 23.5, weathercode: 0 } });

    await loadWeather(container, fetchImpl);

    expect(container.textContent).toBe("24°C, Clear sky");
  });

  test("calls fetch with the forecast URL", async () => {
    const container = document.createElement("div");
    const calls = [];
    const fetchImpl = async (url) => {
      calls.push(url);
      return jsonResponse({ current_weather: { temperature: 1, weathercode: 0 } });
    };

    await loadWeather(container, fetchImpl);

    expect(calls).toEqual([buildForecastUrl()]);
  });

  test("leaves the container empty when fetch rejects", async () => {
    const container = document.createElement("div");
    const fetchImpl = async () => {
      throw new Error("network down");
    };

    await expect(loadWeather(container, fetchImpl)).resolves.toBeUndefined();
    expect(container.textContent).toBe("");
  });

  test("leaves the container empty when the response is not ok", async () => {
    const container = document.createElement("div");
    const fetchImpl = async () => ({ ok: false, json: async () => ({}) });

    await loadWeather(container, fetchImpl);

    expect(container.textContent).toBe("");
  });

  test("leaves the container empty when the response cannot be parsed", async () => {
    const container = document.createElement("div");
    const fetchImpl = async () => jsonResponse({});

    await loadWeather(container, fetchImpl);

    expect(container.textContent).toBe("");
  });
});
