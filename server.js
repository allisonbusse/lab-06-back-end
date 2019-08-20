require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
app.use(cors());

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

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});