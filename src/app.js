const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nova'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nova'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Nova',
        helpText: 'This is some helpful text',
    })
})

function forecase_cb(err, { temperature, feelslike, location }  = {}) {
    if (err) {
        return res.send({
            location: location,
            error: err
        })
    } else {
        return res.send({
            location: location,
            temperature: temperature,
            feelslike: feelslike
        })
    }
}

app.get('/weather', (req, res) => {
    if (!req.query.input) {
        return res.send({
            error: 'You must provide an input'
        })
    }

    geocode(req.query.input, (err, { location, coord }  = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        } else {
            forecast(coord, (err, { temperature, feelslike }  = {}) => {
                if (err) {
                    return res.send({
                        location: location,
                        error: err
                    })
                } else {
                    return res.send({
                        location: location,
                        temperature: temperature,
                        feelslike: feelslike
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Nova',
        errorMsg: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Nova',
        errorMsg: 'Page not found',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})