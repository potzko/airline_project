// Import necessary functions from the thin SQL wrapper
const { addAirline, getAllAirlines, getAirlineById: getAirlineByIdWrapper, getAirlineByName: getAirlineByNameWrapper, updateAirlineById: updateAirlineByIdWrapper, deleteAirlineById: deleteAirlineByIdWrapper } = require('../thin_sql_wrapper');

// Controller function to get all airline companies
async function getAllAirlineCompanies(req, res) {
    try {
        // Call the function from the thin SQL wrapper to get all airlines
        getAllAirlines((err, airlines) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.status(200).json(airlines);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to get an airline by ID
async function getAirlineById(req, res) {
    const { id } = req.params;

    try {
        // Call the function from the thin SQL wrapper to get airline by ID
        getAirlineByIdWrapper(id, (err, airline) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!airline || airline.length === 0) {
                res.status(404).json({ error: 'Airline not found' });
                return;
            }
            console.log(airline)
            res.status(200).json(airline[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAirlineByName(req, res) {
    const { name } = req.params;

    try {
        // Call the function from the thin SQL wrapper to get airline by ID
        getAirlineByNameWrapper(name, (err, airline) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!airline || airline.length === 0) {
                res.status(404).json({ error: 'Airline not found' });
                return;
            }

            res.status(200).json(airline[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createAirline(req, res) {
    const { name, countryId, adminUserId, callback } = req.params;
    try {
        addAirline(name, countryId, adminUserId, callback, (err, airline) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!airline || airline.length === 0) {
                res.status(404).json({ error: 'Airline not found' });
                return;
            }

            res.status(200).json(airline[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateAirlineById(req, res) {
    const { id, name, countryId, adminUserId, callback } = req.params;
    try {
        updateAirlineByIdWrapper(id, name, countryId, adminUserId, callback, (err, airline) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!airline || airline.length === 0) {
                res.status(404).json({ error: 'Airline not found' });
                return;
            }

            res.status(200).json(airline[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteAirlineById(req, res) {
    const { id } = req.params;
    try {
        deleteAirlineByIdWrapper(id, (err, airline) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!airline || airline.length === 0) {
                res.status(404).json({ error: 'Airline not found' });
                return;
            }

            res.status(200).json(airline[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



// Add other controller functions as needed (e.g., addAirline, updateAirlineById, deleteAirlineById)

// Export controller functions
module.exports = {
    getAllAirlineCompanies,
    getAirlineById,
    getAirlineByName,
    createAirline,
    updateAirlineById,
    deleteAirlineById,
};