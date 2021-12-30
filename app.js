const geoCode = require('./src/geoCode')
const foreCast = require('./src/foreCast')

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    path = require('path');
    
    app.set('view engine', 'ejs') // dont't need to use ejs extention
    
    app.use(express.static('public')) // tell express to serve the content of the public directory
    app.use(bodyParser.urlencoded({extended: true})) // retrive data from the body
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))) // allowing tha path for favicon 
    app.use(express.static(path.join(__dirname, 'img'))) // serve the another static directory

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    const loc = req.query.location; // get from the search form
    
    if(!loc){
        console.log('Unable to Connect. Please try again later...')
    }
    
    // geoCode
    geoCode(loc, (error, {location, latitude, longitude} = {}) => {
        if(error){
            console.log('Unable to Connect. Please try again later...')
        } else{
            //foreCast
            foreCast(latitude, longitude, (error, info) => {
                if(error){
                    console.log('Unable to Connect. Please try again later...')
                } else{
                    res.render('weather', {
                        location: location,
                        latitude: latitude,
                        longitude: longitude,
                        temperature: info.temperature,
                        sunRise: info.sun_rise,
                        sunSet: info.sun_set,
                        condition: info.condition,
                        feels: info.feels_like,
                        time: info.time_zone
                    }) 
                }
            })
        }  
    })
})


app.get('*', (req, res) => {
    res.render('404')
})

app.listen(port, () => {
    console.log('server starting')
})
