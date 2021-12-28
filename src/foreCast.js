const request = require('request')

const foreCast = (latitude, longitude, callback) => {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+latitude+','+longitude+'/today?unitGroup=metric&include=current&key=D9Q6KW354NRJ6QBJPR2H2764Z&contentType=json'
    request({url, json:true}, (error, response) => {
        if(error){
            callback('Please provide correct location', undefined)
        } else if(response.body.error){
            callback('Given a valid location')
        } else{
            callback(undefined, {
                time_zone: response.body.timezone,
                sun_rise: response.body.currentConditions.sunrise,
                sun_set: response.body.currentConditions.sunset,
                temperature: response.body.currentConditions.temp,
                feels_like: response.body.currentConditions.feelslike,
                condition: response.body.currentConditions.conditions
            })
        }
    })
}

module.exports = foreCast