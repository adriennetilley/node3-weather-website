const express = require('express')
const { response } = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Adrienne Tilley'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adrienne Tilley'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Here is a bit of help documentation.',
        title: 'Help',
        name: 'Adrienne Tilley'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longtiude, location } = {}) => {
            if (error) {
                 return res.send(error)
            } 
        
            forecast(latitude, longtiude, (error, forecastData) => {
                if (error) {
                    return res.send(error)
                }
            
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })

            })

        })
    }

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Adrienne Tilley' 
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Adrienne Tilley'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})