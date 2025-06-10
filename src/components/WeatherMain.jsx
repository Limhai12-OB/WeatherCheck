import { useState } from "react";

export default function Weather() {
  const apikey = "e671f993c5c8a765bf3a4d30a0126c50";
  const apiurl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [weatherData, setWeatherData] = useState({
    temperature: 21,
    location: "Country",
    humidity: 65,
    windSpeed: 12,
    icon: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    description: "Clear Weather",
  });

  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      const response = await fetch(`${apiurl}${city}&appid=${apikey}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData({
          temperature: Math.round(data.main.temp),
          location: `${data.name}, ${data.sys.country}`,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6),
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          description: data.weather[0].description,
        });
      } else {
        setError("City not found. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchWeather();
    }
  };
  return (
    <>
      <div
        className="bg-gradient-to-br min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="bg-white/10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6 md:p-8 lg:p-12 text-white text-center rounded-2xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full sm:flex-1 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-white/15 rounded-2xl outline-0 placeholder-white/70 text-white text-sm sm:text-base"
            />
            <button onClick={searchWeather} className="w-full sm:w-auto">
              <span className="material-symbols-outlined bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer p-2.5 sm:p-3 rounded-xl text-white">
                {"search"}
              </span>
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 mb-6 text-red-200 text-sm">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}

          <div>
            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src={weatherData.icon}
                alt={weatherData.description}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white/10 rounded-full p-3 sm:p-4 md:p-5"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-2 sm:mb-4">
              {weatherData.temperature}°C
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 md:mb-10">
              {weatherData.location}
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6">
              <div className="flex-1 bg-white/5 rounded-2xl py-4 sm:py-5 px-4 sm:px-6 md:px-8 text-center backdrop-blur-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto bg-white/20 p-1.5 sm:p-2 mb-2 sm:mb-3 rounded-full flex items-center justify-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
                    alt="humidity icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-lg sm:text-xl font-normal mb-1">
                  {weatherData.humidity}%
                </div>
                <div className="text-xs sm:text-sm opacity-80">Humidity</div>
              </div>

              <div className="flex-1 bg-white/5 rounded-2xl py-4 sm:py-5 px-4 sm:px-6 md:px-8 text-center backdrop-blur-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto bg-white/20 p-1.5 sm:p-2 mb-2 sm:mb-3 rounded-full flex items-center justify-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1959/1959244.png"
                    alt="wind icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-lg sm:text-xl font-normal mb-1">
                  {weatherData.windSpeed}km/h
                </div>
                <div className="text-xs sm:text-sm opacity-80">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
