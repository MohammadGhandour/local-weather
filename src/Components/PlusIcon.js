import React, { useState } from 'react'
import { useLocation } from 'react-router';
import { uid } from 'uid';

function PlusIcon() {

    const route = useLocation();
    const city = useLocation().pathname.split('/')[3];
    const state = useLocation().pathname.split('/')[2];
    const searchQuery = route.search.split('?')[1];
    const latitude = searchQuery.split('=')[1].split('&')[0];
    const longitude = searchQuery.split('&')[1].split('=')[1];
    const [savedCities] = useState(localStorage.getItem('savedCities') ?
        JSON.parse(localStorage.getItem('savedCities')) : []);
    const cityAlreadyAdded = savedCities.find((item) => item.city === city);

    const addCity = () => {

        const locationObj = {
            id: uid(),
            state: state,
            city: city,
            coords: {
                lat: latitude,
                lng: longitude
            }
        }

        savedCities.push(locationObj);
        localStorage.setItem('savedCities', JSON.stringify(savedCities));

        alert('City added to tracking.');
    }

    if (cityAlreadyAdded === undefined) {
        return (
            <i className="fa-solid fa-plus text-xl
                        hover:text-weather-primary
                        hover:bg-weather-teritiary
                        p-1 cursor-pointer duration-200"
                onClick={addCity}>
            </i>
        )
    } else {
        return (
            <></>
        )
    }
}

export default PlusIcon;
