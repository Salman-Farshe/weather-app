const geoCode = require('./src/geoCode')
const foreCast = require('./src/foreCast')

const express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    path = require('path');
    
    app.set('view engine', 'ejs') // dont't need to use ejs extention
    
    app.use(express.static('public')) // tell express to serve the content of the public directory
    app.use(bodyParser.urlencoded({extended: true})) // retrive data from the body
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))) // allowing tha path for favicon 
    app.use(express.static(path.join(__dirname, 'img'))) // serve the another static directory

app.get('/', (req, res) => {
    const loc = req.query.location; // get from the search form
    res.render('index')

    if(!loc){
        return res.render('404')
    }

    // geoCode
    geoCode(loc, (error, {location, latitude, longitude}) => {
        if(error){
            return res.render('404')
        } else{
            //foreCast
            foreCast(latitude, longitude, (error, info) => {
                if(error){
                    return res.render('404')
                } else{
                    console.log(location) // geoCode
                    console.log(latitude)
                    console.log(longitude)
                    console.log(info) // foreCast
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

/*

// changes views directory & rename it....
const viewsPath = path.join(__dirname, '../templates/views')  // views path changes
app.set('views', viewsPath)


const publicDirectory = path.join(__dirname, '../public')
// customize server, serve out that folder
// setup static directory
app.use(express.static(publicDirectory))

*/