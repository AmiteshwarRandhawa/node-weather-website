const request = require('postman-request')


function forecast(lat, lon, callback) {

    const url = `https://api.pirateweather.net/forecast/81WtSIhLQVeLJhdhdahLaxrSg95q8wyG/${lat},${lon}?units=ca`
    
    request({url, json: true}, (error, {body}) => {
        if (error)
            callback('Unable to connect to the weather forecast service', undefined)
        else if (body.error)
            callback('Unable to find the location', undefined)
        else {
            const data = body.currently
            callback(undefined, `${data.summary}. It is currently ${data.temperature} degrees out. There is a ${data.precipProbability}% chance of rain`);
        }
    })
}

module.exports = forecast

