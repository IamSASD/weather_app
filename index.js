import { input_description, inquirer_menu, list_places, pause } from "./helpers/inquirer.js";
import { history, place_geo, place_weather } from "./models/searchs.js";


const main = async() => {
    let opt;

    do {
        opt = await inquirer_menu();

        switch(opt) {
            case 1:
                // Show message
                const place = await input_description('City: ');
                // Search places
                const places = await place_geo(place);
                // Choose the place
                const selected_id = await list_places(places);
                const selected_place = places.find(place => place.value === selected_id);
                if(selected_id == 0){break;}
                const {original_name, lng, lat} = selected_place;
                // Weather
                const {desc, min, max, temp} = await place_weather(lat,lng);
                // Show results
                console.log(`\n${'City information: '.green} ${desc}`);
                console.log(`${'City: '.green} ${original_name}`);
                console.log(`${'Lat: '.green} ${lat}`);
                console.log(`${'Lng: '.green} ${lng}`);
                console.log(`${'Temperature: '.green} ${temp}`);
                console.log(`${'Min: '.green} ${min}`);
                console.log(`${'Max: '.green} ${max}`);
            break;

            case 2:
                const history_arr = await history();
                history_arr.forEach(entry => console.log(entry.name));
            break;
        }

        opt != 0 ? await pause() : '';
    } while (opt !== 0);
}

main();