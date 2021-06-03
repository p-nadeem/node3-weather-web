const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        subHeading: 'Use this site to get your weather!'
    })
})

app.get('/about', (req, res) => {
    res.render('index', {
        title: 'About',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('index', {
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'Search params not found'
        })
    }

    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, logitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, logitude, (error, forcastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('*', (req, res) => {
    res.render('index', {
        title: '404',

    })
})



app.listen(3000, () => {
    console.log('server is up on port 3000')
})