const request = require('request')

const foreCast = (latitude, longitude, callback) => {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+latitude+','+longitude+'/today?unitGroup=metric&include=current&key=D9Q6KW354NRJ6QBJPR2H2764Z&contentType=json'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Please provide correct location', undefined)
        } else if(body.error){
            callback('Given a valid location')
        } else{
            callback(undefined, {
                time_zone: body.timezone,
                sun_rise: body.currentConditions.sunrise,
                sun_set: body.currentConditions.sunset,
                temperature: body.currentConditions.temp +' Degree Celcius',
                feels_like: body.currentConditions.feelslike +' Degree Celcius',
                condition: body.currentConditions.conditions
            })
        }
    })
}

module.exports = foreCast