const { response } = require('express')
const request = require('postman-request')

function geocode(address, callback) {

    const url = `https://api.geocodify.com/v2/geocode?api_key=uB946nGe573bMaZIJFFIMp7c4UqyYFPA&q=${encodeURIComponent(address)}`

    request({ url, json: true}, (error, {body} = {}) => {
        if (error)
            callback('Unable to connect to the geolocation service.', undefined)
        else if(body.response.features.length === 0)
            callback('Unable to find the location. Try another search', undefined)
        else {
            let data = body.response.features[0]
            callback(undefined, {
                lat: data.geometry.coordinates[1],
                lon: data.geometry.coordinates[0],
                location: `${data.properties.name}, ${data.properties.region}, ${data.properties.country}`
            })
        }
    }
    )
}


module.exports = geocode