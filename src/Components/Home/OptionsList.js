import React from 'react';

function OptionsList({ mapboxSearchResult, previewCity, searchError }) {

    const noResultFound =
        mapboxSearchResult && !searchError && mapboxSearchResult.length === 0 &&
        <p className='text-white p-1 bg-red-500'>No results found, try a different city name 😅</p>

    const searchErrorParagraph =
        searchError && <p className='text-white p-1 bg-red-500'>Something went wrong please try again.</p>

    return (
        <ul className='absolute bg-weather-teritiary text-weather-primary w-full shadow-md py-2 top-[66] rounded-b'>
            {mapboxSearchResult.map(result => (
                <li
                    key={result.id}
                    className='py-2 px-1 cursor-pointer hover:bg-weather-primary hover:text-weather-teritiary duration-200'
                    onClick={() => previewCity(result)}>
                    {result.place_name}
                </li>
            ))}
            {searchErrorParagraph}
            {noResultFound}
        </ul>
    )
}

export default OptionsList;
