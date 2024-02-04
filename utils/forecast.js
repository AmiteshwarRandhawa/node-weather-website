const request = require('postman-request')


function forecast(lat, lon, callback) {

    const url = `https://api.pirateweather.net/forecast/81WtSIhLQVeLJhdhdahLaxrSg95q8wyG/${lat},${lon}?units=ca`
    
    request({url, json: true}, (error, {body}) => {
        if (error)
            callback('Unable to connect to the weather forecast service', undefined)
        else if (body.error)
            callback('Unable to find the location', undefined)
        else {
            const data = body
            callback(undefined, `${body.currently.summary}. It is currently ${body.currently.temperature}°C out. It feels like ${body.currently.apparentTemperature}°C. The high today is ${body.daily.data[0].temperatureHigh}°C with the low of ${body.daily.data[0].temperatureLow}. The humidity is ${body.currently.humidity * 100}%.`);
        }
    })
}

module.exports = forecast

