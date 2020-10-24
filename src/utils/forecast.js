const request = require("request");

const APIkey = "59253c3d179d336108c2821d491a7f0e";

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${APIkey}`
  request({url, json: true}, (error, response) => {
    const {cod, message, current} = response.body;
    if (error) {
      callback("Unable to connect to weather services!", undefined)
    } else if (cod === "400") {
      callback("!Sorry, " + message + ". Unable to find the location", undefined)
    } else {
      const rainStatus = current.rain ? ", and rain volume for last hour is " + current.rain["1h"] + " mm" : "";
      const sunriseTime = new Date(current.sunrise * 1000);
      const sunrise = sunriseTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const sunsetTime = new Date(current.sunset * 1000);
      const sunset = sunsetTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const forecast = "It is currently " + current.temp + " degrees out. humidity is " +
        current.humidity + ", and " + current.weather[0].description + rainStatus + ". Sunrise at " + sunrise + " and Sunset at " + sunset;
      callback(undefined, forecast)
    }
  })
}

module.exports = {
  forecast
}
