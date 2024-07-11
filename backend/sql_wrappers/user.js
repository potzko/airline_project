const { query } = require('./sql_server_wrapper');

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

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    getUserByName,
    updateUserById,
    deleteUserById,
};
