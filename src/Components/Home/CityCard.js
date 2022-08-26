import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';

function CityCard({ city }) {

    const navigate = useNavigate();

    function previewCity(city) {
        const cityName = city.city;
        const state = city.state;
        navigate({
            pathname: `/weather/${state}/${cityName}`,
            search: createSearchParams({
                lat: city.coords.lat,
                lng: city.coords.lng,
            }).toString()
        })
    }

    return (
        <div className="flex items-center py-4 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer mt-3"
            onClick={() => previewCity(city)}>
            <div className="flex flex-col flex-1">
                <h2 className="text-3xl">{city.city}</h2>
                <h3>{city.state}</h3>
            </div>
            <p className="text-3xl">
                {Math.round(city.weather.current.temp)}&deg;
            </p>
            {/* <div className="flex gap-2">
                    <span className="text-xs">
                        H:
                        {Math.round(city.weather.main.temp_max)}&deg;
                    </span>
                    <span className="text-xs">
                        L:
                        {Math.round(city.weather.main.temp_min)}&deg;
                    </span>
                </div> */}
        </div >
    )
}

export default CityCard;
