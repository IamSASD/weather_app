import axios from 'axios';
import pg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

const pool = new Pool({
    host: 'localhost',
    user: 'sasd',
    database: 'weather_app',
    password: ''
});




const new_entry_history = async(place) => {
    await pool.query('INSERT INTO history(places) VALUES($1)', [place]);
}

export const history = async() => {
    const {rows} = await pool.query('SELECT * FROM history');
    rows.reverse();
    const choices = rows.map( (entry, i) => {
        const id = `${i+1 + '.'}`.green;
        return {
            name: `${id} ${entry.places}`,
        }
    });
    const first_five = choices.slice(0,10);
    return first_five;
}

export const place_geo = async(place) => {
    const mapbox_token = process.env.MAPBOX_TOKEN;
    new_entry_history(place);
    try {
        const res = await axios({
            method: 'GET',
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
            params: {
                'language': 'en',
                'access_token': mapbox_token
            }
        });  
        return res.data.features.map((place, i) => {

            const counter = `${i + 1}.`.green;

            return {
                value: place.id,
                name: `${counter} ${place.place_name}`,
                original_name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }
        });
    } catch (error) {
        console.log('Error to connect to the mapbox API');
    }
}

export const place_weather = async(lat, lon) => {
    const open_weather_token = process.env.OPEN_WEATHER_TOKEN;
    try {
        const resp = await axios({
            method: 'GET',
            baseURL: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                lat,
                lon,
                "appid": open_weather_token,
                "units": "metric"
            }
        });
        const {weather, main} = resp.data;
        return {
            desc: weather[0].description,
            temp: main.temp,
            min: main.temp_min,
            max: main.temp_max
        }
    } catch (error) {
        console.log("Error to connect to the open weather API");
    }
}