
var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var request = REQUEST.defaults( {
    strictSSL: false
});

var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric"; 


exports.getWeather = function(req, res) {
	var city = req.query.city;
	if( (city === null) || (typeof(city) === 'undefined') ) {
		return res.status(400).send('city missing');
	}

	var aurl = OPENWEATHERURL + '&q=' + city + ',nz';

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';

    			var response = {city: body.name, weather: weath};
    			return res.status(200).send(response);
    		} else {
    			console.error("Failed to get response", err);
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);

exports.router = router;
