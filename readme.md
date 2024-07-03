# Weather Dashboard

## Overview
The Weather Dashboard is a web application that provides current weather conditions, a 5-day forecast, and additional weather details for a specified city. Users can also view weather information for their current location.

## Features
- Search for weather information by city name.
- Display current weather conditions.
- Display a 5-day weather forecast.
- Show additional weather details like air quality, humidity, pressure, visibility, wind speed, and "feels like" temperature.
- Support for geolocation to fetch weather information for the user's current location.

## Setup Instructions
1. **Clone the Repository:**
- git clone <repository-url>
- cd weather-dashboard

2.**Obtain an API Key:**
- Sign up at OpenWeatherMap to get an API key.
https://home.openweathermap.org/api_keys

3. **Add the API Key to script.js:**

- Open script.js in a text editor.
- Find the line where the apiKey variable is defined.
- Replace the placeholder with your actual API key:
- const apiKey = 'YOUR_API_KEY_HERE';


4. **Open index.html:**

- Use a web browser to open the index.html file located in the project directory.

***Usage***
Search by City Name:
Enter the city name in the input field and click the "Search" button.
Get Weather for Current Location:
Click the "Current Location" button to allow the application to use your geolocation and fetch weather information for your current location.

***Technologies Used***
HTML
CSS
JavaScript
OpenWeatherMap API
