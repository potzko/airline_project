// FlightComponent.jsx
import React, { useState } from 'react';
import { getAllFlightsByAirlineName, getFlightById, getAllFlights, } from '../services/flights_api';
import { nameCountryById, nameAirlineById } from '../services/namer'

const FlightComponent = () => {
    const [FlightSearchText, setFlightSearchText] = useState('');
    const [flight, setFlight] = useState(null);
    const [flightList, setFlightList] = useState([])

    const handleGetFlightById = async () => {
        try {
            let fetchedFlight = await getFlightById(FlightSearchText);
            let airline_company_name = await nameAirlineById(fetchedFlight.Airline_Company_Id);
            let origin_country = await nameCountryById(fetchedFlight.Origin_Country_Id);
            let destination_country = await nameCountryById(fetchedFlight.Destination_Country_Id);
            fetchedFlight.airlineCompanyName = airline_company_name
            fetchedFlight.originCountry = origin_country
            fetchedFlight.destinationCountry = destination_country
            console.log("aaaaaaaaaaaaaaaaaaa", fetchedFlight);
            setFlight(fetchedFlight);
        } catch (error) {
            console.error('Error fetching flight:', error);
            alert('Error fetching flight');
        }
    };

    const handleGetFlightByAirline = async () => {
        try {
            const fetchedFlights = await getAllFlightsByAirlineName(FlightSearchText);
            fetchedFlights.map(async (i) => {
                console.log(i);
                let airline_company_name = await nameAirlineById(i.Airline_Company_Id);
                let origin_country = await nameCountryById(i.Origin_Country_Id);
                let destination_country = await nameCountryById(i.Destination_Country_Id);
                i.airlineCompanyName = airline_company_name
                i.originCountry = origin_country
                i.destinationCountry = destination_country
            })
            setFlightList(fetchedFlights);

        } catch (error) {
            console.error('Error fetching flight:', error);
            alert('Error fetching flight');
        }
    };

    const handleGetAllFlights = async (render = true) => {
        try {
            const fetchedFlights = await getAllFlights();
            fetchedFlights.map(async (i) => {
                console.log(i);
                let airline_company_name = await nameAirlineById(i.Airline_Company_Id);
                let origin_country = await nameCountryById(i.Origin_Country_Id);
                let destination_country = await nameCountryById(i.Destination_Country_Id);
                i.airlineCompanyName = airline_company_name
                i.originCountry = origin_country
                i.destinationCountry = destination_country
            })
            if (render) {
                setFlightList(fetchedFlights);
            }
        } catch (error) {
            console.error('Error fetching flight:', error);
            alert('Error fetching flight');
        }
    };

    const randerFlight = (flight) => {
        return <div>
            <p>ID: {flight.Id}</p>
            <p>airline: {flight.airlineCompanyName}</p>
            <p>from: {flight.originCountry}</p>
            <p>to: {flight.destinationCountry}</p>
            <p>departing on: {flight.Departure_Time}</p>
            <p>landing on {flight.Landing_Time}</p>
        </div>
    }

    const randerFlightList = () => {
        const flight_list_items = flightList.map(i => <li key={i.Id}>{randerFlight(i)}</li>);
        return <ul>{flight_list_items}</ul>;
    }
    handleGetAllFlights(false)
    return (
        <div>
            <h2>Get Flight</h2>
            <input
                type="text"
                placeholder="Search Term"
                value={FlightSearchText}
                onChange={(e) => setFlightSearchText(e.target.value)}
            />
            <button onClick={handleGetFlightById}>Get Flight By Id</button>
            <button onClick={handleGetFlightByAirline}>Get Flight By Airline</button>
            {flight && (
                <div>
                    {randerFlight(flight)}
                </div>
            )}
            <h2>Show All Flights</h2>
            <button onClick={handleGetAllFlights}>Show All Flights</button>
            {
                flightList && randerFlightList()
            }
        </div>
    );
};

export default FlightComponent;
