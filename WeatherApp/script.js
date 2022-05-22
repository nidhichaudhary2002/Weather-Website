// defining variable for location,temp-icon,temp-value,climate

let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);

});

const getWeather = async (city) => {
    try {
        // fetching API key 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3cd711d33110385a9bb8230ad8cfdc23`,
            { node: 'core' }
        );
        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData.main;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);
        // adding different icons for different whethers
        if (id < 300 && id > 200) {
            tempicon.src = "./icons/thunderstorm.png"
        }
        else if (id < 400 && id > 300) {
            tempicon.src = "./icons/clouds.png"
        }
        else if (id < 600 && id > 500) {
            tempicon.src = "./icons/rainy.png"
        }
        else if (id < 700 && id > 600) {
            tempicon.src = "./icons/snowflakes.png"
        }
        else if (id < 800 && id > 700) {
            tempicon.src = "./icons/clouds.png"
        }
        else if (id == 800) {
            tempicon.src = "./icons/sun.png"
        }
    }
    catch (error) {
        alert('city not found');
    }
};


window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
// acccessing location
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // creating proxy server
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3cd711d33110385a9bb8230ad8cfdc23`
            fetch(api).then((response) => {
                return response.json();

            })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];
                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);
                    if (id < 300 && id > 200) {
                        tempicon.src = "icons\thunderstorm.png"
                    }
                    else if (id < 400 && id > 300) {
                        tempicon.src = "icons\clouds.png"
                    }
                    else if (id < 600 && id > 500) {
                        tempicon.src = "icons\rain.png"
                    }
                    else if (id < 700 && id > 600) {
                        tempicon.src = "icons\snowflakes.png"
                    }
                    else if (id < 800 && id > 700) {
                        tempicon.src = "icons\clouds.png"
                    }
                    else if (id == 800) {
                        tempicon.src = "icons\sun.png"
                    }

                })
        }

        )
    }
})