import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom';
import CityList from '../Components/Home/CityList';
import Input from '../Components/Home/Input';
import OptionsList from '../Components/Home/OptionsList';

function Home() {

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [queryTimeout, setQueryTimeout] = useState('');
    const [mapboxSearchResult, setMapboxSearchResult] = useState(null);
    const [searchError, setSearchError] = useState(false);

    const mapboxApiKey = "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";

    const getSearchResults = () => {
        clearTimeout(queryTimeout);
        setQueryTimeout(setTimeout(async () => {
            if (searchQuery !== '') {
                try {
                    const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapboxApiKey}&types=place`);
                    setMapboxSearchResult(result.data.features);
                } catch {
                    setSearchError(true);
                }
                return;
            }
            setMapboxSearchResult([]);
        }, 300))
    };

    const previewCity = (result) => {
        const [city, state] = result.place_name.split(',');
        navigate({
            pathname: `/weather/${state.replaceAll(' ', '')}/${city.replaceAll(' ', '')}`,
            search: createSearchParams({
                lat: result.geometry.coordinates[1],
                lng: result.geometry.coordinates[0],
            }).toString()
        })
    }

    return (
        <div className='container text-white'>
            <div className='pt-4 mb-8 relative'>
                <Input searchQuery={searchQuery} setSearchQuery={setSearchQuery} getSearchResults={getSearchResults} />

                {mapboxSearchResult &&
                    <OptionsList
                        mapboxSearchResult={mapboxSearchResult}
                        previewCity={previewCity}
                        searchError={searchError} />
                }

                <CityList previewCity={previewCity} />
            </div>
        </div>
    )
}

export default Home;
