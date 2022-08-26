import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import getApi from '../Config/config';
import Loader from './Loader';

function AsyncCity() {

    const [cityInfos, setCityInfos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [temp, setTemp] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const route = useLocation();
    const cityName = useParams().city;
    const searchQuery = route.search.split('?')[1];
    const latitude = searchQuery.split('=')[1].split('&')[0];
    const longitude = searchQuery.split('&')[1].split('=')[1];
    const cities = JSON.parse(localStorage.getItem("savedCities"));
    const cityAlreadyAdded = cities?.find((item) => item.city === cityName);

    useEffect(() => {
        axios.get(`${getApi(latitude, longitude)}`)
            .then(res => {
                setLoading(false);
                setCityInfos(res.data);
                const localOffset = new Date().getTimezoneOffset() * 60000;
                const utc = res.data.current.dt * 1000 + localOffset;
                res.data.currentTime =
                    utc + 1000 * res.data.timezone_offset;
                // cal hourly weather offset
                res.data.hourly.forEach((hour) => {
                    const utc = hour.dt * 1000 + localOffset;
                    hour.currentTime =
                        utc + 1000 * res.data.timezone_offset;
                });
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
    }, [latitude, longitude]);

    useEffect(() => {
        if (cityInfos) {
            setDate(new Date(cityInfos.currentTime).toLocaleDateString("en-us", { weekday: "short", day: "2-digit", month: "long" }))
            setTemp(Math.round(cityInfos.current.temp));
            setTime(new Date(cityInfos.currentTime).toLocaleTimeString("en-us", { timeStyle: "short" }));
            setFeelsLike(Math.round(cityInfos.current.feels_like));
            setDescription(cityInfos.current.weather[0].description);
        }
    }, [cityInfos]);

    function getHourlyTime(hourData) {
        return new Date(hourData.currentTime).toLocaleTimeString
            ("en-us", {
                hour: "numeric",
            })
    }

    function getDay(day) {
        return new Date(day.dt * 1000).toLocaleDateString(
            "en-us",
            {
                weekday: "long",
            }
        )
    }

    const removeCity = () => {
        const updatedCities = cities.filter(
            (city) => city.city !== cityName
        );
        localStorage.setItem(
            "savedCities",
            JSON.stringify(updatedCities)
        );
        navigate('/');
    };



    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className='text-weather-teritiary flex flex-col flex-1 items-center'>
                <div className="p-2 w-screen text-center bg-weather-secondary text-weather-teritiary">
                    <p>
                        You are currently previewing this city, click the "+"
                        icon to start tracking this city.
                    </p>
                </div>
                {cityInfos &&
                    <div className="flex flex-col items-center py-4">
                        <h1 className="text-4xl mb-2">{cityName}</h1>
                        <p className="text-sm mb-4">
                            <span>{date}</span>
                            <span className='pl-1'>{time}</span>
                        </p>
                        <p className="text-8xl mb-4 pl-4">{temp}&deg;</p>
                        <p className='pl-4'>Feels like {feelsLike} &deg;</p>
                        <p className="capitalize pl-4">{description}</p>
                        <img
                            className="w-[150px] h-auto"
                            src={`http://openweathermap.org/img/wn/${cityInfos.current.weather[0].icon}@2x.png`}
                            alt="open weather"
                        />

                        <hr className="border-white border-opacity-50 border w-screen" />

                        <div className="w-full py-12 scroller">
                            <div className="mx-8 text-white">
                                <h2 className="mb-4">Hourly Forecast</h2>
                                <div className="flex gap-10 overflow-x-scroll">
                                    {cityInfos.hourly.map(hourData => (
                                        <div key={hourData.dt} className="flex flex-col gap-4 items-center">
                                            <p className="whitespace-nowrap text-md">{getHourlyTime(hourData)}</p>
                                            <img
                                                className="w-auto h-[50px] object-cover"
                                                src={`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`}
                                                alt="openweathermap"
                                            />
                                            <p className="text-xl">
                                                {Math.round(hourData.temp)}&deg;
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <hr className="border-white border-opacity-50 border w-screen" />

                        <div className="max-w-screen-md w-full py-12">
                            <div className="mx-8 text-white">
                                <h2 className="mb-4">7 Day Forecast</h2>
                                {cityInfos.daily.map(day => (
                                    <div key={day.dt} className="flex items-center">
                                        <p className="flex-1">{getDay(day)}</p>
                                        <img
                                            className="w-[50px] h-[50px] object-cover"
                                            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                            alt="openweathermap"
                                        />
                                        <div className="flex gap-2 flex-1 justify-end">
                                            <p>Max: {Math.round(day.temp.max)}&deg;</p>
                                            <p>Min: {Math.round(day.temp.min)}&deg;</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {cityAlreadyAdded &&
                            <div
                                className="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
                                onClick={removeCity}
                            >
                                <i className="fa-solid fa-trash"></i>
                                <p>Remove City</p>
                            </div>}
                    </div>
                }
            </div>
        )
    }
}

export default AsyncCity;
