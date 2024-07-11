const express = require('express');
const router = express.Router();
const airlineController = require('../db_wrapper/db_wrapper').airlineController;

// Route to get all airline companies
router.get('/all', (req, res) => {
    airlineController.getAllAirlineCompanies(req, res);
});

// Route to get an airline by ID
router.get('/id/:id', (req, res) => {
    airlineController.getAirlineById(req, res);
});

// Route to get an airline by name
router.get('/name/:name', (req, res) => {
    airlineController.getAirlineByName(req, res);
});

// Route to create a new airline
router.post('/create', (req, res) => {
    const { name, countryId, adminUserId, callback } = req.body;
    airlineController.createAirline({ params: { name, countryId, adminUserId, callback } }, res);
});

// Route to update an airline by ID
router.put('/update/:id', (req, res) => {
    const { name, countryId, adminUserId, callback } = req.body;
    airlineController.updateAirlineById({ params: { id: req.params.id, name, countryId, adminUserId, callback } }, res);
});

// Route to delete an airline by ID
router.delete('/delete/:id', (req, res) => {
    airlineController.deleteAirlineById(req, res);
});

module.exports = router;
