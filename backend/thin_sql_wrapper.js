//SQL WRAPPER
//this file is a thin encapsulation of the sql database
//it does not check for invariants, nor will it update if you are trying to create an invariant

// Import the mysql module
const mysql = require('mysql');

// Define MySQL database connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'SQL_PASSWORD_123', // todo: move password to separate file
    database: 'flight_proj'
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Function to execute SQL queries
function query(sql, params, callback) {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            callback(err, null);
            return;
        }

        // Execute the query with parameters
        connection.query(sql, params, (err, results) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
                return;
            }

            // Pass the results to the callback function
            callback(null, results);
        });
    });
}

/*
    -------------------------------------
    functions relating to the User table:
    -------------------------------------
*/
// Function to add a user to the user table
function addUser(username, password, callback) {
    const sql = 'INSERT INTO User (User_Name, Password) VALUES (?, ?)';
    const params = [username, password];
    query(sql, params, callback);
}

// Function to get all users
function getAllUsers(callback) {
    const sql = 'SELECT Id, User_Name FROM User';
    query(sql, [], callback);
}

// Function to get user by ID
function getUserById(userId, callback) {
    const sql = 'SELECT Id, User_Name FROM User WHERE Id = ?';
    const params = [userId];
    query(sql, params, callback);
}

// Function to get user by name
function getUserByName(username, callback) {
    const sql = 'SELECT Id, User_Name FROM User WHERE User_Name = ?';
    const params = [username];
    query(sql, params, callback);
}

// Function to update user by ID
function updateUserById(userId, newUsername, newPassword, callback) {
    const sql = 'UPDATE User SET User_Name = ?, Password = ? WHERE Id = ?';
    const params = [newUsername, newPassword, userId];
    query(sql, params, callback);
}

// Function to delete user by ID
function deleteUserById(userId, callback) {
    const sql = 'DELETE FROM User WHERE Id = ?';
    const params = [userId];
    query(sql, params, callback);
}


function comparePassword(username, password, callback) {
    const sql = 'SELECT Id, User_Name FROM User WHERE User_Name = ? AND Password = ?';
    query(sql, [username, password], callback);
}

/*
    -----------------------------------------
    functions relating to the Countries table :
    -----------------------------------------
*/
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

/*
  -----------------------------------------
  functions relating to the Airline_Company table :
  -----------------------------------------
*/

// Function to add a new airline
function addAirline(name, countryId, adminUserId, callback) {
    const sql = 'INSERT INTO Airline_Company (name, Country_id, admin_user_id) VALUES (?, ?, ?)';
    const params = [name, countryId, adminUserId];
    query(sql, params, callback);
}

// Function to get all airlines
function getAllAirlines(callback) {
    const sql = 'SELECT * FROM Airline_Company';
    query(sql, [], callback);
}

// Function to get airline by ID
function getAirlineById(airlineId, callback) {
    const sql = 'SELECT * FROM Airline_Company WHERE Id = ?';
    const params = [airlineId];
    query(sql, params, callback);
}

// Function to get airline by name
function getAirlineByName(name, callback) {
    const sql = 'SELECT * FROM Airline_Company WHERE name = ?';
    const params = [name];
    query(sql, params, callback);
}

// Function to update airline by ID
function updateAirlineById(airlineId, newName, newCountryId, newAdminUserId, callback) {
    const sql = 'UPDATE Airline_Company SET name = ?, Country_id = ?, admin_user_id = ? WHERE Id = ?';
    const params = [newName, newCountryId, newAdminUserId, airlineId];
    query(sql, params, callback);
}

// Function to update airline by name
function updateAirlineByName(oldName, newName, newCountryId, newAdminUserId, callback) {
    const sql = 'UPDATE Airline_Company SET name = ?, Country_id = ?, admin_user_id = ? WHERE name = ?';
    const params = [newName, newCountryId, newAdminUserId, oldName];
    query(sql, params, callback);
}

// Function to delete airline by ID
function deleteAirlineById(airlineId, callback) {
    const sql = 'DELETE FROM Airline_Company WHERE Id = ?';
    const params = [airlineId];
    query(sql, params, callback);
}

// Function to delete airline by name
function deleteAirlineByName(name, callback) {
    const sql = 'DELETE FROM Airline_Company WHERE name = ?';
    const params = [name];
    query(sql, params, callback);
}

/*
  -----------------------------------------
  functions relating to the Customer table:
  -----------------------------------------
*/

// Function to add a new customer
function addCustomer(firstName, lastName, address, phoneNumber, userId, callback) {
    const sql = 'INSERT INTO Costumer (First_Name, Last_Name, Address, Phone_Number, User_Id) VALUES (?, ?, ?, ?, ?)';
    const params = [firstName, lastName, address, phoneNumber, userId];
    query(sql, params, callback);
}

// Function to get all customers
function getAllCustomers(callback) {
    const sql = 'SELECT * FROM Costumer';
    query(sql, [], callback);
}

// Function to get customer by ID
function getCustomerById(customerId, callback) {
    const sql = 'SELECT * FROM Costumer WHERE Id = ?';
    const params = [customerId];
    query(sql, params, callback);
}

// Function to get customer by name
function getCustomerByName(firstName, lastName, callback) {
    const sql = 'SELECT * FROM Costumer WHERE First_Name = ? AND Last_Name = ?';
    const params = [firstName, lastName];
    query(sql, params, callback);
}

// Function to update customer by ID
function updateCustomerById(customerId, newFirstName, newLastName, newAddress, newPhoneNumber, callback) {
    const sql = 'UPDATE Costumer SET First_Name = ?, Last_Name = ?, Address = ?, Phone_Number = ? WHERE Id = ?';
    const params = [newFirstName, newLastName, newAddress, newPhoneNumber, customerId];
    query(sql, params, callback);
}

// Function to delete customer by ID
function deleteCustomerById(customerId, callback) {
    const sql = 'DELETE FROM Costumer WHERE Id = ?';
    const params = [customerId];
    query(sql, params, callback);
}


/*
  -----------------------------------------
  functions relating to the Countries table:
  -----------------------------------------
*/

// Function to add a new Country
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
function getCountryByName(name, callback) {
    const sql = 'SELECT * FROM Countries WHERE Name = ?';
    const params = [name];
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
function deleteCountryByName(name, callback) {
    const sql = 'DELETE FROM Countries WHERE Name = ?';
    const params = [name];
    query(sql, params, callback);
}

/*
  -----------------------------------------
  functions relating to the Ticket table:
  -----------------------------------------
*/

// Function to add a new ticket
function addTicket(flightId, customerId, callback) {
    const sql = 'INSERT INTO Ticket (Flight_Id, Customer_Id) VALUES (?, ?)';
    const params = [flightId, customerId];
    query(sql, params, callback);
}

// Function to get all tickets
function getAllTickets(callback) {
    const sql = 'SELECT * FROM Ticket';
    query(sql, [], callback);
}

// Function to get ticket by ID
function getTicketById(ticketId, callback) {
    const sql = 'SELECT * FROM Ticket WHERE Id = ?';
    const params = [ticketId];
    query(sql, params, callback);
}

// Function to update ticket by ID
function updateTicketById(ticketId, newFlightId, newCustomerId, callback) {
    const sql = 'UPDATE Ticket SET Flight_Id = ?, Customer_Id = ? WHERE Id = ?';
    const params = [newFlightId, newCustomerId, ticketId];
    query(sql, params, callback);
}

// Function to delete ticket by ID
function deleteTicketById(ticketId, callback) {
    const sql = 'DELETE FROM Ticket WHERE Id = ?';
    const params = [ticketId];
    query(sql, params, callback);
}

/*
  -----------------------------------------
  functions relating to the Flight table:
  -----------------------------------------
*/

// Function to add a new flight
function addFlight(airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets, callback) {
    const sql = 'INSERT INTO Flight (Airline_Company_Id, Origin_Country_Id, Destination_Country_Id, Departure_Time, Landing_Time, Remaining_Tickets) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets];
    query(sql, params, callback);
}

// Function to get all flights
function getAllFlights(callback) {
    const sql = 'SELECT * FROM Flight';
    query(sql, [], callback);
}

// Function to get flights by airline company name
function getFlightsByAirlineName(airlineName, callback) {
    const sql = `
        SELECT flight.*
        FROM flight
        JOIN airline_company ON flight.Airline_Company_Id = airline_company.Id
        WHERE airline_company.Name = ?
    `;
    const params = [airlineName];
    query(sql, params, callback);
}

// Function to get flight by ID
function getFlightById(flightId, callback) {
    const sql = 'SELECT * FROM Flight WHERE Id = ?';
    const params = [flightId];
    query(sql, params, callback);
}

// Function to update flight by ID
function updateFlightById(flightId, airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets, callback) {
    const sql = 'UPDATE Flight SET Airline_Company_Id = ?, Origin_Country_Id = ?, Destination_Country_Id = ?, Departure_Time = ?, Landing_Time = ?, Remaining_Tickets = ? WHERE Id = ?';
    const params = [airlineCompanyId, originCountryId, destinationCountryId, departureTime, landingTime, remainingTickets, flightId];
    query(sql, params, callback);
}

// Function to delete flight by ID
function deleteFlightById(flightId, callback) {
    const sql = 'DELETE FROM Flight WHERE Id = ?';
    const params = [flightId];
    query(sql, params, callback);
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    getUserByName,
    updateUserById,
    deleteUserById,
    addCountry,
    getAllCountries,
    getCountryById,
    getCountryByName,
    updateCountryById,
    updateCountryByName,
    deleteCountryById,
    deleteCountryByName,
    addAirline,
    getAllAirlines,
    getAirlineById,
    getAirlineByName,
    updateAirlineById,
    updateAirlineByName,
    deleteAirlineById,
    deleteAirlineByName,
    addCustomer,
    getAllCustomers,
    getCustomerById,
    getCustomerByName,
    updateCustomerById,
    deleteCustomerById,
    addCountry,
    getAllCountries,
    getCountryById,
    getCountryByName,
    updateCountryById,
    updateCountryByName,
    deleteCountryById,
    deleteCountryByName,
    addTicket,
    getAllTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById,
    addFlight,
    getAllFlights,
    getFlightsByAirlineName,
    getFlightById,
    updateFlightById,
    deleteFlightById,
    comparePassword
};
