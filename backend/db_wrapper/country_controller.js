// Import necessary functions from the thin SQL wrapper
const {
    addCountry,
    getCountryById: getCountryByIdWrapper,
    getCountryByName: getCountryByNameWrapper,
    getAllCountries: getAllCountriesWrapper,
    updateCountryById: updateCountryByIdWrapper,
    updateCountryByName: updateCountryByNameWrapper,
    deleteCountryById: deleteCountryByIdWrapper,
    deleteCountryByName: deleteCountryByNameWrapper,
} = require('../thin_sql_wrapper');

// Controller function to get all countries
async function getAllCountries(req, res) {
    try {
        getAllCountriesWrapper((err, countries) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.status(200).json(countries);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to get a country by ID
async function getCountryById(req, res) {
    const { id } = req.params;
    try {
        getCountryByIdWrapper(id, (err, country) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!country || country.length === 0) {
                res.status(404).json({ error: 'Country not found' });
                return;
            }

            res.status(200).json(country[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to get a country by name
async function getCountryByName(req, res) {
    const { name } = req.params;

    try {
        getCountryByNameWrapper(name, (err, country) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!country || country.length === 0) {
                res.status(404).json({ error: 'Country not found' });
                return;
            }

            res.status(200).json(country[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to create a new country
async function createCountry(req, res) {
    const { name } = req.body;
    try {
        addCountry(name, (err, country) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            res.status(201).json(country);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to update a country by ID
async function updateCountryById(req, res) {
    const { id } = req.params;
    const { newName } = req.body;
    try {
        updateCountryByIdWrapper(id, newName, (err, country) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!country || country.length === 0) {
                res.status(404).json({ error: 'Country not found' });
                return;
            }

            res.status(200).json(country[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to update a country by name
async function updateCountryByName(req, res) {
    const { name } = req.params;
    const { newName } = req.body;
    try {
        updateCountryByNameWrapper(name, newName, (err, country) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!country || country.length === 0) {
                res.status(404).json({ error: 'Country not found' });
                return;
            }

            res.status(200).json(country[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to delete a country by ID
async function deleteCountryById(req, res) {
    const { id } = req.params;
    try {
        deleteCountryByIdWrapper(id, (err, country) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!country || country.length === 0) {
                res.status(404).json({ error: 'Country not found' });
                return;
            }

            res.status(200).json(country[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Controller function to delete a country by name
async function deleteCountryByName(req, res) {
    const { name } = req.params;
    try {
        deleteCountryByNameWrapper(name, (err, country) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!country || country.length === 0) {
                res.status(404).json({ error: 'Country not found' });
                return;
            }

            res.status(200).json(country[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllCountriesController: getAllCountries,
    getCountryById,
    getCountryByName,
    createCountry,
    updateCountryById,
    updateCountryByName,
    deleteCountryById,
    deleteCountryByName,
};
