const { query } = require('./sql_server_wrapper');

// Function to add a new country
function addCountry(name, callback) {
    const sql = 'INSERT INTO Countries (Name) VALUES (?)';
    const params = [name];
    query(sql, params, callback);
}

// Function to get all countries
function getAllCountries(callback) {
    const sql = 'SELECT * FROM Countries';
    query(sql, [], callback);
}

// Function to get country by ID
function getCountryById(countryId, callback) {
    const sql = 'SELECT * FROM Countries WHERE Id = ?';
    const params = [countryId];
    query(sql, params, callback);
}

// Function to get country by name
function getCountryByName(countryName, callback) {
    const sql = 'SELECT * FROM Countries WHERE Name = ?';
    const params = [countryName];
    query(sql, params, callback);
}

// Function to update country by ID
function updateCountryById(countryId, newName, callback) {
    const sql = 'UPDATE Countries SET Name = ? WHERE Id = ?';
    const params = [newName, countryId];
    query(sql, params, callback);
}

// Function to update country by name
function updateCountryByName(oldName, newName, callback) {
    const sql = 'UPDATE Countries SET Name = ? WHERE Name = ?';
    const params = [newName, oldName];
    query(sql, params, callback);
}

// Function to delete country by ID
function deleteCountryById(countryId, callback) {
    const sql = 'DELETE FROM Countries WHERE Id = ?';
    const params = [countryId];
    query(sql, params, callback);
}

// Function to delete country by name
function deleteCountryByName(countryName, callback) {
    const sql = 'DELETE FROM Countries WHERE Name = ?';
    const params = [countryName];
    query(sql, params, callback);
}

module.exports = {
    addCountry,
    getAllCountries,
    getCountryById,
    getCountryByName,
    updateCountryById,
    updateCountryByName,
    deleteCountryById,
    deleteCountryByName,
};
