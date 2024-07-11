const express = require('express');
const router = express.Router();
const flightController = require('../db_wrapper/db_wrapper').flightController;

// Route to get all flights
router.get('/all', (req, res) => {
    flightController.getAllFlights(req, res);
});

// Route to get a flight by ID
router.get('/id/:id', (req, res) => {
    flightController.getFlightById(req, res);
});

// Route to create a new flight
router.post('/create', (req, res) => {
    const { airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets } = req.body;
    flightController.createFlight({ body: { airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets } }, res);
});

// Route to update a flight by ID
router.put('/update/:id', (req, res) => {
    const { airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets } = req.body;
    flightController.updateFlightById({ params: { id: req.params.id }, body: { airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets } }, res);
});

// Route to delete a flight by ID
router.delete('/delete/:id', (req, res) => {
    flightController.deleteFlightById(req, res);
});

// Route to get flights by airline company name
router.get('/byairlinename/:name', (req, res) => {
    flightController.getFlightsByAirlineName(req, res);
});

module.exports = router;
