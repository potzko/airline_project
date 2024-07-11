const express = require('express');
const router = express.Router();
const countryController = require('../db_wrapper/db_wrapper').countryController;

// Route to get all countries
router.get('/all', (req, res) => {
    countryController.getAllCountriesController(req, res);
});

// Route to get a country by ID
router.get('/id/:id', (req, res) => {
    countryController.getCountryById(req, res);
});

// Route to get a country by name
router.get('/name/:name', (req, res) => {
    countryController.getCountryByName(req, res);
});

// Route to create a new country
router.post('/create', (req, res) => {
    const { name } = req.body;
    countryController.createCountry(name, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(201).json(result);
        }
    });
});

// Route to update a country by ID
router.put('/update/id/:id', (req, res) => {
    const { newName } = req.body;
    countryController.updateCountry(req.params.id, newName, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Route to update a country by name
router.put('/update/name/:name', (req, res) => {
    const { newName } = req.body;
    countryController.updateCountryByName(req.params.name, newName, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Route to delete a country by ID
router.delete('/delete/id/:id', (req, res) => {
    countryController.deleteCountryById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Route to delete a country by name
router.delete('/delete/name/:name', (req, res) => {
    countryController.deleteCountryByName(req.params.name, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;
