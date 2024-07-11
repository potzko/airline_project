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

module.exports = {
    query
};