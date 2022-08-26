import axios from 'axios';
import React, { useEffect, useState } from 'react'
import getApi from '../../Config/config';
// import Loader from '../Loader';
import CityCard from './CityCard';

function CityList() {

    const [savedCities, setSavedCities] = useState(localStorage.getItem('savedCities') ?
        JSON.parse(localStorage.getItem('savedCities')) : []);
    const [arrayReady, setArrayReady] = useState(false);

    useEffect(() => {
        const getCities = async () => {
            let requests = [];
            savedCities.forEach((city) => (
                requests.push(
                    axios.get(getApi(city.coords.lat, city.coords.lng))
                )
            ));
            const weatherData = await Promise.all(requests);
            let savedCitiesArray = savedCities;
            weatherData.forEach((value, index) => (
                savedCitiesArray[index].weather = value.data
            ));
            setSavedCities(savedCitiesArray);
            setArrayReady(true);
        }
        getCities();
        // eslint-disable-next-line
    }, []);

    if (arrayReady) {
        return (
            <div>
                {savedCities.map(city => (
                    <CityCard city={city} key={city.id} />
                ))}
            </div>
        )
    } else {
        return (
            <div className='absolute'>
                {/* <Loader /> */}
            </div>
        )
    }
}

export default CityList;
