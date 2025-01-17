const request = require('postman-request')

function forecast(coordinates, cb) {
    const url = 'http://api.weatherstack.com/current?access_key=ea6dffebde2e26b55df40f2bbf90f0a2&query=' + coordinates

    request({ url: url, json: true }, (err, { body } = {}) => {
        if (err) {
            cb('Failed to reach weatherstack server', undefined)
        } else if (body.error) {
            cb('The location you provided is invalid', undefined)
        } else {
            cb(undefined, {
                temperature: body.current.temperature, 
                feelslike: body.current.feelslike,
                weather_descriptions: body.current.weather_descriptions
            })
        }
    })
}

module.exports = forecast