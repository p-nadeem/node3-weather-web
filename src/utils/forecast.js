const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ed13569c28e78593d3f4e5dacb5d3536&query=' + latitude + ',' + longitude

    request({ 'url': url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.current.weather_descriptions)
            callback(undefined, body.current.weather_descriptions + ' .It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast