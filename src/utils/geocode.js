const request = require("request");

const accessToken = "pk.eyJ1Ijoia3lhd3ppbjk4IiwiYSI6ImNrZ2l4cnBrOTAxa28yc2p3dTM4ejNwZzYifQ.BU5XhcYny7PPn3tLB76uwQ";
const limit = 1;

const geocode = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}&limit=${limit}`
  request({url: geocodeUrl, json: true}, (error, response) => {
    const {features} = response ? response.body : {} ;
    if (error) {
      callback("Unable to connect to mapbox services", undefined);
    } else if (features === undefined) {
      callback("Please enter the Search Keywords", undefined);
    } else if (features.length === 0) {
      callback("Could Not Find the Location, Try Another Search", undefined);
    } else {
      const data = features[0];
      callback(undefined,{
        latitude: data.center[1],
        longitude: data.center[0],
        location: data.place_name
      })
    }
  })
}


module.exports = {
  geocode
}
