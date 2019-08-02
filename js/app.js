// Functions to convert temperature to celcius or fahrenheit
function ToCelcius(temperature) {
    return ((temperature - 32) * 5 / 9).toFixed(2);
}

function ToFahrenheit(temperature) {
    return ((temperature * 9 / 5) + 32).toFixed(2);
}

window.addEventListener("load", ()=> {
    let longitude, latitude;

    // Import DOM elements
    let locationElement = document.querySelector(".location");
    let temperatureValueElement = document.querySelector(".temperature-value");
    let temperatureElement = document.querySelector(".temperature");
    let degreesElement = document.querySelector(".degrees");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            /*
             * Proxy used to automatically include cross-origin headers needed
             * to access the DarkSky API via localhost.
             */
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature} = data.currently;

                    // Set DOM element data based on API data
                    locationElement.textContent = data.timezone;
                    temperatureValueElement.textContent = ToCelcius(temperature);

                    // When the temperature is clicked, switch between celcius and fahrenheit.
                    temperatureElement.addEventListener('click', () => {
                        if (degreesElement.textContent === 'C') {
                            temperatureValueElement.textContent = ToFahrenheit(temperatureValueElement.textContent);
                            degreesElement.textContent = 'F';
                        } else {
                            temperatureValueElement.textContent = ToCelcius(temperatureValueElement.textContent);
                            degreesElement.textContent = 'C';
                        }
                    });
                });

        });
    } else {
        console.log('Geolocation is not enabled. Please enable to use WeatherApp');
    }
});