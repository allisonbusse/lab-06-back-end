require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
app.use(cors());

// geoData (map) set up

app.get('/location', (request, response) => {
    try {
        const location = request.query.location;
        const result = getLatLng(location);
        response.status(200).json(result);
    } catch(err) {
        response.status(500).send('Sorry, something went wrong. Please try again');
    }
});

const geoData = require('./data/geo.json');

function getLatLng(/*location*/) {
    //api call will go here
    return toLocation(geoData);
}

function toLocation(/*geoData*/) {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;
    
    return {
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}

// darksky (weather) setup

app.get('/weather', (request, response) => {
    try {
        const location = request.query.location;
        const result = getForcastTime(location);
        response.status(200).json(result);
    } catch(err) {
        response.status(500).send('Sorry, something went wrong. Please try again');
    }
});

const darkSky = require('./data/darksky.json');

function getForcastTime(/*location*/) {
    //api call will go here
    return toWeather(darkSky);
}

function toWeather(/*darkSky*/) {
    const firstResult = geoData.results[0];
    
    return [{
        formatted_query: firstResult.formatted_address,
        forecast: darkSky.daily.data[0].summary,
        time: darkSky.daily.data[0].time
    },
    {
        formatted_query: firstResult.formatted_address,
        forecast: darkSky.daily.data[1].summary,
        time: darkSky.daily.data[1].time
    },
    {
        formatted_query: firstResult.formatted_address,
        forecast: darkSky.daily.data[2].summary,
        time: darkSky.daily.data[2].time
    },
    {
        formatted_query: firstResult.formatted_address,
        forecast: darkSky.daily.data[3].summary,
        time: darkSky.daily.data[3].time
    },
    {
        formatted_query: firstResult.formatted_address,
        forecast: darkSky.daily.data[4].summary,
        time: darkSky.daily.data[4].time
    }
    ];
}

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});