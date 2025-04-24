// Initialize Pym.js child for iframe resizing
const pymChild = new pym.Child({ polling: 500 });

function fetchWeatherData() {
  fetch('https://raw.githubusercontent.com/bdvermontpublic/weather-widget-vp/main/weather-data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('abridged-forecast').textContent = data.abridged_forecast;
      document.getElementById('detailed-forecast').textContent = data.detailed_forecast;
      document.getElementById('weather-icon').src = data.icon_url;

      // Notify the parent page to resize the iframe
      pymChild.sendHeight();
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('abridged-forecast').textContent = 'Error loading data';
      document.getElementById('detailed-forecast').textContent = 'Error loading data';

      // Still notify the parent even if there's an error
      pymChild.sendHeight();
    });
}

// Fetch data immediately on page load
fetchWeatherData();

// Fetch data every 5 minutes (300,000 milliseconds)
setInterval(fetchWeatherData, 300000);