const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const { log } = require('console')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Home page',
        name: 'me'})
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'The about page',
        name: 'Me'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return  res.send({
            error: "No address field provided"
        })
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if(error)
            res.send({error});
        else
            forecast(lat, lon,  (forecastError, forecastResponse) => {
                if (forecastError)
                    res.send({forecastError})
                else
                    res.send({
                location,
                address: req.query.address,
                forecast: forecastResponse
                })
            })
    })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'No one',
        err_msg: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'No one',
        err_msg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})