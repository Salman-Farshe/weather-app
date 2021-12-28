const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZmFyc2hlIiwiYSI6ImNrd3picW90cDAzeWYydW81cDhleXo0cGUifQ.pxVrh6CYI55njUutwQgKJA'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to find your given location', undefined)
        } else if(body.features.length == 0){
            callback('Please provide valid location', undefined)
        } else{
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geoCode