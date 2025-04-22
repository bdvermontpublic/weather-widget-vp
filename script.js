document.addEventListener('DOMContentLoaded', () => {
    fetch('weather-data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('abridged-forecast').textContent = data.abridged_forecast;
            document.getElementById('detailed-forecast').textContent = data.detailed_forecast;
            document.getElementById('weather-icon').src = data.icon_url;
        })
        .catch(error => console.error('Error fetching weather data:', error));

    const toggleButton = document.getElementById('toggle-details');
    const detailedForecast = document.getElementById('detailed-forecast');
    toggleButton.addEventListener('click', () => {
        const isHidden = detailedForecast.style.display === 'none';
        detailedForecast.style.display = isHidden ? 'block' : 'none';
        toggleButton.textContent = isHidden ? 'Hide Details' : 'Show Details';
    });
});