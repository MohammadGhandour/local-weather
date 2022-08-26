import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BaseModal from './BaseModal';
import PlusIcon from './PlusIcon';

function Navigation() {

    const [modalOpen, setModalOpen] = useState(false);
    const route = useLocation();

    return (
        <header className='sticky top-0 bg-weather-primary shadow-lg z-50'>
            <nav className='container flex flex-col sm:flex-row items-center gap-4 text-white py-1 sm:py-6'>
                <Link to='/'>
                    <div className='flex items-center gap-3 '>
                        {/* <i className="fa-solid fa-sun text-2xl"></i> */}
                        <i className="fa-solid fa-cloud-sun text-2xl"></i>
                        <p className='text-2xl'>The Local Weather</p>
                    </div>
                </Link>

                <div className='flex gap-3 flex-1 justify-end'>
                    <i className="fa-solid fa-circle-info text-xl 
                    hover:text-weather-primary
                    hover:bg-weather-teritiary
                    p-1 cursor-pointer duration-200"
                        onClick={() => setModalOpen(true)}></i>
                    {route.pathname !== '/' && <PlusIcon />}
                </div>

                {modalOpen &&
                    <BaseModal setModalOpen={setModalOpen}>
                        <div>
                            <h1 className="text-2xl mb-1">About:</h1>
                            <p className="mb-4">
                                The Local Weather allows you to track the current and
                                future weather of cities of your choosing.
                            </p>
                            <h2 className="text-2xl">How it works:</h2>
                            <ol className="list-decimal list-inside mb-4">
                                <li>
                                    Search for your city by entering the name into the
                                    search bar.
                                </li>
                                <li>
                                    Select a city within the results, this will take
                                    you to the current weather for your selection.
                                </li>
                                <li>
                                    Track the city by clicking on the "+" icon in the
                                    top right. This will save the city to view at a
                                    later time on the home page.
                                </li>
                            </ol>

                            <h2 className="text-2xl">Removing a city</h2>
                            <p>
                                If you no longer wish to track a city, simply select
                                the city within the home page. At the bottom of the
                                page, there will be am option to delete the city.
                            </p>
                        </div>
                    </BaseModal>
                }

            </nav>
        </header>
    )
}

export default Navigation;
