const request = require('request')

const forecast = (latitude, longtiude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8ef1057709de074a5586302d802470b6&query=' + longtiude + ',' + latitude + '&units=f'
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to weather service")
        } else if (body.error) {
            callback({
                error: 'unable to find location'
            })
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out, but feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast