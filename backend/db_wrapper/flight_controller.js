// Import necessary functions from the thin SQL wrapper
const {
    addFlight,
    getAllFlights: getAllFlightsWrapper,
    getFlightById: getFlightByIdWrapper,
    updateFlightById: updateFlightByIdWrapper,
    deleteFlightById: deleteFlightByIdWrapper,
    getFlightsByAirlineName: getFlightsByAirlineNameWrapper
} = require('../thin_sql_wrapper');

// Controller function to get all flights
async function getAllFlights(req, res) {
    try {
        getAllFlightsWrapper((err, flights) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.status(200).json(flights);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to get a flight by ID
async function getFlightById(req, res) {
    const { id } = req.params;

    try {
        getFlightByIdWrapper(id, (err, flight) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!flight || flight.length === 0) {
                res.status(404).json({ error: 'Flight not found' });
                return;
            }

            res.status(200).json(flight[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to create a new flight
async function createFlight(req, res) {
    const { airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets } = req.body;

    try {
        addFlight(airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets, (err, flight) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.status(201).json(flight);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to update a flight by ID
async function updateFlightById(req, res) {
    const { id } = req.params;
    const { airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets } = req.body;

    try {
        updateFlightByIdWrapper(id, airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets, (err, flight) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!flight || flight.length === 0) {
                res.status(404).json({ error: 'Flight not found' });
                return;
            }

            res.status(200).json(flight[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to delete a flight by ID
async function deleteFlightById(req, res) {
    const { id } = req.params;

    try {
        deleteFlightByIdWrapper(id, (err, flight) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!flight || flight.length === 0) {
                res.status(404).json({ error: 'Flight not found' });
                return;
            }

            res.status(200).json(flight[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to get flights by airline name
async function getFlightsByAirlineName(req, res) {
    const { name } = req.params;

    try {
        getFlightsByAirlineNameWrapper(name, (err, flights) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!flights || flights.length === 0) {
                res.status(404).json({ error: 'Flights not found for the given airline name' });
                return;
            }

            res.status(200).json(flights);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllFlights,
    getFlightById,
    createFlight,
    updateFlightById,
    deleteFlightById,
    getFlightsByAirlineName
};
