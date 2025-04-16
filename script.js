const apiKey = '83243cf38037ea9eef649a5a2340d965'; // Replace with your actual API key

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const weatherResult = document.getElementById('weatherResult');

  if (!city) {
    weatherResult.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }
    function updateBackground(weather) {
        const body = document.body;
      
        // Reset background classes
        body.className = '';
      
        if (weather.includes('cloud')) {
          body.classList.add('cloudy-bg');
        } else if (weather.includes('sun') || weather.includes('clear')) {
          body.classList.add('sunny-bg');
        } else if (weather.includes('rain')) {
          body.classList.add('rainy-bg');
        } else {
          body.classList.add('default-bg');
        }
      }
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`)
  .then(response => response.json())
  .then(data => {
    const weatherDescription = data.weather[0].description.toLowerCase();
    updateBackground(weatherDescription);
  });

      

    const data = await response.json();
    const { name, main, weather } = data;
    const icon = weather[0].icon;

    weatherResult.innerHTML = `
      <h2>${name}</h2>
      <p><strong>${main.temp}°C</strong></p>
      <p>${weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

