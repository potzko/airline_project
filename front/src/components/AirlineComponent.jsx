// AirlineComponent.jsx
import React, { useState } from 'react';
import { getAirlineById, getAirlineByName, getAllAirlines, } from '../services/airlines_api';
import { nameCountryById } from '../services/namer'

const AirlineComponent = () => {
    const [AirlineSearchText, setAirlineSearchText] = useState('');
    const [airline, setAirline] = useState(null);
    const [airlineList, setAirlineList] = useState([])

    const handleGetAirlineById = async () => {
        try {
            let fetchedAirline = await getAirlineById(AirlineSearchText);
            const country_name = await nameCountryById(fetchedAirline.Country_Id);
            fetchedAirline.Country_Name = country_name;
            console.log(fetchedAirline);
            setAirline(fetchedAirline);
        } catch (error) {
            console.error('Error fetching airline:', error);
            alert('Error fetching airline');
        }
    };

    const handleGetAirlineByName = async () => {
        try {
            let fetchedAirline = await getAirlineByName(AirlineSearchText);
            const country_name = await nameCountryById(fetchedAirline.Country_Id);
            fetchedAirline.Country_Name = country_name;
            console.log(fetchedAirline);
            setAirline(fetchedAirline);
        } catch (error) {
            console.error('Error fetching airline:', error);
            alert('Error fetching airline');
        }
    };

    const handleGetAllAirlines = async () => {
        try {
            const fetchedAirlines = await getAllAirlines();
            setAirlineList(fetchedAirlines);
        } catch (error) {
            console.error('Error fetching airline:', error);
            alert('Error fetching airline');
        }
    };

    const randerAirline = (airline) => {
        let a = nameCountryById(airline.Country_Id);
        return <div>
            <p>ID: {airline.Id}</p>
            <p>Airlinename: {airline.Name}</p>
            <p>country name: {airline.Country_Name}</p>
        </div>
    }

    const randerAirlineList = () => {
        const airline_list_items = airlineList.map(i => <li key={i.Id}>{randerAirline(i)}</li>);
        return <ul>{airline_list_items}</ul>;
    }

    return (
        <div>
            <h2>Get Airline</h2>
            <input
                type="text"
                placeholder="Search Term"
                value={AirlineSearchText}
                onChange={(e) => setAirlineSearchText(e.target.value)}
            />
            <button onClick={handleGetAirlineById}>Get Airline By Id</button>
            <button onClick={handleGetAirlineByName}>Get Airline By Name</button>
            {airline && (
                <div>
                    {randerAirline(airline)}
                </div>
            )}
            <h2>Show All Airlines</h2>
            <button onClick={handleGetAllAirlines}>Show All Airlines</button>
            {
                airlineList && randerAirlineList()
            }
        </div>
    );
};

export default AirlineComponent;
