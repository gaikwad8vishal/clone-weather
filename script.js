const apiKey = '83243cf38037ea9eef649a5a2340d965';

// Focus input on load
window.onload = () => {
  document.getElementById('cityInput').focus();
};

// Function to update background based on weather condition
function updateBackground(main, description, iconCode) {
  const body = document.body;
  body.className = ''; // Reset

  const isNight = iconCode.includes('n');
  const desc = description.toLowerCase();
  const condition = main.toLowerCase();

  if (condition === 'rain' || condition === 'drizzle' || desc.includes('rain')) {
    body.classList.add(isNight ? 'rainy-night' : 'rainy-day');
  } else if (condition === 'clouds' || desc.includes('cloud')) {
    body.classList.add(isNight ? 'cloudy-night' : 'cloudy-day');
  } else if (condition === 'clear' || desc.includes('sun') || desc.includes('clear')) {
    body.classList.add(isNight ? 'sunny-night' : 'sunny-day');
  } else if (condition === 'snow' || desc.includes('snow')) {
    body.classList.add(isNight ? 'snowy-night' : 'snowy-day');
  } else if (
    condition === 'mist' || condition === 'fog' || 
    condition === 'haze' || condition === 'smoke' || 
    desc.includes('mist') || desc.includes('haze') || desc.includes('fog')
  ) {
    body.classList.add(isNight ? 'foggy-night' : 'foggy-day');
  } else {
    body.classList.add(isNight ? 'cloudy-night' : 'cloudy-day'); // fallback
  }
}

// Show the weather result with smooth fade-in
function showWeatherResult(html) {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.classList.remove('show');
  setTimeout(() => {
    weatherResult.innerHTML = html;
    weatherResult.classList.add('show');
  }, 100);
}

// Fetch and display weather
async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherResult = document.getElementById('weatherResult');

  if (!city) {
    showWeatherResult(`<p>Please enter a city name.</p>`);
    return;
  }

  showWeatherResult(`<p>Fetching weather...</p>`);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    const { name, main, weather } = data;
    const icon = weather[0].icon;
    const description = weather[0].description;
    const mainCondition = weather[0].main;

    updateBackground(mainCondition, description, icon);

    const resultHTML = `
      <h2>${name}</h2>  
      <p><strong>${main.temp}°C</strong></p>
      <p>${description}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
    `;

    showWeatherResult(resultHTML);
  } catch (error) {
    showWeatherResult(`<p>Error: ${error.message}</p>`);
  }
}
