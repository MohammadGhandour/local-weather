import React from 'react'

function Input({ searchQuery, setSearchQuery, getSearchResults }) {
    return (
        <input
            autoFocus
            placeholder='Search for a city or state'
            className='py-2 px-1 w-full border-b outline-none rounded 
                    bg-weather-teritiary text-weather-primary 
                    focus:border-weather-teritiary focus:outline-none focus:bg-weather-teritiary duration-200
                    focus:rounded-t focus:rounded-b-none'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onInput={getSearchResults} />
    )
}

export default Input;
